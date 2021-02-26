import classNames from "classnames";
import { FeedxButton } from "components/FeedxButton";
import { FeedxInput } from "components/FeedxInput";
import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { Link, RouterProps, useHistory, useRouteMatch } from "react-router-dom";
import { AuthType, CreateSessionPayload } from "store/api-service/actions";
import { useMobxStates } from "store/mst/root-state-context";
import * as Yup from "yup";
import "./index.scss";

interface AuthPageParams {
  // use local auth (user/password) by default 
  authType?: AuthType;
}

const AuthPage = (props: RouterProps) => {
  const { authState } = useMobxStates()
  const route = useRouteMatch<AuthPageParams>('/auth/:authType?');
  const authType = route?.params.authType || "login";
  const { replace } = useHistory()

  // Once is authenticated, redirect to content page
  useEffect(() => {
    // effect
    const isAuthenticated = authState?.isAuthenticated;
    if (isAuthenticated) {
      replace("");
    }
  }, [authState?.isAuthenticated, replace])

  // auth type switch links
  const AuthTypeSwitch = ["login", "register"].map((label: AuthType) => <Link key={label} className={classNames({
    'fdx-auth-switch': true,
    'fdx-auth-switch_active': label === authType,
  })} to={`/auth/${label}`}>{label}</Link>)

  // utils
  const isLogin = authType === "login";
  const isRegistration = authType === "register";

  return (
    <>
      {AuthTypeSwitch}
      <hr />
      <Formik
        initialValues={{
          identifier: "",
          name: "",
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          ...(
            isLogin
              ? {
                identifier: Yup.string().required("Required"),
                password: Yup.string()
                  // no password type validation for login
                  // .("Invalid password")
                  .required("Required"),
              }
              : isRegistration
                ? {
                  name: Yup.string()
                    .max(15, "Must be 15 characters or less")
                    .required("Required"),
                  email: Yup.string()
                    .email("Invalid email addresss")
                    .required("Required"),
                  password: Yup.string()
                    .max(42, "The password should be no longer than 42 characters")
                    .min(8, "The password should be no shorter than 8 characters")
                    .matches(/^(?=\w*[A-Za-z])(?=\w*\d)[^\W]*$/, 'The password should contain at leset a number and a letter')
                    .required("Required"),
                }
                : {}
          ),
        })}
        onSubmit={async (values, { setSubmitting }) => {
          const { identifier, name, email, password } = values;
          let createSessionPayload: CreateSessionPayload;
          // sad if else
          if (isLogin) {
            createSessionPayload = {
              type: "login",
              identifier, password
            };
          } else if (isRegistration) {
            createSessionPayload = {
              type: "register",
              name, email, password
            };
          } else return;
          authState?.createSession(createSessionPayload);
          setSubmitting(false);
        }}
      >
        <Form>
          {
            isLogin
              ? (
                < FeedxInput
                  label="Name Or Email"
                  name="identifier"
                  type="text"
                  placeholder="Jane"
                />
              )
              : isRegistration
                ? (
                  <>
                    <FeedxInput
                      label="Name"
                      name="name"
                      type="text"
                      placeholder="Jane"
                    />
                    <FeedxInput
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="lyc@feedx.com"
                    />
                  </>
                )
                : ""
          }
          <FeedxInput
            label="Password"
            name="password"
            type="password"
            placeholder="password"
          />
          <div style={{ marginTop: '20px' }}>
            <FeedxButton type="submit">Submit</FeedxButton>
          </div>
        </Form>
      </Formik>
    </>
  );
}

export default observer(AuthPage);

