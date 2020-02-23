exports.seed = async knex => {
  await knex('bill_items').del();
  await knex('bill_items').insert([
    { id: 101, owner_id: 1, cat_id: 1, label: 'Monthly gas', amount: 123.0}, 
    { id: 102, owner_id: 2, cat_id: 2, label: 'Monthly Credit Card', amount: 123.0 }, 
    { id: 103, owner_id: 1, cat_id: 3, label: 'Edison Bill', amount: 23.0 }, 
  ]);
};