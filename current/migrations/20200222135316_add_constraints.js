
exports.up = async knex =>{
    await knex.schema.dropTableIfExists('user_accounts');
    await knex.schema.createTable('user_accounts', table => {
        table.integer('id').primary();
        table.string('display_name', 100).unique().notNullable();
        table.string('account_name', 25).unique().notNullable();
        table.boolean('account_active').notNullable();
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
        table.integer('owner_id', 100);
        table.integer('cat_id', 36).notNullable();
        table.string('label', 100).notNullable();
        table.float('amount', 100).notNullable();
        table.timestamp('duedate').defaultTo(knex.fn.now());
        table.foreign('owner_id')
            .references('user_accounts.id')
            .onDelete('cascade');
        table.foreign('cat_id')
            .references('bill_category.id')
            .onDelete('cascade');
    });
};

exports.down = async knex => {


    await knex.schema.dropTableIfExists('bill_items');
    await knex.schema.createTable('bill_items', table => {
        table.increments('id');
        table.integer('owner_id', 100);
        table.integer('cat_id', 36);
        table.string('label', 100);
        table.float('amount', 100);
        table.timestamp('duedate');

    });

    await knex.schema.dropTableIfExists('bill_category');
    await knex.schema.createTable('bill_category', table => {
        table.increments('id');
        table.string('label', 100);
        table.string('type', 36);
    });

    await knex.schema.dropTableIfExists('user_accounts');
    await knex.schema.createTable('user_accounts', table => {
        table.increments('id');
        table.string('display_name', 100);
        table.string('account_name', 25);
        table.boolean('account_active');
    });


};
