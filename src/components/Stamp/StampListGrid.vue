<template>
  <section class="stamp-list-grid" :class="{ init_state: current_index === 0 }">
    <swiper
      ref="mySwiper"
      v-if="stamp_list.length > 0"
      :options="swiperOption"
      @slideChange="infiniteScroll"
    >
      <swiper-slide
        v-for="stamp_item in stamp_list"
        :key="'그리드' + stamp_item.diaryId"
        role="list"
      >
        <stamp-swiper-card :stamp_item="stamp_item" />
      </swiper-slide>
    </swiper>
    <!--  -->
    <div v-else class="empty-view">
      <p class="main">이런, 등록된 버디의 일기가 없어요.</p>
      <p class="sub">지금 바로 일기를 등록해보세요.</p>
    </div>
  </section>
</template>

<script>
  import StampSwiperCard from "@/components/Stamp/StampSwiperCard.vue";

  import { mapActions, mapMutations, mapState } from "vuex";

  export default {
    components: { StampSwiperCard },
    name: "stamp-list-grid",
    data: () => ({
      swiperOption: {
        slidesPerView: "auto"
        // initialSlide: 1
      },
      current_index: 0
    }),
    computed: {
      ...mapState("stampStore", ["stamp_list", "stamp_list_scroll_index"])
    },
    methods: {
      ...mapMutations("stampStore", ["set_stamp_list_scroll_index"]),
      ...mapActions("stampStore", [
        "api_get_diary_list",
        "grid_get_diary_list"
      ]),
      async infiniteScroll({ activeIndex }) {
        this.current_index = activeIndex;
        if (activeIndex === this.stamp_list.length - 2) {
          await this.api_get_diary_list(this.stamp_list_scroll_index);
        }
      }
    },
    async mounted() {
      await this.api_get_diary_list(this.stamp_list_scroll_index);
    }
  };
</script>

<style lang="scss">
  .stamp-list-grid {
    display: flex;
    align-items: center;

    height: calc(100vh - 122px);
    padding-bottom: 52px;

    &.init_state {
      .swiper-wrapper {
        padding-left: 0 !important;
      }
    }

    .swiper-container {
      margin-left: 0;
    }

    .swiper-wrapper {
      align-items: center;
      padding-left: 3%;
    }

    .swiper-slide {
      width: 86.77%;
      height: calc(100vh * 0.6);
      margin-left: 3.7%;
      transition: height 0.1s linear;

      &.swiper-slide-active {
        // 전체 높이의 66%
        height: calc(100vh * 0.66);
      }

      &:not(.swiper-slide-active) {
        .image-wrapper {
          filter: blur(8px);
        }
      }
    }

    // 엠티뷰
    .empty-view {
      text-align: center;
      width: 100%;
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
