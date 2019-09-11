exports.up = function(knex) {
  return knex.schema.createTable("users", users => {
    users.increments();

    users
      .string("username", 128)
      .notNullable()
      .unique();
    users.string("password", 128).notNullable();
    users.integer("cell_number");
    users.boolean("receive_sms").default(false);
    users.boolean("receive_push").default(false);
    users.integer("notification_timer").default(0);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
