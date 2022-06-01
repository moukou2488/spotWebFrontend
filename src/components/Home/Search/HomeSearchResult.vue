<template>
  <div class="home-search-result">
    <!-- 전체 리스트 -->
    <home-search-all v-if="view_type === 'all'" />

    <!-- 동행 -->
    <section v-if="view_type === 'company'">
      <company-list
        class="company-search-list"
        v-if="company_search_list.length > 0"
        :company_list="company_search_list"
      />
      <home-search-empty-view
        v-else
        :sub_text="'지금 바로 동행을 등록해보세요.'"
      />
    </section>

    <!-- 구단 이야기 -->
    <section v-if="view_type === 'community'">
      <ul v-if="community_search_list.length > 0">
        <community-team-item
          v-for="community_team_item in community_search_list"
          :key="community_team_item.id"
          :community_team_item="community_team_item"
        />
      </ul>
      <home-search-empty-view
        v-else
        :sub_text="'구단의 새로운 이야기를 작성해보세요.'"
      />
    </section>
  </div>
</template>

<script>
  import HomeSearchAll from "@/components/Home/Search/HomeSearchAll.vue";
  import CompanyList from "@/components/Company/CompanyList.vue";
  import CommunityTeamItem from "@/components/Community/CommunityTeamItem.vue";
  import HomeSearchEmptyView from "@/components/Home/Search/HomeSearchEmptyView.vue";

  import { mapState } from "vuex";

  export default {
    name: "home-search-result",
    components: {
      HomeSearchAll,
      CompanyList,
      CommunityTeamItem,
      HomeSearchEmptyView
    },
    computed: {
      ...mapState("homeSearchStore", [
        "view_type",
        "company_search_list",
        "community_search_list"
      ])
    },
    methods: {}
  };
</script>

<style lang="scss" scoped>
  .home-search-result {
    .company-search-list {
      padding: 18px 14px;
    }
  }
</style>
