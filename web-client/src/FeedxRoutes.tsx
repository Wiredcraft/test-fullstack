import AuthPage from "containers/AuthPage";
import FeedDetailPage from "containers/FeedDetailPage";
import FeedListPage from "containers/FeedListPage";
import NotFoundPage from "containers/NotFoundPage";
import ProfilePage from "containers/ProfilePage";
import ProtectedRoute from "containers/ProtectedRoute";
import { Redirect, Route } from "react-router-dom";

export default function FeedxRoutes() {
  return (
    <>
      <Route
        path="/auth/:authType?"
        render={routerProps => <AuthPage {...routerProps} />}
        exact
      />
      <Route exact path="/">
        <Redirect to={{ pathname: '/feeds' }} />
      </Route>
      <Route path="/about">
        <FeedDetailPage feedId="about" />
      </Route>
      <ProtectedRoute path="/feed/new" >
        <FeedDetailPage feedId="new" />
      </ProtectedRoute>
      <Route path="/feed/:userName/:pageTitle" component={FeedDetailPage} />
      <Route path="/feeds/:sorting?" component={FeedListPage} />
      <ProtectedRoute path="/profile">
        <ProfilePage />
      </ProtectedRoute>
      {/* <Route path="*" component={NotFoundPage} /> */}
    </>
  )
}
