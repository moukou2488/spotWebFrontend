<template>
  <section class="config-home">
    <top-bar :topbar_text="'설정'" :topbar_type="'back'" />
    <config-index />
  </section>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import ConfigIndex from "@/components/Config/ConfigIndex.vue";

  export default {
    name: "config-home",
    components: { TopBar, ConfigIndex }
  };
</script>

<style lang="scss" scoped>
  .config-home {
    height: 100vh;
    background-color: #f0f0f0;
  }
</style>
