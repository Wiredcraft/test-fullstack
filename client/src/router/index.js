import Vue from 'vue';
import VueRouter from 'vue-router';

import LoginForm from '../components/LoginForm';
import Layout from '../components/Layout';
import LightningTalkList from '../components/LightningTalkList';
import LightningTalkDetail from '../components/LightningTalkDetail';
import TalkForm from '../components/TalkForm';

import auth from '../middlewares/authentication';

Vue.use(VueRouter);

const router = new VueRouter({
  // NOTE: The default mode for vue-router is hash mode
  mode: 'hash',
  routes: [{
    path: '/login',
    name: 'login',
    component: LoginForm
  }, {
    path: '/',
    component: Layout,
    children: [{
      path: '',
      name: 'home',
      component: LightningTalkList
    }, {
      path: 'talks',
      name: 'talks',
      component: LightningTalkList
    }, {
      path: 'newest',
      name: 'newest',
      component: LightningTalkList
    }, {
      path: 'talks/:id',
      name: 'talk',
      component: LightningTalkDetail
    }, {
      path: 'submit',
      name: 'submit',
      component: TalkForm,
      meta: {
        authRequired: true
      }
    }]
  }]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequired)) {
    // route without authRequired field set or set to true
    // then check if loggedIn else redirect to login page
    if (!auth.loggedIn()) {
      next({
        name: 'login',
        query: { redirect: to.fullPath }
      });
    } else {
      auth.injectToApi();
      next();
    }
  } else {
    if (auth.loggedIn()) auth.injectToApi();
    next();
  }
});

export default router;
