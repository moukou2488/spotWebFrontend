<template>
  <div class="community-team-header team-detail-header">
    <div class="team-explain-img">
      <img
        class="team-logo"
        :src="require(`@/assets/images/${team_logo}`)"
        alt="팀 로고"
      />
      <img class="team-heart" :src="team_select_heart" alt="하트" />
    </div>
    <div class="team-explain-wrap">
      <div class="team-explain-title">
        {{ community_team.team }}
      </div>
      <div class="team-explain-slogan">
        {{ community_team.team_slogan }}
      </div>
      <div class="team-explain-count-wrap">
        <img
          class="team-explain-count-img"
          :src="require('@/assets/images/ic_person@3x.png')"
          alt="회원카운트"
        />
        <div class="team-explain-count">
          회원 <span class="not-kr">{{ community_team.team_count }}</span
          >명
        </div>
      </div>
    </div>
    <div class="team-tab-line" />
    <div class="team-detail-filters pd-row-14">
      <template v-for="(filter, index) in filters">
        <div
          :key="`filter-${index}`"
          @click="call_set_filter_index(index)"
          class="team-detail-filter"
          :class="{
            'team-detail-filter--selected': filter_index == index
          }"
        >
          {{ filters[index].name }}
        </div>
      </template>
    </div>
    <div class="team-detail-line" />
  </div>
</template>

<script>
  import { mapMutations, mapState } from "vuex";
  import teams_list from "@/assets/data/teams_list.js";

  export default {
    name: "community-team-header",
    data() {
      return {
        filters: [
          { postType: -1, name: "전체" },
          { postType: 0, name: "자유" },
          { postType: 1, name: "경기" },
          { postType: 2, name: "사진" },
          { postType: 3, name: "선수" },
          { postType: 4, name: "뉴스" }
        ]
      };
    },
    computed: {
      ...mapState("communityStore", ["community_team", "filter_index"]),
      ...mapState("userStore", ["user_info"]),
      team_logo() {
        return teams_list[this.community_team.team_idx - 1].team_logo;
      },
      team_select_heart() {
        if (this.user_info !== null) {
          if (this.user_info.teamIndex === this.community_team.team_idx) {
            return require(`@/assets/images/btn_community_favorite_active@3x.png`);
          } else {
            return require(`@/assets/images/btn_community_favorite@3x.png`);
          }
        } else {
          return require(`@/assets/images/btn_community_favorite@3x.png`);
        }
      }
    },
    methods: {
      ...mapMutations("communityStore", ["set_filter_index"]),
      call_set_filter_index(index) {
        this.set_filter_index(index);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .team-detail-header {
    margin-top: 48px;
    position: relative;
    width: 100%;
    .team-explain-img {
      padding-top: 28px;
      text-align: center;
      border-radius: 50%;
    }
    .team-logo {
      width: 108px;
      height: 108px;
    }
    .team-heart {
      margin-left: -28px;
      width: 33px;
      height: 30px;
    }
    .team-explain-wrap {
      padding-top: 18px;
      padding-bottom: 24px;
      .team-explain-title {
        font-size: 18px;
        font-weight: 500;
        line-height: 27px;
        letter-spacing: -0.36px;
        text-align: center;
        color: #1e1e1e;
      }

      .team-explain-slogan {
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.28px;
        text-align: center;
        color: #999;
      }
      .team-explain-count-wrap {
        display: flex;
        padding-top: 16px;
        justify-content: center;
        .team-explain-count-img {
          width: 14px;
          height: 14px;
          margin: 1.5px 6px 0 0;
        }
        .team-explain-count {
          font-size: 14px;
          line-height: 14px;
          letter-spacing: -0.28px;
          text-align: left;
          color: #464646;
        }
      }
    }
    .team-detail-filters {
      display: flex;
      height: 22px;
      margin: 13px 0;
      .team-detail-filter {
        margin-right: 16px;
        font-size: 15px;
        font-weight: 500;
        line-height: 22px;
        letter-spacing: -0.3px;
        text-align: center;
        color: #464646;
      }
      .team-detail-filter--selected {
        color: #42b4ff;
      }
    }
    .team-tab-line {
      height: 8px;
      background-color: #f0f0f0;
    }
    .team-detail-line {
      border-bottom: solid 1px #e9e9e9;
    }
  }
</style>
