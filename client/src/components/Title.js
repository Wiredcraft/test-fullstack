import React from 'react'
import PropTypes from 'prop-types'

const Title = ({ title = 'Lightning Talks', onOpenModal} = {}) => (
    <div
        className='app-title'
    >
        {title}
        <i
            className='fa fa-plus'
            aria-hidden='true'
            onClick={onOpenModal}
        />
    </div>
)

Title.propTypes = {
    title: PropTypes.string,
    onOpenModal: PropTypes.func,
}

export default Title
