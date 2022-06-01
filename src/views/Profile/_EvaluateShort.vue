<template>
  <section class="evaluate-short">
    <company-write-nav :headline="'평가 추가하기'">
      <template v-slot:right-btn>
        <button class="temp-save-btn" @click="$router.go(-1)">완료</button>
      </template>
    </company-write-nav>
    <section class="evaluate-short-container">
      <header class="evaluate-short-header">
        <h2 class="header-title">{{ $route.params.type }} 날씨</h2>
      </header>

      <div class="selected-item-container">
        <evaluate-badge-list
          :badge_list="evaluate_short_list"
          :type="$route.params.type"
          :state="'selected'"
        />
      </div>

      <section class="item-list-container">
        <h3 class="list-title">평가 리스트</h3>
        <evaluate-badge-list
          :badge_list="computed_data_short_list"
          :type="$route.params.type"
          @delete_item="delete_item"
        />
      </section>
    </section>
  </section>
</template>

<script>
  import CompanyWriteNav from "@/components/Company/CompanyWriteNav.vue";
  import EvaluateBadgeList from "@/components/Profile/Evaluate/EvaluateBadgeList.vue";

  import company_evaluate_list from "@/assets/data/company_evaluate_list.js";

  import { mapMutations, mapState } from "vuex";

  export default {
    name: "profile-evaluate-short",
    components: { CompanyWriteNav, EvaluateBadgeList },
    computed: {
      ...mapState("profileStore", ["evaluate_short_list"]),
      computed_data_short_list() {
        if (this.evaluate_short_list.length > 0) {
          this.evaluate_short_list.forEach(review => {
            this.data_short_list[review.index - 1].selected = true;
          });
        }
        return this.data_short_list;
      }
    },
    data: () => ({
      // 깊은 복사
      data_short_list: JSON.parse(JSON.stringify(company_evaluate_list))
    }),
    methods: {
      ...mapMutations("profileStore", ["delete_evaluate_short_list"]),
      delete_item(item) {
        this.data_short_list[item.index - 1].selected = false;
        this.delete_evaluate_short_list(item);
      }
    },
    mounted() {
      this.$eventBus.$on("delete_item", this.delete_item);
    }
  };
</script>

<style lang="scss" scoped>
  .evaluate-short-container {
    margin-top: 48px;
    .evaluate-short-header {
      padding: 24px 14px 8px;
      .header-title {
        font-size: 16px;
        font-weight: 500;
        line-height: 22px;
        letter-spacing: -0.32px;
        color: #1e1e1e;
      }
    }
    .item-list-container,
    .selected-item-container {
      .list-title {
        padding: 0 14px;
        margin-bottom: 12px;
        font-size: 14px;
        font-weight: 500;
        line-height: 19px;
        letter-spacing: -0.28px;
        color: #797979;
      }
    }
    .selected-item-container {
      .list-wrap {
        .list-item {
          &:last-child {
            margin-bottom: 24px;
          }
        }
      }
    }
  }
</style>
