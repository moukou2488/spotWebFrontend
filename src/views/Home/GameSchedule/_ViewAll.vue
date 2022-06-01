<template>
  <section class="games_chedule-view_all">
    <top-bar :topbar_text="'경기 일정'" :topbar_type="'back'" />
    <header class="section-header">
      <h2 class="header-title">
        경기 일정에 맞춰 동행을 찾아보세요!
      </h2>
      <yyyy-mm-date />
    </header>
    <game-schedule-date-picker />
    <game-schedule-list />
  </section>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import YyyyMmDate from "@/components/Home/GameSchedule/YyyyMmDate.vue";
  import GameScheduleDatePicker from "@/components/Home/GameSchedule/GameScheduleDatePicker.vue";
  import GameScheduleList from "@/components/Home/GameSchedule/GameScheduleList.vue";
  import moment from "moment";

  import { mapMutations } from "vuex";

  export default {
    name: "games_chedule-view_all",
    components: {
      TopBar,
      YyyyMmDate,
      GameScheduleDatePicker,
      GameScheduleList
    },
    methods: {
      ...mapMutations("gameScheduleStore", [
        "set_search_month",
        "set_search_day"
      ])
    },
    beforeRouteLeave(to, from, next) {
      if (to.name !== "company-search-result") {
        this.set_search_month(moment().format("MM"));
        this.set_search_day(moment().format("DD"));
      }
      next();
    }
  };
</script>

<style lang="scss" scoped>
  .games_chedule-view_all {
    .section-header {
      display: flex;
      margin-top: 48px;
      padding: 20px 14px;
      .header-title {
        margin-right: 12px;

        color: #1e1e1e;
        font-size: 14px;
        font-weight: 600;
        line-height: 18px;
        letter-spacing: -0.52px;
      }
    }
    @media screen and (max-width: 330px) {
      .section-header {
        .header-title {
          margin-right: 6px;
          font-size: 12px;
        }
      }
    }
  }
</style>
