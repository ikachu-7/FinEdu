const mongoose = require('mongoose');

const volunteerSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true
  },
  phone: {
    type: String
  },
  email: {
    type: String,
    unique:true
  },
  password: {
    type: String,
    required: true
  },
  experience: {
    type: String
  },
  specialization: {
    type: [String]
  },
});

const Volunteer = mongoose.model('Volunteer', volunteerSchema);

module.exports = Volunteer;
