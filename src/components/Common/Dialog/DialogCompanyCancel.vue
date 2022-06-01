<template>
  <!-- 동행 취소 -->
  <div class="s-dialog-wrap company-cancel">
    <p class="dialog-headline">해당 동행을 취소하시겠습니까?</p>
    <div class="dialog-body">
      <p class="body-text">
        동행 취소 시, 해당 동행에 재참여가 불가능합니다.
      </p>
    </div>

    <div class="s-dialog-foot two">
      <button class="foot-btn" @click="config_dialog_state(false)">
        아니오
      </button>
      <button class="foot-btn major" @click="call_api_cancel_tour">
        네
      </button>
    </div>
  </div>
</template>

<script>
  import dialogMixin from "@/mixins/dialogMixin";

  import { mapActions, mapMutations } from "vuex";

  export default {
    name: "dialog-company-cancel",
    mixins: [dialogMixin],
    methods: {
      ...mapActions("companyStore", ["api_post_cancel_tour"]),
      ...mapActions("profileStore", ["get_join_company_list"]),
      ...mapMutations("notifyStore", ["set_confirm_tour"]),
      async call_api_cancel_tour() {
        await this.api_post_cancel_tour(this.props_data);
        this.config_dialog_state(false); // mixin 모달 창 닫기
        this.get_join_company_list();
        this.set_confirm_tour(false);
        this.config_toast_show("동행이 취소되었습니다.");
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "./Dialog.scss";
</style>
