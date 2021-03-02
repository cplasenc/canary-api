const express = require('express');
const Usuario = require('../models/Usuario');
const router = express.Router({ mergeParams: true });

const resultadosAvanzados = require('../middleware/resultadosAvanzados');
const { protect, authorize } = require('../middleware/auth');

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/usuarios');

router.use(protect);
router.use(authorize('admin'));

router.route('/').get(resultadosAvanzados(Usuario), getUsers).post(createUser);

router.route('/:id').get(getUsers).put(updateUser).delete(deleteUser);

module.exports = router;
