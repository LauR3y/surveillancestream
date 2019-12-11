import { GraphQLServer } from 'graphql-yoga'
import dotenv, { DotenvParseOutput } from 'dotenv'
import { createContext } from './context'
import schema from './schema'

const result = dotenv.config()

// Start
if (result.parsed) {
    // got config
    new GraphQLServer({
      schema,
      context: createContext(),
    }).start(() =>
      console.log(
        `🚀 Server ready at: http://localhost:4000\n⭐️ See sample queries: http://pris.ly/e/js/graphql#5-using-the-graphql-api`,
      ),
    ).catch(console.error)
} else if (result.error) {
    console.warn(result.error)
} else {
    console.error('Error config')
}