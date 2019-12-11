import React from 'react'

interface IListHeaderProps {
    id: string
}

const ListHeader: React.FC<IListHeaderProps> = ({ id }) => {
    return (
        <div style={{ position: 'relative' }}>
            <video
                src={`${process.env.REACT_APP_STATIC_HOST}/video/${id}`}
                style={{ width: '100%' }}
                controls={true}
                autoPlay={true}
            />
            <div style={{ position: 'absolute', left: 0, bottom: 0, right: 0, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }} />
        </div>
    )
}

export default ListHeader
