import Home from "@/views/Home/Home.vue";
import store from "@/store/index.js";
export default [
  {
    path: "/",
    name: "home",
    beforeEnter: async (to, from, next) => {
      // 커뮤에서 홈으로 갈 경우 best 리스트를 초기화
      if (from.name === "community-index") {
        store.commit("communityStore/set_community_popular", []);
        store.commit("communityStore/set_popular_page_plus", 0);
      }
      next();
    },
    component: Home
  },
  {
    path: "/game_schedule/view_all",
    name: "game_schedule-view_all",
    component: () => import("@/views/Home/GameSchedule/_ViewAll.vue")
  },
  {
    path: "/search",
    name: "home-search",
    component: () => import("@/views/Home/_Search.vue")
  }
];
