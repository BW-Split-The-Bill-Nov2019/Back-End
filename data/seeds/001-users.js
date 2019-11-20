
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'JohnDoe', password: 'testpassword', email: 'johndoe@gmail.com', firstName: 'John', lastName: 'Doe'},
        {username: 'JaneDoe', password: 'testpassword', email: 'janedoe@gmail.com', firstName: 'Jane', lastName: 'Doe'}
      ]);
    });
};
