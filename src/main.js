import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueAwesomeSwiper from "vue-awesome-swiper";
import { padStart } from "lodash";
import eventBus from "./eventBus";

Vue.config.productionTip = false;
Vue.prototype._ = {
  padStart
};
Vue.use(VueAwesomeSwiper /* { default options with global component } */);

// import Swiper styles
import "swiper/swiper-bundle.css";

// 모달용 이벤트 버스
Vue.prototype.$eventBus = eventBus;

new Vue({
  router,
  store,
  vuetify,
  watch: {
    // 페이지가 변화되어 mounted 가 호출이 안 되는 문제
    $route() {
      eventBus.$off("alert_close");
      eventBus.$on("alert_close", payload => {
        if (payload.type == "email-auth") {
          this.$router.push({ path: "/profile/home" });
        }
      });
    }
  },
  async beforeCreate() {
    await store.dispatch("userStore/api_users");
  },
  mounted() {
    eventBus.$on("alert", () => {
      document.querySelector("html").classList.add("modal-on");
    });
    eventBus.$on("alert_close", payload => {
      if (payload.type == "email-auth") router.push("/profile/home");
    });
  },
  destroyed() {
    eventBus.$off("alert_close");
  },
  render: h => h(App)
}).$mount("#app");
