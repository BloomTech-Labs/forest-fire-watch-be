const db = require("../../database/dbConfig.js");

module.exports = {
  add,
  find,
  findAll,
  findBy,
  findById,
  remove,
  update
};

function find() {
  return db("locations").select("id", "address");
}

function findAll() {
  return db("locations")
    .join("users", "users.id", "locations.user_id")
    .select(
      "locations.user_id",
      "locations.address",
      "locations.latitude",
      "locations.longitude",
      "locations.radius",
      "users.cell_number",
      "users.receive_sms",
      "users.receive_push",
      "users.notification_timer"
    );
}

function findBy(filter) {
  return db("locations").where(filter);
}

async function add(location) {
  const [id] = await db("locations").insert(location, "id");

  return findById(id);
}

function findById(id) {
  return db("locations")
    .where({ id })
    .first();
}

function remove(id) {
  return db("locations")
    .where({ id })
    .del();
}

function update(id, changes) {
  return db("locations")
    .where({ id })
    .update(changes, "*");
}
