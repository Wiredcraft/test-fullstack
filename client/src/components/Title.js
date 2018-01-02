import React from 'react'

const Title  = ({ title = 'Lightning Talks'} = {}) => (
    <div
        style={{
            fontFamily: 'Gabriela, sans-serif',
            textAlign: 'center',
            color: 'white',
            fontSize: '3.5em',
            marginBottom: '1em',
        }}
    >
        {title}
    </div>
)

export default Title
