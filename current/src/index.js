/**
 * Remi Parayao
 * I&C SCI_X472.15: Sever-side development
 * 
 * 01/31/2020
 */

import express from 'express';
import expressgraphql from 'express-graphql';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';
import session from 'express-session';
import ConnectSessionKnex from 'connect-session-knex';
import knex from './database'

const app = express();
const staticRoute = express.static('public');
app.use('/', staticRoute);

const env = process.env.NODE_ENV || 'development';

// Global Error Handler
if (!['development', 'test'].includes(env)) {
  app.use(function (err, req, res, next) {
    console.error(err);
    res.status(500).send();
  });
}

const ONE_MONTH = 7 * 24 * 60 * 60 * 1000;
const KnexSessionStore = ConnectSessionKnex(session);
app.use(session({
  store: new KnexSessionStore({ knex }),
  secret: 'this is a test of the emergency broadcast system..this is only a test.',
  cookie: { maxAge: ONE_MONTH }
}));


app.use('/api', expressgraphql({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/api');


