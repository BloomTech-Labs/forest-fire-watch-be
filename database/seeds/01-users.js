exports.seed = function(knex, Promise) {
  return knex("users").insert([
    {
      firstName: "jessica",
      lastName: "lee",
      email: "test@gmail.com",
      password: "$2a$10$CA/TRbXwKL1WdIQui3JInu8UckMV7oJqzN6.YXzZB29JFnTYm1SXi",
      cell_number: 123456789,
      receive_sms: true,
      receive_push: false
    },
    {
      firstName: "danielle",
      lastName: "lee",
      email: "danielle@gmail.com",
      password: "$2a$10$SFhgvqb8S2Kwp493NBSuwO42etTo16VHxvWgr651MvhwWSFaw3f3O",
      cell_number: 123456789,
      receive_sms: true,
      receive_push: false
    },
    {
      firstName: "antonio",
      lastName: "lee",
      email: "antonio@gmail.com",
      password: "$2a$10$SkexJCxGwlZJBoDrAl14uOFwevjjwKQt7C88z7lE/bD8PzpFmzt9a",
      cell_number: 123456789,
      receive_sms: true,
      receive_push: false
    },
    {
      firstName: "galileo",
      lastName: "galilee",
      email: "galileo@gmail.com",
      password: "$2a$10$O758JcAgqvujbo2DcfoY7u9U5lTHT9ylbg9x128JxGnTAH2KwB.uq",
      cell_number: 123456789,
      receive_sms: true,
      receive_push: false
    }
  ]);
};
