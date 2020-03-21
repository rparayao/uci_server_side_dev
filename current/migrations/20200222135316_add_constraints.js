exports.up = async knex =>{
    await knex.schema.dropTableIfExists('user_accounts');
    await knex.schema.createTable('user_accounts', table => {
        table.integer('id').primary();
        //table.increments('id').primary();
        table.string('display_name', 100).unique().notNullable();
        table.string('username', 25).unique().notNullable();
    });

    await knex.schema.dropTableIfExists('bill_category');
    await knex.schema.createTable('bill_category', table => {
        table.integer('id').primary();
        table.string('label', 100).notNullable();
        table.string('type', 36).unique().notNullable();
    });

    await knex.schema.dropTableIfExists('bill_items');
    await knex.schema.createTable('bill_items', table => {
        table.integer('id').primary();
        table.string('label', 100).notNullable();
        table.string('category', 36).notNullable();
        table.integer('cat_id', 36);
        table.float('amount').notNullable();
        table.integer('owner_id', 100);
        table.foreign('cat_id')
        .references('bill_category.id')
        .onDelete('cascade');
    });

    await knex.schema.dropTableIfExists('start_amount');
    await knex.schema.createTable('start_amount', table => {
        table.increments();
        table.float('amount').notNullable();
        table.integer('owner_id', 100);
        table.foreign('owner_id')
        .references('user_accounts.id')
    });

};

exports.down = async knex => {
    await knex.schema.dropTableIfExists('start_amount');
    await knex.schema.createTable('start_amount', table => {
        table.increments();
        table.float('amount').notNullable();
    });
    await knex.schema.dropTableIfExists('bill_items');
    await knex.schema.createTable('bill_items', table => {
        table.integer('id').primary();
        table.string('label', 100).notNullable();
        table.string('category', 36).notNullable();
        table.float('amount').notNullable();
    });

    await knex.schema.dropTableIfExists('bill_category');
    await knex.schema.createTable('bill_category', table => {
       table.increments('id');
       table.string('label', 100);
       table.string('type', 36);
   });

    await knex.schema.dropTable('user_accounts');
    
};
