import axios from "axios";
import router from "@/router/index";

export default {
  namespaced: true,
  state: {
    modify_company_id: null,
    tourInfo: null,
    payload_data: {
      tourLocation: "", // 필수 -> 경기 선택
      tourTeam: "",
      tourTitle: "", // 필수
      tourContent: "", // 필수
      requiredGender: 1,
      minimumAge: 20,
      maximumAge: 36,
      minimumMember: 3,
      maximumMember: 5,
      member_no_limit: false,
      age_no_limit: false,
      tourThemes: [],
      tourStartDate: "", // 필수 -> 날짜 선택
      tourEndDate: "", // 필수 -> 날짜 선택
      tempSaved: false
    },
    company_write_complete: false,
    temp_save_id: null,
    // 지금 작성하고 있는게 임시저장한 글인지 확인
    is_temp_save_write: false
  },
  mutations: {
    set_tourInfo(state, info) {
      const { date, time, team1, team2 } = info;
      const computed_date =
        date.split(".")[0] + "/" + date.split(".")[1].split("(")[0];

      state.tourInfo = info;
      state.payload_data.tourLocation = info.place;
      state.payload_data.tourTeam = `${team1} VS ${team2}, ${computed_date} ${time}`;
    },
    set_is_temp_save_write(state, bool) {
      state.is_temp_save_write = bool;
    },
    set_temp_save_id(state, company_id) {
      state.temp_save_id = company_id;
    },
    set_modify_company_id(state, company_id) {
      state.modify_company_id = company_id;
    },
    set_tourTeam(state, info) {
      state.payload_data.tourTeam = info;
    },
    set_tourStartDate(state, date) {
      state.payload_data.tourStartDate = date;
    },
    set_tourEndDate(state, date) {
      state.payload_data.tourEndDate = date;
    },
    set_tourTitle(state, title) {
      state.payload_data.tourTitle = title;
    },
    set_tourContent(state, content) {
      state.payload_data.tourContent = content;
    },
    push_tourThemes(state, str_theme) {
      state.payload_data.tourThemes.push(str_theme);
    },
    set_theme_item_delete(state, item) {
      state.payload_data.tourThemes = state.payload_data.tourThemes.filter(
        _item => _item !== item
      );
    },
    delete_last_theme(state) {
      if (state.payload_data.tourThemes.length > 0) {
        state.payload_data.tourThemes.pop();
      }
    },
    // 동행 인원 수
    set_people_range(state, array_of_people_range) {
      // 만약 꽉 찬 값이라면 제한 없음을 체크하도록
      if (
        Number(array_of_people_range[0]) === 1 &&
        Number(array_of_people_range[1]) === 10
      )
        state.payload_data.member_no_limit = true;
      else state.payload_data.member_no_limit = false;

      state.payload_data.minimumMember = array_of_people_range[0];
      state.payload_data.maximumMember = array_of_people_range[1];
    },
    set_people_range_no_limit(state, bool) {
      state.payload_data.member_no_limit = bool;
    },
    set_age_no_limit(state, bool) {
      state.payload_data.age_no_limit = bool;
    },
    set_requiredGender(state, number_sex) {
      state.payload_data.requiredGender = number_sex;
    },
    // 동행 연령
    set_age_range(state, array_of_age_range) {
      // 만약 꽉 찬 값이라면 제한 없음을 체크하도록
      if (
        Number(array_of_age_range[0]) === 20 &&
        Number(array_of_age_range[1]) === 100
      )
        state.payload_data.age_no_limit = true;
      else state.payload_data.age_no_limit = false;

      state.payload_data.minimumAge = array_of_age_range[0];
      state.payload_data.maximumAge = array_of_age_range[1];
    },
    set_tempSaved(state, bool) {
      state.payload_data.tempSaved = bool;
    },
    set_payload_data(state, payload_data) {
      state.payload_data = payload_data;
    },
    clear_state(state) {
      state.payload_data = {
        tourLocation: "", // 필수
        tourTeam: "",
        tourTitle: "", // 필수
        tourContent: "", // 필수
        requiredGender: 1,
        minimumAge: 20,
        maximumAge: 36,
        minimumMember: 3,
        maximumMember: 5,
        member_no_limit: false,
        age_no_limit: false,
        tourThemes: [],
        tourStartDate: "", // 필수
        tourEndDate: "",
        tempSaved: false
      };
      state.is_temp_save_write = false;
    },
    clear_tourInfo(state) {
      state.tourInfo = null;
      state.payload_data.tourLocation = "";
      state.payload_data.tourTeam = "";
    },
    set_company_write_complete(state, bool) {
      state.company_write_complete = bool;
    }
  },
  actions: {
    // 동행 업로드
    async api_post_tour_upload({ state, commit }) {
      if (state.payload_data.age_no_limit === true) {
        state.payload_data.maximumAge = -1;
        state.payload_data.minimumAge = -1;
      }
      if (state.payload_data.people_range_no_limit === true) {
        state.payload_data.minimumMember = -1;
        state.payload_data.maximumMember = -1;
      }

      if (state.modify_company_id) {
        await axios.post(
          `/api/modify-tour/${state.modify_company_id}`,
          state.payload_data
        );
        router.push(`/company/detail/${state.modify_company_id}`);
        commit("set_modify_company_id", null);
        commit("set_company_write_complete", true); // 수정 -> 상세 페이지 뒤로가기 -> 리스트 초기화
      } else {
        const response = await axios.post(
          "/api/tour-upload",
          state.payload_data
        );
        // 커밋이력: 임시 저장 데이터 삭제 하는 코드 삭제

        if (state.payload_data.tempSaved) {
          router.push("/company/index");
        } else {
          router.push(`/company/detail/${response.data.id}`);
        }
        commit("set_company_write_complete", true); // 생성 -> 상세 페이지 뒤로가기 -> 리스트 초기화
      }

      // 동행 작성 또는 수정이 완료 되면 스크롤 데이터 초기화
      commit(
        "scrollStore/set_scroll_info",
        {
          route: "company-write",
          scroll_y: 0
        },
        { root: true }
      );
      commit("clear_state");
    },

    async api_get_temp_tour() {
      return await axios.get(`/api/temp-tour`);
    },
    async api_post_cancel_temp() {
      try {
        await axios.post("/api/cancel-temp");
      } catch (error) {
        if (error.response.status === 500) router.push("error/500");
      }
    }
  }
};
