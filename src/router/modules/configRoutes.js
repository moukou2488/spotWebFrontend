import { only_auth } from "@/router/routerGuard";
import store from "@/store/index.js";

export default [
  {
    path: "/config/home",
    name: "config-home",
    beforeEnter: only_auth,
    component: () => import("@/views/Config/_Home.vue")
  },
  {
    path: "/config/push_alert",
    name: "config-push-alert",
    beforeEnter: only_auth,
    component: () => import("@/views/Config/_PushAlert.vue")
  },
  {
    path: "/config/choice_auth",
    name: "config-choice-auth",
    beforeEnter: only_auth,
    component: () => import("@/views/Config/_ChoiceAuth.vue")
  },
  {
    path: "/config/block_user",
    name: "config-block-user",
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
        await store.dispatch("configStore/api_get_block_my_list");
        next();
      }
    },
    component: () => import("@/views/Config/_BlockUser.vue")
  },
  {
    path: "/config/delete_user",
    name: "config-delete-user",
    beforeEnter: only_auth,
    component: () => import("@/views/Config/_DeleteUser.vue")
  },
  {
    path: "/config/delete_confirm",
    name: "config-delete-confirm",
    beforeEnter: only_auth,
    component: () => import("@/views/Config/_DeleteConfirm.vue")
  },
  {
    path: "/config/delete_complete",
    name: "config-delete-complete",
    beforeEnter: only_auth,
    component: () => import("@/views/Config/_DeleteComplete.vue")
  },
  {
    path: "/config/app_info",
    name: "정보",
    beforeEnter: only_auth,
    component: () => import("@/views/Config/_AppInfoList.vue")
  },
  {
    // 자주 묻는 질문
    path: "/config/question_list",
    name: "config-question-list",
    beforeEnter: only_auth,
    component: () => import("@/views/Config/_QuestionList.vue")
  },
  {
    // 공지사항 목록
    path: "/config/notify_list",
    name: "공지사항",
    beforeEnter: only_auth,
    component: () => import("@/views/Config/_NotifyList.vue")
  },
  {
    // 공지사항 상세 보기
    path: "/config/notify_detail/:category/:item",
    name: "config-notify-detail",
    beforeEnter: only_auth,
    component: () => import("@/views/Config/_NotifyDetail.vue")
  }
];
