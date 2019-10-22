exports.seed = function(knex, Promise) {
  return knex("users").insert([
    {
      first_name: "jessica",
      last_name: "lee",
      email: "test@gmail.com",
      UID: "0JaPm6m6FlWE9NnKAZCxPKevgyg2",
      cell_number: 123456789,
      receive_sms: true,
      receive_push: false
    },
    {
      first_name: "danielle",
      last_name: "lee",
      email: "danielle@gmail.com",
      UID: "0JaPm6m6FlWE9NnKAZCxPKevgyg1",
      cell_number: 123456789,
      receive_sms: true,
      receive_push: false
    },
    {
      first_name: "antonio",
      last_name: "lee",
      email: "antonio@gmail.com",
      UID: "0JaPm6m6FlWE9NnKAZCxPKevgyg3",
      cell_number: 123456789,
      receive_sms: true,
      receive_push: false
    },
    {
      first_name: "galileo",
      last_name: "galilee",
      email: "galileo@gmail.com",
      UID: "0JaPm6m6FlWE9NnKAZCxPKevgyg4",
      cell_number: 123456789,
      receive_sms: true,
      receive_push: false
    }
  ]);
};
