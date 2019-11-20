const express = require("express");
const router = express.Router();
const Bills = require("../../data/models/billsModel");
const Friends = require('../../data/models/friendsModel')
const { myprivate } = require("../middleware/requireValidToken");
router.use(express.json());

//read
//use 'localhost:4444/api/bills/'
router.get("/", myprivate, async (req, res, next) => {
  try {
    const users = await Bills.get();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
});

router.get("/pending/:username", myprivate, async (req, res, next) => {
  try {
    const allBills = await Promise.all(await Bills.getAllPendingPayments(req.params.username));
    // res.status(200).json(allBills)
    res.status(200).json({allBills})
    console.log("all bills from get request", allBills)
    // res.status(200).json({
    //   pending: {
    //     owesYou: [{friend: "Steve", amount: 12 }, ],
    //     youOwe: [{friend: "John", amount: 13}]
    //   },

    //   paid: {
    //     paidYou: [{friend: "Steve", amount: 24}],
    //     youPaid: [{}]
    //   }
    // });
  } catch (err) {
    next(err);
  }
});

//create
//use 'localhost:4444/api/bills/'
router.post("/", myprivate, async (req, res) => {
  try {
    let bill = req.body;
    const billSplitDetails = await Bills.insert({ 
        billName: bill.billName, 
        owner: bill.owner,
        total: bill.total,
        date: bill.date
      })    

      Promise.all(bill.friends.map(friend => 
        Friends.insert({
          billSplitID: billSplitDetails.id,
          username: friend.username,
          paid: friend.paid
        })
      ))
      .then(friendDetails => {
        console.log('FRIEND DETAILS', friendDetails)
  
        res.status(200).json({
          billSplit: {...billSplitDetails},
          friends: [...friendDetails]
        });
      })
      .catch(error => {
        console.error(error)
        // res.status(500).json({message: "internal server error"});
        res.status(500).json({message: "Trouble inserting into the friends table"});
      })
  } catch(e) {
    console.error(error)
    // res.status(500).json({message: "internal server error"});
    res.status(500).json({message: "Trouble inserting into the bills table"});
  }
})

//delete
//use 'localhost:4444/api/bills/:id'
router.delete("/:id", myprivate, myprivate, (req, res) => {
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
router.put('/:id', myprivate, (req, res) => {
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