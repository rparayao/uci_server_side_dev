--Remi Parayao
--I&C SCI_X472.15 (WINTER 2020/REG 00448/SEC 1)
--02.09.2020

INSERT INTO user_accounts
(id, display_name, account_name, account_active)
VALUES
(101, 'Mickey Mouse', 'mmouse', True),
(102, 'Donald Duck' , 'dduck', True);


INSERT INTO bill_category
(id, label, type)
VALUES
(201, 'Gas', 'Transportation'),
(202, 'Visa card' , 'Credit-Card'),
(203, 'Electric Bill' , 'Utility');



INSERT INTO bill_items
(id, owner_id, cat_id, label, amount)
VALUES
(1, 101, 201, 'Monthly gas', 123.0),
(2, 101, 202, 'Monthly Credit Card', 123.0),
(3, 102, 203, 'Edison Bill', 23.0);