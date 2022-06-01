<template>
  <div class="s-dialog-wrap company-write-cancel">
    <p class="dialog-headline">작성하던 글이 있습니다.</p>
    <div class="dialog-body">
      <p class="body-text">이어서 작성하시겠습니까?</p>
    </div>

    <div class="s-dialog-foot two">
      <button class="foot-btn" @click="call_cancel_api">
        아니오
      </button>
      <button class="foot-btn major" @click="go_temp_save_write">
        네
      </button>
    </div>
  </div>
</template>

<script>
  import dialogMixin from "@/mixins/dialogMixin";
  import axios from "axios";

  import { mapActions, mapMutations } from "vuex";
  export default {
    name: "dialog-company-temp-save",
    mixins: [dialogMixin],
    methods: {
      ...mapActions("companyWriteStore", ["api_post_cancel_temp"]),
      ...mapMutations("companyWriteStore", [
        "set_payload_data",
        "set_is_temp_save_write"
      ]),
      // 임시저장된 글이 있습니다. 불러올까요? YES OR NO?
      // NO!
      async call_cancel_api() {
        await this.api_post_cancel_temp(); // db 에 임시 저장 취소 api 호출
        this.config_dialog_state(false); // 모달창 닫기
        this.$router.push("/company/write"); // 작성하러 가기
      },
      // YES !
      async go_temp_save_write() {
        const response = await axios.get(`/api/tour-detail/${this.props_data}`); // 임시 저장된 동행 글 데이터 불러오기
        this.set_is_temp_save_write(true);
        this.set_payload_data(response.data); // 데이터 셋업!
        this.config_dialog_state(false); // 모달창 닫기
        this.$router.push("/company/write"); // 작성하러 가기
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "./Dialog.scss";
</style>
