import React from 'react';

const form = (props) => (
    <section className="form-elegant mt-3 container">
        <div className="card">
            <div className="card-body mx-4">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6 text-left">
                        <h2 className="text-center mb-2">{props.title}</h2>

                        {props.children}

                    </div>
                </div>
            </div>
        </div>
        <div className='py-5'/>
    </section>
);

export default form;