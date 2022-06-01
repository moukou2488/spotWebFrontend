<template>
  <div class="company-list-item" role="listitem">
    <router-link
      class="company-detail-link"
      :to="{
        name: 'company-detail',
        params: { id: company_detail.id }
      }"
    >
      <div class="company-list-item--body">
        <user-weather
          :percentage="company_detail.weather"
          :profile_weather="true"
          :is_end="is_end_company"
        />
        <!-- 상세정보 -->
        <div class="item-body-wrap">
          <p class="item-body-title">
            <span class="title-txt">{{ company_detail.tourTitle }}</span>
          </p>
          <!-- 위치 -->
          <p class="item-body-info">
            <img
              class="ic-icon"
              alt="지도 아이콘"
              :src="require('@/assets/images/ic_location@3x.png')"
            />
            <span>{{ company_detail.tourLocation }}</span>
          </p>
          <!-- 날짜 -->
          <p class="item-body-info">
            <img
              class="ic-icon"
              alt="달력 아이콘"
              :src="require('@/assets/images/ic_date@3x.png')"
            />
            <span>{{ date_range }}</span>
          </p>
        </div>
      </div>
    </router-link>

    <div class="company-list-item--footer">
      <div class="user-info-wrap">
        <span class="nick">
          {{ company_detail.nickname }}
        </span>
        <p class="weather-info">
          <span class="weather-txt">{{ company_detail.weather }}</span>
          <span class="weather-percent">%</span>
        </p>
      </div>
      <!-- 조회수 -->
      <div class="footer-right-container">
        <p class="view-wrap">
          <span class="gray">조회</span>
          <span class="view-txt">{{ company_detail.viewCount }}</span>
        </p>
        <!-- 관심 -->
        <p class="scrap-wrap">
          <span class="gray">관심</span>
          <span class="scrap-txt">{{ scrap_count }}</span>
        </p>
        <p v-if="!company_detail.is_my_company" class="scrap_btn-wrap">
          <!-- 활성화 하트 -->
          <a
            v-if="is_my_scrap"
            class="heart-btn-link"
            href="#"
            @click.prevent="unscrap_company_item"
          >
            <img
              class="heart-btn"
              :src="require('@/assets/images/btn_favorite_active@3x.png')"
              alt=""
            />
          </a>
          <!-- 비활성화 하트 -->
          <a
            v-else
            class="heart-btn-link"
            href="#"
            @click.prevent="scrap_company_item"
          >
            <img
              class="heart-btn"
              :src="require('@/assets/images/btn_favorite_inactive@3x.png')"
              alt=""
            />
          </a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
  import UserWeather from "@/components/User/UserWeather.vue";
  import companyScrapMixin from "@/mixins/companyScrapMixin.js";
  import moment from "moment";

  export default {
    name: "company-list-item",
    components: { UserWeather },
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
    },
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
    mixins: [companyScrapMixin],
    beforeMount() {
      this.scrap_count = this.company_detail.scrapCount;
    }
  };
</script>

<style lang="scss" scoped>
  .company-list-item {
    border: 1px solid #e0e0e0;
    border-radius: 6px;

    .company-list-item--body {
      display: flex;
      padding: 13px 0 14px 14px;
      .item-body-wrap {
        margin-left: 26px;
        .item-body-title {
          padding: 4px 0 10px 0;
          .title-txt {
            display: inline-block;
            vertical-align: top;
            font-size: 14px;
            font-weight: 600;
            line-height: 19px;
            letter-spacing: -0.84px !important;
            color: #1e1e1e;
            max-width: 200px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
        .item-body-info {
          display: flex;
          align-items: center;
          color: #464646;
          font-size: 12px;

          & + .item-body-info {
            margin-top: 6px !important;
          }
          .ic-icon {
            width: 22px;
            height: 22px;
            margin-right: 4px;
            vertical-align: top;
          }
        }
      }
    }

    .company-list-item--footer {
      position: relative;
      height: 30px;
      padding-left: 12px;
      border-top: 1px solid #e0e0e0;
      font-size: 12px;
      color: #464646;

      .user-info-wrap {
        display: inline-flex;
        align-items: center;
        height: 100%;
        vertical-align: top;
        .nick {
          max-width: 81px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          letter-spacing: -0.6px;
        }
        .weather-info {
          margin-left: 1px !important;
          color: $dodger_blue;
          .weather-txt {
            display: inline-block;
            vertical-align: top;
            font-size: 14px;
            line-height: 19px;
          }
          .weather-percent {
            display: inline-block;
            vertical-align: middle;
            font-size: 10px;
            line-height: 14px;
          }
        }
      }

      .footer-right-container {
        position: absolute;
        top: 0;
        right: 10px;
        bottom: 0;
        left: 127px;
        display: inline-flex;
        align-items: center;
        height: 100%;
        vertical-align: top;
        .gray {
          color: #999;
          margin-right: 4px;
        }
        .view-wrap {
          margin-right: 26px !important;
        }

        .scrap_btn-wrap {
          position: absolute;
          right: 0;
          .heart-btn-link {
            display: inline-block;
            vertical-align: top;
            width: 20px;
            height: 20px;
            .heart-btn {
              vertical-align: top;
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }

    // SE 대응
    @media screen and (max-width: 330px) {
      .company-list-item--body {
        .item-body-wrap {
          margin-left: 16px;
          .item-body-title {
            .title-txt {
              max-width: 170px;
            }
          }
        }
      }
      .company-list-item--footer {
        .user-info-wrap {
          .nick {
            max-width: 74px;
          }
        }
        .footer-right-container {
          left: 117px;
        }
      }
    }
  }
</style>
