import { useQuery, gql } from '@apollo/client'
import QUERY_CAMERA_LIST from '../Queries/CameraList';
import CameraSnapshot from './CameraSnapshot';

const CameraList = ({ onClick }: { onClick: (camera) => void }) => {
  
  
  const { data, loading, error } = useQuery(QUERY_CAMERA_LIST)

  if (loading) {
    return (
      <div />
    )
  } else if (error) {
    console.error(error)

    return (
      <div>
        {error}
      </div>
    )
  } else if (data.cameras.length === 0) {
    return (
      <div>
        No Cameras
      </div>
    )
  }

  return data.cameras.map((camera) => {
    return (
      <a key={camera.id} onClick={onClick.bind(onClick, camera)}>
        <div style={{ position: 'relative', flex: 1, aspectRatio: '16 / 9', borderWidth: 1, borderStyle: 'solid', borderColor: '#eaeaea ' }}>
          <CameraSnapshot id={camera.id} />
          <div style={{ position: 'absolute', left: 10, bottom: 10, color: 'white' }}>{camera.name}</div>
        </div>
        </a>
    )
  })
}

export default CameraList;
