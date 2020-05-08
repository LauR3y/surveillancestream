import { objectType } from "@nexus/schema"

const Recording = objectType({
    name: 'Recording',
    definition(t) {
      t.model.id()
      t.model.cameraName()
      t.model.imageFilePath()
      t.model.recordedAt()
      t.boolean('hasPoster', {
        resolve: (root) => !!root.imageFilePath
      })
      // t.float('recordedAt', {
      //   resolve: (root) => root.recordedAt.getTime()
      // })
    },
})

export default Recording
