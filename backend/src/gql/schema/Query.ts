import { objectType } from "nexus"
import { Context } from "../context"

const Query = objectType({
    name: 'Query',
    definition(t) {
        t.list.field('recordings', {
            type: 'Recording',
            resolve: (_, _args, ctx: Context) => {
                return ctx.photon.recordings.findMany({
                    first: 20,
                })
            },
        })
    },
})

export default Query
