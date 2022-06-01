import router from "@/router/index";
import axios from "axios";
import eventBus from "@/eventBus.js";

const BASE_URL = "/api";
const notifyStore = {
  namespaced: true,
  state: {
    chatroom_id: "",
    chat_message: [],
    chat_list: [],
    alert_list: [],
    confirmed: false,
    notify_last_visit: "alert",
    counter_nick: "",
    company_detail: {},
    tour_cancle_state: false
  },
  mutations: {
    set_chatroom_id(state, payload) {
      state.chatroom_id = payload;
    },
    set_chat_message(state, payload) {
      state.chat_message = payload;
    },
    set_chat_list(state, payload) {
      state.chat_list = payload;
    },
    set_alert_list(state, payload) {
      state.alert_list = payload;
    },
    set_confirm_tour(state, payload) {
      state.confirmed = payload;
    },
    set_notify_last_visit(state, str_path) {
      state.notify_last_visit = str_path;
    },
    set_counter_nick(state, nickname) {
      state.counter_nick = nickname;
    },
    set_company_detail(state, payload) {
      state.company_detail = payload;
    },
    set_tour_cancle_state(state, payload) {
      state.tour_cancle_state = payload;
    }
  },
  actions: {
    async api_get_chatroom_list({ commit }) {
      try {
        const response = await axios.get(`${BASE_URL}/chat/my-list`);
        commit("set_chat_list", response.data);
        return response.data;
      } catch (error) {
        if (error.response.status === 401) {
          eventBus.$emit("alert", { type: "login" });
          router.push("/");
        }
      }
    },

    async api_get_alertroom_list({ commit }) {
      const response = await axios.get(`${BASE_URL}/alarm/my-list`);
      commit("set_alert_list", response.data);
      return response.data;
    },

    async get_chatroom({ commit }, chatroom_id) {
      const response = await axios.get(
        `${BASE_URL}/chat/tour-info/${chatroom_id}`
      );
      commit("set_chatroom_id", chatroom_id);
      commit("set_company_detail", response.data);
    },

    async api_create_room({ commit }, id) {
      try {
        const response = await axios.post(`${BASE_URL}/chat/new/${id}`);
        commit("set_chatroom_id", response.data.chatRoomId);
      } catch (err) {
        console.dir("채팅방 생성 실패!", err);
      }
    },

    async api_get_chat({ commit }, id) {
      const response = await axios.get(`${BASE_URL}/message-list/${id}`);
      commit("set_chat_message", response.data);
    },

    async api_confirm_tour(context, payload) {
      await axios.post(`${BASE_URL}/confirm-tour/${payload.companyId}`, {
        chatRoomId: payload.chatRoomId
      });
    },

    async api_cancel_state({ commit }, id) {
      const response = await axios.get(`${BASE_URL}/cancel-state/${id}`);
      commit("set_tour_cancle_state", response.data.canceled);
    },

    async api_confirm_tour_bool({ commit }, id) {
      try {
        const response = await axios.get(`${BASE_URL}/chat/is-confirmed/${id}`);
        commit("set_confirm_tour", response.data.confirmed);
      } catch (error) {
        if (error.response.status === 401) {
          eventBus.$emit("alert", { type: "login" });
          router.push("/");
        }
      }
    },

    async api_chat_read(context, id) {
      await axios.post(`${BASE_URL}/chat/read/${id}`);
    },

    async api_alarm_read(context, id) {
      await axios.post(`${BASE_URL}/alarm/read/${id}`);
    },

    async api_chat_delete(context, id) {
      await axios.post(`${BASE_URL}/chat/delete/${id}`);
    },

    async api_alert_delete(context, id) {
      await axios.post(`${BASE_URL}/alarm/delete/${id}`);
    },
    // 상대방 닉네임 알아내기
    async api_chat_info({ commit }, id) {
      const response = await axios.get(`${BASE_URL}/chat/info/${id}`);
      commit("set_counter_nick", response.data.yourNickname);
    },

    async api_get_alarm_read_status({ dispatch, rootState }) {
      await dispatch("userStore/api_users", "payload", { root: true });
      if (rootState.userStore.user_info) {
        const response = await axios.get(`${BASE_URL}/alarm/read-status`);
        return response.data.alarmRead;
      } else return true;
    },
    async api_all_confirm(context, id) {
      const response = await axios.get(`${BASE_URL}/chat/all-confirm/${id}`);
      return response.data.confirmed;
    },
    async api_chat_enter(context, id) {
      await axios.post(`${BASE_URL}/chat/enter/${id}`);
    },
    async api_chat_out(context, id) {
      await axios.post(`${BASE_URL}/chat/out/${id}`);
    }
  }
};
export default notifyStore;
