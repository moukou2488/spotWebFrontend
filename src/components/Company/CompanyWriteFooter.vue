<template>
  <footer class="company-write-footer">
    <h3 class="footer-title">내 정보</h3>
    <div class="author_info-container">
      <div class="author_info-wrap">
        <img class="profile-img" :src="user_weather.icon_url" alt="프로필" />
        <div class="txt-wrapper">
          <span>{{ user_info.nickname }}</span>
          <p>
            <span class="dodger_blue">{{ user_info.weather }}</span>
            <span class="dodger_blue percent">%</span>
          </p>
        </div>
      </div>
      <p class="recruit_info-wrap">
        <span class="gray">선택구단</span>
        <span>{{ computed_team }}</span>
      </p>
      <!-- 성별 -->
      <p class="recruit_info-wrap">
        <span class="gray">성별</span>
        <span>{{ user_gender }}</span>
      </p>
      <!-- 연령대 -->
      <p id="age" class="recruit_info-wrap">
        <span class="gray">연령</span>
        <span>{{ computed_age }}</span>
      </p>
      <!-- submit-wrap -->
      <div class="submit-btn-wrap">
        <button
          class="submit-btn"
          :class="{ active: is_finish }"
          @click="api_post_tour_upload"
          :disabled="!is_finish"
        >
          {{ modify_company_id ? "수정하기" : "등록하기" }}
        </button>
      </div>
      <s-toast :where="'bottom'" />
    </div>
  </footer>
</template>

<script>
  import SToast from "@/components/Common/SToast.vue";

  import weatherCalculate from "@/assets/scripts/weatherCalculate.js";
  import { ageCalculate } from "@/assets/scripts/ageCalculate.js";
  import clubCalculate from "@/assets/scripts/clubCalculate.js";

  import { mapActions, mapGetters, mapState } from "vuex";

  export default {
    name: "company-write-footer",
    components: { SToast },
    props: {
      is_finish: {
        type: Boolean,
        required: true
      }
    },
    computed: {
      ...mapState("companyWriteStore", ["payload_data", "modify_company_id"]),
      ...mapState("userStore", ["user_info"]),
      ...mapGetters("userStore", ["user_gender", "user_age"]),
      computed_age() {
        return ageCalculate(this.user_age);
      },
      computed_team() {
        return clubCalculate(this.user_info.teamIndex);
      },
      user_weather() {
        return weatherCalculate(this.user_info.weather);
      }
    },
    methods: {
      ...mapActions("companyWriteStore", ["api_post_tour_upload"])
    }
  };
</script>

<style lang="scss" scoped>
  @import "./CompanyDetail.scss";
  .company-write-footer {
    padding: 0 20px 74px;
    .footer-title {
      padding: 24px 0;
      color: #1e1e1e;
      font-size: 16px;
      letter-spacing: -0.96px;
    }
    .author_info-container {
      margin-bottom: 26px;
    }
    .author_introduction-wrap {
      padding: 18px 6px;
      border-top: 1px solid #e9e9e9;

      .author_introduction {
        width: 100%;
        height: 112px;
        line-height: 24px;
        resize: none;
        font-size: 14px;
        letter-spacing: -0.28px;
        color: #464646;
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
    .submit-btn-wrap {
      position: absolute;
      left: 14px;
      right: 14px;
      bottom: 10px;
      height: 40px;
      .submit-btn {
        width: 100%;
        height: 100%;
        font-size: 14px;
        color: #fff;
        letter-spacing: -0.28px;
        border-radius: 4px;
        background-color: #c2c2c2;

        &.active {
          background-color: $dodger_blue;
        }
      }
    }
  }
</style>
