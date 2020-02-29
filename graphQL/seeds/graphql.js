
exports.seed = async knex => {
  await knex('book_items').del();
  await knex('book_items').insert([
    { id: 1, title: 'The Lord of the Rings', author: 'J. R. R. Tolkien', sales: 150000000 }, 
    { id: 2, title: 'The Little Prince', author: 'Antoine de Saint-Exupéry', sales: 140000000 }, 
    { id: 3, title: 'Harry Potter and the Philosophers Stone', author: 'J. K. Rowling', sales: 120000000 }, 
    { id: 4, title: 'The Master and Margarita', author: 'Mikhail Bulgakov', sales: 100000000 }, 
    { id: 5, title: 'Alices Adventures in Wonderland', author: 'Lewis Carroll', sales: 100000000 }, 
  ]);
};

