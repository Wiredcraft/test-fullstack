import React from 'react'

const Title = ({ title = 'Lightning Talks', onOpenModal} = {}) => (
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
        <i
            className='fa fa-plus'
            aria-hidden='true'
            style={{
                cursor: 'pointer',
                marginLeft: '1em',
            }}
            onClick={onOpenModal}
        />
    </div>
)

export default Title
