const db = require("../../database/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  update,
  updateEmail
};

function find() {
  return db("users");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  const [id] = await db("users").insert(user, "id");

  return findById(id);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function remove(id) {
  return db("users")
    .where({ id })
    .del();
}

function update(id, changes) {
  return db("users")
    .where({ id })
    .update(changes, "*");
}

function updateEmail(UID, changes) {
  return db("users")
    .where({ UID })
    .update(changes, "*");
}
