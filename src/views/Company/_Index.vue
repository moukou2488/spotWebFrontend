<template>
  <div class="company-index">
    <top-bar :topbar_text="'버디 동행'">
      <template v-slot:search-icon>
        <router-link class="button-link" to="/company/search/index">
          <img
            class="button-image"
            :src="require('@/assets/images/bt_search@3x.png')"
            alt="검색 아이콘"
          />
        </router-link>
      </template>
    </top-bar>
    <div class="company-index-view" role="main">
      <company-list-header />
      <company-list :company_list="company_list" />
      <!-- 무한 스크롤 -->
      <infinite-loading
        ref="InfiniteLoading"
        @infinite="infiniteHandler"
        spinner="waveDots"
      >
        <div slot="no-more" class="no-more">
          <a
            v-if="company_list.length > 5"
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
          <div v-if="company_list.length === 0" class="empty-view">
            <p class="main">이런, 등록된 동행이 없어요.</p>
            <p class="sub">지금 바로 동행을 등록해보세요.</p>
          </div>
        </div>
        <span slot="spinner">
          <span class="custom-spinner"></span>
          <span class="custom-spinner"></span>
          <span class="custom-spinner"></span>
        </span>
      </infinite-loading>
      <!-- 동행 작성 FAB 버튼 -->
      <a href="#" class="fab-btn" @click.prevent="check_temp_save">
        <img
          class="btn-img"
          :src="require('@/assets/images/plus_btn@3x.png')"
          alt="작성하기 버튼"
        />
      </a>
      <s-toast :where="'bottom-bar'" />
      <bottom-bar />
    </div>
  </div>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import BottomBar from "@/components/Common/BottomBar.vue";
  import CompanyListHeader from "@/components/Company/CompanyListHeader.vue";
  import CompanyList from "@/components/Company/CompanyList.vue";
  import InfiniteLoading from "vue-infinite-loading";
  import SToast from "@/components/Common/SToast.vue";

  import { mapActions, mapMutations, mapState } from "vuex";

  export default {
    name: "company-index",
    components: {
      TopBar,
      BottomBar,
      CompanyListHeader,
      CompanyList,
      InfiniteLoading,
      SToast
    },
    computed: {
      ...mapState("userStore", ["user_info"]),
      ...mapState("companyWriteStore", ["company_write_complete"]),
      ...mapState("companyStore", [
        "company_list",
        "company_list_order",
        "company_scroll_index"
      ])
    },
    watch: {
      async company_list_order() {
        // 최신글, 인기글이 바뀌게 되면 초기화 상태로 바꿔줍니다.
        this.set_company_list([]);
      },
      async company_list(newVal) {
        // 리스트가 초기화 되면, 인피니티 스크롤도 초기화 상태로 바꿔줍니다.
        if (newVal.length == 0) {
          await this.$refs.InfiniteLoading.stateChanger.reset();
          this.set_company_scroll_index(0);
        }
      }
    },
    methods: {
      ...mapMutations("companyWriteStore", ["set_company_write_complete"]),
      ...mapMutations("companyStore", [
        "set_company_list",
        "set_company_scroll_index"
      ]),
      ...mapActions("companyWriteStore", ["api_get_temp_tour"]),
      ...mapActions("modalStore", ["config_dialog_state"]),
      async infiniteHandler($state) {
        const response = await this.$store.dispatch(
          "companyStore/api_get_tour",
          this.company_scroll_index
        );
        if (response.length) {
          setTimeout(() => {
            if (response.length) {
              $state.loaded();
            } else {
              $state.complete();
            }
          }, 1000);
          this.set_company_scroll_index(this.company_scroll_index + 1);
        } else {
          $state.complete();
        }
      },
      go_to_top_scroll() {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      },
      async check_temp_save() {
        if (this.user_info) {
          const response = await this.api_get_temp_tour();
          // 임시 저장된 글이 있다면
          if (this.user_info.emailVerified) {
            if (response.data.exists) {
              this.config_dialog_state({
                modal_state: true,
                modal_type: "company-temp-save",
                dialog_scroll_height: window.scrollY,
                props_data: response.data.tourId
              });
            } else this.$router.push("/company/write");
          } else this.$eventBus.$emit("alert", { type: "email-auth" });
        } else {
          this.$eventBus.$emit("alert", {
            type: "login"
          });
        }
      }
    },
    mounted() {
      // 작성 후 뒤로 가기를 한 경우
      if (this.company_write_complete) {
        this.set_company_list([]);
        this.set_company_write_complete(false);
      }
    },
    beforeRouteLeave(to, from, next) {
      if (to.name !== "company-detail") {
        this.set_company_scroll_index(0);
      }
      next();
    }
  };
</script>

<style lang="scss" scoped>
  .company-index-view {
    margin: 49px 0 85px 0;
    .fab-btn {
      position: fixed;
      right: 14px;
      bottom: 66px;
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
    // 무한 스크롤
    .infinite-loading-container {
      margin-top: 18px;
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
