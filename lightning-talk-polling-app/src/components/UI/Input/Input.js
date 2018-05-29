import React from 'react';
import AuxiliaryComponent from '../../../hoc/AuxiliaryComponent';

const input = (props) => {
    let feedbackMessage;
    let isValidCSSClass;

    if (props.isFormInitialState) {
        feedbackMessage = null;
    } else if (props.isValidInput) {
        isValidCSSClass = 'is-valid';
        feedbackMessage = <div className="valid-feedback">Valid {props.validMessage}</div>;
    } else {
        isValidCSSClass = 'is-invalid';
        feedbackMessage = <div className="invalid-feedback">Invalid {props.invalidMessage}</div>;
    }
    return (
        <AuxiliaryComponent>
            <label className="grey-text pt-4">{props.label}</label>
            <input
                type={props.type}
                className={isValidCSSClass + " form-control"}
                placeholder={props.placeholder}
                maxLength={props.maxLength || 200}
                required={true}
                onChange={props.onChange}
            />
            {feedbackMessage}
        </AuxiliaryComponent>
    )
}

export default input;