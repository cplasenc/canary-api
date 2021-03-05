const express = require('express');
const Opinion = require('../models/Opinion');
const { getOpiniones } = require('../controllers/opiniones');

const router = express.Router({ mergeParams: true });

const resultadosAvanzados = require('../middleware/resultadosAvanzados');
const { protect, authorize } = require('../middleware/auth');

router.route('/').get(
  resultadosAvanzados(Opinion, {
    path: 'actividad',
    select: 'nombre descripcion',
  }),
  getOpiniones
);

module.exports = router;
