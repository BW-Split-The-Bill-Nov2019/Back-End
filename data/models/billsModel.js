const db = require("../dbConfig");

module.exports = {
  get,
  getById,
  getBy,
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
function getBy(name) {
  return db("billsplit")
    .where({ name })
    .first();
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