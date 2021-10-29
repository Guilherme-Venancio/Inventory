
exports.up = function (knex, Promise) {
    return knex.schema.alterTable('users', table => {
        table.timestamp('deletedAt').defaultTo(new Date())
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.alterTable('users', table => {
        table.dropColumn('deletedAt')
    })
};
