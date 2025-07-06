const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  number:   { type: String, required: true },
  profile:  { type: String }, // base64 image string
  password: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);
