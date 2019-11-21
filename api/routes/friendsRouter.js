const express = require("express");
const router = express.Router();
const Friends = require("../../data/models/friendsModel");
const { myprivate } = require("../middleware/requireValidToken");
router.use(express.json());

//read
//use 'localhost:4444/api/friends/'
router.get("/", myprivate, async (req, res, next) => {
  try {
    const users = await Friends.get();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

//create
//use 'localhost:4444/api/friends/'
router.post("/", myprivate, (req, res) => {
  let friend = req.body;
  Friends.insert(friend)
    .then(saved => {
      res.status(200).json(saved);
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({message: "internal server error"});
    });
});

//delete
//use 'localhost:4444/api/friends/:id'
router.delete("/:id", myprivate, (req, res) => {
  Friends.remove(req.params.id)
    .then(friend => {
      if (friend) {
        res.status(200).json(friend);
      } else {
        res.status(404).json({ message: 'Friend not found' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//update
//use 'localhost:4444/api/friends/:id'
router.put('/:id', myprivate, (req, res) => {
  const changes = req.body
  Friends.update(req.params.id, changes)
  .then(friend => {
      res.status(200).json(friend)
  })
  .catch(error => {
      res.status(500).json(error)
  })
})


module.exports = router;