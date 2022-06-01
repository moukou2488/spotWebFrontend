import { only_no_auth, only_identity_completed } from "@/router/routerGuard";

export default [
  {
    path: "/user",
    name: "user",
    component: () => import("@/views/User/User.vue"),
    children: [
      {
        path: "sign-in",
        name: "user-sign-in",
        beforeEnter: only_no_auth,
        component: () => import("@/views/User/_SignIn.vue")
      },
      {
        path: "sign-up",
        name: "user-sign-up",
        redirect: "/user/sign-up/terms",
        component: () => import("@/views/User/_SignUp.vue"),
        children: [
          {
            path: "terms",
            name: "sign-up-terms",
            component: () => import("@/views/User/SignUp/_Terms")
          },
          {
            path: "form",
            name: "sign-up-form",
            component: () => import("@/views/User/SignUp/_Form")
          }
        ]
      },
      {
        path: "mail-auth",
        name: "user-mail-auth",
        component: () => import("@/views/User/_MailAuth.vue")
      },
      {
        path: "pwd",
        name: "user-pwd",
        redirect: "/user/pwd/find",
        component: () => import("@/views/User/_Pwd.vue"),
        children: [
          {
            path: "find",
            name: "user-pwd-find",
            component: () => import("@/views/User/Pwd/_Find.vue")
          },
          {
            path: "reset",
            name: "user-pwd-reset",
            beforeEnter: only_identity_completed,
            component: () => import("@/views/User/Pwd/_Reset.vue")
          }
        ]
      }
    ]
  }
];
