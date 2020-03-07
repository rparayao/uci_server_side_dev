/**
 * Remi Parayao
 * I&C SCI_X472.15: Sever-side development
 * 
 * 01/31/2020
 */

import knex from '../database'


let initData = [];
function getMaxIndex(billList){
    if ( billList.length === 0){
        return 0;
    } else {
        return billList.reduce((max, b) => Math.max(max, b.id), billList[0].id);
    }
}

function getMaxIndexxx(bookList){
    console.log("data: " + bookList);
    if ( bookList.length === 0){
        return 0;
    } else {
        return bookList.reduce((max, b) => Math.max(max, b.id), bookList[0].id);
    }
}

//FOR EXPORT
export const updateBillItem = (id, label, category, amount) =>{
    knex('bill_items').update({id, label, category, amount}).where({ id }).then({});
    return ({success: true});
}

export const getBillItemWithOptions = async(filter) => {
    const data = await knex.select().from('bill_items').where('label', filter);
    console.log("Looking " + data);
    console.log("Looking " + JSON.stringify(data));

    return data;
}

export const getBillItemWithId= (idx) => {
    const data = knex.select().from('bill_items').where('id', idx);
    return data;
}

export const getBillItem = () => {
    if (initData.length === 0) {
        initData = knex.select().from('bill_items');
    }
    return initData ? initData : {};
}


export const deleteBillItemOld = async idx =>{
    const billItem = initData.find(bill => bill.id ===idx);
    if (billItem !== undefined){

        await knex('bill_items').where({id: idx}).del().
            then(()=>{
                //remove from array 
                const index = initData.findIndex(bill => bill.id ===idx);
                initData.splice(index,1);        
            });

        return ({success: true});
    }
}



export const deleteBillItem = async idx =>{
    await knex('bill_items').where({id: idx}).del()
}




export const addBillItem = async (input) =>{
    console.log("1About to add...", JSON.stringify(input));
    const table = knex.select().from('bill_items');
    const billList = await table;
    console.log("1About to add...", JSON.stringify(billList));

    const id = getMaxIndex(billList) + 1;

    //let id = parseFloat(totalCount[0]['count']) + 1;
    let label = input.label;
    let category = input.category;
    let amount = input.amount;
    let bill = {id, label, category, amount};
    console.log("id...", id);

    console.log("2About to add...", JSON.stringify(bill));

    let data = await knex('bill_items').insert(bill).return(bill);
    return data;
}

//update array with newly created bill item
// export const addBillItemxx = async (id, label, category, amount) =>{
//     const id = getMaxIndex(bookList) + 1;

//     if (label && category && amount){

//         let data = await knex('bill_items').insert({id, label, category, amount}).returning('id');
//         return data;
//     }
// }
//FOR EXPORT
