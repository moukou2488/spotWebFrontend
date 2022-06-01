<template>
  <section class="evaluate-rank">
    <header class="section-title-wrap">
      <h2 class="section-title">동행 평가</h2>
      <router-link
        class="icon-link"
        :to="`/profile/evaluate/home/${$route.params.nickname}`"
      >
        <img
          class="icon-image"
          :src="require('@/assets/images/arrow_btn3x.png')"
          alt="오른 화살표"
        />
      </router-link>
    </header>

    <ul class="rank-list-wrap">
      <li
        class="rank-list"
        v-for="(rank_item, index) in computed_best_list"
        :key="rank_item.reviewIndex"
      >
        <span class="best-index">BEST {{ index + 1 }}</span>
        <span class="review-text">
          {{ rank_item.reviewIndex | filterd_review }}
        </span>
        <p class="ratio-wrap">
          <span class="ratio">{{ rank_item.ratio }}</span>
          <span class="percentage">%</span>
        </p>
      </li>
    </ul>
  </section>
</template>

<script>
  import company_evaluate_list from "@/assets/data/company_evaluate_list.js";

  export default {
    name: "evaluate-rank",
    props: {
      best_evaluate_list: {
        type: Array,
        required: true
      }
    },
    computed: {
      computed_best_list() {
        return this.best_evaluate_list.filter(item => item.reviewIndex !== 0);
      }
    },

    filters: {
      filterd_review(index) {
        return company_evaluate_list[index - 1].text;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .evaluate-rank {
    border-bottom: 8px solid #e9e9e9;
    .section-title-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 54px;
      padding: 0 6px 0 14px;
      .section-title {
        font-size: 16px;
        font-weight: 500;
        line-height: 1.25;
        letter-spacing: -0.64px;
        color: #1e1e1e;
      }
      .icon-link {
        display: inline-block;
        width: 36px;
        height: 36px;
        .icon-image {
          width: 100%;
          height: 100%;
        }
      }
    }
    .rank-list-wrap {
      .rank-list {
        display: flex;
        align-items: center;
        height: 44px;
        padding: 0 16px 0 14px;

        font-size: 14px;
        font-weight: 500;
        letter-spacing: -0.56px;
        border-top: 1px solid #e9e9e9;
        .best-index {
          display: inline-block;
          margin-right: 11px;
          line-height: 19px;
          color: $dodger_blue;
        }
        .review-text {
          flex: 1;
          line-height: 20px;
          text-align: left;
          color: #464646;
        }

        .ratio-wrap {
          color: #999;
          .ratio {
            letter-spacing: -0.28px;
          }
          .percentage {
            display: inline-block;
            margin-left: 2px;
            font-size: 10px;
            font-weight: normal;
            letter-spacing: -0.2px;
          }
        }
      }
    }
  }
</style>
