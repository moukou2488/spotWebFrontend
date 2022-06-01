<template>
  <section class="home-search-index">
    <!-- 최신 동행글 -->
    <section
      v-if="spliced_company_list.length > 0"
      class="company-list index-list"
    >
      <p class="section-header">
        <span class="new not-kr">NEW </span>
        <span>새로운 동행</span>
      </p>
      <company-list :company_list="spliced_company_list" />
    </section>
    <!-- 최신 커뮤니티 -->
    <section class="community-list index-list">
      <p class="section-header">
        <span class="new not-kr">NEW </span>
        <span>새로운 구단 이야기</span>
      </p>
      <community-list
        class="community-list"
        :community_list="community_popular"
      />
    </section>
  </section>
</template>

<script>
  import CompanyList from "@/components/Company/CompanyList.vue";
  import CommunityList from "@/components/Profile/Community/CommunityList.vue";

  import { mapActions, mapState } from "vuex";

  export default {
    name: "home-search-index",
    components: { CompanyList, CommunityList },
    computed: {
      ...mapState("companyStore", ["company_recommend_list"]),
      ...mapState("communityStore", ["community_popular"]),
      spliced_company_list() {
        return this.company_recommend_list.length > 2
          ? this.company_recommend_list.slice(0, 2)
          : this.company_recommend_list;
      }
    },
    methods: {
      ...mapActions("companyStore", ["api_get_company_recommend_list"]),
      ...mapActions("communityStore", ["api_community_popular"])
    },
    mounted() {
      this.api_get_company_recommend_list();
      this.api_community_popular(0);
    }
  };
</script>

<style lang="scss" scoped>
  .home-search-index {
    margin-top: 48px;
    height: calc(100vh - 48px);
    .index-list {
      .section-header {
        padding: 18px 0;

        color: #1e1e1e;
        font-size: 15px;
        font-weight: 500;
        letter-spacing: -0.75px;
        .new {
          color: $dodger_blue;
          letter-spacing: -0.15px;
        }
      }
      & + .index-list {
        border-top: 8px solid #f0f0f0;
        margin-top: 18px;
      }

      &.company-list {
        padding: 0 14px;
      }

      &.community-list {
        .section-header {
          padding: 18px 14px;
        }
      }
    }
  }
</style>
