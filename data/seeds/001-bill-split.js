
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('billsplit').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('billsplit').insert([
        {owner: 'JohnDoe', billName: 'Olive Garden', total : 121.50, date: '2019-25-10',},
        {owner: 'JaneDoe', billName: 'Dennys', total : 45.55, date: '2019-24-10'}
      ]);
    });
};
