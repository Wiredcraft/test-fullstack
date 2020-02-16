import React, {
  Suspense,
  lazy,
} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { hot } from 'react-hot-loader';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';

const Home = lazy(() => import('@/views/Home'));
const Login = lazy(() => import('@/views/Login'));
const Post = lazy(() => import('@/views/Post'));

const App = hot(module)(({ token }) => (
  <div className="app">
    <Router>
      <ErrorBoundary>
        <Header />
        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route
                path="/post"
                render={() => (token ? <Post /> : <Login />)}
              />
            </Switch>
          </Suspense>
        </main>
        <Footer />
      </ErrorBoundary>
    </Router>
  </div>
));

Home.propTypes = {
  token: PropTypes.string.isRequired,
};

const mapState = (state) => ({
  token: state.user.token,
});

export default connect(mapState)(App);
