export default [
  {
    path: "*",
    name: "error-404",
    component: () => import("@/views/Error/_404.vue")
  },
  {
    path: "/error/500",
    name: "error-500",
    component: () => import("@/views/Error/_500.vue")
  }
];
