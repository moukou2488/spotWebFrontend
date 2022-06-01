<template>
  <div class="config-notify_list">
    <top-bar :topbar_text="'공지사항'" :topbar_type="'back'" />
    <config-notify-list :data_list="notify_list" />
  </div>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import ConfigNotifyList from "@/components/Config/ConfigNotifyList.vue";

  import { mapState } from "vuex";

  export default {
    name: "config-notify_list",
    components: { TopBar, ConfigNotifyList },
    computed: { ...mapState("configStore", ["notify_list"]) }
  };
</script>

<style lang="scss" scoped>
  .config-notify_list {
    min-height: 100vh;
    background-color: #f0f0f0;
  }
</style>
