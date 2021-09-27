import 'graphql-import-node';

import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers as scalarResolvers, typeDefs as ScalarTypeDefs } from 'graphql-scalars';

import resolvers from './resolvers';
import Camera from './typeDefs/camera.graphql';
import Mutation from './typeDefs/mutation.graphql';
import Query from './typeDefs/query.graphql';

export default makeExecutableSchema({
  typeDefs: [...ScalarTypeDefs, Camera, Query, Mutation],
  resolvers: {
    ...scalarResolvers,
    ...resolvers,
  },
});
