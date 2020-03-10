
CREATE TABLE user_accounts (
  id SERIAL PRIMARY KEY,
  display_name varchar(100) NOT NULL,
  username varchar(25) UNIQUE NOT NULL
);


CREATE TABLE bill_items(
	id SERIAL PRIMARY KEY,
	label text,
	category varchar(25),
	amount real not NULL,
	owner_id integer
);


