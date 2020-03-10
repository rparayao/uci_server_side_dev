# uci_server_side_dev
Steps to verify and test for week4.

Install new database and sample data:

1.createdb uci-server-side2 -U postgres

2.psql -U postgres -d uci-server-side2 -f schema.sql

3.psql -U postgres -d uci-server-side2 -f seed.sql


Week5

Supported commands

npm run migrate --to migrate DB

npm run rollback --to rollback DB

npm run test --run unit test

npm run db-test --dropdb, createdb, migrate db, seed db and rn test

**Week 5-graphQL**

Steps to test
- npm run make-db
- npm run migrate
- npm run seed
  - localhost:4000 
  - localhost:4000/api for graphiQL


**Week 7-Sessions and Users**
Steps to test
- dropdb monthly-bills [-U postgres]
- createdb monthly-bills [-U postgres]
- psql [-U postgres] -d monthly-bills -f sql/schema.sql 
- OR
- npm run make-db

- npm run migrate
- npm run seed
  - localhost:4000 
  - localhost:4000/api for graphiQL
- from UI point browser to http://localhost:4000/
  - Sign-up and Login link is available on main page
  - user name is displayed on main page
  - logout link is available on main page