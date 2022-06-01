<template>
  <section class="profile-my_community_comment">
    <top-bar :topbar_text="'나의 작성 댓글'" :topbar_type="'back'" />
    <empty-view v-if="my_community_comment.length === 0" :page_id="'comment'" />
    <ul class="comment-list">
      <li
        v-for="my_comment in my_community_comment"
        :key="my_comment.commentId"
        class="comment-list-item"
      >
        <router-link
          class="comment-link"
          :to="`/community/detail/${my_comment.teamIndex}/${my_comment.postId}`"
        >
          <strong class="comment-title">{{ my_comment.title }}</strong>
          <p class="community-detail-info">
            <span class="inline-block club-info">
              {{ my_comment.teamIndex | filtered_club }}
            </span>
            <span class="inline-block date">{{ my_comment.postsTime }}</span>
            <span class="inline-block view-count">
              조회 {{ my_comment.viewCount }}
            </span>
            <span class="inline-block comment-count">
              댓글 {{ my_comment.commentCount }}
            </span>
          </p>
          <p class="comment">{{ my_comment.comment }}</p>
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import EmptyView from "@/components/Profile/Community/EmptyView.vue";
  import clubCalculate from "@/assets/scripts/clubCalculate.js";

  import { mapState } from "vuex";

  export default {
    name: "profile-my_community_comment",
    components: { TopBar, EmptyView },
    computed: {
      ...mapState("profileStore", ["my_community_comment"])
    },
    filters: {
      filtered_club(index) {
        return clubCalculate(index);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .comment-list {
    margin-top: 48px !important;
    .comment-list-item {
      padding: 18px 14px;
      border-bottom: 1px solid #e9e9e9;
      .comment-link {
        .comment-title {
          color: #1e1e1e;
          font-size: 16px;
          font-weight: 500;
          line-height: 22px;
          letter-spacing: -0.96px;
        }
        .community-detail-info {
          margin: 10px 0 !important;
          color: #999;
          font-size: 12px;
          font-weight: normal;
          line-height: 17px;
          letter-spacing: -0.48px;
          .inline-block {
            display: inline-block;
            width: auto;
            white-space: nowrap;
          }
          .club-info {
            margin-right: 10px;
            color: $dodger_blue;
            font-weight: 500;
          }

          .date {
            margin-right: 10px;
          }

          .view-count {
            margin-right: 6px;
          }
        }

        .comment {
          max-width: 350px;
          text-overflow: ellipsis;
          overflow: hidden;

          color: #464646;
          font-size: 12px;
          line-height: 18px;
          letter-spacing: -0.48px;

          @media screen and (max-width: 330px) {
            max-width: 310px;
          }
        }
      }
    }
  }
</style>
