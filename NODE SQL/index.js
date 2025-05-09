const express = require("express");
const mysql = require("mysql");

//create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "nodemysql",
});

//connect to mysql
db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySQL Connected");
});

const app = express();

//create db
app.get("/createdb", (req, res) => {
  let sql = "CREATE  DATABASE nodemysql";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("Database created");
  });
});

//create a table
app.get("/createemployee", (req, res) => {
  let sql =
    "CREATE TABLE nodemysql.employee(id int AUTO_INCREMENT, name varchar(255), designation varchar(255), PRIMARY KEY(id))";
  db.query(sql, (err) => {
    if (err) {
      throw err;
    }
    res.send("Employee table created");
  });
});

//populate table
app.get("/employee1", (req, res) => {
  let post = { name: "John Doe", designation: "Admin" };
  let sql = "insert into employee SET ?";
  let query = db.query(sql, post, (err) => {
    if (err) {
      throw err;
    }
    res.send("Employee added");
  });
});

//select employee
app.get("/getemployee", (req, res) => {
  let sql = "select * from employee";
  let query = db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    console.log(results);
    res.send("Employee details fetched");
  });
});

//update employee
app.get("/updateemployee/:id", (req, res) => {
  let newName = "supuni";
  let sql = `UPDATE employee SET name='${newName}' WHERE id = ${req.params.id}`;
  db.query(sql, (err, results) => {
    if (err) {
      throw err;
    }
    res.send("Employee updated");
  });
});

//delete employee
app.get("/deleteemployee/:id", (req, res) => {
  let sql = `DELETE FROM employee WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send("Employee deleted");
  });
});

app.listen("3000", () => {
  console.log("Server started on port 3000");
});
