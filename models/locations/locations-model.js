const db = require('../../database/dbConfig.js');

module.exports = {
  add,
  find,
  findBy,
  findById,
  remove,
  update
};

function find() {
  return db('locations').select('id', 'locationname', 'password');
}

function findBy(filter) {
  return db('locations').where(filter);
}

async function add(location) {
  const [id] = await db('locations').insert(location, "id");

  return findById(id);
}

function findById(id) {
  return db('locations')
    .where({ id })
    .first();
}

function remove(id) {
  return db('locations')
    .where({ id })
    .del();
}

function update(id, changes) {
  return db('locations')
    .where({ id })
    .update(changes, '*');
}
