<template>
  <div class="s-dialog-wrap company-block">
    <p class="dialog-headline">해당 사용자를 차단하시겠습니까?</p>
    <div class="dialog-body">
      <p class="body-text">
        차단시, 해당 사용자의 모집글, 채팅을 볼 수 없습니다.
      </p>
    </div>

    <div class="s-dialog-foot two">
      <button class="foot-btn" @click="config_dialog_state(false)">
        아니오
      </button>
      <button class="foot-btn major" @click="call_api_block_tour">
        네
      </button>
    </div>
  </div>
</template>

<script>
  import dialogMixin from "@/mixins/dialogMixin";

  import { mapActions, mapMutations, mapState } from "vuex";

  export default {
    name: "dialog-company-block",
    computed: { ...mapState("userStore", ["user_info"]) },
    mixins: [dialogMixin],
    methods: {
      ...mapMutations("companyStore", ["set_company_list"]),
      ...mapActions("companyStore", ["api_post_block_tour"]),

      // 차단하기
      async call_api_block_tour() {
        if (this.user_info) {
          await this.api_post_block_tour(); // 동행 차단 api 호출
          this.config_dialog_state(false); // 모달 창 닫기
          this.set_company_list([]); // 차단 후 동행 리스트 초기화
          this.config_toast_show("해당 사용자가 차단되었습니다."); // 동행 차단 toast 창 띄우기
        } else {
          this.$eventBus.$emit("alert", {
            type: "login"
          });
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "./Dialog.scss";
</style>
