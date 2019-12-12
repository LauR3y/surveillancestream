import dotenv, { DotenvParseOutput } from 'dotenv'
import startStatic from "./static"
import startGql from "./gql"

const result = dotenv.config()

// Start
if (result.parsed) {
    startStatic(result.parsed)
    startGql()
} else if (result.error) {
    console.warn(result.error)
} else {
    console.error('Error config')
}