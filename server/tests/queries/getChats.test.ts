import { createTestClient } from 'apollo-server-testing';
import { ApolloServer, gql } from 'apollo-server-express';
import schema from '../../schema';

describe('Query.chats', () => {
  it('should fetch all chats', async () => {
    const server = new ApolloServer({ schema });

    // Create Apollo Server Test Client
    const { query } = createTestClient(server);

    // Create test Query 'sent' from the Test Client
    const res = await query({
      query: gql`
        query GetChats {
          chats {
            id
            name
            picture
            lastMessage {
              id
              content
              createdAt
            }
          }
        }
      `,
    });

    // Validate resolved query data
    expect(res.data).toBeDefined();
    expect(res.errors).toBeUndefined();
    // Calls .toString() method on the examined object (res.data)
    // and checks if it matches the Snapshot defined in '__snapshots__/getChats.test.ts.snap'
    expect(res.data).toMatchSnapshot();
  });
});
