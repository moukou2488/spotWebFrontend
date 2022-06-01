import axios from "axios";
import router from "@/router/index.js";

const BASE_URL = "/api";

export default {
  namespaced: true,
  state: {
    violationIndex: 1,
    etc: "",
    report_item: "",
    report_id: ""
  },
  mutations: {
    set_violationIndex(state, index) {
      state.violationIndex = index;
    },
    set_etc(state, etc) {
      state.etc = etc;
    },
    set_report_item(state, item) {
      state.report_item = item;
    },
    set_report_id(state, id) {
      state.report_id = id;
    }
  },
  actions: {
    // 동행 신고
    async api_post_report({ state, commit }) {
      const { violationIndex, etc } = state;
      try {
        if (state.report_item === "tour")
          await axios.post(
            `${BASE_URL}/report-tour-violate/${state.report_id}`,
            {
              violationIndex,
              etc
            }
          );
        else if (state.report_item === "user")
          await axios.post(`${BASE_URL}/report-member-violate/`, {
            violationIndex,
            etc,
            nickname: state.report_id
          });
        else if (state.report_item === "commu")
          await axios.post(
            `${BASE_URL}/report-post-violate/${state.report_id}`,
            {
              violationIndex,
              etc
            }
          );
        else if (state.report_item === "comment")
          await axios.post(
            `${BASE_URL}/report-comment-violate/${state.report_id}`,
            {
              violationIndex,
              etc
            }
          );

        commit("set_violationIndex", 1);
        commit("set_etc", "");
        router.go(-1);
      } catch (err) {
        console.log(err);
      }
    }
  }
};
