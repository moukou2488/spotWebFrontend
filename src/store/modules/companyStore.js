import axios from "axios";
import router from "@/router/index";

const BASE_URL = "/api";

const companyStore = {
  namespaced: true,
  state: {
    company_list_order: "latest", // 동행 정렬 방법 (latest, popular)
    company_list: [], // 동행 리스트
    company_detail: null, // 동행 상세 페이지 정보
    company_search_list: [], // 동행 검색 결과 리스트
    company_recommend_list: [], // 동행 추천 리스트
    company_theme_search_list: [], // 동행 테마 검색 리스트

    // 동행 검색 날짜 -> 경기로 검색하는 방식으로 변경될 예정
    company_search_date: {
      start_date: "",
      end_date: ""
    },
    // 동행 검색 키워드 -> 경기로 검색하는 방식으로 변경될 예정
    company_search_keyword: "",
    is_my_company_detail: false, // 내가 쓴 동행 글인지 확인
    scrap_event: false, // 스크랩을 하게 될 경우 true
    company_scroll_index: 0 // 동행 리스트에서 동행 상세로 넘어갈 경우 스크롤 위치를 기억,
  },
  mutations: {
    set_company_theme_search_list(state, list) {
      state.company_theme_search_list = list;
    },
    set_company_scroll_index(state, index) {
      state.company_scroll_index = index;
    },
    set_company_list_order(state, order_type) {
      state.company_list_order = order_type;
    },
    set_company_list(state, list) {
      state.company_list = list;
    },
    concat_company_list(state, list) {
      state.company_list = [...state.company_list, ...list];
    },
    set_company_detail(state, data) {
      state.company_detail = data;
    },
    set_company_search_list(state, list) {
      state.company_search_list = list;
    },
    // 진행 중인 추천 목록 5 개
    set_company_recommend_list(state, list) {
      state.company_recommend_list = list;
    },
    //
    set_company_search_date(state, date_list) {
      state.company_search_date.start_date = date_list[0];
      state.company_search_date.end_date = date_list[1];
    },
    // 키워드 검색어 v-model 역할
    set_company_search_keyword(state, str) {
      state.company_search_keyword = str;
    },
    set_is_my_company_detail(state, bool) {
      state.is_my_company_detail = bool;
    },
    set_scrap_event(state, bool) {
      state.scrap_event = bool;
    },
    set_scroll_y(state, scroll_height) {
      state.scroll_y = scroll_height;
    }
  },
  actions: {
    // 동행 정렬 방법을 변경
    get_tour_list({ commit }, order_type) {
      commit("set_company_list_order", order_type); // 현재 리스트 정렬 순서 설정
      commit("set_company_list", []); // 최신순 -> 인기순 처럼 타입이 변경될 경우 동행 리스트를 초기화
    },

    // 동행 검색 날짜 데이터 셋팅
    action_company_search_date({ commit }, date) {
      if (date.length === 1) commit("set_company_search_date", [date[0], ""]);
      else commit("set_company_search_date", date);
    },

    // 동행 리스트 가져오기
    async api_get_tour({ state, commit, rootState }, page) {
      let URL = `${BASE_URL}/tour-list`;

      // 등록일순, 관심순은 filter/0, filter/popular/0
      // 내 성별, 내 연령대 -> gender/0, age/0
      // 동행 날씨, 모집 마감일 -> weather/filter/0, end/filter/0

      if (
        state.company_list_order === "latest" ||
        state.company_list_order === "popular"
      ) {
        // 로그인한 유저인지 아닌지 -> 로그인했으면 차단된 유저의 글은 안 가져온다.
        if (rootState.userStore.user_info) URL = `${URL}/filter`;
        if (state.company_list_order === "popular") URL = `${URL}/popular`;
      } else {
        URL = `${URL}/${state.company_list_order}`;
        if (
          state.company_list_order === "weather" ||
          state.company_list_order === "end"
        ) {
          // 로그인한 유저인지 아닌지 -> 로그인했으면 차단된 유저의 글은 안 가져온다.
          if (rootState.userStore.user_info) URL = `${URL}/filter`;
        }
      }

      let company_list = await axios.get(`${URL}/${page}`);

      /**
       * 로그인이 되어있는 유저라면
       * 자신의 글인지 여부를 체크해준다.
       */
      if (rootState.userStore.user_info) {
        const my_list = await axios.get(`${BASE_URL}/my-tour-list`);

        company_list.data.forEach(item => {
          for (let i = 0; i < my_list.data.length; i++) {
            if (item.id === my_list.data[i].id) {
              item.is_my_company = true;
              break;
            } else item.is_my_company = false;
          }
        });
      }

      commit("concat_company_list", company_list.data);
      return company_list.data;
    },

    // 동행 글 상세 보기
    async api_get_tour_detail({ commit }, id) {
      const response = await axios.get(`${BASE_URL}/tour-detail/${id}`);
      commit("set_company_detail", response.data);
    },

    // 동행 검색
    async api_post_tour_search({ state, commit }) {
      let keyword = null;
      let tourStartDate = null;
      let tourEndDate = null;

      if (state.company_search_keyword !== "") {
        keyword = state.company_search_keyword;
      }
      if (state.company_search_date.start_date !== "") {
        tourStartDate = state.company_search_date.start_date;
        tourEndDate = state.company_search_date.end_date;
      }
      if (state.company_search_date.end_date === "") {
        tourEndDate = state.company_search_date.start_date;
      }

      let response;

      if (
        state.company_search_keyword === "" &&
        state.company_search_date.start_date === ""
      ) {
        // 검색어가 없을 경우 전체 동행 목록 반환
        response = await axios.get(`${BASE_URL}/tour-list/0`);
      } else {
        try {
          response = await axios.post(`${BASE_URL}/tour-search`, {
            keyword,
            tourStartDate,
            tourEndDate
          });
        } catch (error) {
          if (error.response.status === 500) router.push("/error/500");
        }
      }

      commit("set_company_search_list", response.data);
      router.push("/company/search/result");
    },

    // 최신 리스트 5개만 짤라 오는 api
    async api_get_company_recommend_list({ rootState, commit }) {
      const URL = `${BASE_URL}/tour-list`;
      let response;
      if (rootState.userStore.user_info)
        response = await axios.get(`${URL}/filter/0`);
      else {
        response = await axios.get(`${URL}/0`);
      }

      /**
       * 로그인이 되어있는 유저라면
       * 자신의 글인지 여부를 체크해준다.
       */
      if (rootState.userStore.user_info) {
        const my_list = await axios.get(`${BASE_URL}/my-tour-list`);

        response.data.forEach(item => {
          for (let i = 0; i < my_list.data.length; i++) {
            if (item.id === my_list.data[i].id) {
              item.is_my_company = true;
              break;
            } else item.is_my_company = false;
          }
        });
      }

      commit("set_company_recommend_list", response.data.slice(0, 5));
      return response.data.slice(0, 5);
    },

    // 내가 좋아요 눌른 건지 확인
    async check_my_scrap_list(context, id) {
      try {
        const response = await axios.get(`${BASE_URL}/my-scrap-list`);

        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].id === id) {
            return true;
          }
        }
        return false;
      } catch (err) {
        console.log("로그인이 필요합니다.", err);
      }
    },
    // 내가 쓴 동행글 가져오기
    async api_get_my_company_list({ commit }, id) {
      try {
        const response = await axios.get(`${BASE_URL}/my-tour-list`);

        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].id === Number(id)) {
            commit("set_is_my_company_detail", true);
            return;
          }
        }
        commit("set_is_my_company_detail", false);
      } catch (err) {
        console.log("로그인이 필요합니다.", err);
      }
    },

    // 관심 등록
    async api_post_scrap({ commit }, id) {
      await axios.post(`${BASE_URL}/scrap/${id}`);
      commit("set_scrap_event", true);
    },

    // 관심 미등록
    async api_post_delete_scrap({ commit }, id) {
      await axios.post(`${BASE_URL}/delete-scrap/${id}`);
      commit("set_scrap_event", false);
    },

    // 동행 글 삭제
    async api_post_delete_tour({ state, commit }) {
      try {
        await axios.post(`${BASE_URL}/delete-tour/${state.company_detail.id}`);
        commit("set_company_list", []); // 동행 리스트 초기화
        commit("set_company_scroll_index", 0); // 동행 리스트 인덱스 초기화
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    // 동행 마감
    async api_post_close_tour({ commit }, company_id) {
      try {
        await axios.post(`${BASE_URL}/close-tour/${company_id}`);
        // 동행 리스트 초기화
        commit("set_company_list", []);
        commit("set_company_scroll_index", 0);
        return true;
      } catch (error) {
        console.log(error);
      }
    },

    // 차단
    async api_post_block_tour(context, nickname) {
      try {
        await axios.post(`${BASE_URL}/block/member`, { nickname });
      } catch (error) {
        console.log(error);
      }
    },

    // 동행 확정 취소
    async api_post_cancel_tour({ commit }, company_id) {
      try {
        await axios.post(`${BASE_URL}/cancel-tour/${company_id}`);
        commit("notifyStore/set_tour_cancle_state", true, { root: true });
      } catch (error) {
        console.log(error);
      }
    },

    // 동행 취소 여부 확인
    async api_get_cancel_state(context, company_id) {
      try {
        const response = await axios.get(
          `${BASE_URL}/cancel-state/${company_id}`
        );
        return response.data.canceled;
      } catch (error) {
        console.log(error);
      }
    },

    // 동행 테마 검색 api
    async api_tour_search_theme({ commit }, theme) {
      try {
        const { data } = await axios.post(`${BASE_URL}/tour-search/theme`, {
          tourTheme: theme
        });
        commit("set_company_theme_search_list", data);
      } catch (error) {
        console.log(error);
      }
    }
  }
};

export default companyStore;
