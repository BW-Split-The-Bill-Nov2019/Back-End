const express = require("express");
const router = express.Router();
const Bills = require("../../data/models/billsModel");
const { myprivate } = require("../middleware/requireValidToken");
router.use(express.json());

//read
//use 'localhost:4444/api/bills/'
router.get("/", async (req, res, next) => {
  try {
    const users = await Bills.get();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

//create
//use 'localhost:4444/api/bills/'
router.post("/", myprivate, (req, res) => {
  let bill = req.body;
  Bills.insert(bill)
    .then(saved => {
      res.status(200).json(saved);
    })
    .catch(error => {
      console.error(error)
      res.status(500).json({message: "internal server error"});
    });
});

//delete
//use 'localhost:4444/api/bills/:id'
router.delete("/:id", myprivate, (req, res) => {
  Bills.remove(req.params.id)
    .then(bill => {
      if (bill) {
        res.status(200).json(bill);
      } else {
        res.status(404).json({ message: 'Bill not found' });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

//update
//use 'localhost:4444/api/bills/:id'
router.put('/:id', (req, res) => {
  const changes = req.body
  Bills.update(req.params.id, changes)
  .then(bill => {
      res.status(200).json(bill)
  })
  .catch(error => {
      res.status(500).json(error)
  })
})


module.exports = router;