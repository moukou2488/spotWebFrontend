<template>
  <div class="s-comment-container">
    <section class="s-comment-header">
      <img src="" alt="" />
      <span>댓글</span>
      <span class="comment-count">{{ comment_count }}</span>
    </section>

    <ul class="comment-list">
      <comment-item
        v-for="comment in commentList"
        :key="comment.id"
        :comment="comment"
      />
    </ul>
  </div>
</template>

<script>
  import { mapState, mapActions, mapMutations } from "vuex";
  import CommentItem from "./CommentItem.vue";
  import teams_list from "@/assets/data/teams_list.js";

  export default {
    name: "s-comment",
    components: { CommentItem },

    props: {
      commentCnt: Number,
      comments: { type: Array, default: () => [] }
    },
    watch: {
      comment_change_event(newVal) {
        if (newVal !== null) {
          //댓글 수정
          if (newVal.modify) {
            this.commentList.some(comment => {
              if (comment.commentId === newVal.commentId) {
                comment.comment = newVal.comment;
                comment.anonymous = newVal.anonymous;
                if (newVal.anonymous) {
                  if (this.user_info.teamIndex !== -1) {
                    this.nickname_count[
                      this.user_info.teamIndex - 1
                    ].count += 1;
                    comment.change_nickname =
                      teams_list[this.user_info.teamIndex - 1].team +
                      this.nickname_count[this.user_info.teamIndex - 1].count;
                  } else {
                    this.nickname_count[10].count += 1;
                    comment.change_nickname =
                      "버디" + this.nickname_count[10].count;
                  }
                } else comment.change_nickname = undefined;
              }
            });
            this.numbering_reset();
          } else if (newVal.upload) {
            //댓글 업로드
            if (newVal.anonymous) {
              if (this.user_info.teamIndex !== -1) {
                this.nickname_count[this.user_info.teamIndex - 1].count += 1;
                newVal.change_nickname =
                  teams_list[this.user_info.teamIndex - 1].team +
                  this.nickname_count[this.user_info.teamIndex - 1].count;
              } else {
                this.nickname_count[10].count += 1;
                newVal.change_nickname = "버디" + this.nickname_count[10].count;
              }
            }
            newVal.replyId = newVal.replyStatus
              ? newVal.replyId
              : newVal.commentId;
            newVal.depth = newVal.replyState ? 1 : 0;
            this.commentList = this.commentList.concat(newVal);

            this.commentList.sort(function(a, b) {
              return a.replyId - b.replyId;
            });

            this.comment_count += 1;
          } else {
            //댓글 삭제
            this.commentList = this.commentList.filter(
              comment => comment.commentId !== newVal
            );
            this.numbering_reset();
            this.comment_count -= 1;
          }
        }
        this.set_comment_change_event(null);
      }
    },
    computed: {
      ...mapState("profileStore", ["user_profile_default_url"]),
      ...mapState("communityStore", [
        "comment_list",
        "team_detail",
        "comment_change_event",
        "nickname_team_count"
      ]),
      ...mapState("userStore", ["user_info"])
    },
    data() {
      return {
        data: {},
        commentList: [],
        comment_count: "",
        nickname_count: [],
        teams_list
      };
    },
    async mounted() {
      const response = await this.api_comment_list(this.team_detail.id);
      this.commentList = response;
      this.comment_count = this.team_detail.commentsCount;
      this.nickname_count = this.nickname_team_count;
    },
    methods: {
      ...mapActions("communityStore", ["api_comment_list"]),
      ...mapMutations("communityStore", ["set_comment_change_event"]),
      numbering_reset() {
        this.nickname_count = [
          { count: 0 },
          { count: 0 },
          { count: 0 },
          { count: 0 },
          { count: 0 },
          { count: 0 },
          { count: 0 },
          { count: 0 },
          { count: 0 },
          { count: 0 },
          { count: 0 }
        ];
        for (const idx in this.commentList) {
          if (this.commentList[idx].anonymous) {
            if (this.commentList[idx].teamIndex !== -1) {
              this.nickname_count[
                this.commentList[idx].teamIndex - 1
              ].count += 1;
              this.commentList[idx].change_nickname =
                teams_list[this.commentList[idx].teamIndex - 1].team +
                this.nickname_count[this.commentList[idx].teamIndex - 1].count;
            } else {
              this.nickname_count[10].count += 1;
              this.commentList[idx].change_nickname =
                "버디" + this.nickname_count[10].count;
            }
          }
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .s-comment-container {
    .s-comment-header {
      display: flex;
      align-items: center;
      padding: 0 12px;
      height: 42px;
      border-top: solid 1px #e9e9e9;
      border-bottom: solid 1px #e9e9e9;

      font-size: 14px;
      line-height: 20px;
      letter-spacing: -0.56px;
      color: #464646;

      .comment-count {
        display: inline-block;
        margin-left: 6px;
        color: $dodger_blue;
      }
    }
    .comment-list {
      padding: 20px 14px !important;
      margin-bottom: 74px !important;
    }
  }
</style>
