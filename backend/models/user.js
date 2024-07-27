const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
  });

// export model user with UserSchema
module.exports = mongoose.model("user", UserSchema);
 //collection name, //varibale of schema