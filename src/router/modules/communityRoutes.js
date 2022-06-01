import router from "@/router/index.js";
import store from "@/store/index.js";

export default [
  {
    path: "/community",
    name: "community",
    redirect: "/community/index",
    component: () => import("@/views/Community/Community.vue"),
    children: [
      {
        path: "index",
        name: "community-index",
        beforeEnter: async (to, from, next) => {
          // 홈에서 커뮤로 갈 경우 best 리스트를 초기화
          if (from.name === "home") {
            store.commit("communityStore/set_community_popular", []);
            store.commit("communityStore/set_popular_page_plus", 0);
          }
          next();
        },
        component: () => import("@/views/Community/_Index.vue")
      },
      {
        path: "rank",
        name: "community-rank",
        component: () => import("@/views/Community/_Rank.vue")
      },
      {
        path: "team/:idx",
        name: "community-team",
        beforeEnter: async (to, from, next) => {
          await store.dispatch(
            "communityStore/community_team_item",
            to.params.idx
          );
          await store.dispatch("communityStore/api_team_count", to.params.idx);

          // 커뮤 상세에서 뒤로 갈 경우 리스트를 초기화하지 않도록
          if (from.name !== "community-detail") {
            store.commit("communityStore/set_team_list", []);
            store.commit("communityStore/set_filter_index", 0);
            store.commit("communityStore/set_page_plus", 0);
          }
          next();
        },
        component: () => import("@/views/Community/_Team.vue")
      },
      {
        path: "detail/:idx/:id",
        name: "community-detail",
        beforeEnter: async (to, from, next) => {
          await store.dispatch("userStore/api_users");
          await store.dispatch(
            "communityStore/community_team_item",
            to.params.idx
          );
          await store.dispatch(
            "communityStore/api_community_detail",
            to.params.id
          );
          if (store.getters.user_info) {
            await store.dispatch(
              "communityStore/api_scrap_check",
              to.params.id
            );
          }
          next();
        },
        component: () => import("@/views/Community/_Detail.vue")
      },
      {
        path: "write/:idx",
        name: "community-write",
        beforeEnter: async (to, from, next) => {
          const modify_id = store.state.communityStore.modify_community_id;

          if (from.name === "community-detail" && modify_id === null) {
            router.go(-1);
          } else {
            await store.dispatch(
              "communityStore/community_team_item",
              to.params.idx
            );
            next();
          }
        },
        component: () => import("@/views/Community/_Write.vue")
      },
      {
        path: "search",
        name: "community-search",
        component: () => import("@/views/Community/_Search.vue")
      }
    ]
  }
];
