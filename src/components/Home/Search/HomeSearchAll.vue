<template>
  <section class="home-search-all">
    <div v-if="company_search_list.length > 0" class="home-search-list">
      <home-search-all-header
        @click.native.prevent="set_view_type('company')"
        :list_length="company_search_list.length"
        :header_text="'동행'"
      />
      <company-list :company_list="company_search_list.slice(0, 3)" />
    </div>
    <div
      v-if="community_search_list.length > 0"
      class="home-search-list community"
    >
      <home-search-all-header
        class="community-header"
        @click.native.prevent="set_view_type('community')"
        :list_length="community_search_list.length"
        :header_text="'구단 이야기'"
      />
      <ul>
        <community-team-item
          v-for="community_team_item in community_search_list.slice(0, 3)"
          :key="community_team_item.id"
          :community_team_item="community_team_item"
        />
      </ul>
    </div>
    <!-- 둘 다 없을 때만 -->
    <home-search-empty-view
      v-if="
        company_search_list.length === 0 && community_search_list.length === 0
      "
      :sub_text="'새로운 검색어를 입력해보세요.'"
    />
  </section>
</template>

<script>
  import HomeSearchAllHeader from "@/components/Home/Search/HomeSearchAllHeader.vue";
  import CompanyList from "@/components/Company/CompanyList.vue";
  import CommunityTeamItem from "@/components/Community/CommunityTeamItem.vue";
  import HomeSearchEmptyView from "@/components/Home/Search/HomeSearchEmptyView.vue";

  import { mapMutations, mapState } from "vuex";

  export default {
    name: "home-search-all",
    components: {
      CompanyList,
      CommunityTeamItem,
      HomeSearchAllHeader,
      HomeSearchEmptyView
    },
    computed: {
      ...mapState("homeSearchStore", [
        "company_search_list",
        "community_search_list"
      ])
    },
    methods: {
      ...mapMutations("homeSearchStore", ["set_view_type"])
    }
  };
</script>

<style lang="scss" scoped>
  .home-search-all {
    .home-search-list {
      padding: 0 14px 18px;
      border-bottom: 8px solid #f0f0f0;
      &.community {
        padding: 0 0 18px;
        .community-header {
          padding: 18px 14px 0;
        }
      }
    }
  }
</style>
