import router from "@/router/index";
import axios from "axios";
import eventBus from "@/eventBus.js";

const BASE_URL = "/api";
const OAUTH_BASE_URL =
  "http://ec2-3-35-213-43.ap-northeast-2.compute.amazonaws.com:8080/api/oauth2/authorization";

const config = {
  headers: {
    "Content-Type": "application/json"
  }
};

const userStore = {
  namespaced: true,
  state: {
    sign_in_error: false,
    mail_auth: false,
    user_info: null,
    identity_complete: false,

    check_ad_term: false, // 프로모션 동의 여부
    valid_email: false,
    valid_nickname: false,
    user_mail_auth: null,
    pass_find_email: ""
  },
  getters: {
    user_gender(state) {
      const gender = state.user_info.gender;
      return gender === 1 ? "남성" : "여성";
    },
    /**
     * 로그인한 유저의 나이를 반환
     * @param {Object} state 로그인한 유저의 생년월일 (e.g 19950711)
     * @return {Number} 로그인한 유저의 올해 나이를 반환 2021 - 1995 + 1
     */
    user_age(state) {
      // 년도만
      const birth_year = Number(state.user_info.birth.substring(0, 4));
      const current_year = new Date().getFullYear();
      return current_year - birth_year + 1; // 만 나이로 해야하나..?
    }
  },
  mutations: {
    set_sign_in_error(state, bool) {
      state.sign_in_error = bool;
      if (bool) {
        setTimeout(() => {
          state.sign_in_error = false;
        }, 2000);
      }
    },
    set_user_info(state, payload) {
      state.user_info = payload;
    },
    set_check_ad_term(state, bool) {
      state.check_ad_term = bool;
    },
    set_identity_complete(state, bool) {
      state.identity_complete = bool;
    },
    set_valid_email(state, bool) {
      state.valid_email = bool;
    },
    set_valid_nickname(state, res) {
      state.valid_nickname = res;
    },
    set_pass_find_email(state, email) {
      state.pass_find_email = email;
    },
    set_user_mail_auth(state, payload) {
      state.user_mail_auth = payload;
    }
  },
  actions: {
    // 로그인
    async api_login({ commit, dispatch }, payload) {
      const { email, password, rememberMe } = payload;
      try {
        const response = await axios.post(
          `${BASE_URL}/login?rememberMe=${rememberMe}`,
          { email, password },
          config
        );
        if (window.webkit) {
          // ios 로그인 call
          window.webkit.messageHandlers.login.postMessage({
            email: email,
            maintain: rememberMe,
            session: response.data.jsessionid
          });
        }
        commit("set_sign_in_error", false);
        commit("set_pass_find_email", "");
        await dispatch("api_users");
        dispatch("communityStore/clear_commu_state", null, { root: true });
        return true;
      } catch (error) {
        if (error.response.status === 500) router.push("/error/500");
        else commit("set_sign_in_error", true);
        return false;
      }
    },

    async api_sign_up({ commit }, payload) {
      try {
        const response = await axios.post(`${BASE_URL}/sign-up`, payload);
        const nickEmail = {
          nickname: payload.nickname,
          email: payload.email
        };
        commit("set_user_mail_auth", nickEmail);
        return response.data;
      } catch (err) {
        console.dir("회원가입 실패!", err);
      }
    },
    async api_send_email(context, payload) {
      await axios.post(`${BASE_URL}/send-email`, payload);
    },
    async api_resend_email({ dispatch }, payload) {
      dispatch("modalStore/config_toast_show", "이메일이 재전송되었습니다!", {
        root: true
      });
      await axios.post(`${BASE_URL}/resend-email`, {
        email: payload
      });
    },
    async api_valid_email({ commit }, payload) {
      const response = await axios.post(`${BASE_URL}/valid-email`, {
        email: payload
      });
      commit("set_valid_email", response.data.message);
    },
    async api_valid_nickname({ commit }, payload) {
      const response = await axios.post(`${BASE_URL}/valid-nickname`, {
        nickname: payload
      });
      commit("set_valid_nickname", response.data.message);
    },

    async api_users({ commit, state }) {
      try {
        const response = await axios.post(`${BASE_URL}/users`);
        commit("set_user_info", response.data);
      } catch (error) {
        if (state.user_info !== null) {
          if (error.response.status === 401) {
            eventBus.$emit("alert", { type: "session" });
            router.push("/");
            commit("set_user_info", null);
          } else if (error.response.status === 500) {
            router.push("/error/500");
          }
        }
      }
    },

    async api_logout({ commit }) {
      try {
        if (window.webkit) {
          // ios 로그아웃 call
          window.webkit.messageHandlers.logout.postMessage("");
        }
        await axios.post(`${BASE_URL}/logout`);
        commit("set_user_info", null);
      } catch (err) {
        console.dir("로그아웃 실패!", err);
      }
    },

    async api_oauth_kakao() {
      try {
        await axios.post(`${OAUTH_BASE_URL}/kakao`);
      } catch (error) {
        console.dir(error);
      }
    },

    async api_oauth_naver() {
      try {
        await axios.post(`${OAUTH_BASE_URL}/naver`);
      } catch (error) {
        console.dir(error);
      }
    },

    async api_oauth_google() {
      try {
        await axios.post(`${OAUTH_BASE_URL}/google`);
      } catch (error) {
        console.dir(error);
      }
    },

    async api_post_setting_modify_info({ dispatch, state }, payload) {
      try {
        await axios.post(`${BASE_URL}/settings/modify-info`, payload);

        const { password } = payload;
        const email = state.user_info.email;
        const rememberMe = true;

        await dispatch("api_login", { password, email, rememberMe });
      } catch (error) {
        console.dir(error);
      }
    },
    // 이메일 인증 번호 발송
    async api_setting_password_send_email(context, payload) {
      const response = await axios.post(
        `${BASE_URL}/setting/password/send-email`,
        payload
      );
      return response.data.message;
    },

    // 인증 번호 체크
    async api_setting_password_token_check(context, payload) {
      const response = await axios.post(
        `${BASE_URL}/setting/password/token-check`,
        payload
      );
      return response.data.message;
    },

    async api_setting_password_reset({ state }, password) {
      const payload = {
        email: state.pass_find_email,
        password
      };
      try {
        await axios.post(`${BASE_URL}/setting/password/reset`, payload);
        return true;
      } catch (error) {
        if (error.response.status === 500) router.push("/error/500");
        return false;
      }
    }
  }
};

export default userStore;
