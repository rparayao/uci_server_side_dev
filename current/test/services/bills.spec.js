/**
 * Remi Parayao
 * I&C SCI_X472.15: Sever-side development
 * 
 * 01/31/2020
 */

import { expect } from 'chai';
import { addBillItem, deleteBillItem, getBillItem, getBillItemWithId} from '../../src/services/bills.js';
import knex from '../../src/database'

describe('Create a bill item', () => {
  let bill_item_id = 901;
  afterEach(async () => {
    await knex('bill_items').del().where({ label: "MochaTest" });
  });

  it('can add item--HAPPY PATH', async() => {
    const billBefore = await getBillItem();
    await addBillItem({label: "MochaTest", category: "cat", amount: 111});
    const billAfter = await getBillItem();

    expect(billBefore.length).to.lessThan(billAfter.length);
  });

  it('cannot add invalid item--UNHAPPY PATH', async () => {
    let expected = undefined;
    try{
      await addBillItem();
    } catch (err){
      expected = {};
    }
    expect(expected).to.not.equal(undefined);
  });
});


describe('Select a bill item', () => {
  it('can select several bill items --HAPPY PATH', async () => {
    const status = await getBillItem();
    expect(status).to.be.not.empty 
  });


  it('can select a bill item --HAPPY PATH', async () => {
    const status = await getBillItemWithId(1);
    expect(status).to.be.not.empty 
  });
    


  it('cannot select a bill item --UNHAPPY PATH', async () => {
    const status = await getBillItemWithId(99999);
    expect(status).to.be.empty 
  });
});


describe('Delete a bill item', () => {
  let bill_item_new;
  beforeEach(async () => {
    let bill_item = {label: "DEL_MochaTest", category: "cat", amount: 111}
    bill_item_new = await addBillItem(bill_item);
    console.log("BEFORE: " + JSON.stringify(bill_item_new));
  });
  afterEach(async () => {
    await knex('bill_items').del().where({ label: "DEL_MochaTest" });
  });

  it('can delete valid item--HAPPY PATH', async () => {
    const billBefore = await getBillItem();

    await deleteBillItem(bill_item_new.id);
    const billAfter = await getBillItem();

    expect(billBefore.length).to.greaterThan(billAfter.length);
  });


  it('cannot delete invalid item --UNHAPPY PATH', async () => {
    let invalid_id = 9999;
    const bill = await deleteBillItem(invalid_id);
    expect(await knex('bill_items').where({ id: invalid_id })).to.be.empty 
  });
    
});

