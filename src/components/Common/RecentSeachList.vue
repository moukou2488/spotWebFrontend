<template>
  <section class="recent-search-list">
    <p
      v-if="search_list.length > 0 && auto_save"
      class="section-title is_focus"
    >
      최근 10개까지의 검색어만 저장됩니다.
    </p>
    <ul class="search-list" v-if="auto_save">
      <li
        class="search-list-item"
        v-for="(search_log, index) in filterd_search_list"
        :key="search_log.id"
      >
        <!-- delete -->
        <a
          class="button-link delete-icon"
          href="#"
          @click.prevent="$emit('delete-log', index)"
        >
          <img
            class="button-image is_focus"
            :src="require('@/assets/images/clear@3x.png')"
            alt="검색어 초기화"
          />
        </a>

        <!-- search -->
        <a
          class="search-link"
          href="#"
          @click.prevent="$emit('search', search_log.query)"
        >
          <!-- 자동 완성 텍스트만 여기서 보여주도록 -->
          <span
            v-html="
              search_log.replace_query
                ? search_log.replace_query
                : search_log.query
            "
            class="search-query is_focus"
          ></span>
          <img
            class="search-icon is_focus"
            :src="require('@/assets/images/bt_search@3x.png')"
            alt="검색 아이콘"
          />
        </a>
      </li>
    </ul>
    <div
      v-if="!auto_save || search_list.length === 0"
      class="empty-view is_focus"
    >
      {{ computed_empty_view }}
    </div>
    <!--  -->
    <div class="section-footer">
      <a
        v-if="auto_save && search_list.length > 0"
        href="#"
        class="delete-all is_focus"
        @click="clear_search_list(which)"
      >
        전체 삭제
      </a>
      <span class="empty is_focus"></span>
      <a href="#" class="toggle-auto-save is_focus" @click="_toggle_auto_save">
        자동 저장 {{ auto_save ? "끄기" : "켜기" }}
      </a>
    </div>
  </section>
</template>

<script>
  import { mapActions, mapMutations, mapState } from "vuex";
  export default {
    name: "recent-search-list",
    props: {
      which: {
        type: String,
        required: true
      },
      search_list: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    computed: {
      ...mapState("recentSearchStore", ["auto_save"]),
      computed_empty_view() {
        return this.auto_save
          ? "최근 검색어가 없습니다."
          : "최근 검색어 자동저장이 꺼져있습니다.";
      },
      filterd_search_list() {
        return this.search_list.filter(log => log.hide == undefined);
      }
    },
    methods: {
      ...mapMutations("recentSearchStore", ["toggle_auto_save"]),
      ...mapActions("recentSearchStore", [
        "get_search_list",
        "clear_search_list"
      ]),
      _toggle_auto_save() {
        if (!this.auto_save) {
          // 껏다가 키는 경우
          this.get_search_list(this.which);
        }
        this.toggle_auto_save();
      }
    }
  };
</script>

<style lang="scss" scoped>
  .recent-search-list {
    background-color: #fff;
    border-top: 1px solid #e9e9e9;
    .section-title {
      padding: 12px 14px;
      font-size: 13px;
      color: #999;
      letter-spacing: -0.78px;
    }
    .search-list {
      padding: 0 14px !important;
      border-bottom: 1px solid #e9e9e9;
      .search-list-item {
        display: flex;
        align-items: center;
        height: 40px;
        padding: 0 4px 0 2px;

        .button-link {
          display: inline-block;
          &.delete-icon {
            width: 16px;
            height: 16px;
          }
          .button-image {
            width: 100%;
            height: 100%;
          }
        }
        .search-link {
          display: flex;
          width: 100%;
          align-items: center;

          .search-query {
            display: inline-block;
            margin-left: 24px;
            flex: 1;
            color: #464646;
            font-size: 14px;
            letter-spacing: -0.56px;
          }
          .search-icon {
            width: 40px;
            height: 40px;
          }
        }
      }
    }

    .empty-view {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 180px;

      color: #999;
      font-size: 14px;
      letter-spacing: -0.56px;
    }

    .section-footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      height: 44px;
      padding: 0 14px;

      font-size: 14px;
      letter-spacing: -0.56px;
      border-bottom: 1px solid #e9e9e9;
      .delete-all {
        padding-left: 2px;
        color: #999;
      }
      .empty {
        flex: 1;
      }
      .toggle-auto-save {
        color: #1e1e1e;
      }
    }
  }
</style>
