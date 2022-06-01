import Vue from "vue";
import Vuex from "vuex";

import recentSearchStore from "./modules/recentSearchStore.js";
import homeSearchStore from "./modules/homeSearchStore.js";
import modalStore from "./modules/modalStore.js";
import userStore from "./modules/userStore.js";
import gameScheduleStore from "./modules/gameScheduleStore.js";
import profileStore from "./modules/profileStore.js";
import configStore from "./modules/configStore.js";
import companyStore from "./modules/companyStore.js";
import companyWriteStore from "./modules/companyWriteStore.js";
import notifyStore from "./modules/notifyStore.js";
import reportStore from "./modules/reportStore.js";
import communityStore from "./modules/communityStore.js";
import scrollStore from "./modules/scrollStore.js";
import stampStore from "./modules/stampStore.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {
    user_info() {
      return userStore.state.user_info;
    },
    identity_complete() {
      return userStore.state.identity_complete;
    },
    compnay_detail() {
      return companyStore.state.company_detail;
    }
  },
  modules: {
    recentSearchStore,
    homeSearchStore,
    modalStore,
    userStore,
    gameScheduleStore,
    profileStore,
    configStore,
    companyStore,
    companyWriteStore,
    notifyStore,
    reportStore,
    communityStore,
    scrollStore,
    stampStore
  }
});
