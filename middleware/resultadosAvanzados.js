const resultadosAvanzados = (model, populate) => async (req, res, next) => {
  let query;

  const requestQuery = { ...req.query };

  //campos excluidos
  const removeFields = ['select', 'sort', 'limit', 'page'];
  removeFields.forEach((param) => delete requestQuery[param]);

  //consulta (String)
  let queryString = JSON.stringify(requestQuery);

  //genera operadores de mongoDB (gt ? greater than)
  queryString = queryString.replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  //busca
  query = model.find(JSON.parse(queryString));

  //seleccionada los campos
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields);
  }

  //filtra
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  //Paginación
  const page = parseInt(req.query.page, 10) || 1;
  const limit = parseInt(req.query.limit, 10) || 50;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const total = await model.countDocuments(JSON.parse(queryString));

  query = query.skip(startIndex).limit(limit);

  if (populate) {
    query = query.populate(populate);
  }

  //ejecuta la consulta
  const resultados = await query;

  //Resultado de la paginación
  const pagination = {};
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit,
    };
  }

  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit,
    };
  }

  res.resultadosAvanzados = {
    success: true,
    count: resultados.length,
    pagination,
    data: resultados,
  };

  next();
};

module.exports = resultadosAvanzados;
