
exports.up = function(knex, Promise) {
  return knex.schema.alterTable('itens', table => {
    table.string('lote')
    table.string('fabricante')
    table.float('preco')
    table.string('descricao', 200)
    table.timestamp('alteracao')
  })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('itens', table => {
        table.dropColumn('lote')
        table.dropColumn('fabricante')
        table.dropColumn('preco')
        table.dropColumn('descricao')
        table.dropColumn('alteracao')
      })
};
