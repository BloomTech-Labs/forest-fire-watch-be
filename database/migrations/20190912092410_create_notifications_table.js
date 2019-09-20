
exports.up = function(knex) {
    return knex.schema.createTable('notifications',notifications=>{
        notifications.increments();

        notifications
            .integer('user_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE') // what happens if the user is deleted
            .onUpdate('CASCADE'); // what happens if the id of the user changes
        
        notifications
            .text('subscription')
            .notNullable();
        
        notifications
            .string('type')
            .notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('notifications');
  
};
