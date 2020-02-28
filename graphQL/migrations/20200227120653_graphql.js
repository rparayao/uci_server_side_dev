
exports.up = async knex =>{
    await knex.schema.dropTableIfExists('book_items');
    await knex.schema.createTable('book_items', table => {
        table.integer('id').primary();
        table.string('title', 100).notNullable();
        table.string('author', 62).notNullable();
        table.integer('sales').notNullable();
    });
}

exports.down = function(knex) {
  
};
