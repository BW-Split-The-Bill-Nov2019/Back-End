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
  return db("friends");
}

//read
function getById(id) {
  return db("friends")
    .where({ id })
    .first();
}

//read
function getBy(name) {
  return db("friends")
    .where({ name })
    .first();
}

//update
function update(id, friend) {
  return db("friends")
    .where({ id })
    .update(friend);
}

//delete
function remove(id) {
  return db("friends")
    .where({ id })
    .del();
}

//create
async function insert(friend) {
  const [id] = await db("friends").insert(friend);
  return findById(id)
}

//read
function findById(id) {
  return db("friends")
    .where({ id })
    .first();
}