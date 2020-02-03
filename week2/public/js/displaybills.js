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
function Bill(index, label, amount, category){
	this.index = index;
	this.label = label;
	this.amount = amount;
	this.category = category;
}

Bill.prototype.getIndex = () =>{
	this.index;
}
//class for bill item




/**
 * on load
 */
$(document).ready(function(){
	$("#createButton").on("click",submitHandler);

	loadInitialData();

	const startingAmt = $("#input-start-amt");
	startingAmt.on('blur', function (){    
		monthlyBudget = startingAmt.val();
		$("#input-amt-left").val(calculateLeft(monthlyBudget, initbills));
	});

	startingAmt.val(monthlyBudget);

	$("#input-amt-left").val(calculateLeft(monthlyBudget, initbills));		
	
	//add jquery ui here
	$(document).tooltip();
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


/**
 * update current bill
 * @param {*} bills 
 * @param {*} item 
 * @param {*} amount 
 */
const updateBill = (bills, item, amount)=>{
	const index = bills.findIndex(bill => `amount${bill.index}`===item);
	bills[index].amount = amount;
}


/**
 * find next max index
 */
function getMaxIndex(){
  return initbills.reduce((max, b) => Math.max(max, b.index), initbills[0].index);
}

//WEEK 2 AJAX
const loadInitialData = async () =>{
	const response = await fetch('/api/bills');
	const item = await response.json();
	$.each(item, function(i, data){
		initbills = [...initbills, new Bill(data.index, data.label, data.amount, data.category)]
	})
	createListOfBills(initbills);
	return 1;
} 


const submitHandler = async e => {
	e.preventDefault();

	const label = $("#input-label").val();
	const category = $("#input-cat").val(); 
	const amount = Number.parseFloat($("#input-amount").val());

	const response = await fetch('/api/add/' + label + "/" + category + "/" + amount);
	const item = await response.json();

	alert("About to add: " +  JSON.stringify(item));
  };



const deleteBill = async (bills, index)=>{
	const response = await fetch('/api/delete/' + index);
	const item = await response.json();

	alert("About to delete: " +  JSON.stringify(item));
} 
//ADDED FOR WEEK2 --AJAX



/**
 * create a bill item
 */
const createNewBill = () =>{
	const label = $("#input-label").val();
	const category = $("#input-cat").val(); 
	const amount = Number.parseFloat($("#input-amount").val());
	const index = getMaxIndex() + 1;

	let newBill = {index, label, category, amount};
	return newBill;
}

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
	billItem.attr({"class":"bill-item", "id":"bill-item" + bill.index});

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
	dueDate.attr({"id":"dueDate" + bill.index, "type":"text", "size":"16"});
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
				 "id": `amount${bill.index}`, 
				 "pattern":"[0-9]*", 
				 "size":"6",
				 "value":valueFmt,
				 "title": "Enter new amount to update"});
	billAmount.append(amount);

	//create delete button
	let delButton = $("<button>");
	delButton.attr({"type":"text", 
					"id":`delete${bill.index}`, 
					"class":"delete-icon"});

	let image = $("<img>");
	image.attr({"src":"images/trash.svg", 
	            "height":"16"})

	delButton.append(image);
	billAmount.append(delButton);

	$("#div-bill-item").append(billItem);
	
	$(`#amount${bill.index}`).on('blur', function (){    
        updateBill(initbills, this.id, Number(this.value));
		this.value = parseFloat(this.value.replace(/,/g, ""))
            .toFixed(2)
            .toString()
			.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		showAmountLeft();
		saveBillsToStore(initbills);
	})

	$(`#delete${bill.index}`).on('click', function (){    
		console.log(`delete${bill.index}`);
		let choice = confirm ("Are you sure you want to delete?");
		if ( choice ){
			deleteBill(initbills, bill.index);
		}
	});

	$("#dueDate" + bill.index).val(date.toLocaleDateString("en-US"));
	$("#dueDate" + bill.index).datepicker({ minDate: +30, defaultDate: date, dateFormat: 'm/d/yy' });
}

/**
 * show amount remaining
 */
const showAmountLeft=()=>{
	$("#input-amt-left").val(calculateLeft(monthlyBudget, initbills));
}



