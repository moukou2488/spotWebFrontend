export default {
  namespaced: true,
  state: {
    auto_save: true,
    search_list: {
      home: [],
      company: [],
      community: []
    }
  },
  mutations: {
    toggle_auto_save(state) {
      state.auto_save = !state.auto_save;
    },
    set_search_list(state, payload) {
      const { which, list } = payload;
      state.search_list[which] = list;
    },
    splice_search_list(state, payload) {
      const { which, delete_index } = payload;
      state.search_list[which].splice(delete_index, 1);
    }
  },
  actions: {
    // 최근 검색어 자동 완성
    auto_complete_search_list({ dispatch, state, commit }, payload) {
      const { which, query } = payload;
      dispatch("get_search_list", which); // 로컬 스토리지를 통해 최신화 받아옴
      if (query.length > 0) {
        const seach_list = state.search_list[which];
        const filtered = seach_list.map(log => {
          if (log.query.indexOf(query) > -1) {
            return {
              id: log.id,
              query: log.query,
              replace_query: log.query.replaceAll(
                query,
                `<strong style="color: #3bb1ff">${query}</strong>`
              )
            };
          } else
            return {
              id: log.id,
              query: log.query,
              hide: true
            };
        });
        commit("set_search_list", { which, list: filtered }); // 필터링 해서 다시 추가
      }
    },

    // 검색 추가
    unshift_search_log({ commit }, payload) {
      const { which, query } = payload;

      let search_list_str = localStorage.getItem(`${which}_search_list`);

      const search_log = {
        id: Date.now(),
        query
      };

      // 검색 기록이 있다면
      if (search_list_str) {
        let search_list_arr = JSON.parse(search_list_str);

        let duplicate_index = search_list_arr.findIndex(
          log => log.query === query
        );

        // 검색한 이력이 있는 검색어라면
        if (duplicate_index !== -1) {
          search_list_arr.splice(duplicate_index, 1);
        }

        // 검색 이력이 이미 10개라면 제일 예전 검색어 삭제
        if (search_list_arr.length === 10) search_list_arr.pop();

        search_list_arr.unshift(search_log);

        localStorage.setItem(
          `${which}_search_list`,
          JSON.stringify(search_list_arr)
        );
        commit("set_search_list", {
          which,
          list: search_list_arr
        });
      } else {
        // 검색 기록이 없으면 등록해준다.
        localStorage.setItem(
          `${which}_search_list`,
          JSON.stringify([search_log])
        );
        commit("set_search_list", {
          which,
          list: [search_log]
        });
      }
    },

    // 최근 검색어 가져오기
    get_search_list({ commit }, which) {
      let result_arr = [];
      let search_list_str = localStorage.getItem(`${which}_search_list`);
      // 검색 기록이 있다면
      if (search_list_str) result_arr = JSON.parse(search_list_str);

      commit("set_search_list", { which, list: result_arr });
    },

    // 검색 로그 삭제
    delete_search_log({ state, commit, dispatch }, payload) {
      const { which } = payload;
      dispatch("get_search_list", payload.which);

      commit("splice_search_list", payload);
      localStorage.setItem(
        `${which}_search_list`,
        JSON.stringify(state.search_list[which])
      );
    },

    clear_search_list({ commit }, which) {
      commit("set_search_list", { which, list: [] });
      localStorage.removeItem(`${which}_search_list`);
    }
  }
};
