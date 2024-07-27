const mongoose = require('mongoose');

const { Schema } = mongoose;

const softwareLicenseSchema = new Schema({
  id: {
    type: Number,
    required: true
  },
  softwareName: {
    type: String,
    required: true
  },
  alias: {
    type: String,
    required: true
  },
  version: {
    type: String,
    required: true
  },
  serialNumber: {
    type: String,
    required: true
  },
  purchaseDate: {
    type: Date,
    required: true
  },
  expirationDate: {
    type: Date,
    required: true
  },    
  licenseType: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Software', softwareLicenseSchema);
