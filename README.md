# uci_server_side_dev
Steps to verify and test for week4.

Install new database and sample data:

1.createdb uci-server-side2 -U postgres

2.psql -U postgres -d uci-server-side2 -f schema.sql

3.psql -U postgres -d uci-server-side2 -f seed.sql

