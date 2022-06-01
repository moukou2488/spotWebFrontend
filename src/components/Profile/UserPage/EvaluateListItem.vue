<template>
  <li class="evaluate-list-item">
    <!-- 리뷰 헤더 -->
    <div class="user_info_wrap">
      <!-- 프로필 링크 -->
      <a href="#" @click.prevent="go_to_profile">
        <img
          class="weather_icon"
          :src="user_weather.icon_url"
          alt="평가한 동행날씨 아이콘"
        />
      </a>
      <!-- 리뷰어 info -->
      <div class="review-info-container">
        <div class="info-wrap">
          <div class="regist-info">
            <span class="nickname">{{ computed_nickname }}</span>
            <span class="date">{{ evaluate_detail.reviewDate }}</span>
          </div>
          <p class="weather-sub_text">{{ user_weather.sub_text }}</p>
        </div>
        <!--  -->
        <s-more-btn
          v-if="is_my_review"
          @click.native="set_more_btn_props_data(evaluate_detail)"
          class="more-btn"
          :set_list="{ type: 'evaluate', header: '사용자 > 이용자' }"
        />
      </div>
    </div>
    <!-- 상세평가 -->
    <p class="detail-review">{{ evaluate_detail.detailReview }}</p>
    <!-- 간단 리뷰 -->
    <ul>
      <simple-review
        v-for="simple_review in evaluate_detail.simpleTourReviews"
        :key="simple_review.id"
        :evaluate_index="simple_review.reviewIndex"
      />
    </ul>
  </li>
</template>

<script>
  import companyEvaluateWeatherCalculate from "@/assets/scripts/companyEvaluateWeatherCalculate.js";
  import SimpleReview from "@/components/Profile/UserPage/SimpleReview.vue";
  import SMoreBtn from "@/components/Common/SMoreBtn.vue";
  import { mapActions, mapMutations, mapState } from "vuex";

  export default {
    name: "evaluate-list-item",
    components: { SimpleReview, SMoreBtn },
    props: {
      evaluate_detail: {
        type: Object,
        default() {
          return {
            id: Number,
            getReviewed: String,
            sendReview: String,
            reviewDate: String,
            simpleTourReviews: Array,
            detailReview: String,
            anonymous: Boolean,
            weatherIndex: Number
          };
        }
      }
    },
    computed: {
      ...mapState("userStore", ["user_info"]),
      ...mapState("modalStore", ["more_btn_choose_index"]),
      user_weather() {
        return companyEvaluateWeatherCalculate(
          this.evaluate_detail.weatherIndex
        );
      },
      computed_nickname() {
        return this.evaluate_detail.anonymous
          ? "익명"
          : this.evaluate_detail.sendReview;
      },
      is_my_review() {
        if (!this.user_info) return false;
        else
          return this.user_info.nickname === this.evaluate_detail.sendReview
            ? true
            : false;
      }
    },
    methods: {
      ...mapMutations("modalStore", ["set_more_btn_props_data"]),
      ...mapActions("modalStore", ["config_toast_show"]),
      go_to_profile() {
        if (this.evaluate_detail.anonymous) {
          this.config_toast_show("익명의 유저의 프로필은 열람할 수 없습니다.");
          return;
        }
        this.$router.push(
          `/profile/userpage/${this.evaluate_detail.sendReview}`
        );
      }
    }
  };
</script>

<style lang="scss" scoped>
  .evaluate-list-item {
    padding: 16px 14px 18px;
    .user_info_wrap {
      display: flex;
      .weather_icon {
        width: 50px;
        height: 50px;
      }

      .review-info-container {
        display: flex;
        justify-content: space-between;
        margin-left: 12px;
        flex: 1;
        .info-wrap {
          .regist-info {
            display: flex;
            align-items: center;
            margin: 3px 0 !important;
            font-weight: 500;

            .nickname {
              font-size: 14px;
              line-height: 20px;
              letter-spacing: -0.56px;
              color: #464646;
            }
            .date {
              display: inline-block;
              margin-left: 8px;

              font-size: 12px;
              line-height: 18px;
              letter-spacing: -0.48px;
              color: #999;
            }
          }
          .weather-sub_text {
            font-size: 12px;
            line-height: 18px;
            letter-spacing: -0.48px;
            color: $dodger_blue;
          }
        }
        .more-btn {
          width: 40px;
          height: 40px;
        }
      }
    }

    .detail-review {
      padding: 14px 2px 17px !important;
      font-size: 12px;
      line-height: 21px;
      letter-spacing: -0.72px;
      color: #575757;
    }

    & + .evaluate-list-item {
      border-top: 1px solid #e9e9e9;
    }
  }
</style>
