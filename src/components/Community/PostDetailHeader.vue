<template>
  <header class="post-detail-header">
    <p class="post-title">{{ team_detail.title }}</p>
    <div class="post-info-container">
      <a href="#" @click.prevent="go_profile">
        <img class="profile-img" :src="profile_url" alt="프로필 이미지" />
      </a>
      <div class="post-info-wrap">
        <p class="nickname">{{ nickname }}</p>
        <p class="post-info-detail">
          <span class="post-info">{{ computed_date }}</span>
          <span class="post-info">{{ computed_time }}</span>
          <span class="view-count post-info">
            조회 {{ team_detail.viewCount }}
          </span>
        </p>
      </div>
    </div>
  </header>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import teams_list from "@/assets/data/teams_list.js";
  export default {
    name: "post-detail-header",
    computed: {
      ...mapState("communityStore", ["team_detail", "community_team"]),
      ...mapState("userStore", ["user_info"]),
      nickname() {
        if (this.team_detail.anonymous)
          if (this.user_info.teamIndex === -1)
            // 회원 가입 -> 구단: 선택 안 함의 경우
            return "버디1";
          else return teams_list[this.user_info.teamIndex - 1].team + 1;
        return this.team_detail.nickname;
      },
      computed_date() {
        return this.team_detail.postsTime.split(" ")[0].replace(/-/gi, ".");
      },
      computed_time() {
        return this.team_detail.postsTime.split(" ")[1];
      }
    },
    data: () => ({
      profile_url: require("@/assets/images/profile_default.png")
    }),
    methods: {
      ...mapActions("profileStore", ["api_get_profile_photo"]),
      ...mapActions("modalStore", ["config_toast_show"]),
      // 프로필 누르면 프로필 상세 페이지
      go_profile() {
        if (this.team_detail.anonymous) {
          this.config_toast_show("익명의 유저의 프로필은 열람할 수 없습니다.");
          return;
        }
        this.$router.push(`/profile/userpage/${this.team_detail.nickname}`);
      }
    },
    async mounted() {
      if (this.team_detail.anonymous) return;
      else {
        const response = await this.api_get_profile_photo(
          this.team_detail.nickname
        );
        this.profile_url = response;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .post-detail-header {
    margin-top: 48px;
    padding: 18px 14px 20px;
    border-bottom: 1px solid #e9e9e9;
    .post-title {
      color: #1e1e1e;
      font-size: 20px;
      font-weight: 500;
      line-height: 27px;
      letter-spacing: -1.2px;
      word-break: break-word;
    }
    .post-info-container {
      display: flex;
      align-items: center;
      margin-top: 14px;
      .profile-img {
        margin-right: 10px;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        vertical-align: top;
      }

      .post-info-wrap {
        flex: 1;
        .nickname {
          margin-bottom: 2px;

          color: #1e1e1e;
          font-size: 13px;
          line-height: 17px;
          letter-spacing: -0.78px;
        }

        .post-info-detail {
          display: flex;
          .post-info {
            display: inline-block;
            width: auto;
            text-align: center;
            white-space: nowrap;

            vertical-align: top;
            color: #999;
            font-size: 12px;
            line-height: 18px;
            letter-spacing: -0.72px;

            &.view-count {
              flex: 1;
              text-align: left;
            }
            & + .post-info {
              margin-left: 8px;
            }
          }
        }
      }
    }
  }
</style>
