CREATE TABLE user_accounts (
  id integer PRIMARY KEY,
  display_name varchar(100) NOT NULL,
  account_name varchar(25) UNIQUE NOT NULL,
  account_active Boolean
);

CREATE TABLE bill_category(
	id integer PRIMARY KEY,
	label text,
	type varchar(36) NOT NULL
);

CREATE TABLE bill_items(
	id integer PRIMARY KEY,
	owner_id integer,
	cat_id integer,
	label text,
	amount real not NULL,
	duedate timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (owner_id) REFERENCES user_accounts (id),
	FOREIGN KEY (cat_id) REFERENCES bill_category (id)

);


