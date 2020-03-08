exports.up = async knex =>{
    await knex.schema.dropTableIfExists('user_accounts');
    await knex.schema.createTable('user_accounts', table => {
        //table.integer('id').primary();
        table.increments();
        table.string('display_name', 100).unique().notNullable();
        table.string('username', 25).unique().notNullable();
    });

    await knex.schema.dropTableIfExists('bill_items');
    await knex.schema.createTable('bill_items', table => {
        table.integer('id').primary();
        table.string('label', 100).notNullable();
        table.string('category', 36).notNullable();
        table.float('amount').notNullable();
        table.integer('owner_id', 100);
    });
};

exports.down = async knex => {
    await knex.schema.dropTable('user_accounts');
};
