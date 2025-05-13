const express = require("express");
const path = require("path");
const handlebars = require("handlebars");
const exphbs = require("express-handlebars");
const {
  allowUnsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const bodyparser = require("body-parser");

var app = express();

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

app.get("/", (req, res) => {
  res.send(`
        <h2>Welcome</h2>
         <h3>click here to get access to the <b><a href='/student/list'>Database</a></b></h3>`);
});

app.set("views", path.join(__dirname, "/views/"));

app.engine(
  "hbs",
  exphbs({
    handlebars: allowUnsecurePrototypeAccess,
    extname: "hbs",
    defaultLayout: "MainLayout",
    layoutDir: __dirname + "/views/layouts/",
  })
);

app.listen(3000, () => {
  console.log("Server started at port 3000");
});
