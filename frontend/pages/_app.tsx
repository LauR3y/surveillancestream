import { ApolloProvider } from '@apollo/client'
import apolloClient from '../helpers/apollo-client'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
