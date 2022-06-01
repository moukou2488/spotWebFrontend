import store from "@/store/index.js";
import eventBus from "@/eventBus.js";

const only_auth = async (to, from, next) => {
  await store.dispatch("userStore/api_users");
  const user_info = store.getters.user_info;
  if (!user_info) {
    eventBus.$emit("alert", {
      type: "login"
    });
    next(from); // 이전 페이지로 돌아가기
  } else {
    next();
  }
};

const only_email_auth = async (to, from, next) => {
  await store.dispatch("userStore/api_users");
  const user_info = store.getters.user_info;
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
    } else next();
  }
};

const only_no_auth = async (to, from, next) => {
  await store.dispatch("userStore/api_users");
  if (store.getters.user_info) {
    // 웹 화면이 아닌 이상 직접 접근이 불가능하므로 alert 처리
    next("/profile/home"); // 이전 페이지로 돌아가기
  } else {
    next();
  }
};

const only_identity_completed = (to, from, next) => {
  if (!store.getters.identity_complete) {
    // 웹 화면이 아닌 이상 직접 접근이 불가능하므로 alert 처리
    alert("본인 인증을 해주십시오.");
    next("/user/pwd");
  } else {
    next();
  }
};

export { only_auth, only_no_auth, only_identity_completed, only_email_auth };
