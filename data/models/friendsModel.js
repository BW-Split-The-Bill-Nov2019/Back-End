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
  if (process.env.NODE_ENV === "production") {
    const [newFriend] = await db("friends").insert(friend, ["id"]);
    return findById(newFriend.id);
  } else {
    const [id] = await db("friends").insert(friend);
    return findById(id);
  }
}

//read
function findById(id) {
  return db("friends")
    .where({ id })
    .first();
}