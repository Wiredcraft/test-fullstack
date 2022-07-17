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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Template />}>
          <Route index element={<Home />} />
          <Route path="sing-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="confirm-sign-up" element={<ConfirmSignUp />} />
          <Route path="publish-new-poll" element={<PublishNewPoll />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
