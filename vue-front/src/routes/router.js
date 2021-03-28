const Layout = () => import(/* webpackChunkName: "Layout" */ "@/views/Layout.vue");
const Talk = () => import(/* webpackChunkName: "Talk" */ "@/views/Talk.vue");
const TalkAdd = () => import(/* webpackChunkName: "TalkAdd" */ "@/views/TalkAdd.vue");

export default [
  {
    path: "/",
    name: "Root",
    component: Layout,
    redirect: { name: "Talk" },
    meta: {
      breadcrumb: {
        title: "根目录",
        replace: "/Talk"
      }
    },
    children: [
      {
        path: "/Talk",
        name: "Talk",
        component: Talk,
        meta: {
          nav: {
            icon: "el-icon-pie-chart",
            title: "帖子列表"
          },
          breadcrumb: {
            title: "帖子列表"
          }
        }
      },
      {
        path: "/Talk/add",
        name: "TalkAdd",
        component: TalkAdd,
        meta: {
          breadcrumb: {
            title: "帖子添加"
          }
        }
      }
    ]
  }
];
