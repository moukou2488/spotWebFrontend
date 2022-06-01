<template>
  <li class="comment-item" :class="{ reply: comment_item.replyStatus }">
    <a
      href="#"
      @click.prevent="go_profile"
      class="profile-img-wrap"
      :class="{ reply_profile_img_wrap: comment_item.replyStatus }"
    >
      <img class="profile-img" :src="profile_url" alt="프로필 이미지" />
    </a>
    <!--  -->
    <div class="comment-info-container">
      <div class="comment-header">
        <p class="nickname">
          {{ commentItemNickname }}
        </p>
        <div class="button-wrapper">
          <comment-more-btn :comment="comment_item" />
        </div>
      </div>
      <p
        class="comment-body"
        :class="{ comment_reply_body: comment_item.replyStatus }"
      >
        {{ comment_item.comment }}
      </p>
      <div class="comment-footer">
        <img
          class="comment-like"
          :src="is_user_like(comment_item.commentId)"
          alt="댓글좋아요"
          @click="comment_like(comment_item.commentId)"
        />
        <span class="info-text like-conut">{{ comment_item.likeCount }}</span>
        <span class="info-text time">{{ comment_item.commentTime }}</span>
      </div>
    </div>
  </li>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import CommentMoreBtn from "./CommentMoreBtn.vue";
  export default {
    name: "comment-item",
    components: { CommentMoreBtn },
    props: {
      comment: {
        type: Object
      }
    },
    watch: {
      comment: {
        deep: true,
        handler() {
          this.nickname();
          this.profile();
        }
      }
    },
    computed: {
      ...mapState("userStore", ["user_info"]),
      ...mapState("communityStore", [
        "comment_list",
        "team_detail",
        "user_comment_ids"
      ]),
      comment_item() {
        return this.comment;
      }
    },
    data: () => ({
      profile_url: require("@/assets/images/profile_default.png"),
      commentItemNickname: ""
    }),
    methods: {
      ...mapActions("profileStore", ["api_get_profile_photo"]),
      ...mapActions("communityStore", [
        "api_comment_like",
        "api_comment_cancle_like",
        "api_user_comment_ids"
      ]),
      ...mapActions("modalStore", ["config_toast_show"]),
      nickname() {
        if (this.comment.change_nickname !== undefined) {
          this.commentItemNickname = this.comment.change_nickname;
        } else {
          this.commentItemNickname = this.comment.nickname;
        }
      },
      async profile() {
        if (this.comment.anonymous) {
          this.profile_url = require("@/assets/images/profile_default.png");
          return;
        } else {
          const response = await this.api_get_profile_photo(
            this.comment.nickname
          );
          this.profile_url = response;
        }
      },
      // 프로필 누르면 프로필 상세 페이지
      go_profile() {
        if (this.comment.anonymous) {
          this.config_toast_show("익명의 유저의 프로필은 열람할 수 없습니다.");
          return;
        }
        this.$router.push(`/profile/userpage/${this.comment.nickname}`);
      },
      is_user_like(id) {
        const bool = this.user_comment_ids.some(comment_id => {
          return comment_id.commentId === id;
        });
        return bool
          ? require("@/assets/images/ic_recommended_active@3x.png")
          : require("@/assets/images/ic_recommended@3x.png");
      },
      async comment_like(id) {
        if (this.user_info) {
          if (this.user_info.emailVerified === false) {
            this.$eventBus.$emit("alert", { type: "email-auth" });
          } else if (
            this.is_user_like(id) ===
            require("@/assets/images/ic_recommended@3x.png")
          ) {
            await this.call_api_comment_like(id);
          } else {
            await this.call_api_comment_like_cancle(id);
          }
        } else {
          this.$eventBus.$emit("alert", {
            type: "login"
          });
          return;
        }
      },
      async call_api_comment_like(id) {
        await this.api_comment_like(id);
        await this.api_user_comment_ids(this.team_detail.id);
        this.comment_item.likeCount += 1;
      },
      async call_api_comment_like_cancle(id) {
        await this.api_comment_cancle_like(id);
        await this.api_user_comment_ids(this.team_detail.id);
        this.comment_item.likeCount -= 1;
      }
    },
    async mounted() {
      this.profile();
      this.nickname();
      if (this.user_info !== null)
        this.api_user_comment_ids(this.team_detail.id);
    }
  };
</script>

<style lang="scss" scoped>
  .reply {
    margin-left: 50px;
  }
  .comment-item {
    display: flex;
    .profile-img-wrap {
      width: 38px;
      height: 38px;
      margin-right: 12px;
      // 프로필 이미지
      .profile-img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .reply_profile_img_wrap {
      width: 32px !important;
      height: 32px !important;
    }
    .comment-info-container {
      flex: 1;
      .comment-header {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 3px;
        .nickname {
          font-size: 14px;
          font-weight: 500;
          line-height: 1.43;
          letter-spacing: -0.84px;
          color: #1e1e1e;
        }
      }
      .comment-body {
        font-size: 13px;
        font-weight: 300;
        line-height: 1.69;
        letter-spacing: -0.78px;
        color: #1e1e1e;
        word-break: break-word;
      }
      .comment_reply_body {
        padding-right: 10px;
      }
      .comment-footer {
        display: flex;
        align-items: center;
        margin-top: 4px;
        .comment-like {
          width: 20px;
          height: 20px;
          vertical-align: top;
          margin-right: 4px;
        }
        .like-conut {
          display: inline-block;
          margin-right: 16px;
        }
        .info-text {
          color: #999;
          font-size: 12px;
          line-height: 20px;
          letter-spacing: -0.72px;
          &.time {
            width: 100%;
          }
        }
      }
    }
    & + .comment-item {
      margin-top: 16px;
    }
  }
</style>
