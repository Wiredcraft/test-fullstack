import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {
  SignUp,
  Template,
  Home,
  ConfirmSignUp,
  SignIn,
  PublishNewPoll,
  PageNotFound,
} from 'pages'
import CONSTANTS from 'constants'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={CONSTANTS?.ROUTES_NAMES?.HOME} element={<Template />}>
          <Route index element={<Home />} />
          <Route path={CONSTANTS?.ROUTES_NAMES?.SIGN_UP} element={<SignUp />} />
          <Route
            path={CONSTANTS?.ROUTES_NAMES?.CONFIRM_SIGN_UP}
            element={<ConfirmSignUp />}
          />
          <Route path={CONSTANTS?.ROUTES_NAMES?.SIGN_IN} element={<SignIn />} />
          <Route
            path={CONSTANTS?.ROUTES_NAMES?.PUBLISH_NEW_POLL}
            element={<PublishNewPoll />}
          />
          <Route
            path={CONSTANTS?.ROUTES_NAMES?.PAGE_NOT_FOUND}
            element={<PageNotFound />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
