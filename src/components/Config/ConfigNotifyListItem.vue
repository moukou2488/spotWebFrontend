<template>
  <li class="notify-list-item">
    <a href="#" class="notify-list-link" @click.prevent="open_detail">
      <div class="text-area">
        <p class="main-text">{{ notify_item.main_text }}</p>
        <p class="date-info">{{ notify_item.date_info }}</p>
      </div>
      <div v-if="icon_state" class="icon-image-wrap">
        <img
          class="icon-image"
          :src="require('@/assets/images/btn_arrow_right@3x.png')"
          alt="오른 화살표 아이콘"
        />
      </div>
    </a>
  </li>
</template>

<script>
  import { mapMutations } from "vuex";

  export default {
    name: "config-notify-list-item",
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
      },
      icon_state: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      ...mapMutations("configStore", ["set_notify_detail"]),
      open_detail() {
        if (this.notify_item.link) {
          this.$router.push(this.notify_item.link);
        } else {
          this.set_notify_detail(this.notify_item);
          if (this.$route.name !== "config-notify-detail")
            this.$router.push(
              `/config/notify_detail/${this.$route.name}/${this.notify_item.item}`
            );
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .notify-list-item {
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

    & + .notify-list-item {
      border-top: 1px solid #e9e9e9;
    }
  }
</style>
