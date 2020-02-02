import { expect } from 'chai';
import { addBillItem, deleteBillItem } from '../src/bills.js';

describe('addBillItem', () => {
  it('can add item', () => {
    const bill = addBillItem(999);
    expect(bill.amount).to.equal(999.9);
  });
});


describe('delete bill item', () => {
    it('can delete valid item', () => {
      const bill = deleteBillItem(0);
      expect(bill.amount).to.equal(250.0);
    });

    it('cannot delete invalid item', () => {
        const bill = deleteBillItem(999);
        expect(bill).to.equal(undefined);
      });
    
  });

