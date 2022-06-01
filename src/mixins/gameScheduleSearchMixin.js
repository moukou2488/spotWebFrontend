import { mapActions, mapGetters, mapState } from "vuex";

export default {
  data: () => ({ is_empty: false }),
  // 날짜가 바뀌면 다시 체크
  watch: {
    search_date() {
      this.check_is_empty();
    },
    search_year() {
      this.check_is_empty();
    }
  },
  computed: {
    ...mapState("gameScheduleStore", ["search_year", "search_game_schedule"]),
    ...mapGetters("gameScheduleStore", ["search_date"])
  },
  methods: {
    ...mapActions("gameScheduleStore", [
      "api_get_game_schedule",
      "get_today_game_schedule"
    ]),
    // 오늘 경기가 있는지 없는지 확인
    async check_is_empty() {
      const response = await this.get_today_game_schedule();
      if (response.length === 0) this.is_empty = true;
      else this.is_empty = false;
    }
  },
  async mounted() {
    await this.api_get_game_schedule();
    this.check_is_empty();
  }
};
