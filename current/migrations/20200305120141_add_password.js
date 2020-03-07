exports.up = async knex => {
    await knex.schema.alterTable('user_accounts', users => {
      users.string('email', 320);
      users.string('password', 60);
    });
    await knex.schema.createTable('password_resets', resets => {
      resets.integer('user_id');
      resets.string('key', 32);
      resets.timestamp('created_on').defaultsTo(knex.fn.now());
    });
  }

  exports.down = async knex => {
    await knex.schema.alterTable('user_accounts', users => {
      users.dropColumn('email');
      users.dropColumn('password');
    });
    await knex.schema.dropTable('password_resets');
  }