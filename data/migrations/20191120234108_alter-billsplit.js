
exports.up = function(knex) {
    return knex.schema.alterTable('billsplit', bs => {
        bs.string('notes')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('billsplit')
};
