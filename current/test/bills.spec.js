/**
 * Remi Parayao
 * I&C SCI_X472.15: Sever-side development
 * 
 * 01/31/2020
 */

import { expect } from 'chai';
import { addBillItem, deleteBillItem } from '../src/services/bills.js';

describe('addBillItem', () => {
  it.skip('can add item', () => {
    const bill = addBillItem( "Test", "cat", 111);
    console.log(JSON.stringify(bill));
    expect(bill.amount).to.equal(111);
  });

  it.skip('cannot add invalid item', () => {
    const bill = addBillItem();
    console.log(JSON.stringify(bill));
    expect(bill).to.equal(undefined);
  });
});


describe('delete bill item', () => {
    it.skip('can delete valid item', () => {
      const bill = deleteBillItem(0);
      expect(bill.amount).to.equal(250.0);
    });

    it.skip('cannot delete invalid item', () => {
        const bill = deleteBillItem(999);
        expect(bill).to.equal(undefined);
      });
    
  });

