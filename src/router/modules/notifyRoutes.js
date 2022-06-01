import store from "@/store/index.js";
import eventBus from "@/eventBus.js";

import { only_email_auth } from "@/router/routerGuard";

export default [
  {
    path: "/notify/chat",
    name: "notify-chat",
    beforeEnter: only_email_auth,
    component: () => import("@/views/Notify/_Chat.vue")
  },
  {
    path: "/notify/alert",
    name: "notify-alert",
    beforeEnter: only_email_auth,
    component: () => import("@/views/Notify/_Alert.vue")
  },
  {
    path: "/alert-detail",
    name: "alert-detail",
    beforeEnter: only_email_auth,
    component: () => import("@/views/Notify/_AlertDetail.vue")
  },
  {
    path: "/chat-detail/:id",
    name: "chat-detail",
    beforeEnter: async (to, from, next) => {
      await store.dispatch("userStore/api_users");
      const user_info = store.getters.user_info;
      await store.dispatch("notifyStore/api_confirm_tour_bool", to.params.id);
      if (!user_info) {
        store.dispatch("modalStore/config_dialog_state", {
          modal_state: true,
          modal_type: "login",
          dialog_scroll_height: window.scrollY
        });
        next(from); // 이전 페이지로 돌아가기
      } else {
        if (user_info.emailVerified === false) {
          eventBus.$emit("alert", { type: "email-auth" });
          next(from);
        } else {
          // chatRoomID, tourId
          await store.dispatch(
            "notifyStore/get_chatroom",
            Number(to.params.id)
          );
          await store.dispatch(
            "notifyStore/api_cancel_state",
            store.state.notifyStore.company_detail.tourId
          );
          await store.dispatch("notifyStore/api_chat_info", to.params.id);
          next();
        }
      }
    },
    component: () => import("@/views/Notify/_ChatDetail.vue")
  }
];
