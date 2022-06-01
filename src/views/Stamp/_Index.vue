<template>
  <section class="stamp-index">
    <top-bar :topbar_text="'버디일기'" />
    <!--  -->
    <stamp-list-header />
    <!--  -->
    <stamp-list-grid v-if="stamp_list_type === 'grid'" />
    <stamp-list-feed v-if="stamp_list_type === 'feed'" />

    <!--  -->
    <router-link to="/stamp/write" class="fab-btn">
      <img
        class="btn-img"
        :src="require('@/assets/images/plus_btn@3x.png')"
        alt="작성하기 버튼"
      />
    </router-link>
    <!--  -->
    <bottom-bar />
    <s-toast :where="'bottom-bar'" />
  </section>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import StampListHeader from "@/components/Stamp/StampListHeader.vue";
  import BottomBar from "@/components/Common/BottomBar.vue";
  import StampListGrid from "@/components/Stamp/StampListGrid.vue";
  import StampListFeed from "@/components/Stamp/StampListFeed.vue";
  import SToast from "@/components/Common/SToast.vue";

  import { mapActions, mapMutations, mapState } from "vuex";

  export default {
    name: "stamp-index",
    components: {
      TopBar,
      StampListHeader,
      BottomBar,
      StampListGrid,
      StampListFeed,
      SToast
    },
    watch: {
      // 타입이 변경되면 초기화 시켜버린다.
      stamp_list_type() {
        this.set_stamp_list_scroll_index(0);
        this.set_stamp_list([]);
      },
      stamp_list_header() {
        this.set_stamp_list_scroll_index(0);
        this.set_stamp_list([]);
        this.api_get_diary_list(0);
      }
    },
    computed: {
      ...mapState("stampStore", [
        "stamp_list",
        "stamp_list_type",
        "stamp_list_header"
      ])
    },
    methods: {
      ...mapMutations("stampStore", [
        "set_stamp_list",
        "set_stamp_list_scroll_index"
      ]),
      ...mapActions("stampStore", ["api_get_diary_list"])
    },
    beforeRouteLeave(to, from, next) {
      if (to.name !== "stamp-write" || to.name !== "stamp-detail") {
        this.set_stamp_list([]);
        this.set_stamp_list_scroll_index(0);
      }
      next();
    }
  };
</script>

<style lang="scss" scoped>
  .stamp-index {
    .fab-btn {
      position: fixed;
      right: 14px;
      bottom: 66px;
      z-index: 2;

      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      height: 50px;

      border-radius: 50%;
      background-color: $dodger_blue;
      box-shadow: 0 3px 6px grey;
      .btn-img {
        width: 18px;
        height: 18px;
      }
    }
  }
</style>
