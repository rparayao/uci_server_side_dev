exports.seed = async knex => {
    await knex('bill_items').del();
    await knex('bill_items').insert([
        {id: 1, label: 'Monthly gas', category: 'Credit Card', amount: 100.0},
        {id: 2, label: 'Monthly Credit Card', category: 'Credit Card', amount: 123.0},
        {id: 3, label: 'Edison Bill', category: 'Utilities', amount: 23.01}        
    ]);

    await knex('user_accounts').del();
    await knex('user_accounts').insert([
      { id: 101, display_name: 'Mickey Mouse', username: 'mmouse', email: 'mmouse@disney.com' }, 
      { id: 102, display_name: 'Donald Duck', username: 'dduck', email: 'dduck@disney.com' }, 
    ]);

  };