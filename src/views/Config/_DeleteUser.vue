<template>
  <section class="config-delete_user">
    <top-bar :topbar_text="'계정 탈퇴'" :topbar_type="'back'" />
    <header class="delete-header">
      <h3 class="header-title head-3">
        {{ user_info.nickname }}님의 계정 삭제 이유가 궁금해요
      </h3>
      <v-select
        :value="why_delete"
        @change="set_why_delete($event)"
        :items="items"
        dense
        outlined
        single-line
        :menu-props="{ auto: true, offsetY: true }"
        label="삭제 이유를 선택해주세요"
        hide-details
        height="44"
      ></v-select>
      <div v-if="why_delete === '기타'" class="detail-why-wrap">
        <h3 class="header-title head-3 gray">
          탈퇴 이유를 알려주세요
        </h3>
        <input
          class="detail-why-input"
          type="text"
          :value="etc_why"
          @input="set_etc_why($event.target.value)"
          placeholder="입력해주세요."
        />
      </div>
    </header>
    <div class="custom-br"></div>
    <footer class="delete-footer">
      <h3 class="footer-title head-3">
        정말 계정을 삭제하시겠어요?
      </h3>
      <p class="confirm-text gray">
        한번 삭제한 계정은 다시 복구되지 않습니다 :(
      </p>
      <router-link class="btn fill large" to="/">
        더 사용할게요
      </router-link>
      <a
        @click.prevent="delete_confirm"
        href="#"
        class="btn fill_disabled large"
        >네, 삭제할게요</a
      >
    </footer>
    <s-toast :where="'bottom'" />
  </section>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import items from "@/assets/data/deleteReason.js";
  import SToast from "@/components/Common/SToast.vue";

  import { mapActions, mapMutations, mapState } from "vuex";

  export default {
    name: "config-delete_user",
    components: { TopBar, SToast },
    computed: {
      ...mapState("userStore", ["user_info"]),
      ...mapState("configStore", ["why_delete", "etc_why"])
    },
    data: () => ({ items }),
    methods: {
      ...mapMutations("configStore", ["set_why_delete", "set_etc_why"]),
      ...mapActions("modalStore", ["config_toast_show"]),
      delete_confirm() {
        if (this.why_delete) this.$router.push("/config/delete_confirm");
        else this.config_toast_show("이유를 선택해주세요.");
      }
    }
  };
</script>

<style lang="scss" scoped>
  .config-delete_user {
    .delete-header {
      margin: 48px 0 20px;
      padding: 0 14px;
      .header-title {
        padding: 20px 0 12px;
      }
      .detail-why-input {
        width: 100%;
        font-size: 14px;
        letter-spacing: -0.56px;
        padding: 12px 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
      }
    }
    .delete-footer {
      padding: 20px 14px;
      .footer-title {
        margin-bottom: 4px;
      }
      .confirm-text {
        padding-left: 2px;
        font-size: 13px;
        font-weight: 500;
        letter-spacing: -0.36px;
        margin-bottom: 36px !important;
      }
    }
    .head-3 {
      font-size: 15px;
      letter-spacing: -0.42px;
      color: #464646;
      padding-left: 2px;
    }
    .gray {
      color: #adadad;
    }
  }
</style>
