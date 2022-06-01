<template>
  <ul class="game-schedule-list" v-if="!is_empty">
    <li
      class="game-schedule-list-item"
      v-for="(schedule, index) in search_game_schedule"
      :key="index + '경기 스케줄 리스트'"
    >
      <game-schedule-card
        :size="'medium'"
        :schedule_detail="schedule"
        :choose_item="choose_item"
      />
    </li>
  </ul>
  <div v-else class="empty-view">
    <div class="text-wrap">
      <p class="major">이런, 해당 날짜에 경기가 없네요.</p>
      <p class="sub">다른 날짜를 선택해주세요.</p>
    </div>
  </div>
</template>

<script>
  import GameScheduleCard from "@/components/Home/GameSchedule/GameScheduleCard.vue";
  import gameScheduleSearchMixin from "@/mixins/gameScheduleSearchMixin.js";

  export default {
    name: "game-schedule-list",
    components: { GameScheduleCard },
    data: () => ({
      choose_item: false
    }),
    mixins: [gameScheduleSearchMixin],
    mounted() {
      if (this.$route.name === "company-write-game_picker")
        this.choose_item = true;
    }
  };
</script>

<style lang="scss" scoped>
  .game-schedule-list {
    padding: 16px 8.5px !important;
    .game-schedule-list-item {
      display: inline-block;
      width: 50%;
      padding: 0 4px 10px;
    }
  }
  .empty-view {
    position: relative;
    height: calc(100vh - 148px);
    .text-wrap {
      position: relative;
      top: 26.6%;
      .major {
        color: #1e1e1e;
        font-size: 20px;
        font-weight: 500;
        line-height: 29px;
        letter-spacing: -1.2px;
        text-align: center;
      }
      .sub {
        margin-top: 9px !important;
        color: #999;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.84px;
        text-align: center;
      }
    }
  }
</style>
