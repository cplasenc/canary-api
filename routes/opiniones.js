const express = require('express');
const Opinion = require('../models/Opinion');
const {
  getOpiniones,
  getOpinion,
  addOpinion,
  updateOpinion,
} = require('../controllers/opiniones');

const router = express.Router({ mergeParams: true });

const resultadosAvanzados = require('../middleware/resultadosAvanzados');
const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    resultadosAvanzados(Opinion, {
      path: 'actividad',
      select: 'nombre descripcion',
    }),
    getOpiniones
  )
  .post(protect, authorize('usuario', 'admin'), addOpinion);

router
  .route('/:id')
  .get(getOpinion)
  .put(protect, authorize('usuario', 'admin'), updateOpinion);

module.exports = router;
