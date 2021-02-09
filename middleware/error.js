const ErrorResponse = require("../util/errorResponse");

const error = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  if (err.name === "CastError") {
    const message = `Empresa no encontrada con el id ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  res.status(erros.statusCode || 500).json({
    success: false,
    error: error.message || "Error del servidor",
  });
};

module.exports = errorHandler;
