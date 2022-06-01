<template>
  <section class="config-notify-detail">
    <ul>
      <config-notify-list-item
        :notify_item="notify_detail"
        :icon_state="false"
      />
    </ul>

    <p v-html="notify_detail.detail" class="detail-wrap"></p>
  </section>
</template>

<script>
  import { mapState } from "vuex";
  import ConfigNotifyListItem from "./ConfigNotifyListItem.vue";

  export default {
    name: "config-notify-detail",
    components: { ConfigNotifyListItem },
    computed: {
      ...mapState("configStore", ["notify_detail"])
    }
  };
</script>

<style lang="scss" scoped>
  .config-notify-detail {
    margin-top: 48px;
    .detail-wrap {
      border-top: 1px solid #e9e9e9;
      padding: 17px 16px;
      font-size: 12px;
      letter-spacing: -0.48px;
      color: #575757;
      word-break: break-all;
      white-space: pre-line;
    }
  }
</style>
