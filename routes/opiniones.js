const express = require('express');
const Opinion = require('../models/Opinion');
const { getOpiniones, getOpinion } = require('../controllers/opiniones');

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

router.route('/:id').get(getOpinion);

module.exports = router;
