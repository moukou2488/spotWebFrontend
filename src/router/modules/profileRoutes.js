import store from "@/store/index.js";
import { only_auth } from "@/router/routerGuard";
import router from "@/router/index.js";

export default [
  {
    path: "/profile/home",
    name: "profile-home",
    beforeEnter: only_auth,
    component: () => import("@/views/Profile/_Home.vue")
  },
  {
    path: "/profile/userpage/:nickname",
    name: "profile-user_page",
    beforeEnter: async (to, from, next) => {
      await store.dispatch("profileStore/api_your_profile", to.params.nickname);
      next();
    },
    component: () => import("@/views/Profile/_UserPage.vue")
  },
  {
    path: "/profile/modify",
    name: "profile-modify",
    beforeEnter: only_auth,
    component: () => import("@/views/Profile/_Modify.vue")
  },
  {
    path: "/profile/my_favorite_list",
    name: "profile-my_favorite_list",
    beforeEnter: only_auth,
    component: () => import("@/views/Profile/_MyFavoriteList.vue")
  },
  {
    path: "/profile/my_regist_company_list",
    name: "profile-my_regist_company_list",
    beforeEnter: async (to, from, next) => {
      await store.dispatch("userStore/api_users");
      if (!store.getters.user_info) {
        store.dispatch("modalStore/config_dialog_state", {
          modal_state: true,
          modal_type: "login",
          dialog_scroll_height: window.scrollY
        });
        next(from); // 이전 페이지로 돌아가기
      } else {
        await store.dispatch("profileStore/get_regist_company_list");
        next();
      }
    },
    component: () => import("@/views/Profile/_MyRegistCompanyList.vue")
  },
  {
    path: "/profile/my_join_company_list",
    name: "profile-my_join_company_list",
    beforeEnter: async (to, from, next) => {
      await store.dispatch("userStore/api_users");
      if (!store.getters.user_info) {
        store.dispatch("modalStore/config_dialog_state", {
          modal_state: true,
          modal_type: "login",
          dialog_scroll_height: window.scrollY
        });
        next(from); // 이전 페이지로 돌아가기
      } else {
        // 참여자 목록에서 진입한 경우 목록 최산화 x
        if (from.path !== "/profile/join_member_list") {
          await store.dispatch("profileStore/get_join_company_list");
          next();
        } else next();
      }
    },
    component: () => import("@/views/Profile/_MyJoinCompanyList.vue")
  },
  {
    path: "/profile/join_member_list/:id",
    name: "profile-join_member_list",
    beforeEnter: async (to, from, next) => {
      await store.dispatch("userStore/api_users");
      if (!store.getters.user_info) {
        store.dispatch("modalStore/config_dialog_state", {
          modal_state: true,
          modal_type: "login",
          dialog_scroll_height: window.scrollY
        });
        next(from); // 이전 페이지로 돌아가기
      } else {
        await store.dispatch("profileStore/api_get_tour_detail", to.params.id);
        next();
      }
    },
    component: () => import("@/views/Profile/_JoinMemberList.vue")
  },
  {
    // 평가하기
    path: "/profile/evaluate/:member_nick",
    name: "profile-evaluate",
    beforeEnter: async (to, from, next) => {
      await store.dispatch("userStore/api_users");
      if (!store.getters.user_info) {
        store.dispatch("modalStore/config_dialog_state", {
          modal_state: true,
          modal_type: "login",
          dialog_scroll_height: window.scrollY
        });
        next(from); // 이전 페이지로 돌아가기
      } else {
        if (
          from.name === "profile-evaluate-home" &&
          store.state.profileStore.modify_evaluate_id === null
        ) {
          router.go(-1);
          return;
        }
        await store.dispatch(
          "profileStore/api_your_profile",
          to.params.member_nick
        );
        next();
      }
    },
    component: () => import("@/views/Profile/_Evaluate.vue")
  },
  {
    path: "/profile/evaluate/short/:type",
    name: "profile-evaluate-short",
    beforeEnter: only_auth,
    component: () => import("@/views/Profile/_EvaluateShort.vue")
  },
  {
    path: "/profile/evaluate/home/:nickname",
    name: "profile-evaluate-home",
    beforeEnter: async (to, from, next) => {
      await store.dispatch("profileStore/api_your_profile", to.params.nickname);
      await store.dispatch(
        "profileStore/api_post_tour_review_detail",
        to.params.nickname
      );
      next();
    },
    component: () => import("@/views/Profile/_EvaluateHome.vue")
  },
  // 나의 작성 시리즈
  {
    path: "/profile/my_community_list",
    name: "profile-my_community_list",
    beforeEnter: async (to, from, next) => {
      await store.dispatch("userStore/api_users");
      if (!store.getters.user_info) {
        store.dispatch("modalStore/config_dialog_state", {
          modal_state: true,
          modal_type: "login",
          dialog_scroll_height: window.scrollY
        });
        next(from); // 이전 페이지로 돌아가기
      } else {
        await store.dispatch("profileStore/api_get_my_community_list");
        next();
      }
    },
    component: () => import("@/views/Profile/_MyCommunityList.vue")
  },
  {
    path: "/profile/my_community_comment",
    name: "profile-my_community_comment",
    beforeEnter: async (to, from, next) => {
      await store.dispatch("userStore/api_users");
      if (!store.getters.user_info) {
        store.dispatch("modalStore/config_dialog_state", {
          modal_state: true,
          modal_type: "login",
          dialog_scroll_height: window.scrollY
        });
        next(from); // 이전 페이지로 돌아가기
      } else {
        await store.dispatch("profileStore/api_get_my_community_comment");
        next();
      }
    },
    component: () => import("@/views/Profile/_MyCommunityComment.vue")
  },
  {
    path: "/profile/my_community_scrap",
    name: "profile-my_community_scrap",
    beforeEnter: async (to, from, next) => {
      await store.dispatch("userStore/api_users");
      if (!store.getters.user_info) {
        store.dispatch("modalStore/config_dialog_state", {
          modal_state: true,
          modal_type: "login",
          dialog_scroll_height: window.scrollY
        });
        next(from); // 이전 페이지로 돌아가기
      } else {
        await store.dispatch("profileStore/api_get_my_community_scrap");
        next();
      }
    },
    component: () => import("@/views/Profile/_MyCommunityScrap.vue")
  }
];
