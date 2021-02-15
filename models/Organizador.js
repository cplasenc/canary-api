const mongoose = require("mongoose");
const slugify = require("slugify");
const geocoder = require("../util/geocoder");

const OrganizadorSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, "Por favor añade un nombre"],
      unique: true,
      trim: true,
      maxlength: [50, "El nombre no puede tener más de 50 caracteres"],
    },
    slug: String,
    descripcion: {
      type: String,
      required: [true, "Por favor añade una descripción"],
      maxlength: [500, "La descripción no puede tener más de 500 caracteres"],
    },
    website: {
      type: String,
      match: [
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
        "Please use a valid URL with HTTP or HTTPS",
      ],
    },
    telefono: {
      type: String,
      maxlength: [20, "Phone number can not be longer than 20 characters"],
    },
    email: {
      type: String,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Por favor añade un email",
      ],
    },
    address: {
      type: String,
      required: [true, "Por favor añade una dirección"],
    },
    location: {
      // GeoJSON Point
      type: {
        type: String,
        enum: ["Point"],
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
      formattedAddress: String,
      street: String,
      city: String,
      state: String,
      zipcode: String,
      country: String,
    },
    careers: {
      // Array of strings
      type: [String],
      required: true,
      enum: [
        "Buceo",
        "ejemplo2",
        "ejemplo3",
        "ejemplo4",
        "ejemplo5",
        "ejemplo6",
      ],
    },
    averageRating: {
      type: Number,
      min: [1, "La puntuación mínima es 1"],
      max: [10, "La puntuación máxima es 10"],
    },
    averageCost: Number,
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    housing: {
      type: Boolean,
      default: false,
    },
    jobAssistance: {
      type: Boolean,
      default: false,
    },
    jobGuarantee: {
      type: Boolean,
      default: false,
    },
    acceptGi: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//slug
OrganizadorSchema.pre("save", function () {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//Geocode y crear campo de ubicación
OrganizadorSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc[0].formattedAddress,
    street: loc[0].streetName,
    city: loc[0].city,
    state: loc[0].stateCode,
    zipcode: loc[0].zipcode,
    country: loc[0].country,
  };

  //No guardar la direccion en la BD
  this.address = undefined;

  next();
});

//Elimina todas las actividades cuando un organizador es eliminado
OrganizadorSchema.pre("remove", async function (next) {
  console.log(`Actividades eliminadas del organizador ${this._id}`);
  await this.model("Actividad").deleteMany({ organizador: this._id });
  next();
});

//Reverse populate with virtuals
OrganizadorSchema.virtual("actividades", {
  ref: "Actividad",
  localField: "_id",
  foreignField: "organizador",
  justOne: false,
});

module.exports = mongoose.model("Empresas", OrganizadorSchema);
