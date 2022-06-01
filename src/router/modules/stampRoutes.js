import store from "@/store/index.js";
import eventBus from "@/eventBus.js";
import router from "@/router/index.js";

export default [
  {
    path: "/stamp/index",
    name: "stamp-index",
    component: () => import("@/views/Stamp/_Index.vue")
  },
  {
    path: "/stamp/write",
    name: "stamp-write",
    async beforeEnter(to, from, next) {
      await store.dispatch("userStore/api_users");
      const user_info = store.getters.user_info;
      if (!user_info) {
        eventBus.$emit("alert", { type: "login" });
        next(from); // 이전 페이지로 돌아가기
      } else {
        // 이메일 인증
        if (user_info.emailVerified === false) {
          eventBus.$emit("alert", { type: "email-auth" });
          next(from);
        } else {
          const modify_id = store.state.stampStore.modify_stamp_id;
          if (from.name === "stamp-detail" && modify_id === null) {
            router.go(-1);
          } else {
            if (from.name !== "stamp-detail" && modify_id !== null) {
              store.commit("stampStore/clear_state");
            }
            next();
          }
        }
      }
    },
    component: () => import("@/views/Stamp/_Write.vue")
  },
  {
    path: "/stamp/detail/:id",
    name: "stamp-detail",
    beforeEnter: async (to, from, next) => {
      await store.dispatch("stampStore/api_stamp_detail", to.params.id);
      if (store.getters.user_info) {
        await store.dispatch("stampStore/api_scrap_check", to.params.id);
      }
      next();
    },
    component: () => import("@/views/Stamp/_Detail.vue")
  }
];
