<template>
  <section class="company-count">
    <div class="left">
      <p class="count-wrap">
        <span class="count-text">동행 횟수</span>
        <span class="count-number">{{ user_info.confirmedTourCount }}회</span>
      </p>
      <p class="join-date">{{ computed_date_format }} 가입</p>
    </div>
    <p class="right">
      <span class="count">{{ user_info.confirmedTourCount }}</span>
      <span class="hui">회</span>
    </p>
  </section>
</template>

<script>
  import moment from "moment";

  export default {
    name: "company-count",
    props: {
      user_info: {
        type: Object,
        required: true
      }
    },
    computed: {
      computed_date_format() {
        return moment(this.user_info.joinDate).format("YYYY년 MM월 DD일");
      }
    }
  };
</script>

<style lang="scss" scoped>
  .company-count {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 15px 15px 16px;
    border-bottom: 8px solid #f0f0f0;
    .left {
      .count-wrap {
        margin-bottom: 3px !important;

        color: #1e1e1e;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: -0.64px;

        .count-number {
          display: inline-block;
          margin-left: 4px;
          color: $dodger_blue;
        }
      }
      .join-date {
        color: #999;
        font-size: 12px;
        line-height: 18px;
        letter-spacing: -0.24px;
      }
    }
    .right {
      color: $dodger_blue;

      & > span {
        display: inline-block;
      }

      .count {
        font-size: 28px;
        font-weight: 500;
        line-height: 1.36;
        letter-spacing: -1.12px;
      }
      .hui {
        margin-left: 1px;
        font-size: 14px;
        font-weight: bold;
        line-height: 20px;
        letter-spacing: -0.56px;
      }
    }
  }
</style>
