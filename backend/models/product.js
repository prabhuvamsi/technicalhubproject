const mongoose = require('mongoose');

const schema = mongoose.Schema;
const Product = new schema({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  serialNumber: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  attributes: [{
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }]
});

module.exports = mongoose.model("floorData", Product);