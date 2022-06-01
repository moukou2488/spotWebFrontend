<template>
  <section class="config-app_info_list">
    <top-bar :topbar_text="'정보'" :topbar_type="'back'" />
    <config-notify-list :data_list="terms_list" />
  </section>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import ConfigNotifyList from "@/components/Config/ConfigNotifyList.vue";

  import { mapState } from "vuex";

  export default {
    name: "config-app_info_list",
    components: { TopBar, ConfigNotifyList },
    computed: { ...mapState("configStore", ["terms_list"]) }
  };
</script>

<style lang="scss" scoped>
  .config-app_info_list {
    min-height: 100vh;
    background-color: #f0f0f0;
  }
</style>
