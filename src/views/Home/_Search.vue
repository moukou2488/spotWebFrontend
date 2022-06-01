<template>
  <div class="home-search">
    <home-search-top-bar @emit_search="search" />
    <!-- after-search -->
    <section class="search-view" v-if="is_search">
      <home-search-tab />
      <home-search-result />
    </section>

    <!-- before-search -->
    <home-search-index v-else />

    <s-toast :where="'bottom'" />
  </div>
</template>

<script>
  import HomeSearchTopBar from "@/components/Home/Search/HomeSearchTopBar.vue";
  import HomeSearchTab from "@/components/Home/Search/HomeSearchTab.vue";
  import HomeSearchResult from "@/components/Home/Search/HomeSearchResult.vue";
  import SToast from "@/components/Common/SToast.vue";
  import HomeSearchIndex from "@/components/Home/Search/HomeSearchIndex.vue";

  import { mapActions, mapState } from "vuex";

  export default {
    name: "home-search",
    components: {
      HomeSearchTopBar,
      HomeSearchTab,
      HomeSearchResult,
      HomeSearchIndex,
      SToast
    },
    computed: {
      ...mapState("homeSearchStore", ["is_search"])
    },
    methods: {
      ...mapActions("homeSearchStore", [
        "api_home_search",
        "clear_search_state"
      ]),
      async search(query) {
        await this.api_home_search(query);
      }
    },
    beforeRouteLeave(to, from, next) {
      if (to.name !== "company-detail" && to.name !== "community-detail") {
        // 상세 페이지로 가는 것이 아닌 경우는 검색 결과를 초기화
        this.clear_search_state();
      }
      next();
    }
  };
</script>

<style lang="scss" scoped>
  .home-search {
    .search-view {
      padding-top: 90px;
      height: calc(100vh - 48px);
    }
  }
</style>
