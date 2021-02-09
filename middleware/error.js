const error = (err, req, res, next) => {
    //

    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || 'Error del servidor'
    });
}

module.exports = errorHandler;