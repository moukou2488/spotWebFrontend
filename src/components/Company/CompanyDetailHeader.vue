<template>
  <header class="company-detail-header">
    <div class="header-weather-wrap">
      <user-weather
        v-if="company_detail"
        :percentage="company_detail.weather"
        :size="{
          width: 100,
          height: 100
        }"
        :percentage_show="true"
        :user_nick="company_detail.nickname"
        :profile_weather="true"
      />
    </div>
    <h2 class="company_title">{{ company_detail.tourTitle }}</h2>

    <p class="company_nickname">
      <span class="nickname_prefix">Buddy </span>
      <span class="nickname">{{ company_detail.nickname }}</span>
    </p>

    <!-- 동행 글 내용 -->
    <p class="company_body">
      {{ company_detail.tourContent }}
    </p>

    <!-- 조회 수 & 관심 수 -->
    <p class="scrp_view-wrap">
      <span class="count-wrap">
        <span class="count-title">조회</span>
        <span class="count-num">{{ company_detail.viewCount }}</span>
      </span>
      <span class="gray-div"></span>
      <span class="count-wrap">
        <span class="count-title">관심</span>
        <span class="count-num">{{ scrap_count }}</span>
      </span>
    </p>

    <!-- 동행 테마 -->
    <company-theme-list
      :theme_list="company_detail.tourThemes"
      :theme_search_props="true"
    />

    <!-- 지역 -> 1.1.1 삭제됨 -->

    <!-- 선택한 구단 -->
    <div class="sub-txt-wrap">
      <img
        class="icon-img"
        :src="require('@/assets/images/ic_baseball@3x.png')"
        alt="지도 아이콘"
      />
      <p class="txt-wrapper">
        <span>{{ computed_team }}</span>
      </p>
    </div>

    <!-- 날짜 -->
    <div class="sub-txt-wrap">
      <img
        class="icon-img"
        :src="require('@/assets/images/ic_date@3x.png')"
        alt="달력 아이콘"
      />
      <p class="txt-wrapper">
        <span>{{ company_detail.tourStartDate }}</span
        ><span class="gray">부터</span>
        <span class="gray-div-row"></span>
        <span>{{ company_detail.tourEndDate }}</span
        ><span class="gray">까지</span>
      </p>
    </div>

    <!-- 날짜 상세 정보 -->
    <p class="tour-date-detail">{{ company_detail.tourDateDetail }}</p>
  </header>
</template>

<script>
  import UserWeather from "@/components/User/UserWeather.vue";
  import CompanyThemeList from "@/components/Company/CompanyThemeList.vue";

  import { mapState } from "vuex";

  export default {
    name: "company-detail-header",
    components: { UserWeather, CompanyThemeList },
    computed: {
      ...mapState("companyStore", ["scrap_event"]),
      company_detail() {
        return this.$store.getters.compnay_detail;
      },
      computed_team() {
        const tourTeam = this.company_detail.tourTeam;
        if (tourTeam === "") return "선택 안함";
        else return tourTeam;
      }
    },
    watch: {
      scrap_event(newVal) {
        if (newVal) this.scrap_count += 1;
        else this.scrap_count -= 1;
      }
    },
    data: () => ({ scrap_count: 0 }),
    beforeMount() {
      this.scrap_count = this.company_detail.scrapCount;
    }
  };
</script>

<style lang="scss" scoped>
  .company-detail-header {
    margin-top: 48px;
    padding: 0 20px;
    .header-weather-wrap {
      padding: 30px 0 38px;

      .user-weather-container {
        display: inline-flex;
        position: relative;
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .company_title {
      font-size: 18px;
      line-height: 24px;
      margin-bottom: 5px !important;
      letter-spacing: -0.36px;
      color: #373737;
    }
    .company_nickname {
      font-size: 12px;
      line-height: 17px;
      margin-bottom: 24px !important;
      .nickname_prefix {
        color: $dodger_blue;
      }
      .nickname {
        color: #464646;
      }
    }
    .company_body {
      margin-bottom: 10px !important;
      color: #464646;
      font-size: 14px;
      letter-spacing: -0.28px;
    }

    // 조회수, 관심수
    .scrp_view-wrap {
      display: flex;
      align-items: center;
      .count-wrap {
        font-size: 12px;
        line-height: 15px;
        .count-title {
          display: inline-block;
          vertical-align: text-top;
          color: #373737;
        }
        .count-num {
          display: inline-block;
          margin-left: 4px;
          vertical-align: text-top;
          color: #999;
        }
      }
      .gray-div {
        display: inline-block;
        width: 1px;
        height: 10px;
        background-color: #ddd;
        margin: 0 6px;
      }
    }

    //
    .sub-txt-wrap {
      font-size: 12px;
      color: #464646;
      height: 22px;

      .txt-wrapper {
        display: inline-block;
        vertical-align: top;
        height: 100%;
        span {
          display: inline-block;
          vertical-align: middle;
        }
      }
      .icon-img {
        vertical-align: top;
        width: 22px;
        height: 22px;
        margin-right: 6px;
      }
      .gray {
        margin-left: 6px;
        color: #999;
      }
      .gray-div-row {
        display: inline-block;
        width: 20px;
        height: 2px;
        background-color: #ddd;
        margin: 0 10px;
      }
      & + .sub-txt-wrap {
        margin-top: 10px !important;
      }
    }
    .tour-date-detail {
      margin: 11px 0 32px 28px !important;
      color: #999;
      font-size: 12px;
    }
  }
</style>
