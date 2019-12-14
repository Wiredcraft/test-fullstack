import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'new',
    component: Home,
  },
  {
    path: '/past',
    name: 'past',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Past.vue'),
  },
  {
    path: '/comments',
    name: 'comments',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Comments.vue'),
  },
  {
    path: '/ask',
    name: 'ask',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Ask.vue'),
  },
  {
    path: '/show',
    name: 'show',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Show.vue'),
  },
  {
    path: '/jobs',
    name: 'jobs',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Jobs.vue'),
  },
  {
    path: '/submit',
    name: 'submit',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Submit.vue'),
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import(/* webpackChunkName: "about" */ '@/views/Auth.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
