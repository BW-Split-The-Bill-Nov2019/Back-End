
exports.up = function(knex) {
    return knex.schema.createTable("friends", friends => {
      friends.increments();
  
      friends.integer('billSplitID')
        .notNullable()
        .references('id')
        .inTable('billsplit');
      friends.string("username", 128)
        .notNullable()
        .references('username')
        .inTable('users')
      friends.boolean("paid", 128).notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("friends");
  };