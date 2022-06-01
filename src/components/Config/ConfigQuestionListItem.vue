<template>
  <li class="config-question-list-item">
    <a href="#" class="notify-list-link" @click.prevent="toggle_detail">
      <div class="text-area">
        <p class="main-text">
          <span class="question-mark">Q</span>{{ notify_item.main_text }}
        </p>
        <p class="date-info">{{ notify_item.date_info }}</p>
      </div>
      <div class="icon-image-wrap">
        <img
          v-if="is_open"
          class="icon-image"
          :src="require('@/assets/images/btn_arrow_up@3x.png')"
          alt="위 화살표 아이콘"
        />
        <img
          v-else
          class="icon-image"
          :src="require('@/assets/images/btn_arrow_down@3x.png')"
          alt="아래 화살표 아이콘"
        />
      </div>
    </a>
    <div v-if="is_open" class="detail-container">
      <span class="answer-mark">A</span>
      <p v-html="notify_item.detail" class="detail-wrap"></p>
    </div>
  </li>
</template>

<script>
  import { mapMutations } from "vuex";
  export default {
    name: "config-question-list-item",
    props: {
      notify_item: {
        type: Object,
        default() {
          return {
            id: Number,
            main_text: String,
            date_info: String,
            detail: String
          };
        }
      }
    },
    data: () => ({ is_open: false }),
    methods: {
      ...mapMutations("configStore", ["set_notify_detail"]),
      toggle_detail() {
        this.is_open = !this.is_open;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .config-question-list-item {
    background-color: #fff;
    .notify-list-link {
      display: flex;
      align-items: center;
      height: 66px;
      padding: 0 6px 0 16px;
      .text-area {
        flex: 1;
        .main-text {
          margin-bottom: 4px !important;
          color: #1e1e1e;
          font-size: 14px;
          letter-spacing: -0.56px;
          .question-mark {
            display: inline-block;
            margin-right: 6px;
            color: $dodger_blue;
          }
        }
        .date-info {
          color: #636363;
          font-size: 12px;
          letter-spacing: -0.24px;
        }
      }
      .icon-image-wrap {
        width: 36px;
        height: 36px;
        .icon-image {
          width: 100%;
          height: 100%;
          vertical-align: top;
        }
      }
    }
    .detail-container {
      display: flex;
      padding: 18px 16px 30px 17px;
      border-top: 1px solid #e9e9e9;

      font-size: 14px;
      line-height: 26px;
      letter-spacing: -0.84px;
      color: #575757;
      .answer-mark {
        color: $dodger_blue;
      }
      .detail-wrap {
        margin-left: 7px !important;
      }
    }

    & + .config-question-list-item {
      border-top: 1px solid #e9e9e9;
    }
  }
</style>
