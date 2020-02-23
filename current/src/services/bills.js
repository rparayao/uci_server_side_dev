/**
 * Remi Parayao
 * I&C SCI_X472.15: Sever-side development
 * 
 * 01/31/2020
 */

import knex from '../database'


let initData = [];
function getMaxIndex(){
    if ( initData.length === 0){
        return 0;
    } else {
        return initData.reduce((max, b) => Math.max(max, b.id), initData[0].id);
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


//update array with newly created bill item
export const addBillItem = async (id, label, category, amount) =>{
    //const id = getMaxIndex() + 1;
    if (label && category && amount){
        let newBill = {label, category, amount};
        let owner_id = 1;
        let cat_id = 1;

        let data = await knex('bill_items').insert({id, owner_id, cat_id, label, amount}).returning('id');
        return data;
    }
}
//FOR EXPORT
