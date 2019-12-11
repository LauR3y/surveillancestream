import { objectType } from "nexus"

const Recording = objectType({
    name: 'Recording',
    definition(t) {
      t.string('id')
      t.string('cameraName')
      // t.model.id()
      // t.model.cameraName()
      t.boolean('hasPoster', {
        resolve: (root) => !!root.imageFilePath
      })
      t.float('recordedAt', {
        resolve: (root) => root.recordedAt.getTime()
      })
    },
})

export default Recording
