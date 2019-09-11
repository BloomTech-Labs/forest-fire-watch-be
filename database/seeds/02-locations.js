exports.seed = function(knex, Promise) {
  return knex("locations").insert([
    {
      user_id: 1,
      radius: 1000,
      address: "123 jessica street",
      latitude: 30.123456,
      longitude: -115.345678
    },
    {
      user_id: 2,
      radius: 1000,
      address: "123 danielle street",
      latitude: 30.123456,
      longitude: -115.345678
    },
    { user_id: 4, radius: 100, address: "123 galileo street" },
    { user_id: 4, radius: 100, address: "123 galileo's moms street" },
    {
      user_id: 1,
      radius: 1000,
      address: "123 jessica's moms street",
      latitude: 30.123456,
      longitude: -115.345678
    },
    { user_id: 1, radius: 100, address: "123 jessica's friends street" },
    {
      user_id: 2,
      radius: 1000,
      address: "123 danielle's dads street",
      latitude: 43.123456,
      longitude: -78.345678
    },
    {
      user_id: 2,
      radius: 1000,
      address: "123 danielle's boyfriends street",
      latitude: 30.123456,
      longitude: -115.345678
    }
  ]);
};
