<template>
  <header class="game-schedule-header">
    <div class="date-info-wrap">
      <h2 class="header-title">경기일정</h2>
      <yyyy-mm-date />
    </div>
    <router-link to="/game_schedule/view_all" class="see-all-link">
      <span class="link-text">전체 보기</span>
      <img
        class="arrow-icon"
        :src="require('@/assets/images/btn_arrow_right_all.png')"
        alt="진한 오른 화살표 아이콘"
    /></router-link>
  </header>
</template>

<script>
  import YyyyMmDate from "@/components/Home/GameSchedule/YyyyMmDate.vue";

  export default {
    name: "game-schedule-header",
    components: { YyyyMmDate }
  };
</script>

<style lang="scss" scoped>
  .game-schedule-header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 28px 10px 10px 14px;
    .date-info-wrap {
      display: flex;
      align-items: center;

      .header-title {
        margin-right: 7px;

        color: #1e1e1e;
        font-size: 16px;
        font-weight: 500;
        line-height: 25px;
        letter-spacing: -0.96px;
      }
    }
    .see-all-link {
      display: inline-flex;
      align-items: center;
      .link-text {
        color: #464646;
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;
        letter-spacing: -0.48px;
      }
      .arrow-icon {
        margin-left: 2px;
        width: 12px;
        height: 12px;
        vertical-align: top;
      }
    }
  }
</style>
