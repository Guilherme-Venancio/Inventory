
exports.up = function(knex, Promise) {
    return knex.schema.createTable('itens', table => {
        table.increments('id').primary()
        table.string('name').notNull()
        table.float('quantidade').notNull()
        table.string('modelo')
    })
  };
exports.down = function(knex, Promise) {
    return knex.schema.dropTable('itens')
};
