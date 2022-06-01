<template>
  <section class="evaluate-short">
    <div class="title-wrap">
      <h2 class="section-title">{{ short_type }} 날씨</h2>
      <router-link
        :to="`/profile/evaluate/short/${short_type}`"
        class="short-evaluate-link"
      >
        <div class="icon-wrap">
          <img
            class="icon-image"
            :src="require('@/assets/images/plus_btn_black@3x.png')"
            alt="플러스"
          />
        </div>
        평가를 추가해주세요.
      </router-link>
    </div>

    <evaluate-badge-list
      :badge_list="evaluate_short_list"
      :type="short_type"
      :state="'selected'"
    />
  </section>
</template>

<script>
  import EvaluateBadgeList from "./EvaluateBadgeList.vue";

  import { mapState } from "vuex";

  export default {
    name: "evaluate-short",
    components: { EvaluateBadgeList },
    props: {
      short_type: {
        type: String,
        required: true
      }
    },
    computed: { ...mapState("profileStore", ["evaluate_short_list"]) }
  };
</script>

<style lang="scss" scoped>
  .evaluate-short {
    .title-wrap {
      padding: 0 14px;
      .section-title {
        padding: 24px 0 14px;

        font-size: 16px;
        font-weight: 500;
        line-height: 1.25;
        letter-spacing: -0.32px;
        color: #1e1e1e;
      }

      .short-evaluate-link {
        display: inline-flex;
        padding: 11px 14px;
        margin-bottom: 4px;
        color: #464646;
        font-size: 12px;
        line-height: 12px;
        letter-spacing: -0.24px;

        background-color: #f4f4f4;
        border-radius: 60px;

        .icon-wrap {
          display: inline-block;
          margin-right: 8px;
          width: 12px;
          height: 12px;
          .icon-image {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
