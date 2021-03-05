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

//que solo se pueda enviar una opinion por actividad
OpinionSchema.index({ actividad: 1, usuario: 1 }, { unique: true });

//método estático para conseguir la puntuación media de una actividad
OpinionSchema.statics.getPuntuacionMedia = async function (organizadorId) {
  const miArray = await this.aggregate([
    {
      $match: { actividad: actividadId },
    },
    {
      $group: { _id: '$actividad', puntuacionMedia: { $avg: '$puntuacion' } },
    },
  ]);

  try {
    await this.model('Actividad').findByAndUpdate(actividadId, {
      puntuacionMedia: miArray[0].puntuacionMedia,
    });
  } catch (err) {}
};

//Consigue el precio medio de una organización despues de añadir una actividad
OpinionSchema.post('save', function () {
  this.constructor.getPuntuacionMedia(this.actividad);
});

//Consigue el precio medio de una organización después de eliminar una actividad
OpinionSchema.post('remove', function () {
  this.constructor.getPuntuacionMedia(this.actividad);
});

module.exports = mongoose.model('Opinion', OpinionSchema);
