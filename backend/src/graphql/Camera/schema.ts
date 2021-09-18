import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers as scalarResolvers, typeDefs as ScalarTypeDefs } from 'graphql-scalars';

import resolvers from './resolvers';
import Camera from './typeDefs/camera.graphql';
import Query from './typeDefs/query.graphql';

export default makeExecutableSchema({
  typeDefs: [...ScalarTypeDefs, Camera, Query],
  resolvers: {
    ...scalarResolvers,
    ...resolvers,
  },
});
