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
  return db("bills");
}

//read
function getById(id) {
  return db("bills")
    .where({ id })
    .first();
}

//read
function getBy(name) {
  return db("bills")
    .where({ name })
    .first();
}

//update
function update(id, bill) {
  return db("bills")
    .where({ id })
    .update(bill);
}

//delete
function remove(id) {
  return db("bills")
    .where({ id })
    .del();
}

//create
async function insert(bill) {
  if (process.env.NODE_ENV === "production") {
    const [newBill] = await db("bills").insert(bill, ["id"]);
    return findById(newBill.id);
  } else {
    const [id] = await db("bills").insert(bill);
    return findById(id);
  }
}

//read
function findById(id) {
  return db("bills")
    .where({ id })
    .first();
}