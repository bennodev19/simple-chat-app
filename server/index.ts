import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import schema from './schema';

const PORT = process.env.PORT || 4000;

const app = express();

// Apply Middleware
app.use(cors());
app.use(express.json());

// Ping Route to see if the server is up and running from external
app.get('/_ping', (req, res) => {
  res.send('pong');
});

// Create Apollo Server
const server = new ApolloServer({ schema });

// Apply Graphql Middleware
server.applyMiddleware({
  app,
  path: '/graphql',
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
