const mongoose = require("mongoose");

var studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: "This field id required",
  },
  email: {
    type: String,
    required: "This field id required",
  },
  mobile: {
    type: Number,
    required: "This field id required",
  },
  city: {
    type: String,
    required: "This field id required",
  },
});

mongoose.model("Student", studentSchema);
