<template>
  <div class="company-detail">
    <top-bar :topbar_text="topbar_text" :topbar_type="'back'">
      <template v-slot:top_bar_right>
        <s-more-btn :set_list="set_list" />
      </template>
    </top-bar>
    <div class="company-detail-view">
      <company-detail-header />
      <div class="custom-br"></div>
      <company-detail-body />
      <div class="custom-br"></div>
      <company-detail-footer />
    </div>
  </div>
</template>

<script>
  import companyCloseCheckMixin from "@/mixins/companyCloseCheckMixin.js";
  import TopBar from "@/components/Common/TopBar.vue";
  import CompanyDetailHeader from "@/components/Company/CompanyDetailHeader.vue";
  import CompanyDetailBody from "@/components/Company/CompanyDetailBody.vue";
  import CompanyDetailFooter from "@/components/Company/CompanyDetailFooter.vue";
  import SMoreBtn from "@/components/Common/SMoreBtn.vue";
  import moment from "moment";

  import { mapState, mapActions, mapMutations } from "vuex";

  export default {
    name: "company-detail",
    components: {
      TopBar,
      CompanyDetailHeader,
      CompanyDetailBody,
      CompanyDetailFooter,
      SMoreBtn
    },
    computed: {
      ...mapState("companyStore", ["company_detail", "is_my_company_detail"]),
      ...mapState("userStore", ["user_info"]),
      company_detail() {
        return this.$store.getters.compnay_detail;
      },
      topbar_text() {
        return `[${this.company_detail.tourLocation}] ${this.company_detail.tourTitle}`;
      },
      // 더보기 리스트 세팅
      set_list() {
        let moreBtnList = {
          type: null,
          header: null
        };
        if (this.user_info !== null && this.is_my_company_detail) {
          moreBtnList.type = "mine_detail";
          moreBtnList.header = "버디 동행 관리하기";
        } else {
          moreBtnList.type = "other_user_report";
          moreBtnList.header = "다른 사용자 프로필";
        }
        return moreBtnList;
      }
    },
    methods: {
      // 동행
      ...mapActions("companyStore", [
        "api_post_block_tour",
        "api_post_delete_tour"
      ]),
      ...mapMutations("companyStore", [
        "set_company_list",
        "set_company_scroll_index"
      ]),
      ...mapActions("modalStore", ["config_toast_show"])
    },
    mixins: [companyCloseCheckMixin],
    mounted() {
      this.$eventBus.$on("alert_close", async payload => {
        if (payload.type === "block") {
          await this.api_post_block_tour(this.company_detail.nickname); // 동행 차단 api 호출
          this.set_company_scroll_index(0);
          this.set_company_list([]); // 차단 후 동행 리스트 초기화
          this.$router.go(-1);
          this.config_toast_show("해당 사용자가 차단되었습니다."); // 동행 차단 toast 창 띄우기
        } else if (payload.type === "delete") {
          const tour_end_date = this.company_detail.tourEndDate;
          const today = moment().format("YYYY-MM-DD");

          if (
            today <= tour_end_date &&
            this.company_detail.nowNumberOfMember !== 0
          ) {
            this.config_toast_show(
              "현재 확정된 인원이 있어 동행 모집글 삭제가 불가능합니다."
            );
            return;
          }

          try {
            await this.api_post_delete_tour();
            this.$router.push("/company/index");
            this.config_toast_show("삭제되었습니다.");
          } catch (error) {
            this.config_toast_show("Something Wrong :(");
          }
        }
      });
    },
    // 내가 쓴 동행 글인지 확인 디폴트 상태로
    beforeRouterLeave(to, from, next) {
      this.$eventBus.$off("alert_close");
      this.$store.commit("companyStore/set_is_my_company_detail", false);
      next();
    }
  };
</script>
