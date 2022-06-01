export default [
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About/_Index.vue")
  },
  {
    path: "/about/weather",
    name: "about-weather",
    component: () => import("@/views/About/_Weather.vue")
  }
];
