<template>
  <div class="game-schedule-card" :class="size">
    <div class="schedule-info-wrap">
      <div class="club">
        <img
          class="club_logo"
          :src="filters_club_logo('team1')"
          alt="구단 로고"
        />
        <strong class="club_name">{{ schedule_detail.team1 }}</strong>
      </div>
      <div class="time-info">
        <p class="place">
          {{ schedule_detail.place }}
        </p>
        <p class="time not-kr">{{ schedule_detail.time }}</p>
      </div>
      <div class="club">
        <img
          class="club_logo"
          :src="filters_club_logo('team2')"
          alt="구단 로고"
        />
        <strong class="club_name">{{ schedule_detail.team2 }}</strong>
      </div>
    </div>

    <button
      v-if="choose_item"
      class="search-button company"
      :class="{ active: is_active }"
      @click="set_tour_info(schedule_detail)"
    >
      경기 선택
      {{ is_active ? "(선택됨)" : null }}
    </button>
    <button v-else class="search-button" @click="go_search">
      동행 보러가기
    </button>
  </div>
</template>

<script>
  import teams_list from "@/assets/data/teams_list.js";
  import game_place from "@/assets/data/game_place.js";
  import moment from "moment";
  import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

  export default {
    name: "game-schedule-card",
    computed: {
      ...mapState("companyWriteStore", ["tourInfo"]),
      ...mapGetters("gameScheduleStore", ["search_date"])
    },
    props: {
      schedule_detail: {
        type: Object,
        default() {
          return {
            date: String,
            time: String,
            team1: String,
            team2: String,
            place: String
          };
        }
      },
      size: {
        type: String,
        default: "small"
      },
      choose_item: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      tourInfo(new_info) {
        this.is_active =
          JSON.stringify(this.schedule_detail) === JSON.stringify(new_info);
      },
      search_date() {
        // 날짜가 바뀌면 반영이 안 되는 이슈
        this.is_active =
          JSON.stringify(this.schedule_detail) ===
          JSON.stringify(this.tourInfo);
      }
    },
    data: () => ({ is_active: false }),
    methods: {
      ...mapMutations("companyStore", [
        "set_company_search_keyword",
        "set_company_search_date"
      ]),
      ...mapMutations("companyWriteStore", [
        "set_tourInfo",
        "set_tourStartDate",
        "set_tourEndDate"
      ]),
      ...mapMutations("stampStore", ["set_stamp_game"]),
      ...mapActions("companyStore", ["api_post_tour_search"]),
      filters_club_logo(team_index) {
        let return_img_url = "";
        for (let i = 0; i < teams_list.length; i++) {
          if (
            teams_list[i].team
              .toUpperCase()
              .includes(this.schedule_detail[team_index])
          ) {
            return_img_url = teams_list[i].team_logo;
            break;
          }
        }
        return require(`@/assets/images/${return_img_url}`);
      },
      filters_full_team_name(team) {
        let full_team_name = "";
        for (let i = 0; i < teams_list.length; i++) {
          if (teams_list[i].team.toUpperCase().includes(team)) {
            full_team_name = teams_list[i].team;
            break;
          }
        }
        return full_team_name;
      },
      filters_full_place_name(place) {
        let full_place_name = "";
        for (let i = 0; i < game_place.length; i++) {
          if (game_place[i].place.toUpperCase().includes(place)) {
            full_place_name = game_place[i].place;
            break;
          }
        }
        return full_place_name;
      },
      go_search() {
        const search_date_year_format = `${moment().format("YYYY")}.${
          this.search_date
        }`.replace(/\./gi, "-");

        this.set_company_search_keyword(this.schedule_detail.place);
        this.set_company_search_date([
          search_date_year_format,
          search_date_year_format
        ]);
        this.api_post_tour_search();
      },
      set_tour_info(schedule_detail) {
        if (this.$route.params.item === "stamp") {
          const date = new Date();
          const stamp_game = {
            location: this.filters_full_place_name(schedule_detail.place),
            homeTeam: this.filters_full_team_name(schedule_detail.team1),
            awayTeam: this.filters_full_team_name(schedule_detail.team2),
            gameDate:
              date.getFullYear() + "." + schedule_detail.date.split("(")[0]
          };
          this.set_stamp_game(stamp_game);
        }
        this.set_tourInfo(schedule_detail);
        this.set_tourStartDate("");
        this.set_tourEndDate("");
      }
    },
    mounted() {
      this.is_active = this.schedule_detail === this.tourInfo;
    }
  };
</script>

<style lang="scss" scoped>
  .game-schedule-card {
    .schedule-info-wrap {
      display: flex;
      justify-content: center;
      box-sizing: border-box;
      border: 1px solid #e9e9e9;
      border-radius: 4px 4px 0 0;
      .club {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        .club_name {
          color: #484848;
          font-size: 13px;
          font-weight: 500;
          line-height: 18px;
        }
      }
      .time-info {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        color: #999;

        margin: 0 6.5px;

        .place {
          margin-top: 8px !important;
          font-size: 12px;
          line-height: 18px;
          letter-spacing: -0.48px;
        }
        .time {
          margin-top: 14px !important;
          font-size: 13px;
          line-height: 15px;
          letter-spacing: -0.52px;
        }
      }
    }
    .search-button {
      width: 100%;
      color: #fff;
      font-size: 12px;
      font-weight: 500;
      line-height: 18px;
      letter-spacing: -0.48px;
      background-color: #5dbfff;
      border-radius: 0 0 4px 4px;

      &.company {
        background-color: #c2c2c2;
        &.active {
          background-color: #5dbfff;
        }
      }
    }

    // 전체 보기
    &.medium {
      width: 100%;
      .schedule-info-wrap {
        height: 90px;
        padding: 12px 0;
        .club {
          .club_logo {
            width: 42px;
            height: 42px;
          }
          .club_name {
            margin-top: 5px !important;
          }
        }
        .time-info {
          .place {
            margin-top: 13px !important;
          }
          .time {
            margin-top: 17px !important;
          }
        }
      }
      .search-button {
        height: 30px;
      }
    }

    // 스와이프
    &.small {
      width: 144px;
      .schedule-info-wrap {
        height: 78px;
        padding: 10px 0;

        .club {
          .club_logo {
            width: 36px;
            height: 36px;
          }
          .club_name {
            margin-top: 3px !important;
            letter-spacing: -0.52px;
          }
        }
        .time-info {
          .place {
            margin-top: 8px !important;
          }
          .time {
            margin-top: 14px !important;
          }
        }
      }
      .search-button {
        height: 26px;
      }
    }
  }
</style>
