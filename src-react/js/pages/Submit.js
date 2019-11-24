import React from 'react'
import { Formik } from 'formik'
import axios from 'axios';
import { Input } from 'antd';
import styled from 'styled-components';
import * as Yup from 'yup';
import { withRouter } from "react-router";
import {API_BASEURL} from '@constants'
const { TextArea } = Input;

const Button = styled.button`
    background: #fff;
    border: 1px solid #bbb;
    border-radius: 2px;
`;
const Error = styled.p`
    color: red;
    font-size: 12px;
`;
const Submit = ({history}) => {
    const initialValues = { author:'', title: '', content: '' };
    const getValidationSchema = () => {
        const shape = {};
        Object.keys(initialValues).forEach(key => {
            shape[key] = Yup.string();
        });
        return Yup.object().shape(shape);
      };
    return (
        <div>
            <h1>submit your post</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={getValidationSchema()}
                validate={values => {
                    const errors = {};
                    const keys = Object.keys(values);
                    keys.map(key => {
                        if (!values[key]) {
                            errors[key] = `${key} is required`;
                        }
                    })
                    return errors;
                }}
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    axios.post(`${API_BASEURL}/talks`, values).then((res) => {
                        setSubmitting(false);
                        history.push('/');
                    });
                }}
            >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                <form onSubmit={handleSubmit}>
                <Input
                    addonBefore="author"
                    type="text"
                    name="author"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.author}
                    placeholder="author"
                />
                {
                    errors.author && touched.author &&
                    <Error>{errors.author}</Error>
                }
                <Input
                    addonBefore="title"
                    type="text"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                    placeholder="title"
                />
                {
                    errors.title && touched.title &&
                    <Error>{errors.title}</Error>
                }
                <TextArea
                    rows={4}
                    name="textarea"
                    name="content"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.content}
                    placeholder="content"
                />
                {
                    errors.content && touched.content &&
                    <Error>{errors.content}</Error>
                }
                <Button type="submit" disabled={isSubmitting}>
                    Submit
                </Button>
                </form>
            )}
            </Formik>
        </div>
    )
}
export default withRouter(Submit);