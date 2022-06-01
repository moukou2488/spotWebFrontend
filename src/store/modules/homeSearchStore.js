import axios from "axios";

export default {
  namespaced: true,
  state: {
    query: "",
    view_type: "all",
    company_search_list: [],
    community_search_list: [],
    is_search: false,
    is_search_end: false,

    search_list: [] // 최근 검색어
  },
  mutations: {
    set_query(state, str) {
      state.query = str;
    },
    set_is_search(state, bool) {
      state.is_search = bool;
    },
    set_is_search_end(state, bool) {
      state.is_search_end = bool;
    },
    set_view_type(state, type) {
      state.view_type = type;
    },
    set_company_search_list(state, list) {
      state.company_search_list = list;
    },
    set_community_search_list(state, list) {
      state.community_search_list = list;
    },
    set_search_list(state, list) {
      state.search_list = list;
    },
    splice_search_list(state, delete_index) {
      state.search_list.splice(delete_index, 1);
    }
  },
  actions: {
    clear_search_state({ commit }) {
      commit("set_query", "");
      commit("set_is_search", false);
      commit("set_view_type", "all");
      commit("set_company_search_list", []);
      commit("set_community_search_list", []);
      commit("set_is_search_end", false);
    },

    async api_home_search({ commit, dispatch }, query) {
      commit("set_is_search", true);
      commit("set_is_search_end", false);

      const company_list = await axios.post("/api/tour-search/home", {
        keyword: query
      });
      const community_list = await axios.post("/api/community/search", {
        keyword: query,
        teamIndex: -1,
        category: -1
      });
      commit("set_is_search_end", true);
      commit("set_company_search_list", company_list.data);
      commit("set_community_search_list", community_list.data);

      // 최근 검색어 추가
      dispatch(
        "recentSearchStore/unshift_search_log",
        { which: "home", query },
        { root: true }
      );
    }
  }
};
