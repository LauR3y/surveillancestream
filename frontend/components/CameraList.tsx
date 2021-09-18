import { useQuery, gql } from '@apollo/client'
import CameraSnapshot from './CameraSnapshot';

const CameraList = ({ onClick }: { onClick: (camera) => void }) => {
  const QUERY = gql`
    query {
      cameras {
        id
        name
      }
    }
  `;
  
  const { data, loading } = useQuery(QUERY)

  if (loading) {
    return (
      <div />
    )
  }

  return (
    <div style={{ width: 300 }}>
      {data.cameras.map((camera) => {
        return (
          <a key={camera.id} onClick={onClick.bind(onClick, camera)}>
            <div style={{ position: 'relative', flex: 1, aspectRatio: '16 / 9', borderWidth: 1, borderStyle: 'solid', borderColor: '#eaeaea ' }}>
              <CameraSnapshot id={camera.id} />
              <div style={{ position: 'absolute', left: 10, bottom: 10, color: 'white' }}>{camera.name}</div>
            </div>
            </a>
        )
      })}
    </div>
  )
}

export default CameraList;
