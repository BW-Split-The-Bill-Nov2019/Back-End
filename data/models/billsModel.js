const db = require("../dbConfig");

module.exports = {
  get,
  getById,
  getAllBillsByUsername,
  getAllPendingPayments,
  insert,
  update,
  remove
};

//read
function get() {
  return db("billsplit");
}

//read
function getById(id) {
  return db("billsplit")
    .where({ id })
    .first();
}

//read
function getAllBillsByUsername(username) {
  return db("billsplit")
    .where({ owner: username })
}

// read 
async function getAllPendingPayments(username) {
  const IDsOfBillsThatUserHosts = await getAllBillsByUsername(username).map(bill => bill.id)


  const pendingPayments = IDsOfBillsThatUserHosts.map(async billId => {
     let friendsThatOweYou =  await db('friends as f')
      .select('bs.id as billId', 'bs.billName', 'bs.total', 'bs.date', 'f.username', 'f.paid')
      // .where({paid: false})
      .where({billSplitId: billId})
      .andWhere({paid: false})
      .join('billsplit as bs', 'f.billSplitID', billId)

      let totalNumOfFriends = await db('friends as f')
      .select('bs.id as billId', 'bs.billName', 'bs.total', 'bs.date', 'f.username', 'f.paid')
      // .where({paid: false})
      .where({billSplitId: billId})
      .join('billsplit as bs', 'f.billSplitID', billId)
      
      totalNumOfFriends = totalNumOfFriends.filter(friend => friend.billId === billId).length + 1

      console.log('\n\n')
      console.log('FRIENDS THAT OWE YOU', friendsThatOweYou)
      console.log('\n\n')
      // no bob at in n out

      const { billName, total } = await getById(billId)
      
      // return { [billName]: friendsThatOweYou
      //   .map((friend, i, arr) => {
      //     return {
      //       ...friend,
      //       paid: friend.paid === 0 ? false : true,
      //     }
      //   })
      //   .filter(friend => friend.billId === billId)
      //   .map((friend, i, arr) => {
      //     return {
      //       ...friend,
      //       amountDue: ( total / totalNumOfFriends ).toFixed(2)
      //     }
      //   })
      // }
      return friendsThatOweYou
        .map((friend, i, arr) => {
          return {
            ...friend,
            paid: friend.paid === 0 ? false : true,
          }
        })
        .filter(friend => friend.billId === billId)
        .map((friend, i, arr) => {
          return {
            ...friend,
            amountDue: ( total / totalNumOfFriends ).toFixed(2)
          }
        })
  })

  return Promise.all(pendingPayments)
}

//update
function update(id, bill) {
  return db("billsplit")
    .where({ id })
    .update(bill);
}

//delete
function remove(id) {
  return db("billsplit")
    .where({ id })
    .del();
}

//create
async function insert(bill) {
  // if (process.env.NODE_ENV === "production") {
  //   const [newBill] = await db("billsplit").insert(bill, ["id"]);
  //   return findById(newBill.id);
  // } else {
  //   const [id] = await db("billsplit").insert(bill);
  //   return findById(id);
  // }
  const [id] = await db("billsplit").insert(bill);
  return findById(id);
}

//read
function findById(id) {
  return db("billsplit")
    .where({ id })
    .first();
}