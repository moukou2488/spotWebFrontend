<template>
  <section class="game-schedule-swiper">
    <swiper v-if="!is_empty" :options="swiperOption">
      <swiper-slide
        v-for="(schedule, index) in search_game_schedule"
        :key="index + '경기 스케줄'"
        class="schedule-wrap"
      >
        <game-schedule-card :schedule_detail="schedule" />
      </swiper-slide>
    </swiper>
    <div v-else class="empty-view">
      <p class="major">이런, 해당 날짜에 경기가 없네요.</p>
      <p class="sub">다른 날짜를 선택해주세요.</p>
    </div>
  </section>
</template>

<script>
  import GameScheduleCard from "@/components/Home/GameSchedule/GameScheduleCard.vue";
  import gameScheduleSearchMixin from "@/mixins/gameScheduleSearchMixin.js";

  export default {
    name: "game-schedule-swiper",
    components: { GameScheduleCard },
    data: () => ({
      swiperOption: {
        slidesPerView: "auto",
        freeMode: true
      }
    }),
    mixins: [gameScheduleSearchMixin]
  };
</script>

<style lang="scss" scoped>
  .game-schedule-swiper {
    padding-top: 16px;
    .schedule-wrap {
      width: 144px !important;
      margin-right: 10px;

      &:first-child {
        margin: 0 10px;
      }
    }
    .empty-view {
      padding: 40px 0 19px;
      text-align: center;
      .major {
        color: #1e1e1e;
        font-size: 16px;
        font-weight: 500;
        line-height: 22px;
        letter-spacing: -0.32px;
      }
      .sub {
        margin-top: 6px !important;
        color: #999;
        font-size: 12px;
        line-height: 17px;
        letter-spacing: -0.24px;
      }
    }
  }
</style>
