<template>
  <!-- confirm -->
  <div class="s-dialog-wrap confirm">
    <div v-if="typeof props_data === 'object'">
      <p
        class="dialog-headline"
        v-for="confirm_ment in props_data"
        :key="confirm_ment"
      >
        {{ confirm_ment }}
      </p>
    </div>
    <div v-else>
      <p class="dialog-headline">
        {{ props_data }}
      </p>
    </div>

    <div class="s-dialog-foot">
      <button class="close_dialog_btn" @click="config_dialog_state(false)">
        확인
      </button>
    </div>
  </div>
</template>

<script>
  import dialogMixin from "@/mixins/dialogMixin";
  import { mapState } from "vuex";
  export default {
    name: "dialog-confirm",
    mixins: [dialogMixin],
    created() {
      console.log(typeof this.props_data === "string");
    },
    computed: {
      ...mapState("modalStore", ["props_data"])
    }
  };
</script>

<style lang="scss" scoped>
  @import "./Dialog.scss";
</style>
