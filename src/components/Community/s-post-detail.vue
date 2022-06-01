<template>
  <section class="s-post-detail">
    <post-detail-header />

    <!-- 글 내용 -->
    <section class="content-body">{{ team_detail.content }}</section>

    <!-- 사진 -->
    <post-detail-image-container :image_list="team_detail.photoUrls" />

    <post-detail-footer />
  </section>
</template>

<script>
  import PostDetailHeader from "./PostDetailHeader.vue";
  import PostDetailImageContainer from "./PostDetailImageContainer.vue";
  import PostDetailFooter from "./PostDetailFooter.vue";

  import { mapState, mapActions } from "vuex";

  export default {
    name: "s-post-detail",
    components: {
      PostDetailHeader,
      PostDetailImageContainer,
      PostDetailFooter
    },
    watch: {
      more_btn_choose_index(new_type) {
        if (this.more_btn_list.type === "community_detail_other") {
          if (new_type === 0) {
            if (!this.user_info) {
              this.$eventBus.$emit("alert", { type: "login" });
              return;
            }
            this.$router.push(`/company/report/commu/${this.team_detail.id}`);
          } else if (new_type === 1) {
            this.open_dialog("community-hide");
          }
        }
      }
    },
    computed: {
      ...mapState("modalStore", ["more_btn_list", "more_btn_choose_index"]),
      ...mapState("userStore", ["user_info"]),
      ...mapState("communityStore", ["team_detail", "community_team"])
    },
    methods: {
      ...mapActions("communityStore", [
        "api_post_delete_community",
        "api_community_hide",
        "clear_commu_state"
      ]),
      ...mapActions("modalStore", ["config_toast_show"]),
      open_dialog(modal_type) {
        // 로그인 확인
        if (this.user_info) {
          // 이메일 인증 확인
          if (this.user_info.emailVerified === false) {
            this.$eventBus.$emit("alert", {
              type: "email-auth"
            });
          } else {
            // 모달창 열기
            this.$eventBus.$emit("alert", {
              type: modal_type
            });
          }
        } else {
          // 로그인 안 된 유저
          this.$eventBus.$emit("alert", {
            type: "login"
          });
        }
      }
    },
    mounted() {
      this.$eventBus.$on("alert_close", async payload => {
        if (payload.type === "delete") {
          const response = this.api_post_delete_community();
          this.clear_commu_state();
          if (response) {
            this.$router.push(
              `/community/team/${this.community_team.team_idx}`
            );
          }
          this.config_toast_show("삭제되었습니다.");
        } else if (payload.type === "community-hide") {
          await this.api_community_hide();
          this.clear_commu_state();
          this.config_toast_show("해당 게시글이 숨겨졌습니다.");
          this.$router.go(-1);
        }
      });
    },
    beforeDestroy() {
      this.$eventBus.$off("alert_close");
    }
  };
</script>

<style lang="scss" scoped>
  .s-post-detail {
    .content-body {
      padding: 18px 14px 16px;
      font-size: 16px;
      line-height: 28px;
      letter-spacing: -0.64px;
      color: #464646;
      white-space: break-spaces;
    }
  }
</style>
