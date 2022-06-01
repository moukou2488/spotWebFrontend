<template>
  <footer class="comment-footer">
    <div class="input-box-inside-white">
      <div class="community-checkbox-wrap">
        <input
          v-model="comment.anonymous"
          class="anonymous-wrap community-checkbox"
          id="isAnonymous"
          type="checkbox"
        />
        <label for="isAnonymous" class="community-label">익명</label>
      </div>
      <!--  -->
      <textarea
        v-model="comment.comment"
        class="input-box-inside"
        ref="inputBox"
        :placeholder="comment_placeholder"
        @input="expand_comment_area"
        @focus="expand_comment_area"
      ></textarea>
    </div>
    <button
      class="button-send"
      :disabled="submit"
      @click="call_api_comment_upload"
    >
      <img
        class="button-image"
        :src="require('@/assets/images/bt_send@3x.png')"
        alt="보내기"
      />
    </button>
  </footer>
</template>

<script>
  import { mapState, mapActions, mapMutations } from "vuex";

  export default {
    name: "post-detail-footer",
    watch: {
      modify_comment() {
        this.comment.comment = this.modify_comment;
        setTimeout(() => {
          this.$refs.inputBox.focus();
        }, 0);
      }
    },
    computed: {
      ...mapState("communityStore", [
        "team_detail",
        "community_team",
        "modify_comment",
        "modify_comment_id",
        "comment_reply_id"
      ]),
      ...mapState("userStore", ["user_info"]),
      computed_comment() {
        return this.comment.comment;
      }
    },
    data() {
      return {
        comment: {
          anonymous: false,
          postId: "",
          replyStatus: false,
          replyId: -1,
          comment: ""
        },
        submit: false,
        comment_placeholder: "매너 있는 댓글을 입력해주세요 :)"
      };
    },
    methods: {
      ...mapMutations("communityStore", [
        "set_modify_comment",
        "set_modify_comment_id",
        "set_comment_reply_id"
      ]),
      ...mapActions("communityStore", [
        "api_comment_upload",
        "api_community_detail",
        "api_comment_modify"
      ]),
      ...mapActions("modalStore", ["config_toast_show"]),

      // 댓글 작성
      async call_api_comment_upload() {
        if (this.user_info) {
          if (this.user_info.emailVerified === false) {
            this.$eventBus.$emit("alert", { type: "email-auth" });
          } else {
            this.submit = true;
            if (this.comment.comment === "") {
              this.config_toast_show("내용을 입력해주세요.");
            } else {
              if (this.modify_comment_id !== null) {
                const payload = {
                  commentId: this.modify_comment_id,
                  comment: this.comment.comment,
                  anonymous: this.comment.anonymous
                };
                await this.api_comment_modify(payload);
                this.set_modify_comment_id(null);
                this.set_modify_comment(null);
              } else {
                this.comment.replyStatus = this.comment_reply_id !== null;
                this.comment.replyId =
                  this.comment_reply_id === null ? null : this.comment_reply_id;
                this.comment.postId = this.team_detail.id;
                await this.api_comment_upload(this.comment);
                this.comment_placeholder = "매너 있는 댓글을 입력해주세요 :)";
                this.set_comment_reply_id(null);
                const height = document.querySelector("body").scrollHeight;
                window.scrollTo(0, height);
              }
              this.comment.comment = "";
              this.$refs.inputBox.style.height = "20px";
            }
            this.submit = false;
          }
        } else {
          this.$eventBus.$emit("alert", {
            type: "login"
          });
          return;
        }
      },
      // 인풋 확대
      expand_comment_area() {
        if (this.comment.comment === "") {
          this.$refs.inputBox.style.height = "20px";
          return;
        }

        this.$refs.inputBox.style.height = "20px";
        if (
          this.$refs.inputBox.scrollHeight >= 40 &&
          this.$refs.inputBox.scrollHeight < 60
        ) {
          this.$refs.inputBox.style.height = "40px";
        } else if (this.$refs.inputBox.scrollHeight >= 60) {
          this.$refs.inputBox.style.height = "60px";
        }
      }
    },
    mounted() {
      // 대댓글 누르면 키보드 올라오게
      this.$eventBus.$on("comment_reply", () => {
        this.comment_placeholder = "매너 있는 대댓글을 입력해주세요 :)";
        this.$refs.inputBox.focus();
      });
    }
  };
</script>

<style lang="scss" scoped>
  .comment-footer {
    position: fixed;
    bottom: 0px;
    left: 0px;
    right: 0px;
    z-index: 9;

    display: flex;
    width: 100%;
    padding: 10px 8px 10px 14px;
    background-color: $dodger-blue;

    .input-box-inside-white {
      display: flex;
      width: 100%;
      padding: 7px 18px;
      border-radius: 20px;
      background-color: #fff;

      //   checkbox
      .community-checkbox-wrap {
        position: relative;
        [type="checkbox"].community-checkbox {
          display: none;

          &:checked + .community-label:before {
            background: url("~@/assets/images/check_b_active.png") center;
            background-size: cover;
          }
        }

        .community-label {
          display: inline-flex;
          align-items: center;
          margin-right: 8px;

          color: #3bb1ff;
          font-size: 14px;
          line-height: 20px;
          letter-spacing: -0.84px;
          &:before {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 4px;
            vertical-align: top;
            background: url("~@/assets/images/check_b_inactive.png") center;
            background-size: cover;
            content: "";
          }

          &:after {
            display: inline-block;
            vertical-align: top;
            margin-right: 4px;
            color: $dodger_blue;
          }
        }
      }
      //   textarea
      .input-box-inside {
        flex: 1;
        height: 20px;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.56px;
        resize: none;
        -ms-overflow-style: none; /* IE and Edge */
        scrollbar-width: none; /* Firefox */

        &::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera*/
        }
      }
    }
    .button-send {
      display: inline-block;
      width: 34px;
      height: 34px;
      vertical-align: top;
      .button-image {
        width: 100%;
        height: 100%;
        vertical-align: top;
      }
    }
  }
</style>
