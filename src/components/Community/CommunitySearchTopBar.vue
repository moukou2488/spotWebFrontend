<template>
  <nav class="company-search top-bar">
    <div class="top-bar-wrap x">
      <!-- left -->
      <div class="button-wrapper left">
        <a class="button-link" href="#" @click.prevent="$router.go(-1)">
          <img
            class="button-image"
            :src="require('@/assets/images/close_btn@3x.png')"
            alt="창 닫기"
          />
        </a>
      </div>
      <!-- headline -->
      <div class="headline-wrap input-wrap">
        <div class="position-relative">
          <div id="result" class="input-container">
            <input class="input-box" type="text" v-model="keyword" />
            <div class="clear-btn-wrapper">
              <a class="button-link" href="#" @click.prevent="clear_search">
                <img
                  class="button-image"
                  :src="require('@/assets/images/clear@3x.png')"
                  alt="검색어 초기화"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="button-wrapper right">
        <a
          class="button-link"
          href="#"
          @click.prevent="call_api_community_search"
        >
          <img
            class="button-image"
            :src="require('@/assets/images/bt_search@3x.png')"
            alt="검색 아이콘"
          />
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
  import { mapState, mapMutations, mapActions } from "vuex";
  export default {
    name: "company-search-top-bar",
    data: () => ({
      keyword: ""
    }),
    computed: {
      ...mapState("communityStore", [
        "community_team",
        "filter_index",
        "team_list"
      ])
    },
    methods: {
      ...mapMutations("communityStore", ["set_team_list"]),
      ...mapActions("communityStore", ["api_community_search"]),
      async call_api_community_search() {
        const payload = {
          teamIndex: this.community_team.team_idx,
          category: this.filter_index - 1,
          keyword: this.keyword
        };
        await this.api_community_search(payload);
        this.$emit("search");
      },
      clear_search() {
        this.keyword = "";
      }
    },
    mounted() {
      this.set_team_list([]);
    }
  };
</script>

<style lang="scss" scoped>
  .company-search.top-bar {
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

            &[readonly] {
              text-overflow: ellipsis;
            }
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
            &#keyword {
              &:after {
                background: url("~@/assets/images/ic_location@3x.png") center;
                background-size: cover;
              }
            }
            &#date {
              &:after {
                background: url("~@/assets/images/ic_date@3x.png") center;
                background-size: cover;
              }
            }
          }

          &#result {
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
