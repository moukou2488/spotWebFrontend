import axios from "axios";
import moment from "moment";

export default {
  namespaced: true,
  state: {
    game_schedule_all: [],
    search_game_schedule: [],
    search_year: moment().format("YYYY"),
    search_month: moment().format("MM"),
    search_day: moment().format("DD")
  },
  getters: {
    search_date(state) {
      return state.search_month + "." + state.search_day;
    },
    search_month_year(state) {
      return state.search_year + "-" + state.search_month;
    }
  },
  mutations: {
    set_game_schedule_all(state, schedule_list) {
      state.game_schedule_all = schedule_list;
    },
    set_search_game_schedule(state, search_schedule_list) {
      state.search_game_schedule = search_schedule_list;
    },
    set_search_year(state, year) {
      state.search_year = year;
    },
    set_search_month(state, month) {
      state.search_month = month;
    },
    set_search_day(state, day) {
      state.search_day = day;
    }
  },
  actions: {
    get_today_game_schedule({ commit, state, getters }) {
      commit("set_search_game_schedule", []);

      let search_schedule_list = [];

      if (state.search_year === moment().format("YYYY")) {
        // 년도가 올해로 설정되어 있는 경우
        state.game_schedule_all.forEach(schedule => {
          if (schedule.date.includes(getters.search_date))
            search_schedule_list.push(schedule);
        });
      }

      commit("set_search_game_schedule", search_schedule_list);
      return search_schedule_list;
    },

    async api_get_game_schedule({ commit, dispatch }) {
      const response = await axios.get(
        "https://raw.githubusercontent.com/Team-SPOT/spot-crawler-v2/master/schedule.json"
      );

      commit("set_game_schedule_all", response.data);
      dispatch("get_today_game_schedule");
      return response.data;
    }
  }
};
