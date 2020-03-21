exports.up = async knex => {
    await knex.schema.dropTableIfExists('past_due');
    await knex.schema.createTable('past_due', table => {
        table.increments();
        table.float('amount').notNullable();
        table.integer('owner_id', 100);
        table.integer('days_over_due', 100);
        table.foreign('owner_id')
        .references('user_accounts.id')
    });
}

exports.down = async knex => {
    await knex.schema.dropTable('past_due');
}


