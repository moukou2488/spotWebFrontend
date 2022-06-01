<template>
  <section class="config-delete_confirm">
    <top-bar :topbar_text="'계정 삭제'" :topbar_type="'back'" />
    <section class="delete-conrim-body">
      <h1 class="delete-conrim-title">{{ user_info.nickname }}님 잠시만요!</h1>
      <p class="delete-conrim-sub_title">계정을 삭제하면?</p>
      <ul class="delete-info-list">
        <li class="delete-info-list-item">
          모든 게시글 및 채팅내용, 동행날씨, 작성하신 동행 후기 등 모든 활동
          기록이 삭제됩니다.
        </li>
        <li class="delete-info-list-item">
          계정이 삭제된 후에는 계정을 다시 살릴 수 없습니다.
        </li>
        <li class="delete-info-list-item">
          현재 계정으로는 다시 로그인할 수 없습니다.
        </li>
        <li class="delete-info-list-item">
          다른 사용자가 보낸 채팅 메시지, 동행 후기 등 일부 정보는 계속 남아있을
          수 있습니다.
        </li>
        <li class="delete-info-list-item">10일 동안 재가입이 불가능합니다.</li>
      </ul>
      <p class="warn-text-wrap">
        아래의 계정 영구 삭제 버튼을 클릭할 시, {{ user_info.nickname }}님의
        <span class="warn">모든 활동이 영구 삭제됩니다.</span>
      </p>
      <button @click="delete_user" class="btn fill salmon large">
        계정 영구 삭제
      </button>
    </section>
  </section>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";

  import { mapActions, mapState } from "vuex";

  export default {
    name: "config-delete_confirm",
    components: { TopBar },
    computed: {
      ...mapState("userStore", ["user_info"])
    },
    methods: {
      ...mapActions("configStore", ["api_post_delete_member"]),
      async delete_user() {
        await this.api_post_delete_member();
        this.$router.push("/config/delete_complete");
      }
    }
  };
</script>

<style lang="scss" scoped>
  .delete-conrim-body {
    margin-top: 48px;
    padding: 0 14px;
    .delete-conrim-title {
      padding: 20px 2px 4px;
      color: #464646;
      font-size: 18px;
      font-weight: 500;
      letter-spacing: -0.5px;
    }
    .delete-conrim-sub_title {
      padding-left: 2px;
      margin-bottom: 22px !important;
      color: #adadad;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: -0.39px;
    }
    .delete-info-list {
      padding-left: 17px !important;
      margin-bottom: 22px;

      .delete-info-list-item {
        position: relative;
        color: #797979;
        font-size: 14px;
        letter-spacing: -0.39px;
        line-height: 1.57;
        &:before {
          position: absolute;
          left: -15px;
          top: 10px;
          display: inline-block;
          width: 5px;
          height: 5px;
          background-color: #797979;
          border-radius: 50%;
          content: "";
        }
        & + .delete-info-list-item {
          margin-top: 10px;
        }
      }
    }
    .warn-text-wrap {
      margin-bottom: 22px !important;
      font-size: 14px;
      letter-spacing: -0.39px;
      line-height: 1.57;
      .warn {
        color: $salmon;
      }
    }
  }
</style>
