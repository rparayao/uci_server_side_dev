import knex from '../database'

let initData = [];

export const getAllBooks = () => {
    if (initData.length === 0) {
        initData = knex.select().from('book_items');
    }
    return initData ? initData : {};
}


export const deleteABook = async idx =>{
    console.log("about to delete2: " + idx);

    await knex('book_items').where({id: idx}).del()
}


export const addABook = async (input) =>{
    const table = knex.select().from('book_items');
    const totalCount = await table.count();

    let id = totalCount[0]['count(*)'];
    let title = input.title;
    let author = input.author;
    let sales = input.sales;
    let book = {id, title, author, sales};

    let data = await knex('book_items').insert(book).return(book);
    return data;
}