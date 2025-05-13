const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost:27017/StudentDB",
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (!err) {
      console.log("Connection success");
    } else {
      console.log("Connection fail" + err);
    }
  }
);

require("./student.model");
