<template>
  <v-menu offset-y class="comment-more-btn">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        class="button-link"
        v-bind="attrs"
        v-on="on"
        depressed
        :color="'#fff'"
      >
        <img
          class="button-image"
          :src="require('@/assets/images/btn_more@3x.png')"
          alt="더보기 버튼"
        />
      </v-btn>
    </template>
    <v-list v-if="is_my_comment" class="company-more">
      <v-list-item @click.prevent="reply_comment" v-if="!comment.replyStatus">
        <v-list-item-title>대댓글 달기</v-list-item-title>
      </v-list-item>
      <v-list-item @click="comment_modify">
        <v-list-item-title>수정하기</v-list-item-title>
      </v-list-item>
      <v-list-item @click.prevent="call_api_comment_del">
        <v-list-item-title>삭제하기</v-list-item-title>
      </v-list-item>
    </v-list>
    <v-list v-else class="company-more">
      <v-list-item @click.prevent="reply_comment" v-if="!comment.replyStatus">
        <v-list-item-title>대댓글 달기</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-list-item-title @click="mail_confirm">
          신고하기
        </v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
  import { mapMutations, mapState, mapActions } from "vuex";

  export default {
    name: "company-more-btn",
    props: {
      comment: {
        type: Object,
        default() {
          return {
            commentId: Number,
            anonymous: Boolean,
            commentTime: String,
            replyId: Number,
            replyStatus: Boolean,
            comment: String,
            likeCount: Number,
            nickname: String
          };
        }
      },
      index: { type: Number }
    },
    computed: {
      ...mapState("communityStore", [
        "team_detail",
        "community_team",
        "modify_comment_id"
      ]),
      ...mapState("userStore", ["user_info"]),
      is_my_comment() {
        return (
          this.user_info !== null &&
          this.comment.nickname === this.user_info.nickname
        );
      }
    },
    methods: {
      ...mapMutations("communityStore", [
        "set_modify_comment_id",
        "set_modify_comment",
        "set_comment_reply_id"
      ]),
      ...mapActions("communityStore", [
        "api_comment_delete",
        "api_comment_list",
        "api_community_detail",
        "api_comment_modify"
      ]),
      // 수정하기
      comment_modify() {
        this.set_modify_comment_id(this.comment.commentId);
        this.set_modify_comment(this.comment.comment);
      },
      // 삭제하기
      async call_api_comment_del() {
        await this.api_comment_delete(this.comment.commentId);
      },
      // 대댓 달기
      reply_comment() {
        this.$eventBus.$emit("comment_reply");
        this.set_comment_reply_id(this.comment.commentId);
      },
      mail_confirm() {
        if (this.user_info) {
          if (this.user_info.emailVerified === false) {
            this.$eventBus.$emit("alert", { type: "email-auth" });
          } else {
            this.$router.push(
              `/company/report/comment/${this.comment.commentId}`
            );
          }
        } else {
          this.$eventBus.$emit("alert", {
            type: "login"
          });
          return;
        }
      }
    }
  };
</script>
<style lang="scss">
  .button-wrapper {
    display: flex;
    align-items: center;
    min-width: 28px;
    .button-link {
      position: relative;
      display: inline-block;
      width: 28px;
      height: 28px;
      &#alert {
        &.on:after {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 6px;
          height: 6px;

          background-color: $dodger_blue;
          border-radius: 100%;
          content: "";
        }
      }

      .button-image {
        width: 100%;
        height: 100%;
        vertical-align: top;
      }
    }
  }
  .button-link.v-btn:not(.v-btn--round).v-size--default {
    height: auto !important;
  }
</style>
