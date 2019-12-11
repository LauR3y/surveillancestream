import React, { useState } from 'react'
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import ListItem from './ListItem';
import ListHeader from './ListHeader';

const RECORDINGS_LIST = gql`
  {
    recordings {
      id,
      cameraName,
      hasPoster,
      recordedAt,
    }
  }
`

const List: React.FC = () => {
    const { loading, error, data } = useQuery(RECORDINGS_LIST);
    let [selectedRecordingId, setSelectedRecordingId] = useState()

    if (!data) {
        return null
    }

    if (!selectedRecordingId && data.recordings[0]) {
        selectedRecordingId = data.recordings[0].id
    }

    return (
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignSelf: 'stretch', maxHeight: '100vh' }}>
            <div style={{ display: 'flex', flex: 1 }}>
                <ListHeader
                    id={selectedRecordingId}
                />
            </div>
            <div style={{ display: 'flex', flex: 1, flexDirection: 'column', overflow: 'auto' }}>
                {data.recordings.map(({ id, cameraName, hasPoster, recordedAt }: { id: string, cameraName: string, hasPoster: boolean, recordedAt: number }) => (
                    <ListItem
                        key={id}
                        id={id}
                        cameraName={cameraName}
                        hasPoster={hasPoster}
                        recordedAt={recordedAt}
                        onClick={() => {
                            setSelectedRecordingId(id)
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export default List
