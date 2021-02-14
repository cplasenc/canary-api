const mongoose = require("mongoose");

const ActividadSchema = new mongoose.Schema({
  titulo: {
    type: String,
    trim: true,
    required: [true, "Añade un título para la actividad"],
  },
  descripcion: {
    type: String,
    required: [true, "Añade una descripción para la actividad"],
  },
  duracion: {
    type: String,
    required: [true, "Añade la duración de la actividad"],
  },
  precio: {
    type: Number,
    required: [true, "Añade un precio para la actividad"],
  },
  dificultad: {
    type: String,
    required: [true, "Añade una dificultad para la actividad"],
    enum: ["facil", "media", "dificil"],
  },
  accesible: {
      type: Boolean,
      default: false
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  organizer: {
      type: mongoose.Schema.ObjectId,
      ref: 'Organizer',
      required: true
  }
});

module.exports = mongoose.model('Actividad', ActividadSchema);
