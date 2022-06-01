<template>
  <nav class="company-search top-bar">
    <div class="top-bar-wrap x">
      <!-- left -->
      <div v-if="currentPath === 'index'" class="button-wrapper left">
        <router-link class="button-link" to="/company/index">
          <img
            class="button-image"
            :src="require('@/assets/images/close_btn@3x.png')"
            alt="창 닫기"
          />
        </router-link>
      </div>
      <div v-else class="button-wrapper left">
        <a class="button-link" href="#" @click.prevent="$router.go(-1)">
          <img
            class="button-image"
            :src="require('@/assets/images/arrow_btn@3x.png')"
            alt="뒤로 가기"
          />
        </a>
      </div>
      <!-- headline -->
      <div class="headline-wrap input-wrap">
        <div
          v-if="currentPath === 'keyword' || currentPath === 'index'"
          class="position-relative"
        >
          <div id="keyword" class="input-container after" @click="go_keyword">
            <input
              class="input-box"
              type="text"
              @keydown="go_keyword"
              @keypress.enter="go_search"
              placeholder="구장/구단"
              :value="company_search_keyword"
              @input="keyword_model"
              readonly
            />
          </div>
        </div>
        <div
          v-if="currentPath === 'date' || currentPath === 'index'"
          class="position-relative"
        >
          <div id="date" class="input-container after" @click="go_date">
            <input
              class="input-box"
              type="text"
              placeholder="날짜"
              readonly
              v-model="date_format"
            />
          </div>
        </div>
        <div v-if="currentPath === 'result'" class="position-relative">
          <div id="result" class="input-container">
            <input
              class="input-box"
              type="text"
              readonly
              v-model="complete_search_format"
              @click="$router.push('/company/search/index')"
            />
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
        <a class="button-link" href="#" @click.prevent="go_search">
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
  import { createNamespacedHelpers } from "vuex";
  const { mapState, mapMutations, mapActions } = createNamespacedHelpers(
    "companyStore"
  );
  export default {
    name: "company-search-top-bar",
    computed: {
      ...mapState(["company_search_date", "company_search_keyword"]),
      currentPath() {
        return this.$route.path.split("/")[3];
      },
      date_format() {
        let combined_date_format = "";
        if (this.company_search_date.start_date !== "") {
          // 날짜를 시작 날짜만 선택한 경우
          if (this.company_search_date.end_date === "") {
            combined_date_format = this.company_search_date.start_date;
          } else {
            combined_date_format =
              this.company_search_date.start_date +
              " ~ " +
              this.company_search_date.end_date;
          }
        }
        return combined_date_format;
      },
      complete_search_format() {
        let complete_search_format_str = "";
        //  this.company_search_keyword + '/' + this.
        if (this.date_format === "") {
          complete_search_format_str = this.company_search_keyword;
        } else if (this.company_search_keyword === "") {
          complete_search_format_str = this.date_format;
        } else {
          complete_search_format_str =
            this.company_search_keyword + " / " + this.date_format;
        }

        return complete_search_format_str;
      }
    },
    methods: {
      ...mapMutations([
        "set_company_search_keyword",
        "set_company_search_date"
      ]),
      ...mapActions(["api_post_tour_search"]),
      keyword_model(event) {
        this.set_company_search_keyword(event.target.value);
      },
      go_keyword() {
        if (this.currentPath !== "keyword")
          this.$router.push("/company/search/keyword");
      },

      go_date() {
        if (this.currentPath !== "date")
          this.$router.push("/company/search/date");
      },
      go_search() {
        if (this.currentPath === "keyword") {
          if (
            this.company_search_date.start_date === "" ||
            this.company_search_date.end_date === ""
          ) {
            this.$router.push("/company/search/index");
            return;
          }
        } else if (this.currentPath === "date") {
          if (this.company_search_keyword === "") {
            this.$router.push("/company/search/index");
            return;
          }
          // if(this.company_search_date.end_date === "") this.set_company_search_date()
        } else if (this.currentPath === "result") return;

        this.api_post_tour_search();
      },
      clear_search() {
        this.set_company_search_keyword("");
        this.set_company_search_date(["", ""]);
        this.$router.push("/company/search/index");
      }
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
