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
    knex('monthly').update({id, label, category, amount}).where({ id }).then({});
    return ({success: true});
}

export const getBillItemWithOptions = async(filter) => {
    const data = await knex.select().from('monthly').where('label', filter);
    console.log("Looking " + data);
    console.log("Looking " + JSON.stringify(data));

    return data;
}


export const getBillItem = async() => {
    if (initData.length === 0) {
        initData = await knex.select().from('monthly');
    }
    return initData ? initData : {};
}


export const deleteBillItem = async id =>{
    const billItem = initData.find(bill => bill.id ===id);
    if (billItem !== undefined){
        await knex('monthly').where('id', billItem.id).del().
            then(()=>{
                //remove from array 
                const index = initData.findIndex(bill => bill.id ===id);
                initData.splice(index,1);        
            });

        return ({success: true});
    }
}


//update array with newly created bill item
export const addBillItem = (label, category, amount) =>{
    const id = getMaxIndex() + 1;
    if (label && category && amount){
        let newBill = {id, label, category, amount};
        knex('monthly').insert({id, label, category, amount}).
            then(()=>{initData.push(newBill)});
        return newBill;
    }
}
//FOR EXPORT
