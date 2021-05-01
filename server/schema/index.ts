import { importSchema } from 'graphql-import';
import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

// Import Schema
const typeDefs = importSchema('schema/typeDefs.graphql');

// 'Merge' schema and resolver
export default makeExecutableSchema({ resolvers, typeDefs });
