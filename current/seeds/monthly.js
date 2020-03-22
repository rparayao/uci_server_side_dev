exports.seed = async knex => {
  await knex('start_amount').del();
  await knex('user_accounts').del();
  await knex('bill_items').del();
  await knex('bill_category').del();
  await knex('past_due').del();


  await knex('user_accounts').insert([
    { id: 101, display_name: 'Mickey Mouse', username: 'mmouse', email: 'mmouse@disney.com' }, 
    { id: 102, display_name: 'Donald Duck', username: 'dduck', email: 'dduck@disney.com' }, 
  ]);

  await knex('bill_category').insert([
    { id: 201, label: 'Gas', type: 'Transportation'}, 
    { id: 202, label: 'Visa Card', type: 'Credit-Card' }, 
    { id: 203, label: 'Electric Bill', type: 'Utility' }, 
  ]);

  await knex('bill_items').insert([
    {id: 1, label: 'Monthly gas', category: 'Credit Card', cat_id: 201, amount: 100.0},
    {id: 2, label: 'Monthly Credit Card', category: 'Credit Card', cat_id: 202, amount: 123.0},
    {id: 3, label: 'Edison Bill', category: 'Utilities', cat_id: 203, amount: 23.01, past_due: true}        
  ]);

  await knex('start_amount').insert([
    { owner_id: 101, amount: 2000}, 
    { owner_id: 102, amount: 1000}, 
  ]);
  
  await knex('past_due').insert([
    {id: 301, bill_id: 1, owner_id: 101, amount: 200, days_over_due: 30}, 
  ]);

  };