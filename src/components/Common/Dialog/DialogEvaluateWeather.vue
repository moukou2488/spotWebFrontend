<template>
  <div class="s-dialog-wrap company-write-cancel">
    <p class="dialog-headline">작성 중인 동행날씨 평가가 있습니다.</p>
    <div class="dialog-body">
      <p class="body-text">취소시, 작성 중이던 저장되지 않습니다.</p>
      <p class="body-text">취소하시겠습니까?</p>
    </div>

    <div class="s-dialog-foot two">
      <button class="foot-btn" @click="config_dialog_state(false)">
        아니오
      </button>
      <button class="foot-btn major" @click="go_out">
        네, 취소할게요
      </button>
    </div>
  </div>
</template>

<script>
  import dialogMixin from "@/mixins/dialogMixin";

  import { mapMutations } from "vuex";

  export default {
    name: "dialog-evaluate-weather",
    mixins: [dialogMixin],
    methods: {
      ...mapMutations("profileStore", ["set_router_guard_evaluate"]),
      go_out() {
        this.set_router_guard_evaluate(true);
        if (
          this.props_data.includes("profile/join_member_list") ||
          this.props_data.includes("/profile/userpage")
        ) {
          this.$router.go(-1);
        } else this.$router.push(this.props_data);

        this.config_dialog_state(false);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "./Dialog.scss";
</style>
