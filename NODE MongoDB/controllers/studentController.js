const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const Student = mongoose.model("Student");

router.get("/", (req, res) => {
  res.render("student.addOrEdit", {
    viewTitle: "Insert student",
  });
});

router.post("/", (req, res) => {
  if (req.body._id == "") {
    insertRecord(req, res);
  } else {
    updateRecord(req, res);
  }
});

function insertRecord(req, res) {
  var student = new student();
  student.fullName = req.body.fullName;
  student.email = req.body.email;
  student.mobile = req.body.mobile;
  student.city = req.body.city;
  student.save((err, doc) => {
    if (!err) {
      res.redirect("student/list");
    } else {
      console.log(err);
    }
  });
}

//update
function updateRecord(req, res) {
  Student.findOneAndUpdate(
    { _id: req.body._id },
    req.body,
    { new: true, runValidators: true },
    (err, doc) => {
      if (!err) {
        res.redirect("student/list");
      } else {
        console.log("Error during update: " + err);
      }
    }
  );
}

//delete
router.get("/delete/:id", (req, res) => {
  Student.findByIdAndRemove(req.params.id, (err, doc) => {
    if (!err) {
      res.redirect("/student/list");
    } else {
      console.log("Error in student delete: " + err);
    }
  });
});

router.get("/list", (req, res) => {
  Student.find((err, docs) => {
    if (!err) {
      res.render("student/list", {
        list: docs,
      });
    } else {
      console.log("Error retrieving student list: " + err);
    }
  });
});
