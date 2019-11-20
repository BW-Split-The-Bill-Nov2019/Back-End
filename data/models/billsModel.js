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
  const IDsOfBillsThatUserHosts = await getAllBillsByUsername(username)
    .map(bill => bill.id)

    console.log('IDS of bills that user hosts', IDsOfBillsThatUserHosts)

  const pendingPayments = IDsOfBillsThatUserHosts.map(async billId => {
     return db
      // .select('bs.total', 'bs.date', 'f.username', 'f.id as friendId')
      .select('*')
      // .from('billsplit as bs')
      // .join("friends as f", "f.billSplitID", billId )
      .from('friends as f')
      .where({paid: false})
      .join('billsplit as bs', 'f.billSplitID', await billId)
  })

  console.log('PENDING PAYMENTS', pendingPayments)
  return pendingPayments
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
  if (process.env.NODE_ENV === "production") {
    const [newBill] = await db("billsplit").insert(bill, ["id"]);
    return findById(newBill.id);
  } else {
    const [id] = await db("billsplit").insert(bill);
    return findById(id);
  }
}

//read
function findById(id) {
  return db("billsplit")
    .where({ id })
    .first();
}