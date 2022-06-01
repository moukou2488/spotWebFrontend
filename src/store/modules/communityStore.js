import axios from "axios";
import router from "@/router/index";
import teams_list from "@/assets/data/teams_list.js";

const BASE_URL = "/api";
const communityStore = {
  namespaced: true,
  state: {
    community_team: {},
    team_list: "",
    page: 0,
    popular_page: 0,
    scrap_state: false,
    team_detail: "",
    community_popular: [],
    community_popular_more: "",
    comment_list: [],
    user_comment_ids: [],
    team_rank: [],
    filter_index: 0,
    modify_community_id: null,
    modify_comment_id: null,
    modify_comment: null,
    teams_list,
    comment_change_event: false,
    modify_complete: false,
    nickname_team_count: [],
    community_write_complete: false,
    comment_reply_id: null
  },
  mutations: {
    set_modify_complete(state, bool) {
      state.modify_complete = bool;
    },
    set_modify_comment(state, payload) {
      state.modify_comment = payload;
    },
    set_modify_community_id(state, payload) {
      state.modify_community_id = payload;
    },
    set_modify_comment_id(state, payload) {
      state.modify_comment_id = payload;
    },
    set_filter_index(state, payload) {
      state.filter_index = payload;
    },
    set_community_team(state, payload) {
      state.community_team = payload;
    },
    set_page_plus(state, payload) {
      state.page = payload;
    },
    set_popular_page_plus(state, payload) {
      state.popular_page = payload;
    },
    set_team_detail(state, payload) {
      state.team_detail = payload;
    },
    set_community_popular(state, payload) {
      state.community_popular = payload;
    },
    concat_community_popular(state, payload) {
      state.community_popular = [...state.community_popular, ...payload];
    },
    set_team_list(state, list) {
      state.team_list = list;
    },
    concat_team_list(state, list) {
      state.team_list = [...state.team_list, ...list];
    },
    set_comment_list(state, list) {
      state.comment_list = list;
    },
    set_user_comment_ids(state, list) {
      state.user_comment_ids = list;
    },
    set_team_count(state, count) {
      state.community_team.team_count = count;
    },
    set_scrap_state(state, bool) {
      state.scrap_state = bool;
    },
    set_team_rank(state, list) {
      state.team_rank = list;
    },
    set_comment_change_event(state, bool) {
      state.comment_change_event = bool;
    },
    set_nickname_team_count(state, count) {
      state.nickname_team_count = count;
    },
    set_community_write_complete(state, bool) {
      state.community_write_complete = bool;
    },
    set_comment_reply_id(state, id) {
      state.comment_reply_id = id;
    }
  },
  actions: {
    // 커뮤 글 작성
    async api_community_upload({ commit, dispatch }, payload) {
      commit("set_community_write_complete", true);
      const config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      var formData = new FormData();
      formData.append("title", payload.title);
      formData.append("content", payload.content);
      formData.append("isAnonymous", payload.isAnonymous);

      if (payload.multipartFile)
        payload.multipartFile.forEach(file => {
          formData.append("multipartFile", file);
        });

      formData.append("category", payload.category);
      formData.append("teamIndex", payload.teamIndex);
      try {
        return await axios.post(
          `${BASE_URL}/community/upload`,
          formData,
          config
        );
      } catch (error) {
        if (error.response.status === 403) {
          dispatch(
            "modalStore/config_toast_show",
            "첨부하신 사진의 용량이 10MB를 초과하였습니다.",
            {
              root: true
            }
          );
          return false;
        }
      }
    },
    // 커뮤 글 수정
    async api_community_modify({ state, commit, dispatch }, payload) {
      commit("set_community_write_complete", true);
      const config = {
        headers: { "Content-Type": "multipart/form-data" }
      };
      var formData = new FormData();
      formData.append("title", payload.title);
      formData.append("content", payload.content);
      formData.append("isAnonymous", payload.isAnonymous);
      if (payload.multipartFile)
        payload.multipartFile.forEach(file => {
          formData.append("multipartFile", file);
        });

      if (payload.deleteFileNames.length) {
        formData.append("deleteFileNames", payload.deleteFileNames);
      }

      formData.append("category", payload.category);

      try {
        await axios.post(
          `${BASE_URL}/community/modify/${state.modify_community_id}`,
          formData,
          config
        );
        commit("set_modify_complete", true);
      } catch (error) {
        if (error.response.status === 403) {
          dispatch(
            "modalStore/config_toast_show",
            "첨부하신 사진의 용량이 10MB를 초과하였습니다.",
            {
              root: true
            }
          );
          return false;
        }
      }
    },

    async api_community_team({ commit, rootState }, payload) {
      var URL = `${BASE_URL}/community/team/${payload.page}`;

      // 로그인한 유저인지 아닌지
      if (rootState.userStore.user_info) {
        URL = `${BASE_URL}/community/team/filter/${payload.page}`;
      }
      const response = await axios.post(URL, payload);
      commit("set_team_list", response.data);
      return response.data;
    },

    // 댓글 수정
    async api_comment_modify({ commit }, payload) {
      await axios.post(`${BASE_URL}/comment/modify`, payload);
      payload.modify = true;
      commit("set_comment_change_event", payload);
    },

    // 커뮤니티 구단 이야기 글 더 보기
    async api_community_team_more({ commit, rootState }, payload) {
      var URL = `${BASE_URL}/community/team/${payload.page}`;

      // 로그인한 유저인지 아닌지
      if (rootState.userStore.user_info) {
        URL = `${BASE_URL}/community/team/filter/${payload.page}`;
      }
      const response = await axios.post(URL, payload);
      commit("concat_team_list", response.data);
      return response.data;
    },

    // 커뮤니티 글 검색
    async api_community_search({ commit }, payload) {
      const response = await axios.post(
        `${BASE_URL}/community/search`,
        payload
      );
      commit("set_team_list", response.data);
    },

    // 커뮤 글 상세 보기
    async api_community_detail({ commit, dispatch }, payload) {
      try {
        const response = await axios.get(
          `${BASE_URL}/community/detail/${payload}`
        );
        commit("set_team_detail", response.data);
      } catch (error) {
        if (error.response.status === 500) {
          router.push("/community/index");
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

    // 커뮤니티 인기글 리스트
    async api_community_popular({ commit, rootState }, page) {
      var URL = `${BASE_URL}/community/popular/${page}`;

      // 로그인한 유저인지 아닌지
      if (rootState.userStore.user_info) {
        URL = `${BASE_URL}/community/popular/filter/${page}`;
      }
      const response = await axios.get(URL);
      commit("set_community_popular", response.data);
    },

    // 커뮤니티 인기글 더 불러오기
    async api_community_popular_more({ commit, rootState }, page) {
      var URL = `${BASE_URL}/community/popular/${page}`;

      // 로그인한 유저인지 아닌지
      if (rootState.userStore.user_info) {
        URL = `${BASE_URL}/community/popular/filter/${page}`;
      }
      const response = await axios.get(URL);
      commit("concat_community_popular", response.data);
      return response.data;
    },

    // 댓글 업로드
    async api_comment_upload({ commit }, payload) {
      const response = await axios.post(`${BASE_URL}/comment/upload`, payload);
      response.data.upload = true;
      commit("set_comment_change_event", response.data);
    },

    // 댓글 리스트 가져오기
    async api_comment_list({ commit }, id) {
      // 댓글 데이터 초기화
      commit("set_comment_list", []);
      const response = await axios.get(`${BASE_URL}/comment/list/${id}`);

      let nickname_team_count = [
        { count: 0 },
        { count: 0 },
        { count: 0 },
        { count: 0 },
        { count: 0 },
        { count: 0 },
        { count: 0 },
        { count: 0 },
        { count: 0 },
        { count: 0 },
        { count: 0 }
      ];
      for (const idx in response.data) {
        if (response.data[idx].anonymous) {
          if (response.data[idx].teamIndex !== -1) {
            nickname_team_count[response.data[idx].teamIndex - 1].count += 1;
            response.data[idx].change_nickname =
              teams_list[response.data[idx].teamIndex - 1].team +
              nickname_team_count[response.data[idx].teamIndex - 1].count;
          } else {
            nickname_team_count[10].count += 1;
            response.data[idx].change_nickname =
              "버디" + nickname_team_count[10].count;
          }
        }
      }
      commit("set_nickname_team_count", nickname_team_count);
      commit("set_comment_list", response.data);
      return response.data;
    },

    // 댓글 삭제
    async api_comment_delete({ commit }, id) {
      await axios.post(`${BASE_URL}/comment/delete/${id}`);
      commit("set_comment_change_event", id);
    },

    // 댓글 좋아요
    async api_comment_like(context, id) {
      await axios.post(`${BASE_URL}/comment/like/${id}`);
    },

    // 댓글 좋아요 취소
    async api_comment_cancle_like(context, id) {
      await axios.post(`${BASE_URL}/comment/cancel-like/${id}`);
    },

    // 본인 댓글 확인
    async api_user_comment_ids({ commit }, id) {
      const response = await axios.get(
        `${BASE_URL}/comment/like/my-list/${id}`
      );
      commit("set_user_comment_ids", response.data);
    },

    // 구단 회원 수 조회
    async api_team_count({ commit }, idx) {
      const response = await axios.get(
        `${BASE_URL}/community/team/count/${idx}`
      );
      commit("set_team_count", response.data.memberCount);
    },

    // 구단 순위 가져오기
    async api_team_rank({ commit }) {
      const response = await axios.get(
        "https://raw.githubusercontent.com/Team-SPOT/spot-crawler-v2/master/rank.json"
      );
      commit("set_team_rank", response.data);
    },

    // 스크랩 추가
    async api_scrap_add({ commit }, id) {
      await axios.post(`${BASE_URL}/community/scrap/${id}`);
      commit("set_scrap_state", true);
    },

    // 스크랩 취소
    async api_scrap_delete({ commit }, id) {
      await axios.post(`${BASE_URL}/community/scrap/delete/${id}`);
      commit("set_scrap_state", false);
    },

    // 커뮤니티 게시글 삭제
    async api_post_delete_community({ state }) {
      const response = await axios.post(
        `${BASE_URL}/community/delete/${state.team_detail.id}`
      );
      return response;
    },

    // 스크랩한 글인지 확인
    async api_scrap_check({ commit }, id) {
      const response = await axios.get(
        `${BASE_URL}/community/scrap-state/${id}`
      );
      commit("set_scrap_state", response.data.scrapState);
    },

    // 게시글 숨기기
    async api_community_hide({ state }) {
      await axios.post(`${BASE_URL}/community/hide/${state.team_detail.id}`);
    },

    // 게시글 업로드 전 욕설 확인
    async api_community_content_check(context, payload) {
      const response = await axios.post(
        `${BASE_URL}/community/content-check`,
        payload
      );
      return response.data;
    },

    // idx 통해 구단 찾기
    community_team_item({ commit }, idx) {
      const team = teams_list.find(_team => _team.team_idx === Number(idx));
      commit("set_community_team", team);
    },

    // 커뮤니티 state 초기화
    clear_commu_state({ commit }) {
      commit("set_team_list", []);
      commit("set_community_popular", []);
      commit("set_page_plus", 0);
      commit("set_popular_page_plus", 0);
    }
  }
};
export default communityStore;
