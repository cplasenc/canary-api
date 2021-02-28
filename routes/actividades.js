const express = require('express');
const Actividad = require('../models/Actividad');
const resultadosAvanzados = require('../middleware/resultadosAvanzados');
const {
  getActividades,
  getActividad,
  addActividad,
  updateActividad,
  deleteActividad,
  uploadImagenActividad,
} = require('../controllers/actividades');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(
    resultadosAvanzados(Actividad, {
      path: 'actividad',
      select: 'name description',
    }),
    getActividades
  )
  .post(protect, authorize('publisher', 'admin'), addActividad);

router
  .route('/:id')
  .get(getActividad)
  .put(protect, authorize('publisher', 'admin'), updateActividad)
  .delete(protect, authorize('publisher', 'admin'), deleteActividad);

router.route('/:id/photo').put(uploadImagenActividad);

module.exports = router;
