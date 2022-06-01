<template>
  <section class="company-write-game_picker">
    <company-write-nav :headline="'경기 선택'">
      <template v-slot:right-btn>
        <button class="temp-save-btn" @click="$router.go(-1)">선택완료</button>
      </template>
    </company-write-nav>
    <header class="section-header">
      <h2 class="header-title">
        날짜를 조정해서 경기를 골라보세요!
      </h2>
      <yyyy-mm-date />
    </header>
    <game-schedule-date-picker />
    <game-schedule-list />
  </section>
</template>

<script>
  import CompanyWriteNav from "@/components/Company/CompanyWriteNav.vue";
  import YyyyMmDate from "@/components/Home/GameSchedule/YyyyMmDate.vue";
  import GameScheduleDatePicker from "@/components/Home/GameSchedule/GameScheduleDatePicker.vue";
  import GameScheduleList from "@/components/Home/GameSchedule/GameScheduleList.vue";
  import { mapState } from "vuex";

  export default {
    name: "company-write-game_picker",
    components: {
      CompanyWriteNav,
      YyyyMmDate,
      GameScheduleDatePicker,
      GameScheduleList
    },
    computed: { ...mapState("companyWriteStore", ["tourInfo"]) }
  };
</script>

<style lang="scss" scoped>
  .company-write-game_picker {
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
