const ErrorResponse = require("../util/errorResponse");

const error = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // mongoose error en la id
  if (err.name === "CastError") {
    const message = `Empresa no encontrada con el id ${err.value}`;
    error = new ErrorResponse(message, 404);
  }

  //Mongoose duplicate key
  if(err.code === 11000) {
      const message = 'Valor duplicado';
      error = new ErrorResponse(message, 400)
  }

  //Mongoose validation error
  if(err.name === 'ValidationError') {
      const message = Object.values(err.errors).map(val => val.message);
      error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Error del servidor",
  });
};

module.exports = errorHandler;