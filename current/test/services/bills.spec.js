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
    await knex('bill_items').del().where({ id: bill_item_id });
  });

  it('can add item--HAPPY PATH', async() => {
    const billid = await addBillItem(bill_item_id, "Test", "cat", 111);

    expect(billid[0]).to.equal(bill_item_id);
  });

  it('cannot add invalid item--UNHAPPY PATH', async () => {
    const bill = await addBillItem();
    expect(bill).to.equal(undefined);
  });
});


describe('Select a bill item', () => {
  it('can select several bill items --HAPPY PATH', async () => {
    const status = await getBillItem();
    expect(status).to.be.not.empty 
  });


  it('can select a bill item --HAPPY PATH', async () => {
    const status = await getBillItemWithId(101);
    expect(status).to.be.not.empty 
  });
    


  it('cannot select a bill item --UNHAPPY PATH', async () => {
    const status = await getBillItemWithId(99999);
    expect(status).to.be.empty 
  });
});


describe('Delete a bill item', () => {
  let bill_item = {id: 801, owner_id: 1, cat_id: 1, label: "Test Delete", amount: 0}
  beforeEach(async () => {
    const ids = await knex('bill_items').insert(bill_item).returning('id');
  });
  afterEach(async () => {
    await knex('bill_items').where({id: bill_item.id}).del();
  });

  it('can delete valid item--HAPPY PATH', async () => {
    const status = await deleteBillItem(bill_item.id);
    expect(await knex('bill_items').where({ id: bill_item.id })).to.be.empty 
  });


  it('cannot delete invalid item --UNHAPPY PATH', async () => {
    let invalid_id = 9999;
    const bill = await deleteBillItem(invalid_id);
    expect(await knex('bill_items').where({ id: invalid_id })).to.be.empty 
  });
    
});

