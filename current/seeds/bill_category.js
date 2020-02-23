exports.seed = async knex => {
    await knex('bill_category').del();
    await knex('bill_category').insert([
      { id: 1, label: 'Gas', type: 'Transportation'}, 
      { id: 2, label: 'Visa Card', type: 'Credit-Card' }, 
      { id: 3, label: 'Electric Bill', type: 'Utility' }, 
    ]);
  };