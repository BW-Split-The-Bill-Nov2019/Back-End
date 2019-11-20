
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('friends').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('friends').insert([
        {name: 'Jake', email: 'jakethesnake@gmail.com', paid: false},
        {name: 'John', email: 'johnstheman@gmail.com', paid: true}, 
      ]);
    });
};
