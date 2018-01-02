import React from 'react'
import CircularProgress from 'material-ui/CircularProgress'

const Loading = ({ size = 150 } = {}) => {
    return (
        <div
            style={{
                zIndex: 2,
                backgroundColor: 'black',
                position: 'fixed',
                opacity: 0.5,
                top:0,
                left:0,
                bottom: 0,
                right: 0,
                textAlign: 'center',
            }}
        >
            <CircularProgress
                size={size}
                thickness={6}
                style={{
                    top: '50%',
                    marginTop: `-${size / 2}px`,
                }}
            />
        </div>
    )
}

export default Loading
