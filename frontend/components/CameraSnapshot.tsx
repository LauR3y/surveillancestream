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

  const { camera } = data
  const { snapshotUri, video } = camera.profiles[0]

  return (
    <Image src={`${process.env.NEXT_PUBLIC_GQL_HOST}${snapshotUri}`} layout='responsive' alt={camera.name} width={video.resolution.width} height={video.resolution.height} />
  );
}

export default CameraSnapshot;
