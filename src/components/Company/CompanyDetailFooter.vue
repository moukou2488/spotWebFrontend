<template>
  <footer class="company-detail-footer">
    <h3 class="recruit_author_info-title">등록자 정보</h3>
    <div class="author_info-wrap">
      <router-link :to="`/profile/userpage/${company_detail.nickname}`">
        <img class="profile-img" :src="profile_photo_url" alt="프로필 사진" />
      </router-link>
      <div class="txt-wrapper">
        <router-link :to="`/profile/userpage/${company_detail.nickname}`">
          <span>{{ company_detail.nickname }}</span>
        </router-link>
        <p>
          <span class="dodger_blue">{{ company_detail.weather }}</span>
          <span class="dodger_blue percent">%</span>
        </p>
      </div>
    </div>

    <!-- 인삿말 -->
    <p class="author_greeting_txt">{{ company_detail.bio }}</p>

    <!-- 추가정보 -->
    <p class="recruit_info-wrap">
      <span class="gray">선택구단</span>
      <span>{{ computed_club }}</span>
    </p>

    <!-- 성별 -->
    <p class="recruit_info-wrap">
      <span class="gray">성별</span>
      <span>{{ company_detail_gender }}</span>
    </p>

    <!-- 연령대 -->
    <p id="age" class="recruit_info-wrap">
      <span class="gray">연령</span>
      <span>{{ computed_age }}</span>
    </p>

    <s-toast
      :where="computed_toast_type === 'heart' ? 'bottom-bar' : 'bottom'"
    />

    <div v-if="is_my_company_detail" class="button-wrapper">
      <button
        class="btn"
        :class="this_company_recruit_close ? 'fill_disabled' : 'fill'"
        :disabled="this_company_recruit_close"
        @click="open_dialoog_company_close"
      >
        모집 공고 마감하기
      </button>
    </div>

    <div v-else class="button-wrapper">
      <button class="btn fill" @click="call_api_create_room">
        동행 채팅 시작하기
      </button>
      <a
        v-if="is_my_scrap"
        class="footer-icon-wrapper"
        href="#"
        @click.prevent="unscrap_company_item"
      >
        <img
          class="footer-icon"
          :src="require('@/assets/images/btn_favorite_active@3x.png')"
          alt="활성화된 하트"
        />
      </a>
      <a
        v-else
        class="footer-icon-wrapper"
        href="#"
        @click.prevent="scrap_company_item"
      >
        <img
          class="footer-icon"
          :src="require('@/assets/images/btn_favorite_inactive@3x.png')"
          alt="비활성화된 하트"
        />
      </a>
    </div>
  </footer>
</template>

<script>
  import companyScrapMixin from "@/mixins/companyScrapMixin.js";
  import companyCloseCheckMixin from "@/mixins/companyCloseCheckMixin.js";

  import { ageCalculate } from "@/assets/scripts/ageCalculate.js";
  import clubCalculate from "@/assets/scripts/clubCalculate.js";

  import SToast from "@/components/Common/SToast.vue";

  import { mapState, mapActions } from "vuex";
  import moment from "moment";

  export default {
    name: "company-detail-footer",
    components: { SToast },
    computed: {
      ...mapState("companyStore", ["company_detail", "is_my_company_detail"]),
      ...mapState("modalStore", ["toast_msg"]),
      ...mapState("userStore", ["user_info"]),
      ...mapState("notifyStore", ["chatroom_id"]),

      user_nickname() {
        if (this.user_info) {
          return this.user_info.nickname;
        } else {
          return null;
        }
      },
      company_detail_gender() {
        const gender = this.company_detail.gender;
        return gender === 1 ? "남성" : gender === 2 ? "여성" : "ERROR!";
      },
      computed_age() {
        return ageCalculate(this.company_detail.age);
      },
      computed_club() {
        return clubCalculate(this.company_detail.teamIndex);
      },
      computed_toast_type() {
        return this.toast_msg === "관심 목록에 추가되었습니다."
          ? "heart"
          : "block";
      }
    },
    data: () => ({
      profile_photo_url: require("@/assets/images/profile_default.png")
    }),
    mixins: [companyScrapMixin, companyCloseCheckMixin],
    methods: {
      ...mapActions("notifyStore", [
        "api_create_room",
        "api_confirm_tour_bool"
      ]),
      ...mapActions("companyStore", [
        "api_get_cancel_state",
        "api_post_close_tour"
      ]),
      ...mapActions("profileStore", ["api_get_profile_photo"]),
      ...mapActions("modalStore", ["config_toast_show"]),

      async call_api_create_room() {
        if (this.company_detail.tourEndDate < moment().format("YYYY-MM-DD")) {
          this.config_toast_show("마감된 동행입니다.");
          return;
        }
        if (this.user_info === null) {
          this.$eventBus.$emit("alert", {
            type: "login"
          });
          return;
        }

        const is_canceled_company = await this.api_get_cancel_state(
          this.company_detail.id
        );
        if (is_canceled_company) {
          this.config_toast_show("취소한 동행입니다.");
          return;
        }
        await this.api_create_room(this.company_detail.id);
        await this.api_confirm_tour_bool(this.chatroom_id);
        this.$router.push(`/chat-detail/${this.chatroom_id}`);
      },
      open_dialoog_company_close() {
        // 동행 마감 alert 띄우기
        this.$eventBus.$emit("alert", {
          type: "company-close",
          payload_data: this.company_detail.id
        });
      }
    },
    async mounted() {
      const response = await this.api_get_profile_photo(
        this.company_detail.nickname
      );
      this.profile_photo_url = response;

      // 동행 마감 alert
      this.$eventBus.$on("alert_close", async payload => {
        if (payload.type == "company-close") {
          try {
            await this.api_post_close_tour(payload.payload_data); // 동행 마감하기
            this.config_toast_show("동행 마감 되었습니다.");
          } catch (error) {
            this.config_toast_show("Something Wrong :(");
            console.log(error);
          }
        }
      });
    },
    beforeDestroy() {
      this.$eventBus.$off("alert_close");
    }
  };
</script>

<style lang="scss" scoped>
  @import "./CompanyDetail.scss";
  .company-detail-footer {
    position: relative;
    padding-top: 30px;

    .recruit_author_info-title,
    .author_info-wrap,
    .author_greeting_txt,
    .recruit_info-wrap {
      padding: 0 20px;
    }

    .recruit_author_info-title {
      margin-bottom: 19px;
      font-size: 16px;
      letter-spacing: -0.32px;
    }

    .author_greeting_txt {
      margin-bottom: 20px !important;
      font-size: 13px;
      color: #999;
    }

    #age {
      margin-bottom: 40px !important;
    }

    .button-wrapper {
      display: flex;
      justify-content: space-between;
      padding: 10px 14px;
      .btn {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        flex: 1;
        height: 40px;
      }
      .footer-icon-wrapper {
        display: inline-block;
        vertical-align: top;
        margin-left: 8px;
        .footer-icon {
          width: 40px;
          height: 40px;
          vertical-align: top;
        }
      }
    }
  }
</style>
