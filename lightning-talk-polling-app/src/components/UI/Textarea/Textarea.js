import React from 'react';
import AuxiliaryComponent from '../../../hoc/AuxiliaryComponent';

const textarea = (props) => {
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
            <textarea
                className={isValidCSSClass + " form-control"}
                placeholder={props.placeholder}
                rows={props.rows}
                maxLength={300}
                onChange={props.onChange}
            />
            {feedbackMessage}
        </AuxiliaryComponent>
    )

};

export default textarea;