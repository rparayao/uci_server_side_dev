import express from 'express';
import expressgraphql from 'express-graphql';
import schema from './graphql/schema';
import resolvers from './graphql/resolvers';

//REMIhttps://spotify-graphql-server.herokuapp.com/
// The root provides a resolver function for each API endpoint
// const root = {
//   hello: () => {
//     const data = {id: -1, title: 'aaa', author: 'bbb', sales:123};
//     return data;
//   },
// };


const isDev = process.env.NODE_ENV === 'development';
const app = express();
const staticRoute = express.static('public');
app.use('/', staticRoute);
app.use('/api', expressgraphql({
  schema: schema,
  rootValue: resolvers,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/api');