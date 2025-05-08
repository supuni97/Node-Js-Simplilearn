const express = require("express");
const router = express.Router();
let users = require("../../Users");

// Get all users
router.get("/", (req, res) => {
  res.json(users);
});

// Get user by id
router.get("/:id", (req, res) => {
  const found = users.some((user) => user.id === parseInt(req.params.id));
  if (found) {
    res.json(users.filter((user) => user.id === parseInt(req.params.id)));
  } else {
    res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
  }
});

// Create a new user
router.post("/", (req, res) => {
  const newUser = {
    id: users.length ? users[users.length - 1].id + 1 : 1, // numeric auto-increment
    name: req.body.name,
    email: req.body.email,
  };

  if (!newUser.name || !newUser.email) {
    return res.status(400).json({ msg: "Please include name and email" });
  }

  users.push(newUser);
  res.json(users);
});

// Update user
router.put("/:id", (req, res) => {
  const found = users.some((user) => user.id === parseInt(req.params.id));

  if (found) {
    const updateUser = req.body;
    users = users.map((user) => {
      if (user.id === parseInt(req.params.id)) {
        return {
          ...user,
          name: updateUser.name ? updateUser.name : user.name,
          email: updateUser.email ? updateUser.email : user.email,
        };
      }
      return user;
    });
    res.json({ msg: "User updated", users });
  } else {
    res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
  }
});

//delete user
// delete user
router.delete("/:id", (req, res) => {
  const found = users.some((user) => user.id === parseInt(req.params.id));

  if (found) {
    users = users.filter((user) => user.id !== parseInt(req.params.id));
    res.json({
      msg: `User with id ${req.params.id} deleted`,
      users,
    });
  } else {
    res.status(400).json({ msg: `No user with the id of ${req.params.id}` });
  }
});

module.exports = router;
