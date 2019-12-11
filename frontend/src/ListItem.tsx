import React from 'react'

interface IListItemProps {
    id: string
    cameraName: string
    hasPoster: boolean
    recordedAt: number
    onClick: () => void
}

const ListItem: React.FC<IListItemProps> = ({ id, cameraName, hasPoster, recordedAt, onClick }) => {
    return (
        <div onClick={onClick}>
            {/* {id}/{cameraName}/{hasPoster ? 'true' : 'false'} */}
            <div style={{ display: 'flex', flexDirection: 'row', marginTop: '8px', marginBottom: '8px' }}>
                <div style={{ flex: 4, paddingLeft: '16px' }}>
                <img
                    style={{ width: '100%' }}
                    src={hasPoster ? `${process.env.REACT_APP_STATIC_HOST}/poster/${id}` : ''}
                    alt={`Recording of ${new Date(recordedAt).toLocaleString()}`}
                />
                </div>
                <div style={{ flex: 6, position: 'relative', paddingLeft: '16px', paddingRight: '16px' }}>
                    <div style={{ textAlign: 'left', fontSize: 18, marginTop: '4px', fontWeight: 'bold', color: 'rgb(247, 248, 251)' }}>{cameraName}</div>
                    <div style={{ textAlign: 'left', fontSize: 12, marginTop: '4px', color: 'rgba(247, 248, 251, 0.8)' }}>{new Date(recordedAt).toLocaleString()}</div>
                    <div style={{ position: 'absolute', bottom: '-8px', right: '16px', left: '16px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }} />
                </div>
            </div>
            </div>
    )
}

export default ListItem
