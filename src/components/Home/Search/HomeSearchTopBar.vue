<template>
  <nav class="home-search top-bar">
    <div class="top-bar-wrap x">
      <!--  -->
      <div class="button-wrapper left">
        <a class="button-link" href="#" @click.prevent="$router.go(-1)">
          <img
            class="button-image"
            :src="require('@/assets/images/close_btn@3x.png')"
            alt="창 닫기"
          />
        </a>
      </div>
      <!--  -->
      <div class="headline-wrap input-wrap">
        <div class="position-relative">
          <div id="search-box" class="input-container">
            <input
              ref="search_input"
              class="input-box is_focus"
              type="text"
              :value="query"
              placeholder="검색어를 입력하세요"
              @input="_set_query($event.target.value)"
              @keypress.enter="_call_search_query"
            />
            <div v-if="is_search" class="clear-btn-wrapper">
              <a class="button-link" href="#" @click.prevent="set_query('')">
                <img
                  class="button-image is_focus"
                  :src="require('@/assets/images/clear@3x.png')"
                  alt="검색어 초기화"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <!--  -->
      <div class="button-wrapper right">
        <a class="button-link" href="#" @click.prevent="_call_search_query">
          <img
            class="button-image is_focus"
            :src="require('@/assets/images/bt_search@3x.png')"
            alt="검색 아이콘"
          />
        </a>
      </div>
    </div>
    <recent-seach-list
      v-if="is_focus"
      :which="'home'"
      :search_list="search_list.home"
      @delete-log="_delete_log"
      @search="emit_search"
    />
  </nav>
</template>

<script>
  import RecentSeachList from "@/components/Common/RecentSeachList.vue";

  import { mapActions, mapMutations, mapState } from "vuex";

  export default {
    name: "home-search-top-bar",
    components: { RecentSeachList },
    computed: {
      ...mapState("homeSearchStore", ["query", "is_search"]),
      ...mapState("recentSearchStore", ["search_list"])
    },
    data: () => ({ is_focus: false, is_focus_important: false }),
    methods: {
      ...mapMutations("homeSearchStore", ["set_query"]),
      ...mapActions("homeSearchStore", ["api_home_search"]),
      ...mapActions("modalStore", ["config_toast_show"]),
      ...mapActions("recentSearchStore", [
        "auto_complete_search_list",
        "get_search_list",
        "delete_search_log",
        "clear_search_list"
      ]),
      toggle_focus_state(bool) {
        this.is_focus = bool;
      },
      _set_query(value) {
        this.set_query(value);
        this.is_focus = true;
        // 자동완성 + 핉터링 기능
        this.auto_complete_search_list({ which: "home", query: value });
      },
      _call_search_query() {
        if (this.query) {
          this.is_focus = false;
          this.api_home_search(this.query);
        } else this.config_toast_show("검색어를 입력해주세요.");
      },
      emit_search(query) {
        if (query) {
          this.is_focus = false;
          this.set_query(query);
          this.api_home_search(this.query);
        } else this.config_toast_show("검색어를 입력해주세요.");
      },
      // 최근 검색어 삭제
      _delete_log(delete_index) {
        this.delete_search_log({
          which: "home",
          delete_index
        });
      },
      handle_recent_log_view($event) {
        const event_target = $event.target;

        // is_focus 자체를 클릭했으면
        if (event_target.classList.contains("is_focus")) this.is_focus = true;
        else {
          // 그게 아니라면 그 자식 요소에 있는지 확인
          const is_focus = event_target.querySelector(".is_focus");

          if (is_focus) this.is_focus = true;
          else this.is_focus = false;
        }
      }
    },
    mounted() {
      // dropdown 제어
      window.addEventListener("touchstart", this.handle_recent_log_view);

      // 최근 검색어 가져오기
      this.get_search_list("home");
    },
    destroyed() {
      window.removeEventListener("touchstart", this.handle_recent_log_view);
    }
  };
</script>

<style lang="scss" scoped>
  .home-search.top-bar {
    padding: 0;
    .top-bar-wrap {
      padding: 0 4px;
    }
    .input-wrap {
      .position-relative {
        position: relative;
        flex: 1;
        height: 34px;
        & + .position-relative {
          margin-left: 8px;
        }
        .input-container {
          height: 100%;
          .input-box {
            width: 100%;
            height: 100%;
            padding: 6px 22px 6px 10px;
            vertical-align: top;
            font-size: 14px;
          }
          &.after {
            &:after {
              position: absolute;
              width: 22px;
              height: 22px;
              top: 6px;
              right: 4px;
              content: "";
            }
          }

          &#search-box {
            position: relative;
            .clear-btn-wrapper {
              position: absolute;
              top: 8.5px;
              right: 8.5px;
              bottom: 8.5px;
              width: 16px;
              height: 16px;

              .button-link {
                display: inline-block;
                width: 100%;
                height: 100%;

                .button-image {
                  width: 100%;
                  height: 100%;
                  vertical-align: top;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
