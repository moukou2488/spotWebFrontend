<template>
  <section class="game-schedule-preview">
    <game-schedule-header :title="'경기일정'" :link="true" />
    <game-schedule-date-picker />
    <game-schedule-swiper />
  </section>
</template>

<script>
  import GameScheduleDatePicker from "@/components/Home/GameSchedule/GameScheduleDatePicker.vue";
  import GameScheduleHeader from "@/components/Home/GameSchedule/GameScheduleHeader.vue";
  import GameScheduleSwiper from "@/components/Home/GameSchedule/GameScheduleSwiper.vue";

  export default {
    name: "game-schedule-preview",
    components: {
      GameScheduleHeader,
      GameScheduleDatePicker,
      GameScheduleSwiper
    }
  };
</script>

<style lang="scss" scoped>
  .game-schedule-preview {
  }
</style>
