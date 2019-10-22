exports.seed = function(knex, Promise) {
  return knex("users").insert([
    {
      first_name: "jessica",
      last_name: "lee",
      email: "test@gmail.com",
      cell_number: 123456789,
      receive_sms: true,
      receive_push: false
    },
    {
      first_name: "danielle",
      last_name: "lee",
      email: "danielle@gmail.com",
      cell_number: 123456789,
      receive_sms: true,
      receive_push: false
    },
    {
      first_name: "antonio",
      last_name: "lee",
      email: "antonio@gmail.com",
      cell_number: 123456789,
      receive_sms: true,
      receive_push: false
    },
    {
      first_name: "galileo",
      last_name: "galilee",
      email: "galileo@gmail.com",
      cell_number: 123456789,
      receive_sms: true,
      receive_push: false
    }
  ]);
};
