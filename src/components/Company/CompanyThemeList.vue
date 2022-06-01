<template>
  <ul class="company-theme-list" :class="{ write: delete_item }">
    <li v-for="theme in theme_list" :key="theme" class="theme-item">
      <!-- 동행 상세 -->
      <router-link v-if="theme_search_props" :to="`/company/theme/${theme}`">
        <span class="theme-text">#{{ theme }}</span>
      </router-link>
      <!-- 동행 작성 -->
      <span v-else class="theme-text">#{{ theme }}</span>
      <!-- 동행 작성 -> 삭제 버튼 -->
      <a
        v-if="delete_item"
        class="theme-delete-btn"
        href="#"
        @click.prevent="delete_theme_item(theme)"
      >
        <img
          class="theme-delete-img"
          :src="require('@/assets/images/clear@3x.png')"
          alt="테마 삭제"
        />
      </a>
    </li>
    <li class="text_area">
      <slot name="text_area" />
    </li>
  </ul>
</template>

<script>
  import { mapMutations } from "vuex";

  export default {
    name: "company-theme-list",
    props: {
      theme_list: {
        type: Array,
        required: true
      },
      delete_item: {
        type: Boolean,
        default: false
      },
      theme_search_props: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      ...mapMutations("companyWriteStore", ["set_theme_item_delete"]),
      delete_theme_item(item) {
        this.set_theme_item_delete(item);
      }
    }
  };
</script>

<style lang="scss" scoped>
  // 동행 테마
  .company-theme-list {
    padding: 10px 0 24px !important;

    .theme-item {
      display: inline-flex;
      align-items: center;
      padding: 6px 13px;
      margin: 8px 6px 0 0;
      vertical-align: top;
      min-height: 34px;
      border: 1px solid #ddd;
      border-radius: 30px;
      color: #999;
      font-size: 14px;

      .theme-text {
        flex: 1;
        overflow-wrap: anywhere;
      }

      .theme-delete-btn {
        margin-left: 8px;
        width: 16px;
        height: 16px;
        .theme-delete-img {
          width: 100%;
          height: 100%;
        }
      }

      &:last-child {
        margin: 8px 0 0;
      }
    }

    // 동행 작성 시 퍼블리싱
    &.write {
      padding: 0 !important;

      display: flex;
      flex-wrap: wrap;
      width: 100%;
      .theme-item {
        position: relative;
        top: -9px;
        margin: 0 6px 8px 0;

        &:last-child {
          margin: 0;
        }
      }
      .text_area {
        flex: 1;
        min-width: 323px;
      }
      @media screen and (max-width: 320px) {
        .text_area {
          min-width: 268px;
        }
      }
    }
  }
</style>
