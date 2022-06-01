<template>
  <section class="config-question_list">
    <top-bar :topbar_text="'자주 묻는 질문'" :topbar_type="'back'" />
    <config-notify-list :question_list="true" :data_list="question_list" />
  </section>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import ConfigNotifyList from "@/components/Config/ConfigNotifyList.vue";

  import { mapState } from "vuex";

  export default {
    name: "config-question_list",
    components: { TopBar, ConfigNotifyList },
    computed: { ...mapState("configStore", ["question_list"]) }
  };
</script>

<style lang="scss" scoped>
  .config-question_list {
    height: 100%;
    background-color: #f0f0f0;
    .question-list {
      margin-top: 48px;
    }
  }
</style>
