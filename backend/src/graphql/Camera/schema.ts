import { makeExecutableSchema } from '@graphql-tools/schema';
import { readdirSync, readFileSync } from 'fs';
import { resolvers as scalarResolvers, typeDefs as ScalarTypeDefs } from 'graphql-scalars';
import { join } from 'path';

import resolvers from './resolvers';

const gqlFiles = readdirSync(join(__dirname, './typedefs'));
const typeDefs = ScalarTypeDefs;

gqlFiles.forEach((file) => {
  typeDefs.push(
    readFileSync(join(__dirname, './typedefs', file), {
      encoding: 'utf8',
    })
  );
});

export default makeExecutableSchema({
  typeDefs,
  resolvers: {
    ...scalarResolvers,
    ...resolvers,
  },
});
