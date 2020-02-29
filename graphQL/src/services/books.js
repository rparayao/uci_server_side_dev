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

function getMaxIndex(bookList){
    console.log("data: " + bookList);
    if ( bookList.length === 0){
        return 0;
    } else {
        return bookList.reduce((max, b) => Math.max(max, b.id), bookList[0].id);
    }
}

export const addABook = async (input) =>{
    console.log("1About to add...", JSON.stringify(input));
    const table = knex.select().from('book_items');
    const bookList = await table;
    console.log("1About to add...", JSON.stringify(bookList));

    const id = getMaxIndex(bookList) + 1;

    //let id = parseFloat(totalCount[0]['count']) + 1;
    let title = input.title;
    let author = input.author;
    let sales = input.sales;
    let book = {id, title, author, sales};
    console.log("id...", id);

    console.log("2About to add...", JSON.stringify(book));

    let data = await knex('book_items').insert(book).return(book);
    return data;
}