import { useQuery, gql } from '@apollo/client'
import Image from 'next/image'

const CameraSnapshot = ({ id }: { id: number }) => {
  const QUERY = gql`
    query ($id: Int!, $useProxy: Boolean!) {
      camera (id: $id, useProxy: $useProxy) {
        profiles {
          snapshotUri
          video {
            resolution {
              width
              height
            }
          }
        }
      }
    }
  `

  const { data, loading } = useQuery(QUERY, {
    variables: {
      id,
      useProxy: true,
    }
  })

  if (loading) {
    return (
      <div />
    );
  }

  const { snapshotUri, video } = data.camera.profiles[0]

  return (
    <Image src={`${snapshotUri}`} layout='responsive' width={video.resolution.width} height={video.resolution.height} />
  );
}

export default CameraSnapshot;
