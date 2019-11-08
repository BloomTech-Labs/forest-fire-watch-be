const db = require('../../database/dbConfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById,
    remove,
    update,
    removeWebNotificationsForUser
}

function find() {
    return db('notifications').select('id', 'subscription');
}

function findBy(filter) {
    return db('notifications').where(filter);
}

async function add(subscription) {
    const [id] = await db('notifications').insert(subscription, 'id');

    return findById(id);
}

function findById(id) {
    return db('notifications')
        .where({ id })
        .first();
}

function remove(id) {
    return db('notifications')
        .where({ id })
        .del();
}

function removeWebNotificationsForUser(user_id) {
    return db('notifications')
        .where({ user_id: user_id, type: 'web' })
        .del();
}

function update(id, changes) {
    return db('notifications')
        .where({ id })
        .update(changes, '*');
}
