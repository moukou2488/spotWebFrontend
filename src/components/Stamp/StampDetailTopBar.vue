<template>
  <nav class="stamp-detail-top-bar top-bar">
    <!-- 뒤로가기 버튼이 있는 top-bar -->
    <div class="top-bar-wrap back">
      <div class="button-wrapper left">
        <slot name="back-btn">
          <a class="button-link" href="#" @click.prevent="$router.go(-1)">
            <img
              class="button-image"
              :src="require('@/assets/images/arrow_btn@3x.png')"
              alt="뒤로가기"
            />
          </a>
        </slot>
      </div>
      <div class="headline-wrap">
        <span class="headline-text">버디 일기</span>
      </div>
      <div class="button-wrapper right">
        <div class="button-link" @click="call_api_scrap">
          <img class="button-image" :src="scrap_img" alt="스크랩 아이콘" />
        </div>
        <s-more-btn :set_list="set_list" />
      </div>
    </div>
  </nav>
</template>

<script>
  import { mapActions, mapMutations, mapState } from "vuex";
  import SMoreBtn from "@/components/Common/SMoreBtn.vue";
  export default {
    name: "stamp-detail-top-bar",
    components: { SMoreBtn },
    watch: {
      more_btn_choose_index(new_type) {
        if (this.more_btn_list.type === "stamp_detail_other") {
          if (new_type === 0) {
            if (!this.user_info) {
              this.$eventBus.$emit("alert", { type: "login" });
              return;
            }
            this.open_dialog("community-hide");
          }
        } else if (this.more_btn_list.type === "mine_detail") {
          if (new_type === 0) {
            this.stamp_modify();
          } else if (new_type === 1) {
            this.open_dialog("delete");
          }
        }
      }
    },
    computed: {
      ...mapState("stampStore", ["scrap_state", "stamp_detail"]),
      ...mapState("userStore", ["user_info"]),
      ...mapState("modalStore", ["more_btn_list", "more_btn_choose_index"]),
      scrap_img() {
        return this.scrap_state
          ? require("@/assets/images/btn_scrap_done@3x.png")
          : require("@/assets/images/btn_scrap@3x.png");
      },
      is_my_stamp_detail() {
        return (
          this.user_info !== null &&
          this.stamp_detail.nickname === this.user_info.nickname
        );
      },
      set_list() {
        let moreBtnList = {
          type: null,
          header: null
        };
        if (this.user_info !== null && this.is_my_stamp_detail)
          moreBtnList.type = "mine_detail";
        else moreBtnList.type = "stamp_detail_other";
        moreBtnList.header = "버디일기 관리하기";
        return moreBtnList;
      }
    },
    methods: {
      ...mapActions("stampStore", [
        "api_scrap_delete",
        "api_scrap_add",
        "api_stamp_delete",
        "api_stamp_hide"
      ]),
      ...mapActions("modalStore", ["config_toast_show"]),
      ...mapMutations("companyWriteStore", ["set_payload_data"]),
      ...mapMutations("stampStore", [
        "set_stamp_list_scroll_index",
        "set_stamp_list",
        "set_modify_stamp_id",
        "set_stamp_photo",
        "set_stamp_game",
        "set_stamp_exists_all",
        "set_stamp_diary",
        "set_stamp_count",
        "set_public_state",
        "set_stamp_list"
      ]),
      async call_api_scrap() {
        if (this.user_info) {
          if (this.user_info.emailVerified === false) {
            this.$eventBus.$emit("alert", { type: "email-auth" });
          } else {
            if (this.scrap_state) {
              await this.api_scrap_delete(this.stamp_detail.diaryId);
              this.config_toast_show("스크랩이 취소되었습니다.");
            } else {
              await this.api_scrap_add(this.stamp_detail.diaryId);
              this.config_toast_show("글이 스크랩되었습니다.");
            }
          }
        } else {
          this.$eventBus.$emit("alert", {
            type: "login"
          });
          return;
        }
      },
      // 버디일기 수정하기
      stamp_modify() {
        const payload = {
          tourTeam: this.stamp_detail.tourTeam,
          //  tourTeam: this.stamp_detail.tourTeam,
          tourLocation: this.stamp_detail.location.substring(0, 2)
        };
        this.set_stamp_photo({ url: this.stamp_detail.photoUrl });
        this.set_stamp_game(this.stamp_detail);
        this.set_stamp_exists_all(this.stamp_detail);
        this.set_stamp_diary(this.stamp_detail.diaryContent);
        this.set_stamp_count(this.stamp_detail.watchCount);
        this.set_public_state(this.stamp_detail.publicStatus);
        this.set_payload_data(payload);
        this.set_modify_stamp_id(this.stamp_detail.diaryId);
        this.$router.replace("/stamp/write");
      },
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
          try {
            await this.api_stamp_delete();
            this.set_stamp_list_scroll_index(0);
            this.set_stamp_list([]);
            this.$router.push("/stamp/index");
            this.config_toast_show("삭제되었습니다.");
          } catch (error) {
            this.config_toast_show("Something Wrong :(");
          }
        } else if (payload.type === "community-hide") {
          await this.api_stamp_hide();

          this.set_stamp_list_scroll_index(0);
          this.set_stamp_list([]);

          this.$router.go(-1);
          this.config_toast_show("해당 게시글이 숨겨졌습니다.");
        }
      });
    }
  };
</script>

<style lang="scss">
  .stamp-detail-top-bar {
    .headline-wrap {
      margin-left: 2px;
      justify-content: flex-start;
    }
    .button-wrapper {
      &.right {
        .button-link {
          width: 30px;
        }
      }
    }
  }
</style>
