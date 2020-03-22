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

export const getPastDueBillItem = () => {
    const data = knex('bill_items').join('past_due', 'bill_items.id', 'past_due.bill_id' );
    return data;
}

export const getPastDue = (owner_id) => {
    const data = knex.select().from('past_due').where('owner_id', owner_id);

    return data;
}





export const deleteBillItem = async idx =>{
    await knex('bill_items').where({id: idx}).del()
}


export const addBillItem = async (input) =>{
    const table = knex.select().from('bill_items');
    const billList = await table;

    const id = getMaxIndex(billList) + 1;

    //let id = parseFloat(totalCount[0]['count']) + 1;
    let label = input.label;
    let category = input.category;
    let amount = input.amount;
    let bill = {id, label, category, amount};

    let data = await knex('bill_items').insert(bill).return(bill);
    return data;
}

