<template>
  <header class="report-header">
    <div class="header-title">
      <p class="title-text">
        {{ report_header_text }}
      </p>
      <p class="title-text">회원님의 신고는 익명으로 처리됩니다.</p>
    </div>

    <div class="header-sub-title">
      <p class="sub-title-text">신고는 반대의견을 표시하는 기능이 아닙니다.</p>
      <p class="sub-title-text">
        허위신고의 경우, 신고자의 활동이 제한될 수 있습니다.
      </p>
    </div>
  </header>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    name: "report-header",
    computed: {
      ...mapState("reportStore", ["report_item"]),
      report_header_text() {
        return this.report_item === "commu" || this.report_item === "comment"
          ? "해당 글이나 댓글의 부적절한 내용 또는 문제에 대해 신고해주세요."
          : "해당 사용자와의 채팅 또는 동행시 발생했던 문제에 대해 신고해주세요.";
      }
    }
  };
</script>

<style lang="scss" scoped>
  .report-header {
    padding: 18px 14px 24px;
    border-bottom: 1px solid #e9e9e9;
    .header-title {
      margin-bottom: 14px;
      .title-text {
        color: #1e1e1e;
        font-size: 13px;
        letter-spacing: -0.78px;
        font-weight: 500;
        line-height: 25px;
      }
    }
    .header-sub-title {
      .sub-title-text {
        color: #999;
        font-size: 12px;
        letter-spacing: -0.72px;
        line-height: 20px;
      }
    }
  }
</style>
