const mongoose = require('mongoose');

//review
const OpinionSchema = new mongoose.Schema({
  titulo: {
    type: String,
    trim: true,
    required: [true, 'Añade un título para tu opinión'],
    maxlength: 100,
  },
  texto: {
    type: String,
    required: [true, 'Añade tu opinion'],
  },
  puntuacion: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, 'Añade una puntuación entre 1 y 10'],
  },
  actividad: {
    type: mongoose.Schema.ObjectId,
    ref: 'Actividad',
    required: true,
  },
  usuario: {
    type: mongoose.Schema.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Opinion', OpinionSchema);
