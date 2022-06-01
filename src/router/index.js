import Vue from "vue";
import VueRouter from "vue-router";

import store from "../store/index";

import errorRoutes from "./modules/errorRoutes";
import homeRoutes from "./modules/homeRoutes";
import companyRoutes from "./modules/companyRoutes";
import notifyRoutes from "./modules/notifyRoutes";
import userRoutes from "./modules/userRoutes";
import profileRoutes from "./modules/profileRoutes";
import configRoutes from "./modules/configRoutes";
import communityRoutes from "./modules/communityRoutes";
import stampRoutes from "./modules/stampRoutes";
import aboutRoutes from "./modules/aboutRoutes";
import socialRoutes from "./modules/socialRoutes";

Vue.use(VueRouter);

const routes = [
  ...errorRoutes,
  ...aboutRoutes,
  ...homeRoutes,
  ...companyRoutes,
  ...userRoutes,
  ...profileRoutes,
  ...configRoutes,
  ...notifyRoutes,
  ...communityRoutes,
  ...stampRoutes,
  ...socialRoutes
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  store.commit("scrollStore/set_scroll_info", {
    route: from.name,
    scroll_y: window.scrollY
  });
  next();
});

// eslint-disable-next-line no-unused-vars
router.afterEach((to, from) => {
  if (Math.abs(history.length - store.state.scrollStore.history_length) > 1) {
    store.commit("scrollStore/set_history_length", history.length);
  } else {
    store.commit("scrollStore/add_history_length");
  }
  if (history.length === store.state.scrollStore.history_length) {
    // 새로운 페이지 진입
    window.scrollTo(0, 0);
  } else {
    // 뒤로가기
    const scroll_y = store.state.scrollStore.scroll_info[to.name];
    window.scrollTo(0, scroll_y);
    store.commit("scrollStore/set_history_length", history.length - 1);
  }
});

export default router;
