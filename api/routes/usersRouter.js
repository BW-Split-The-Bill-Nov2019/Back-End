const express = require("express");
const router = express.Router();
const Users = require("../../data/models/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
let secrets = require('../secret');
const { myprivate } = require("../middleware/requireValidToken");
secrets = secrets[process.env.DB_ENV];
router.use(express.json());


//use 'localhost:4444/api/auth/'
router.get("/", myprivate, async (req, res, next) => {
  try {
    const users = await Users.get();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

//use 'localhost:4444/api/auth/register'
router.post("/register", (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.insert(user)
    .then(saved => {
      res.status(200).json(saved);
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({
        message: "internal server error",
        actualError: error
      });
    });
});

//use 'localhost:4444/api/auth/login'
router.post("/login", (req, res) => {
  let { username, password } = req.body;
  Users.getBy(username)
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({ ...user, token });
      } else {
        res.status(401).json({ message: "invalid creds" });
      }
    })
    .catch(err => {
      res.status(500).json({error: err.message, message: "500 error in login" });
    });
});

//use 'localhost:4444/api/auth/:id'
router.delete("/:id", myprivate, (req, res) => {
  Users.remove(req.params.id)
    .then(user => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//use 'localhost:4444/api/auth/:id'
router.put('/:id', myprivate, (req, res) => {
  const changes = req.body
  Users.update(req.params.id, changes)
  .then(user => {
      res.status(200).json(user)
  })
  .catch(error => {
      res.status(500).json(error)
  })
})


function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    roles: user.roles_id
  };
  const options = {
    expiresIn: `24h`,
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;