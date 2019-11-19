
exports.up = function(knex) {
    return knex.schema.createTable("friends", friends => {
      friends.increments();
  
      friends.string("name", 128).notNullable().unique();
      friends.string("email", 128).notNullable();
      friends.boolean("paid", 128).notNullable();
    });
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists("friends");
  };