import router from "@/router/index";
import axios from "axios";
import companyEvaluateWeatherCalculate from "@/assets/scripts/companyEvaluateWeatherCalculate.js";

const BASE_URL = "/api";

export default {
  namespaced: true,
  state: {
    favorite_company_list: [],

    join_company_list: [],
    ing_join_company_list: [],
    done_join_company_list: [],
    will_join_company_list: [],

    join_company_detail: null, // 참여자 목록에서 보이는 동행리스트 하나

    regist_company_list: [],
    not_end_regist_company_list: [], // 모집 중 리스트
    end_regist_company_list: [], // 마감된 리스트

    user_profile_photo_url: null,
    user_profile_default_url: require("@/assets/images/profile_default.png"),

    // 커뮤니티
    my_community_list: [], // 내가 쓴 글
    my_community_comment: [], // 내가 쓴 댓글
    my_community_scrap: [], // 내 스크랩

    // 동행 평가
    user_profile_info: null,
    evaluate_short_list: [],
    evaluate_weather_index: null,
    evaluate_anonymous: false,
    evaluate_detail: "",
    modify_evaluate_id: null,

    // 동행 평가 전체 목록
    evaluate_list: [],
    router_guard_evaluate: false
  },
  getters: {
    count_favorite_list(state) {
      if (state.favorite_company_list.length > 999) return "999+";
      else return state.favorite_company_list.length;
    },
    count_join_company_list(state) {
      if (state.join_company_list.length > 999) return "999+";
      else return state.join_company_list.length;
    },
    count_regist_company_list(state) {
      if (state.regist_company_list.length > 999) return "999+";
      else return state.regist_company_list.length;
    },
    reverse_evaluate_weather_index(state) {
      const result_obj = companyEvaluateWeatherCalculate(
        state.evaluate_weather_index
      );
      return result_obj.return_point;
    }
  },
  mutations: {
    set_modify_evaluate_id(state, id) {
      state.modify_evaluate_id = id;
    },
    set_router_guard_evaluate(state, bool) {
      state.router_guard_evaluate = bool;
    },
    set_user_profile_photo_url(state, url) {
      state.user_profile_photo_url = url;
    },
    set_favorite_company_list(state, list) {
      state.favorite_company_list = list;
    },
    set_join_company_list(state, list) {
      state.join_company_list = list;
    },
    // 진행 중인 동행
    set_ing_join_company_list(state, list) {
      state.ing_join_company_list = list;
    },
    // 진행 예정인 동행
    set_will_join_company_list(state, list) {
      state.will_join_company_list = list;
    },
    // 진행 완료된 동행
    set_done_join_company_list(state, list) {
      state.done_join_company_list = list;
    },

    set_join_company_detail(state, company_item) {
      state.join_company_detail = company_item;
    },

    set_regist_company_list(state, list) {
      state.regist_company_list = list;
    },
    set_not_end_regist_company_list(state, list) {
      state.not_end_regist_company_list = list;
    },
    set_end_regist_company_list(state, list) {
      state.end_regist_company_list = list;
    },
    set_my_community_list(state, list) {
      state.my_community_list = list;
    },
    set_my_community_comment(state, list) {
      state.my_community_comment = list;
    },
    set_my_community_scrap(state, list) {
      state.my_community_scrap = list;
    },
    set_user_profile_info(state, profile_info) {
      state.user_profile_info = profile_info;
    },
    // 동행 평가
    // 평가 추가
    add_evaluate_short_list(state, short_item) {
      state.evaluate_short_list.push(short_item);
    },
    // 평가 삭제
    delete_evaluate_short_list(state, short_item) {
      state.evaluate_short_list = state.evaluate_short_list.filter(
        item => item.text !== short_item.text
      );
    },
    clear_evaluate_short_list(state) {
      state.evaluate_short_list = [];
    },
    set_evaluate_short_list(state, item_list) {
      state.evaluate_short_list = item_list;
    },
    set_evaluate_weather_index(state, weather_index) {
      state.evaluate_weather_index = weather_index;
    },
    set_evaluate_anonymous(state, bool) {
      state.evaluate_anonymous = bool;
    },
    set_evaluate_detail(state, detail_content) {
      state.evaluate_detail = detail_content;
    },
    set_evaluate_list(state, list) {
      state.evaluate_list = list;
    },
    clear_evaluate_data(state) {
      state.evaluate_anonymous = false;
      state.evaluate_weather_index = null;
      state.evaluate_detail = "";
      state.evaluate_short_list = [];
    }
  },
  actions: {
    // 내가 관심있는 동행들
    async get_favorite_company_list({ commit }) {
      const response = await axios.get(`${BASE_URL}/my-scrap-list`);
      response.data.forEach(item => {
        item.is_my_scrap = true;
      });
      commit("set_favorite_company_list", response.data);
    },

    /**
     * 내가 참여한 동행 내역 API
     * @summary 내가 참여한 동행 내역을 모두 가져온 뒤 동행 진행 상태에 따라 분류한다.
     */
    async get_join_company_list({ commit }) {
      // 초기화
      commit("set_ing_join_company_list", []);
      commit("set_will_join_company_list", []);
      commit("set_done_join_company_list", []);

      try {
        const response = await axios.get(`${BASE_URL}/my-confirm-tour`);

        let ing_list = [];
        let will_list = [];
        let done_list = [];

        // 상태에 따른 분류 작업
        response.data.forEach(company_item => {
          if (company_item.tourState === "동행 진행 중")
            ing_list.push(company_item);
          if (company_item.tourState === "동행 예정")
            will_list.push(company_item);
          if (company_item.tourState === "동행 완료")
            done_list.push(company_item);
        });

        commit("set_ing_join_company_list", ing_list);
        commit("set_will_join_company_list", will_list);
        commit("set_done_join_company_list", done_list);

        commit("set_join_company_list", response.data);
      } catch (error) {
        if (error.response.status === 500) router.push("/error/500");
      }
    },

    /**
     * 내 동행 모집 내역 API
     * @summary 내가 작성한 동행 모집들을 모두 가져온 뒤 마감 여부에 따라 분류한다.
     */
    async get_regist_company_list({ commit }) {
      // 초기화 -> 불필요한 로직이라 삭제

      let response = await axios.get(`${BASE_URL}/my-tour-list`);

      let end_list = [];
      let not_end_list = [];

      // 마감된 목록과 아닌 목록으로 나누기
      response.data.forEach(item => {
        item.is_my_company = true; // 내가 작성한 글이니 당연히 true
        if (item.ended) end_list.push(item);
        else not_end_list.push(item);
      });

      commit("set_not_end_regist_company_list", not_end_list);
      commit("set_end_regist_company_list", end_list);
      // 전체 리스트
      commit("set_regist_company_list", response.data);
    },

    // 동행 상세
    async api_get_tour_detail({ commit }, company_id) {
      const response = await axios.get(`${BASE_URL}/tour-detail/${company_id}`);
      commit("set_join_company_detail", response.data);
    },

    // 동행 확정 멤버 보기
    async api_get_confirm_member({ state, rootState }) {
      if (state.join_company_detail === null) {
        this.$router.push("/error/500");
        return;
      }
      const response = await axios.get(
        `${BASE_URL}/confirm-member/${state.join_company_detail.id}`
      );

      // 내 닉네임을 제일 앞으로 빼는 작업
      const my_nick = rootState.userStore.user_info.nickname;

      let member_list = response.data.nicknames.filter(
        usernick => usernick !== my_nick
      );

      member_list.unshift(my_nick);

      return member_list;
    },

    // 프로필 사진 업로드
    async api_post_upload_photo({ dispatch, rootState }, photo) {
      const config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      let login_user_nick = rootState.userStore.user_info.nickname;
      var formData = new FormData();
      formData.append("photo", photo);

      const response = await axios.post(
        `${BASE_URL}/profile/upload/photo`,
        formData,
        config
      );
      dispatch("api_get_profile_photo", login_user_nick);
      dispatch(
        "modalStore/config_toast_show",
        "프로필 사진이 변경되었습니다.",
        {
          root: true
        }
      );
      return response.data; // 업로드한 사진의 src를 반환
    },

    // 프로필 사진 조회
    async api_get_profile_photo({ state, commit, rootState }, user_nick) {
      const response = await axios.post(`${BASE_URL}/profile/get/photo`, {
        nickname: user_nick
      });

      if (rootState.userStore.user_info) {
        let login_user_nick = rootState.userStore.user_info.nickname;
        if (user_nick === login_user_nick)
          commit("set_user_profile_photo_url", response.data.photoUrl);
      }

      if (response.data.photoUrl === undefined)
        return state.user_profile_default_url;

      return response.data.photoUrl;
    },

    // 내가 쓴 글 조회
    async api_get_my_community_list({ commit }) {
      const response = await axios.get(`${BASE_URL}/community/post/my-list`);
      commit("set_my_community_list", response.data);
    },

    // 내가 쓴 댓글
    async api_get_my_community_comment({ commit }) {
      const response = await axios.get(`${BASE_URL}/comment/my-list`);
      commit("set_my_community_comment", response.data);
    },

    // 내 스크랩
    async api_get_my_community_scrap({ commit }) {
      const response = await axios.get(`${BASE_URL}/community/scrap/my-list`);
      commit("set_my_community_scrap", response.data);
    },

    // 다른 사람 프로필 조회
    async api_your_profile({ commit }, nickname) {
      const response = await axios.post(`${BASE_URL}/your-profile`, {
        nickname
      });
      commit("set_user_profile_info", response.data);
    },

    // 동행 평가하기
    async api_post_tour_review({ state, commit, dispatch }) {
      // 수정하는 경우가 아니라면
      if (state.modify_evaluate_id === null) {
        const response = await dispatch("api_review_possible");
        if (response) {
          dispatch(
            "modalStore/config_toast_show",
            "동행평가는 하루에 한 번만 가능합니다!",
            {
              root: true
            }
          );
          commit("clear_evaluate_data");
          return;
        }
      }

      const payload = {
        nickname: state.user_profile_info.nickname,
        reviews: state.evaluate_short_list.map(item => item.index),
        detailReview: state.evaluate_detail,
        weatherIndex: state.evaluate_weather_index,
        anonymous: state.evaluate_anonymous
      };

      if (payload.weatherIndex === null) {
        dispatch("modalStore/config_toast_show", "동행날씨를 선택해주세요", {
          root: true
        });
        return;
      }

      if (payload.reviews.length === 0) {
        dispatch(
          "modalStore/config_toast_show",
          "맑은 날씨 또는 흐린 날씨를 하나 이상 선택해주세요",
          {
            root: true
          }
        );
        return;
      }

      if (state.modify_evaluate_id === null)
        await axios.post(`${BASE_URL}/tour-review`, payload);
      // 수정
      else {
        await axios.post(
          `${BASE_URL}/tour-review/modify/${state.modify_evaluate_id}`,
          payload
        );
        commit("set_modify_evaluate_id", null);
      }

      commit("clear_evaluate_data");
      router.push(`/profile/evaluate/home/${state.user_profile_info.nickname}`);
    },

    // 한 사람에게 하루에 한 번만
    async api_review_possible({ state }) {
      const response = await axios.post(`${BASE_URL}/review-possible`, {
        nickname: state.user_profile_info.nickname
      });
      return response.data.todayReview;
    },

    // 동행 평가 리스트 전체 반환
    async api_post_tour_review_detail({ commit }, nickname) {
      const response = await axios.post(`${BASE_URL}/tour-review/detail`, {
        nickname
      });
      commit("set_evaluate_list", response.data);
    },

    // 동행 평가 수정하기

    // 동행 평가 삭제하기
    async api_post_tour_review_delete({ dispatch }, payload) {
      const { id, nickname } = payload;
      await axios.post(`${BASE_URL}/tour-review/delete/${id}`);
      await dispatch("api_post_tour_review_detail", nickname);
    }
  }
};
