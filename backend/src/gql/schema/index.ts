import path from 'path'
import { makeSchema } from "@nexus/schema";
import { nexusPrismaPlugin } from "nexus-prisma";
import Query from "./Query";
import Recording from "./Recording";

const schema = makeSchema({
//   types: [Query, Mutation, Post, User],
    types: [Recording, Query],
    plugins: [nexusPrismaPlugin()],
    outputs: {
    schema: __dirname + '/generated/schema.graphql',
    typegen: path.join(
            __dirname,
            '../../../node_modules/@types/nexus-typegen/index.d.ts',
        ),
    },
    typegenAutoConfig: {
        contextType: 'Context.Context',
        sources: [
            {
                source: '@prisma/client',
                alias: 'PrismaClient',
            }, {
                source: require.resolve('../context'),
                alias: 'Context',
            },
        ],
    },
})

export default schema
