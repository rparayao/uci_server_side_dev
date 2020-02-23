exports.seed = async knex => {
    await knex('user_accounts').del();
    await knex('user_accounts').insert([
      { id: 1, display_name: 'Mickey Mouse', account_name: 'mmouse', account_active: true }, 
      { id: 2, display_name: 'Donald Duck', account_name: 'dduck', account_active: true }, 
    ]);
  };