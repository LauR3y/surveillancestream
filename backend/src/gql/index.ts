import { GraphQLServer } from 'graphql-yoga'
import { createContext } from './context'
import * as dotenv from 'dotenv'
import schema from './schema'

dotenv.config()

const startGql = () => {
  new GraphQLServer({
    schema: schema,
    context: createContext(),
  }).start(() =>
    console.log(
      `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/js/graphql#5-using-the-graphql-api`,
    ),
  ).catch(console.error)
}

export default startGql