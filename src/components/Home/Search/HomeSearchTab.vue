<template>
  <ul class="home-search-tab">
    <li
      class="tab-item"
      :class="{ active: view.type === view_type }"
      v-for="view in search_view"
      :key="view.id"
    >
      <a class="tab-link" href="#" @click.prevent="set_view_type(view.type)">
        {{ view.ko }}
      </a>
    </li>
  </ul>
</template>

<script>
  import { mapMutations, mapState } from "vuex";
  export default {
    name: "home-search-tab",
    computed: { ...mapState("homeSearchStore", ["view_type"]) },
    data: () => ({
      search_view: [
        {
          id: 0,
          type: "all",
          ko: "통합"
        },
        {
          id: 1,
          type: "company",
          ko: "버디 동행"
        },
        {
          id: 2,
          type: "community",
          ko: "구단 이야기"
        }
      ]
    }),
    methods: { ...mapMutations("homeSearchStore", ["set_view_type"]) }
  };
</script>

<style lang="scss" scoped>
  .home-search-tab {
    position: fixed;
    top: 48px;
    left: 0;
    right: 0;
    display: flex;
    background-color: #fff;
    z-index: 9;

    .tab-item {
      flex: 1;

      border-bottom: 1px solid #e9e9e9;
      font-size: 14px;
      font-weight: 500;
      line-height: 1.36;
      letter-spacing: -0.28px;
      text-align: left;
      color: #373737;

      .tab-link {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 40px;
        text-align: center;
      }

      &.active {
        color: $dodger_blue;
        border-bottom: 2px solid $dodger_blue;
      }
    }
  }
</style>
