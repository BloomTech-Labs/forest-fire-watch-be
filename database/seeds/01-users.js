
exports.seed = function(knex, Promise) {
  return knex('users').insert([   
    { username: 'John A', address: "2920 Zoo Dr, San Diego, CA 92101" },
    { username: 'Wendy Q', address: "Government Dr, St. Louis, MO 63110" }
  ]);
};
