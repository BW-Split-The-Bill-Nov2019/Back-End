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
  return db("users");
}

//read
function getById(id) {
  return db("users")
    .where({ id })
    .first();
}

//read
function getBy(username) {
  return db("users")
    .where({ username })
    .first();
}

//update
function update(id, user) {
  return db("users")
    .where({ id })
    .update(user);
}

//delete
function remove(id) {
  return db("users")
    .where({ id })
    .del();
}

//create
async function insert(user) {
  // if (process.env.NODE_ENV === "production") {
  //   const [newUser] = await db("users").insert(user, ["id"]);
  //   return findById(newUser.id);
  // } else {
  //   const [id] = await db("users").insert(user);
  //   return findById(id);
  // }

  const [id] = await db("users").insert(user);
  return findById(id);

}

//read
function findById(id) {
  return db("users")
    .where({ id })
    .first();
}