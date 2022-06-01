import axios from "axios";
import router from "@/router/index";

import terms_list from "@/assets/data/terms_list.js";
import notify_list from "@/assets/data/notify_list.js";
import question_list from "@/assets/data/question_list.js";
import items from "@/assets/data/deleteReason.js";

const BASE_URL = "/api";

export default {
  namespaced: true,
  state: {
    my_block_user_list: [],

    terms_list: [
      {
        id: 0,
        main_text: "SPOT BUDDY 이용약관",
        date_info: "2021.03.20",
        item: "spot_term",
        detail: terms_list.spot_term.detail
      },
      {
        id: 1,
        main_text: "개인정보 이용약관",
        date_info: "2021.03.20",
        item: "personal_term",
        detail: terms_list.personal_term.detail
      },
      {
        id: 2,
        main_text: "프로모션 정보 수신",
        date_info: "2021.03.20",
        item: "ad_term",
        detail: terms_list.ad_term.detail
      }
    ],
    notify_list,
    question_list, // 자주 묻는 질문
    notify_detail: null,

    // 탈퇴
    why_delete: "",
    etc_why: "",

    // 푸쉬 알림 설정
    push_alert: {
      activityTurnOn: false,
      messageTurnOn: false,
      promoTurnOn: false,
      scheduleTurnOn: false
    }
  },
  mutations: {
    set_my_block_user_list(state, list) {
      state.my_block_user_list = list;
    },
    set_notify_detail(state, payload) {
      state.notify_detail = payload;
    },
    set_why_delete(state, reason) {
      state.why_delete = reason;
    },
    set_etc_why(state, etc) {
      state.etc_why = etc;
    },
    set_push_alert(state, payload) {
      state.push_alert = payload;
    }
  },
  actions: {
    // 내가 차단한 유저들
    async api_get_block_my_list({ commit }) {
      commit("set_my_block_user_list", []);
      const response = await axios.get(`${BASE_URL}/block/my-list`);
      commit("set_my_block_user_list", response.data);
    },
    async api_post_block_cancel({ dispatch }, block_user_nick) {
      try {
        await axios.post(`${BASE_URL}/block/cancel`, {
          nickname: block_user_nick
        });
        dispatch("api_get_block_my_list"); // 리스트 갱신
      } catch (error) {
        console.log(error);
      }
    },

    // 탈퇴
    async api_post_delete_member({ state }) {
      let reasonIndex = 0;
      let etc = "";

      items.forEach(item => {
        if (item.text === state.why_delete) {
          if (item.index === 0) {
            etc = state.etc_why;
          }
          reasonIndex = item.index;
        }
      });
      try {
        await axios.post(`${BASE_URL}/delete-member`, {
          reasonIndex,
          etc
        });
      } catch (error) {
        if (error.response.status === 500) router.push("/error/500");
      }
    },

    // 내 푸쉬 알림 상태 가져오기
    async api_get_push_alarm_status({ commit }) {
      const response = await axios.get(`${BASE_URL}/push-alarm/my-status`);
      commit("set_push_alert", response.data);
    },

    // 내 푸쉬 알림 상태 바꾸기
    async api_post_push_alarm_setting({ dispatch }, payload) {
      await axios.post(`${BASE_URL}/push-alarm/setting`, payload);
      await dispatch("api_get_push_alarm_status");
    }
  }
};
