import { mergeSchemas } from '@graphql-tools/schema';

import Camera from './Camera/schema';

export default mergeSchemas({
  schemas: [Camera],
});
