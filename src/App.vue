<template>
  <v-app>
    <router-view />
    <s-dialog v-if="dialog_state" />
    <s-test-alert />
    <s-more-btn-list />
  </v-app>
</template>

<script>
  import SDialog from "@/components/Common/SDialog.vue";
  import STestAlert from "@/components/Common/STestAlert.vue";
  import SMoreBtnList from "@/components/Common/SMoreBtnList.vue";

  import { mapState } from "vuex";

  export default {
    name: "app",
    components: { SDialog, STestAlert, SMoreBtnList },
    computed: {
      ...mapState("modalStore", ["dialog_state"])
    }
  };
</script>

<style lang="scss">
  @import "./assets/styles/reset.css";
  @import "./assets/styles/vuetify_reset.scss";
  @import "./assets/styles/vue-swipe-actions.css";
  @import "./App.scss";
</style>
