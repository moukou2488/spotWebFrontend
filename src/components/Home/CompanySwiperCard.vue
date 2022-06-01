<template>
  <swiper-slide class="company-swiper-slide">
    <router-link
      :to="`/company/detail/${company_detail.id}`"
      class="company-swiper-card"
    >
      <user-weather
        :percentage="company_detail.weather"
        :profile_weather="true"
        :percentage_show="false"
        :size="{
          width: 74,
          height: 74
        }"
        :percentage_size="'middle'"
        :is_end="is_end_company"
      />
      <span class="tour-title">{{ company_detail.tourTitle }}</span>
      <footer class="swiper-card-footer">
        <p class="tour-footer-info">
          <img
            class="ic-icon"
            alt="지도 아이콘"
            :src="require('@/assets/images/home_location_icon@3x.png')"
          />
          <span>{{ company_detail.tourLocation }}</span>
        </p>
        <p class="tour-footer-info">
          <img
            class="ic-icon"
            alt="달력 아이콘"
            :src="require('@/assets/images/home_calendar_icon@3x.png')"
          />
          <span>{{ date_range }}</span>
        </p>
      </footer>
    </router-link>
  </swiper-slide>
</template>

<script>
  import UserWeather from "@/components/User/UserWeather.vue";
  import moment from "moment";
  export default {
    components: { UserWeather },
    name: "company-swiper-card",
    props: {
      company_detail: {
        type: Object,
        default() {
          return {
            id: Number,
            is_my_company: Boolean,
            tourLocation: String,
            nickname: String,
            tourTitle: String,
            tourStartDate: String,
            tourEndDate: String,
            weather: Number,
            scrapCount: Number,
            viewCount: Number
          };
        }
      }
    },
    computed: {
      date_range() {
        return (
          this.company_detail.tourStartDate +
          " ~ " +
          this.company_detail.tourEndDate
        );
      },
      is_end_company() {
        return this.company_detail.tourEndDate < moment().format("YYYY-MM-DD");
      }
    }
  };
</script>

<style lang="scss" scoped>
  .company-swiper-slide {
    width: 144px !important;
    margin-right: 10px;

    &:first-child {
      margin: 0 10px 0 14px;
    }
    .company-swiper-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 16px;
      width: 144px !important;
      border: 1px solid #e9e9e9;
      border-radius: 4px;

      .tour-title {
        display: inline-block;
        width: 100%;
        max-width: 144px;
        height: 36px;

        overflow: hidden;
        text-overflow: ellipsis;
        white-space: pre-wrap;

        padding: 0 11px;
        margin: 11px 0 8px;
        box-sizing: border-box;
        text-align: center;
        color: #1e1e1e;
        font-size: 12px;
        font-weight: 500;
        line-height: 18px;
        letter-spacing: -0.48px;
      }

      .swiper-card-footer {
        width: 100%;
        box-sizing: border-box;
        padding: 9px 0;
        border-top: 1px solid #e9e9e9;

        .tour-footer-info {
          width: 100%;
          text-align: center;
          letter-spacing: -0.4px;
          color: #464646;

          .ic-icon {
            position: relative;
            top: 1px;
            width: 10px;
            height: 10px;
            margin-right: 4px;
          }
          & + .tour-footer-info {
            margin-top: 9px !important;
          }
        }
      }
    }
  }
</style>
