const Usuario = require("../models/Usuario");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middleware/async");

/**
 * @desc        Registrar usuario
 * @route       GET /api/v1/auth/register
 * @access      Public
 */
exports.register = asyncHandler(async (req, res, next) => {
    res.status(200).json({ success: true });
  });