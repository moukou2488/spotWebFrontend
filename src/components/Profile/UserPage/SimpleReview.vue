<template>
  <li class="simple-review">
    <div class="icon-wrap good" v-if="simple_review.type === '맑은'">
      <img
        class="thumbs-icon"
        :src="require('@/assets/images/ic_recommended_active@3x.png')"
        alt="추천 아이콘"
      />
      <span class="icon-text line-20">추천</span>
    </div>
    <div class="icon-wrap bad" v-else>
      <img
        class="thumbs-icon"
        :src="require('@/assets/images/ic_recommended_non@3x.png')"
        alt="비추천 아이콘"
      />
      <span class="icon-text line-20">비추천</span>
    </div>
    <span class="review-text line-20">{{ simple_review.text }}</span>
  </li>
</template>

<script>
  import company_evaluate_list from "@/assets/data/company_evaluate_list.js";
  export default {
    name: "simple-review",
    props: {
      evaluate_index: {
        type: Number,
        required: true
      }
    },
    computed: {
      simple_review() {
        return company_evaluate_list[this.evaluate_index - 1];
      }
    }
  };
</script>

<style lang="scss" scoped>
  .simple-review {
    display: flex;
    .line-20 {
      display: inline-block;
      line-height: 20px;
      vertical-align: top;
    }
    .icon-wrap {
      .thumbs-icon {
        width: 20px;
        height: 20px;
        vertical-align: top;
      }
      .icon-text {
        width: 31px;
        text-align: center;
      }

      &.good {
        color: $dodger_blue;
      }
      &.bad {
        color: $salmon;
      }
    }
    .review-text {
      font-size: 12px;
      font-weight: 500;
      letter-spacing: -0.48px;
      color: #464646;
    }
    & + .simple-review {
      margin-top: 6px;
    }
  }
</style>
