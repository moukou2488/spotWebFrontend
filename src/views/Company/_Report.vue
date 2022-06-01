<template>
  <div class="company-report">
    <top-bar :topbar_text="'신고하기'" :topbar_type="'back'" />
    <div class="company-report-container">
      <report-header />
      <report-body>
        <template v-slot:report-btn>
          <button class="footer-btn major" @click="report_confirm">확인</button>
        </template>
      </report-body>
      <s-toast :where="'bottom-bar'" />
    </div>
  </div>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import ReportHeader from "@/components/Common/ReportHeader.vue";
  import ReportBody from "@/components/Common/ReportBody.vue";
  import SToast from "@/components/Common/SToast.vue";

  import { mapActions, mapState } from "vuex";

  export default {
    name: "user-report",
    components: { TopBar, ReportHeader, ReportBody, SToast },
    computed: {
      ...mapState("companyStore", ["company_detail"]),
      ...mapState("reportStore", ["report_item", "violationIndex", "etc"]),
      ...mapState("communityStore", ["team_detail"])
    },
    methods: {
      ...mapActions("reportStore", ["api_post_report"]),
      ...mapActions("modalStore", ["config_toast_show"]),
      async report_confirm() {
        if (this.violationIndex === 0 && this.etc === "") {
          this.config_toast_show("내용을 입력해주세요.");
          return;
        }
        await this.api_post_report();
        this.config_toast_show("신고접수가 완료되었습니다.");
      }
    }
  };
</script>

<style lang="scss" scoped>
  .company-report-container {
    margin-top: 48px;
  }
</style>
