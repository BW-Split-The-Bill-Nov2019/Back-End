
exports.up = function(knex) {
    return knex.schema.createTable('billsplit', users => {
      users.increments();
  
      users.string('owner', 128)
        .notNullable()
        .references('username')
        .inTable('users');
      users.string('billName', 128).notNullable();
      users.integer('total', 128).notNullable();
      users.date('date', 128).notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('billsplit');
  };