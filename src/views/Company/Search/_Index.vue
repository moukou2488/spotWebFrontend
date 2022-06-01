<template>
  <div class="company-search-index" role="main">
    <company-search-result-header />
    <company-list
      v-if="company_recommend_list.length > 0"
      :company_list="company_recommend_list"
    />
    <div v-if="is_empty" class="empty-view">
      <p class="main">이런, 등록된 동행이 없어요.</p>
      <p class="sub">지금 바로 동행을 등록해보세요.</p>
    </div>
  </div>
</template>

<script>
  import CompanyList from "@/components/Company/CompanyList.vue";
  import CompanySearchResultHeader from "@/components/Company/CompanySearchResultHeader.vue";

  import { createNamespacedHelpers } from "vuex";
  const { mapState, mapActions, mapMutations } = createNamespacedHelpers(
    "companyStore"
  );

  export default {
    name: "company-search-index",
    components: { CompanySearchResultHeader, CompanyList },
    computed: {
      ...mapState(["company_recommend_list"])
    },
    methods: {
      ...mapActions(["api_get_company_recommend_list"]),
      ...mapMutations(["set_company_recommend_list"])
    },
    data: () => ({
      is_empty: false
    }),
    async mounted() {
      const response = await this.api_get_company_recommend_list();
      if (response.length === 0) {
        this.is_empty = true;
      }
    },
    destroyed() {
      this.set_company_recommend_list([]);
    }
  };
</script>

<style lang="scss" scoped>
  .company-search-index {
    margin-bottom: 52px;
    .empty-view {
      text-align: center;
      margin-top: 25.6%;
      .main {
        margin-bottom: 8px !important;
        font-size: 20px;
        font-weight: 500;
        line-height: 1.45;
        letter-spacing: -0.8px;
        color: #1e1e1e;
      }
      .sub {
        font-size: 15px;
        line-height: 1.4;
        letter-spacing: -0.6px;
        color: #999;
      }
      @media screen and (max-width: 330px) {
        .main {
          font-size: 18px;
        }
        .sub {
          font-size: 14px;
        }
      }
    }
  }
</style>
