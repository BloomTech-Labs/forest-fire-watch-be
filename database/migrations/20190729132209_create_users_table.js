exports.up = function(knex) {
  return knex.schema.createTable("users", users => {
    users.increments();

    users.string("firstName", 128).notNullable();
    users.string("lastName", 128).notNullable();
    users.string("email", 128).notNullable();
    users.string("UID", 128).notNullable();
    users.string("cell_number");
    users.boolean("receive_sms").default(false);
    users.boolean("receive_push").default(false);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
