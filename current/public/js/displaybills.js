/**
 * Remi Parayao
 * I&C SCI_X472.15: Sever-side development
 * 
 * 01/31/2020
 */


let initbills = new Array();

let monthlyBudget = 2000.0
let monthlyLeft = 0;
let monthlyCurrent = 0;
let date = new Date();
date.setDate(date.getDate() + 30, 1);


//class for bill item
function Bill(id, label, amount, category){
	this.id = id;
	this.label = label;
	this.amount = amount;
	this.category = category;
}

Bill.prototype.getId = () =>{
	this.id;
}
//class for bill item


  
const getBills = `{
    id
    label
    category
    amount
  }`;
/**
 * on load
 */
$(document).ready(function(){
	$("#createButton").on("click",submitHandler);

    const query = `{ getBills ${getBills} }`;
	loadInitialData(query);

	const startingAmt = $("#input-start-amt");
	startingAmt.on('blur', function (){    
		monthlyBudget = startingAmt.val();
		$("#input-amt-left").val(calculateLeft(monthlyBudget, initbills));
	});

	startingAmt.val(monthlyBudget);

	$("#input-amt-left").val(calculateLeft(monthlyBudget, initbills));		
	
	//add jquery ui here
	// $(document).tooltip();

	$('#login-formxx').on('submit', login);
	$('#logout').on('click', logout);
	$('#signup-form').on('submit', signup);  
});


/**
 * calculate remaining amount
 * @param {*} budget 
 * @param {*} bills 
 */
const calculateLeft =(budget, bills)=>{
	let left = budget;
	bills.map(bill =>{
		left = left - bill.amount;	
	})
	return left;
}

/**
 * calculate current bill
 * @param {*} bills 
 */
const calculateCurrent =(bills)=>{
	let amount = 0;
	bills.map(bill =>{
		amount += bill.amount;
	})
	return amount;
}





//AJAX
//TODO
const updateBill =  async (bills, item, amount2)=>{
	const idx = bills.findIndex(bill => `amount${bill.id}`===item);

	let {id, label, category, amount} = bills[idx];
	amount = amount2;
	const response =  await fetch('/api/update/' + id + "/" + label + "/" + category + "/" + amount);
	const newitem =  await response.json();
	console.log('On update.. ' + JSON.stringify(newitem));
	initbills[idx].amount = amount;
	showAmountLeft();
	bills[id].amount = amount;
}
//TODO

const loadInitialData = async (query, variables = {}) =>{
    const response = await fetch('/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
    });
    const item = await response.json();
    $.each(item.data.getBills, function(i, data){
        initbills = [...initbills, new Bill(data.id, data.label, data.amount, data.category)]
    })
    createListOfBills(initbills);
    return 1;
} 



const submitHandler = async e => {
	e.preventDefault();

	const label = $("#input-label").val();
	const category = $("#input-cat").val(); 
	const amount = Number.parseFloat($("#input-amount").val());

	const query = `mutation{ createBill(input: {label: "${label}", category: "${category}", amount: ${amount}}){id label category amount}} `;
    const variables = {};
    const response = await fetch('/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
    });
    const {data: {createBill}} = await response.json();
    console.log(JSON.stringify(createBill));
	createBillItem(createBill);
	initbills.push(createBill);
	showAmountLeft();	
}


const deleteBill = async (bills, id)=>{
    const query = `mutation{ deleteBill(id: ${id}){successful}} `;
    const variables = {};
    const response = await fetch('/api/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, variables }),
    });
    const item = await response.json();
    //remove from display
    if (item !== undefined){
        const index = bills.findIndex(bill => bill.id === id);
        bills.splice(index,1);

        let billDeleted = $(`#bill-item${id}`);
        if (billDeleted){
            billDeleted[0].parentNode.removeChild(billDeleted[0]) 
        }
    }
} 

//AJAX



/**
 * create list of bills
 * @param {*} bills 
 */
const createListOfBills=(bills)=>{
	bills.map(bill=>{
		createBillItem(bill);
	});
	showAmountLeft();
}



/**
 * create bill item
 * @param {*} bill 
 */
const createBillItem=(bill)=>{
	let billItem = $("<div>");
	billItem.attr({"class":"bill-item", "id":"bill-item" + bill.id});

	let category = $("<div>");
	category.attr({"class":"categoryIcon"});

	let categoryImg = $("<img>");
	let catImgAttr = "";
	category.append(categoryImg);
	if (bill.category === "Credit Card"){
		catImgAttr = "images/creditCard.svg";
	} else if ( bill.category === "Transportation"){
		catImgAttr = "images/transportation.svg";
	} else if ( bill.category === "Utilities"){
		catImgAttr = "images/utilities.svg";
	}
	
	categoryImg.attr({"src":catImgAttr});
	billItem.append(category);

		
	let billLabel = $("<div>");
	billLabel.attr({"class": "bill-label"});
	billItem.append(billLabel);

	//due date
	let dueDateDiv = $("<div>");
	dueDateDiv.attr({"id": "due-date"});
	let dueDate = $("<input>");
	dueDate.attr({"id":"dueDate" + bill.id, "type":"text", "size":"16"});
	dueDateDiv.append("Due Date: ");	
	dueDateDiv.append(dueDate);
	//due date
		
	let billSublabel1 = $("<div>");
	let billSublabel2 = $("<div>");
	billSublabel2.attr({"class": "bill-category"});
	billSublabel1.append(bill.label);
	billSublabel2.append(bill.category);
		
	
	billLabel.append(billSublabel1);
	billLabel.append(billSublabel2);
	billLabel.append(dueDateDiv);
		
	let billAmount = $("<div>");
	billAmount.attr({"class":"bill-amount"});
	billItem.append(billAmount);
		

	//create input element
	let amount = $("<input>");
	let valueFmt = parseFloat(`${bill.amount}` .replace(/,/g, ""))
                  .toFixed(2)
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	amount.attr({"type":"text", 
				 "id": `amount${bill.id}`, 
				 "pattern":"[0-9]*", 
				 "size":"6",
				 "value":valueFmt,
				 "title": "Enter new amount to update"});
	billAmount.append(amount);

	//create delete button
	let delButton = $("<button>");
	delButton.attr({"type":"text", 
					"id":`delete${bill.id}`, 
					"class":"delete-icon"});

	let image = $("<img>");
	image.attr({"src":"images/trash.svg", 
	            "height":"16"})

	delButton.append(image);
	billAmount.append(delButton);

	$("#div-bill-item").append(billItem);
	
	$(`#amount${bill.id}`).on('blur', function (){    
        updateBill(initbills, this.id, Number(this.value));
		this.value = parseFloat(this.value.replace(/,/g, ""))
            .toFixed(2)
            .toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
//		saveBillsToStore(initbills);
	})

	$(`#delete${bill.id}`).on('click', function (){    
		console.log(`delete${bill.id}`);
		let choice = confirm ("Are you sure you want to delete?");
		if ( choice ){
			deleteBill(initbills, bill.id);
		}
	});

	$("#dueDate" + bill.id).val(date.toLocaleDateString("en-US"));
	// $("#dueDate" + bill.id).datepicker({ minDate: +30, defaultDate: date, dateFormat: 'm/d/yy' });
}

/**
 * show amount remaining
 */
const showAmountLeft=()=>{
	$("#input-amt-left").val(calculateLeft(monthlyBudget, initbills));
}



