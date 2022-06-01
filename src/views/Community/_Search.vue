<template>
  <div class="community-search">
    <community-search-top-bar @search="search_start = true" />
    <div class="search-result">검색 결과</div>
    <div class="search-text">
      {{ search_text }}
    </div>
    <ul v-if="team_list.length > 0">
      <community-team-item
        v-for="community_team_item in team_list"
        :key="community_team_item.id"
        :community_team_item="community_team_item"
      />
    </ul>
  </div>
</template>

<script>
  import CommunitySearchTopBar from "@/components/Community/CommunitySearchTopBar.vue";
  import CommunityTeamItem from "@/components/Community/CommunityTeamItem.vue";
  import { mapState } from "vuex";
  export default {
    name: "community-search",

    data: () => ({
      search_start: false
    }),
    components: { CommunitySearchTopBar, CommunityTeamItem },
    computed: {
      ...mapState("communityStore", ["team_list"]),
      search_text() {
        if (this.search_start === false) {
          return "지금 바로 구단 이야기를 검색해보세요.";
        } else if (this.team_list.length === 0) {
          // 검색 결과가 없는 경우
          return "검색 결과가 없습니다.";
        } else {
          return "";
        }
      }
    }
  };
</script>
<style lang="scss" scoped>
  .community-search {
    .search-text {
      position: absolute;
      top: 50%;
      width: 100%;
      text-align: center;
      font-size: 15px;
      line-height: 1.4;
      letter-spacing: -0.6px;
      color: #999;
    }
    .search-result {
      margin: 66px 0 0 14px;
      font-size: 14px;
      font-weight: 500;
      line-height: 20px;
      letter-spacing: -0.28px;
      color: #464646;
    }
  }
</style>
