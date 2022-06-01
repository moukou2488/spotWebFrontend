<template>
  <div class="company-search-result" role="main">
    <company-search-result-header
      v-if="list_length"
      :list_number="list_length"
    />
    <company-list v-if="list_length" :company_list="company_search_list" />
    <div v-else class="empty-view">
      <div class="text-wrap">
        <p class="main">이런, 등록된 동행이 없어요.</p>
        <p class="sub">지금 바로 동행을 등록해보세요.</p>
      </div>
    </div>
  </div>
</template>

<script>
  import CompanyList from "@/components/Company/CompanyList.vue";
  import CompanySearchResultHeader from "@/components/Company/CompanySearchResultHeader.vue";

  import { mapState } from "vuex";
  export default {
    name: "company-search-result",
    components: { CompanyList, CompanySearchResultHeader },
    computed: {
      ...mapState("companyStore", ["company_search_list"]),
      list_length() {
        return this.company_search_list.length;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .empty-view {
    position: relative;
    height: calc(100vh - 48px);
    .text-wrap {
      position: relative;
      top: 32.8% !important;
      text-align: center;
      .main {
        font-size: 20px;
        font-weight: 500;
        line-height: 29px;
        letter-spacing: -0.8px;
        color: #1e1e1e;
      }
      .sub {
        margin-top: 8px !important;
        font-size: 15px;
        line-height: 22px;
        letter-spacing: -0.6px;
        color: #999;
      }
    }
  }
</style>
