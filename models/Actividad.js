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
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  organizador: {
    type: mongoose.Schema.ObjectId,
    ref: "Organizador",
    required: true,
  },
});

//método estático para conseguir el precio medio
ActividadSchema.statics.getPrecioMedio = async function (organizacionId) {
  const miArray = await this.aggregate([
    {
      $match: { organizador: organizadorId },
    },
    {
      $group: { _id: "$organizador", precioMedio: { $avg: "$precio" } },
    },
  ]);

  try {
    await this.model("Organizador").findByAndUpdate(organizadorId, {
      precioMedio: Math.ceil(miArray[0].precioMedio / 10) * 10,
    });
  } catch (err) {}
};

//Consigue el precio medio de una organización despues de añadir una actividad
ActividadSchema.post("save", function () {
  this.constructor.getPrecioMedio(this.organizador);
});

//Consigue el precio medio de una organización después de eliminar una actividad
ActividadSchema.post("remove", function () {
  this.constructor.getPrecioMedio(this.organizador);
});

module.exports = mongoose.model("Actividad", ActividadSchema);
