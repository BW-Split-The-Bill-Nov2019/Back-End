
exports.up = function(knex) {
    return knex.schema.createTable('comments', users => {
      users.increments();
    
      users.string('comment');
      users.string('username')
        .defaultTo('Anonymous')
        .references('username')
        .inTable('users');
      users.integer('billSplitID')
        .notNullable()
        .references('id')
        .inTable('billsplit');
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('comments');
  };
