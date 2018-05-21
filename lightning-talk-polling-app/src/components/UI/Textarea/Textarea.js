import React from 'react';
import AuxiliaryComponent from '../../../hoc/AuxiliaryComponent';

const textarea = (props) => (
    <AuxiliaryComponent>
        <label className="grey-text pt-4">{props.label}</label>
        <textarea
            type={props.type}
            className="form-control"
            placeholder={props.placeholder}
            rows={props.rows}
            onChange={props.onChange}
        />
    </AuxiliaryComponent>
);

export default textarea;