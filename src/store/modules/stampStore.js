import axios from "axios";
import router from "@/router/index";

const BASE_URL = "/api";

const stampStore = {
  namespaced: true,
  state: {
    stamp_detail: {
      diaryId: "",
      diaryContent: "",
      nickname: "",
      photoUrl: "",
      watchCount: "",
      likeCount: 0,
      location: "",
      gameDate: "",
      homeTeam: "",
      awayTeam: "",
      publicStatus: false,
      logoExists: true,
      countExists: true,
      gameExists: true,
      updateDate: "",
      tourTeam: ""
    },
    stamp_photo: { url: null, blob: null },
    stamp_exists: {
      logoExists: true,
      countExists: true,
      gameExists: true
    },
    stamp_diary: "",
    stamp_count: "",
    stamp_game: {
      location: "",
      homeTeam: "",
      awayTeam: "",
      gameDate: ""
    },
    public_state: false,
    modify_stamp_id: null,
    scrap_state: false,
    //
    stamp_list_scroll_index: 0,
    stamp_list_type: "grid",
    stamp_list_header: "all",
    stamp_list_page: 0,
    stamp_list: [],
    // grid index
    stamp_list_grid_index: 0
  },
  mutations: {
    set_stamp_photo(state, payload) {
      state.stamp_photo = payload;
    },
    set_stamp_game(state, payload) {
      state.stamp_game = payload;
    },
    set_stamp_exists(state, payload) {
      state.stamp_exists[payload] = state.stamp_exists[payload] ? false : true;
    },
    set_stamp_exists_all(state, payload) {
      state.stamp_exists = payload;
    },
    set_stamp_diary(state, payload) {
      state.stamp_diary = payload;
    },
    set_stamp_count(state, payload) {
      state.stamp_count = payload;
    },
    set_public_state(state) {
      state.public_state = state.public_state ? false : true;
    },
    set_stamp_detail(state, payload) {
      state.stamp_detail = payload;
    },
    set_scrap_state(state, bool) {
      state.scrap_state = bool;
    },
    set_modify_stamp_id(state, payload) {
      state.modify_stamp_id = payload;
    },
    clear_state(state) {
      state.stamp_photo = { url: null, blob: null };
      state.stamp_exists = {
        logoExists: true,
        countExists: true,
        gameExists: true
      };
      state.stamp_diary = "";
      state.stamp_count = "";
      state.stamp_game = {
        location: "",
        homeTeam: "",
        awayTeam: "",
        gameDate: ""
      };
      state.public_state = false;
      state.modify_stamp_id = null;
    },
    // list
    // type: grid / feed
    set_stamp_list_type(state, type) {
      state.stamp_list_type = type;
      state.stamp_list_scroll_index = 0;
    },
    // header: 버디의 일기 / 나의 버디 일기
    set_stamp_list_header(state, header) {
      state.stamp_list_header = header;
    },
    set_stamp_list(state, list) {
      state.stamp_list = list;
    },
    set_stamp_list_scroll_index(state, index) {
      state.stamp_list_scroll_index = index;
    },
    concat_stamp_list(state, list) {
      state.stamp_list = [...state.stamp_list, ...list];
    }
  },
  actions: {
    // 버디 일기 작성
    async api_stamp_upload({ state, rootState, commit }) {
      const config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      var formData = new FormData();
      formData.append("diaryPhoto", state.stamp_photo.blob);
      formData.append(
        "watchCount",
        state.stamp_count === "" ? 0 : state.stamp_count
      );
      formData.append("location", state.stamp_game.location);
      formData.append("diaryContent", state.stamp_diary);
      formData.append("homeTeam", state.stamp_game.homeTeam);
      formData.append("awayTeam", state.stamp_game.awayTeam);
      formData.append(
        "gameDate",
        state.stamp_game.gameDate === ""
          ? "2020-01-01"
          : state.stamp_game.gameDate.replace(/\./g, "-")
      );
      formData.append("logoExists", state.stamp_exists.logoExists);
      formData.append("publicStatus", state.public_state);
      formData.append("countExists", state.stamp_exists.countExists);
      formData.append("gameExists", state.stamp_exists.gameExists);
      formData.append(
        "tourTeam",
        rootState.companyWriteStore.payload_data.tourTeam
      );
      const response = await axios.post(
        `${BASE_URL}/diary/upload`,
        formData,
        config
      );
      commit("clear_state");
      return response;
    },
    // 버디일기 작성 수정
    async api_stamp_modify({ state, rootState, commit }) {
      const config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      var formData = new FormData();
      if (state.stamp_photo.blob !== undefined) {
        formData.append("diaryPhoto", state.stamp_photo.blob);
      }
      formData.append(
        "watchCount",
        state.stamp_count === "" ? 0 : state.stamp_count
      );
      formData.append("location", state.stamp_game.location);
      formData.append("diaryContent", state.stamp_diary);
      formData.append("homeTeam", state.stamp_game.homeTeam);
      formData.append("awayTeam", state.stamp_game.awayTeam);
      formData.append(
        "gameDate",
        state.stamp_game.gameDate === ""
          ? "2020-01-01"
          : state.stamp_game.gameDate.replace(/\./g, "-")
      );
      formData.append("logoExists", state.stamp_exists.logoExists);
      formData.append("publicStatus", state.public_state);
      formData.append("countExists", state.stamp_exists.countExists);
      formData.append("gameExists", state.stamp_exists.gameExists);
      formData.append(
        "tourTeam",
        rootState.companyWriteStore.payload_data.tourTeam
      );
      const response = await axios.post(
        `${BASE_URL}/diary/modify/${state.modify_stamp_id}`,
        formData,
        config
      );
      commit("clear_state");
      return response;
    },
    // 버디 일기 상세 보기
    async api_stamp_detail({ commit, dispatch }, payload) {
      try {
        const response = await axios.get(`${BASE_URL}/diary/detail/${payload}`);
        commit("set_stamp_detail", response.data);
      } catch (error) {
        if (error.response.status === 500) {
          router.push("/stamp/index");
          dispatch(
            "modalStore/config_toast_show",
            "삭제된 게시물이거나 접근할 수 없습니다.",
            {
              root: true
            }
          );
        }
      }
    },
    // 버디일기 삭제
    async api_stamp_delete({ state }) {
      const response = await axios.post(
        `${BASE_URL}/diary/delete/${state.stamp_detail.diaryId}`
      );
      return response;
    },
    // 게시글 숨기기
    async api_stamp_hide({ state }) {
      await axios.post(`${BASE_URL}/diary/hide/${state.stamp_detail.diaryId}`);
    },

    // 스크랩한 글인지 확인
    async api_scrap_check({ commit }, id) {
      const {
        data: { diaryScrap }
      } = await axios.get(`${BASE_URL}/diary/scrap-status/${id}`);
      commit("set_scrap_state", diaryScrap);
      return diaryScrap;
    },

    // 스크랩 추가
    async api_scrap_add({ commit }, id) {
      await axios.post(`${BASE_URL}/diary/scrap/${id}`);
      commit("set_scrap_state", true);
    },

    // 스크랩 취소
    async api_scrap_delete({ commit }, id) {
      await axios.post(`${BASE_URL}/diary/cancel-scrap/${id}`);
      commit("set_scrap_state", false);
    },

    // 좋아요한 글인지 확인
    async api_stamp_like_check(context, id) {
      const {
        data: { diaryLike }
      } = await axios.get(`${BASE_URL}/diary/like-status/${id}`);

      return diaryLike;
    },
    // 버디일기 좋아요
    async api_stamp_like(context, id) {
      await axios.post(`${BASE_URL}/diary/like/${id}`);
    },

    // 버디일기 좋아요 취소
    async api_stamp_cancle_like(context, id) {
      await axios.post(`${BASE_URL}/diary/cancel-like/${id}`);
    },

    // 리스트 가져오기
    async api_get_diary_list({ state, rootState, commit }, page) {
      let URL = `${BASE_URL}/diary/list`;
      if (rootState.userStore.user_info) {
        if (state.stamp_list_header === "my") URL += "/my";
        else URL += "/filter";
      }

      const { data } = await axios.get(`${URL}/${page}`);

      commit("concat_stamp_list", data);
      commit("set_stamp_list_scroll_index", page + 1);
      return data;
    },

    async grid_get_diary_list({ state, rootState }, page) {
      let URL = `${BASE_URL}/diary/list`;
      if (rootState.userStore.user_info) {
        if (state.stamp_list_header === "my") URL += "/my";
        else URL += "/filter";
      }

      const { data } = await axios.get(`${URL}/${page}`);
      return data;
    },

    async api_get_my_scrap_list({ commit }) {
      const { data } = await axios.get(`${BASE_URL}/diary/scrap/my-list`);
      commit("set_stamp_list", data);
    }
  }
};

export default stampStore;
