/**
 * Remi Parayao
 * I&C SCI_X472.15: Sever-side development
 * 
 * 01/31/2020
 */

let initBooks = new Array();

//class for bill item
function Book(id, title, author, sales){
    this.id = id;
    this.title = title;
    this.author = author;
    this.sales = sales;
}

Book.prototype.getId = () =>{
    this.id;
}
//class for bill item

const getBooks = `{
    id
    title
    author
    sales
  }`;
  

/**
 * on load
 */
$(document).ready(function(){
    $("#addButton").on("click",addABook);

    const query = `{ getBooks ${getBooks} }`;
    loadInitialData(query);
});


// //AJAX
const loadInitialData = async (query, variables = {}) =>{
    const response = await fetch('/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
    });
    const item = await response.json();
    $.each(item.data.getBooks, function(i, data){
        initBooks = [...initBooks, new Book(data.id, data.title, data.author, data.sales)]
    })
    createListOfBooks(initBooks);
    return 1;
} 



const deleteBook = async (books, id)=>{
    const query = `mutation{ deleteBook(id: ${id}){successful}} `;
    const variables = {};
    const response = await fetch('/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
    });
    const item = await response.json();
    //remove from display
    if (item !== undefined){
        const index = books.findIndex(book => book.id === id);
        books.splice(index,1);

        let bookDelete = $(`#bill-item${id}`);
        if (bookDelete){
            bookDelete[0].parentNode.removeChild(bookDelete[0]) 
        }
    }
} 

{/* <label>Title: </label> <input id="input-title"/> 
<label>Author: </label> <input id="input-author"/> 
<label>Sales: </label> <input id="input-sales"/>  */}

const addABook = async e => {
	e.preventDefault();
	const title = $("#input-title").val();
	const author = $("#input-author").val();
    const sales = $("#input-sales").val();
    console.log(title + ":" + author + ":" + sales);

    const query = `mutation{ createBook(input: {title: "${title}", author: "${author}", sales: ${sales}}){title}} `;
    const variables = {};
    const response = await fetch('/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
    });
    const item = await response.json();
    console.log(JSON.stringify(item));
    //{"query":"mutation {\n  createBook(input: {title: \"aaa\", author: \"bbbb\", sales: 1222}) {\n    title\n  }\n}\n","variables":null}
    //{"query":"mutation{ createBook(input: {title: eeee, author: eeww, sales: 123}){title}} ","variables":{}}
	// const response = await fetch('/api/read/' + label);
	// const item = await response.json();
	// if (item !== undefined){
	// 	alert("Found: " + JSON.stringify(item));
	// }
}

//AJAX



/**
 * create list of books
 * @param {*} books 
 */
const createListOfBooks=(books)=>{
    books.map(book=>{
        createBookItem(book);
    });
}



/**
 * create book item
 * @param {*} book 
 */
const createBookItem=(book)=>{
    let bookItem = $("<div>");
    bookItem.attr({"class":"bill-item", "id":"bill-item" + book.id});

        
    let bookLabel = $("<div>");
    bookLabel.attr({"class": "bill-label"});
    bookItem.append(bookLabel);

    //approx sales
    let salesDiv = $("<div>");
    salesDiv.attr({"id": "approx-sales"});
    let salesInput = $("<input>");
    salesInput.attr({"id":"approx-sales" + book.id, "type":"text", "size":"16"});
    salesDiv.append("Approximate Sales: ");   
    salesDiv.append(salesInput);
    //approx sales
        
    let billSublabel1 = $("<div>");
    let billSublabel2 = $("<div>");
    billSublabel2.attr({"class": "book-category"});
    billSublabel1.append(book.title);
    billSublabel2.append(book.author);
        
    bookLabel.append(billSublabel1);
    bookLabel.append(billSublabel2);
    bookLabel.append(salesDiv);
        
    let billAmount = $("<div>");
    billAmount.attr({"class":"bill-amount"});
    bookItem.append(billAmount);
        

    //create delete button
    let delButton = $("<button>");
    delButton.attr({"type":"text", 
                    "id":`delete${book.id}`, 
                    "class":"delete-icon"});

    let image = $("<img>");
    image.attr({"src":"images/trash.svg", 
                "height":"16"})

    delButton.append(image);
    billAmount.append(delButton);

    $("#div-book-item").append(bookItem);
    

    $(`#delete${book.id}`).on('click', function (){    
        console.log(`delete${book.id}`);
        let choice = confirm ("Are you sure you want to delete?");
        if ( choice ){
            deleteBook(initBooks, book.id);
        }
    });

    $("#approx-sales" + book.id).val(`${book.sales}`);
}




