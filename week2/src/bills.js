/**
 * Remi Parayao
 * I&C SCI_X472.15: Sever-side development
 * 
 * 01/31/2020
 */


let initbills = new Array();

let initData = [{index: 0, label: "Local-American Express", amount: 250.0, category: "Credit Card"}, 
 			 {index: 1, label: "Local-Car Payment", amount:200.00, category: "Transportation"}, 
 			 {index: 2, label: "Local-Electric", amount: 80.0, category: "Utilities"},
 			 {index: 3, label: "Local-Water", amount: 30.0, category: "Utilities"}];


function getMaxIndex(){
    return initData.reduce((max, b) => Math.max(max, b.index), initData[0].index);
}
//FOR EXPORT
export const getBillItem = id =>
	initData.find(bill =>bill.index === id);


export const deleteBillItem = id =>{
    const index = initData.findIndex(bill => bill.index ===id);
    return initData[index];
}


//update array with newly created bill item
export const addBillItem = (label, category, amount) =>{
    const index = getMaxIndex() + 1;
    if (label && category && amount){
        let newBill = {index, label, category, amount};
        initData.push(newBill);
        return newBill;
    }
}
//FOR EXPORT
