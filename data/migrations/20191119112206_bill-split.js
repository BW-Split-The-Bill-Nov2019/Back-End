
exports.up = function(knex) {
    return knex.schema.createTable('billsplit', users => {
      users.increments();
  
      users.string('owner', 128).notNullable().unique();
      users.string('billName', 128).notNullable();
      users.integer('total', 128).notNullable();
      users.date('date', 128).notNullable();
      users.string('friend', 128).notNullable();
      users.string('comments', 256);
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('billsplit');
  };