import path from 'path'
import { makeSchema } from "nexus";
import { nexusPrismaPlugin } from "nexus-prisma";
import Query from "./Query";
import Recording from "./Recording";

export default makeSchema({
//   types: [Query, Mutation, Post, User],
    types: [Query, Recording],
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
                source: '@prisma/photon',
                alias: 'photon',
            }, {
                source: require.resolve('../context'),
                alias: 'Context',
            },
        ],
    },
})
