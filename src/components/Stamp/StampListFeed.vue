<template>
  <section class="stamp-list-feed">
    <stamp-list :stamp_list="stamp_list" />
    <infinite-loading
      ref="InfiniteLoading"
      @infinite="infiniteHandler"
      spinner="waveDots"
    >
      <div slot="no-more" class="no-more">
        <a
          v-if="stamp_list.length > 15"
          class="top-btn-link"
          href="#"
          @click.prevent="go_to_top_scroll"
        >
          <img
            class="top-btn-ico"
            :src="require('@/assets/images/btn_top@3x.png')"
            alt="최상위로 스크롤"
          />
        </a>
      </div>
      <div slot="no-results">
        <div v-if="stamp_list.length === 0" class="empty-view">
          <p class="main">이런, 등록된 버디의 일기가 없어요.</p>
          <p class="sub">지금 바로 일기를 등록해보세요.</p>
        </div>
      </div>
      <span slot="spinner">
        <span class="custom-spinner"></span>
        <span class="custom-spinner"></span>
        <span class="custom-spinner"></span>
      </span>
    </infinite-loading>
  </section>
</template>

<script>
  import StampList from "@/components/Stamp/StampList.vue";
  import InfiniteLoading from "vue-infinite-loading";

  import { mapActions, mapMutations, mapState } from "vuex";

  export default {
    name: "stamp-list-feed",
    components: { StampList, InfiniteLoading },
    computed: {
      ...mapState("stampStore", ["stamp_list", "stamp_list_scroll_index"])
    },
    watch: {
      async company_list(newVal) {
        // 리스트가 초기화 되면, 인피니티 스크롤도 초기화 상태로 바꿔줍니다.
        if (newVal.length == 0) {
          await this.$refs.InfiniteLoading.stateChanger.reset();
          this.set_company_scroll_index(0);
        }
      }
    },
    methods: {
      ...mapMutations("stampStore", ["set_stamp_list_scroll_index"]),
      ...mapActions("stampStore", ["api_get_diary_list"]),

      async infiniteHandler($state) {
        const response = await this.api_get_diary_list(
          this.stamp_list_scroll_index
        );

        if (response.length) {
          setTimeout(() => {
            if (response.length) {
              $state.loaded();
            } else {
              $state.complete();
            }
          }, 1000);
          this.set_stamp_list_scroll_index(this.stamp_list_scroll_index + 1);
        } else {
          $state.complete();
        }
      },
      go_to_top_scroll() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .stamp-list-feed {
    padding: 3% 14px 0;
    // 무한 스크롤
    .infinite-loading-container {
      margin: 18px 0 50px;
      .infinite-status-prompt {
        & > span {
          display: inline-flex;
          padding: 17px 0;
        }

        .custom-spinner {
          display: inline-block;
          vertical-align: middle;
          width: 4px;
          height: 4px;
          background-color: $dodger_blue;
          border-radius: 50%;

          & + .custom-spinner {
            margin-left: 6px;
          }
        }
        .no-more {
          .top-btn-link {
            display: inline-block;

            .top-btn-ico {
              width: 38px;
              height: 38px;
            }
          }
        }
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
    }
  }
</style>
