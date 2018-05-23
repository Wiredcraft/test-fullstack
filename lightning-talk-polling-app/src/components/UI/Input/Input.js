import React from 'react';
import AuxiliaryComponent from '../../../hoc/AuxiliaryComponent';

const input = (props) => (
    <AuxiliaryComponent>
        <label className="grey-text pt-4">{props.label}</label>
        <input
            type={props.type}
            className="form-control"
            placeholder={props.placeholder}
            maxLength={props.maxLength || 200}
            onChange={props.onChange}
        />
    </AuxiliaryComponent>
);

export default input;