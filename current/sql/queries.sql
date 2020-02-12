--Remi Parayao
--I&C SCI_X472.15 (WINTER 2020/REG 00448/SEC 1)
--02.09.2020



--query on bill items by owner id 101
select * from bill_items where owner_id=101;
-- id | owner_id | cat_id |        label        | amount |          duedate           
----+----------+--------+---------------------+--------+----------------------------
--  1 |      101 |    201 | Monthly gas         |    123 | 2020-02-09 12:53:59.490687
--  2 |      101 |    202 | Monthly Credit Card |    123 | 2020-02-09 12:53:59.490687
--(2 rows)

--query on bill item on column owener_id by owner id 102
select owner_id from bill_items where owner_id=102;
-- owner_id 
----------
--      102
--(1 row)

--list user accounts that's active
select * from user_accounts where account_active=true;
-- id  | display_name | account_name | account_active 
-----+--------------+--------------+----------------
-- 101 | Mickey Mouse | mmouse       | t
-- 102 | Donald Duck  | dduck        | t
--(2 rows)


--query which account are active 
select account_active from user_accounts where account_active=true;
-- account_active 
----------------
-- t
-- t
--(2 rows)


--join bill item and user_account
select * from bill_items bi JOIN user_accounts ua on bi.owner_id = ua.id;
-- id | owner_id | cat_id |        label        | amount |          duedate           | id  | display_name | account_name | account_active 
------+----------+--------+---------------------+--------+----------------------------+-----+--------------+--------------+----------------
--  1 |      101 |    201 | Monthly gas         |    123 | 2020-02-09 12:53:59.490687 | 101 | Mickey Mouse | mmouse       | t
--  2 |      101 |    202 | Monthly Credit Card |    123 | 2020-02-09 12:53:59.490687 | 101 | Mickey Mouse | mmouse       | t
--  3 |      102 |    203 | Edison Bill         |     23 | 2020-02-09 12:53:59.490687 | 102 | Donald Duck  | dduck        | t
--(3 rows)