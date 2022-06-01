// import Home from "@/views/Home/Home.vue";
// import store from "@/store/index.js";

export default [
  {
    path: "/apple-login",
    name: "apple-login",
    component: () => import("@/views/Social/_Apple.vue")
  }
];
