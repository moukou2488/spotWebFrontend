<template>
  <div class="d-flex flex-column s-rank-pre">
    <div class="d-flex align-center s-rank-pre-header">
      <h2 class="s-rank-info">
        지금, 우리 구단순위를 확인해보세요!
      </h2>
      <div class="d-flex flex-grow-1" />
    </div>
    <div class="s-rank-pre-tour">
      <div class="d-flex s-rank-pre-title">
        <div class="d-flex justify-center" style="width: 100px">순위</div>
        <div class="d-flex justify-center" style="width: 5px">승</div>
        <div class="d-flex justify-center" style="width: 5px">패</div>
        <div class="d-flex justify-center" style="width: 5px">무</div>
        <div class="d-flex justify-center" style="width: 5px">승률</div>
      </div>
      <div
        class="d-flex s-rank-pre-row"
        v-for="team_rank_item in team_rank"
        :key="team_rank_item.id"
      >
        <div
          class="d-flex align-center flex-shrink-0 s-rank-pre-col-1"
          :class="{ 'col-1-last': team_rank_item.ranking === '10' }"
          style="width: 100px"
        >
          <div style="color: #3bb1ff; margin-right: 12px">
            {{ team_rank_item.ranking }}
          </div>
          <div :class="{ 'col-1-not-last': team_rank_item.ranking !== '10' }">
            {{ team(team_rank_item.team) }}
          </div>
        </div>
        <div class="bar" />

        <div
          class="d-flex align-center justify-center s-rank-pre-col-2"
          style="width: 5px"
        >
          {{ team_rank_item.win }}
        </div>
        <div class="bar" />
        <div
          class="d-flex align-center justify-center s-rank-pre-col-2"
          style="width: 5px"
        >
          {{ team_rank_item.lose }}
        </div>
        <div class="bar" />
        <div
          class="d-flex align-center justify-center s-rank-pre-col-2"
          style="width: 5px"
        >
          {{ team_rank_item.tie }}
        </div>
        <div class="bar" />
        <div
          class="d-flex align-center justify-center s-rank-pre-col-2"
          style="width: 5px"
        >
          {{ team_rank_item.odds }}
        </div>
      </div>
    </div>
    <router-link class="button-link" to="/company/index">
      <div class="community-index-button">
        <!--  -->
        <div>
          <p class="button-text">우리 구단을 함께 응원할 팬을 만나보세요.</p>
          <p class="button-text-small">
            지금, 바로 동행 만나보기!
          </p>
        </div>
        <!--  -->
        <div>
          <router-link to="/company/index"
            ><img
              class="arrow-img"
              :src="require('@/assets/images/btn_arrow_right@3x.png')"
              alt="동행화살표"
          /></router-link>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  export default {
    props: {
      data: { type: Array, default: () => [] }
    },
    methods: {
      ...mapActions("communityStore", ["api_team_rank"]),
      team(item) {
        switch (item) {
          case "두산":
            return "두산 베어스";
          case "한화":
            return "한화 이글스";
          case "NC":
            return "NC 다이노스";
          case "롯데":
            return "롯데 자이언츠";
          case "키움":
            return "키움 히어로즈";
          case "KIA":
            return "KIA 타이거즈";
          case "KT":
            return "kt wiz";
          case "SSG":
            return "SSG 랜더스";
          case "삼성":
            return "삼성 라이온즈";
          case "LG":
            return "LG 트윈스";
        }
      }
    },
    computed: {
      ...mapState("communityStore", ["team_rank"])
    },
    created() {
      this.api_team_rank();
    }
  };
</script>

<style lang="scss" scoped>
  .s-rank-pre {
    margin-top: 48px;

    .s-rank-pre-header {
      margin-bottom: 17px;
      padding: 18px 14px 0;

      font-size: 15px;
      font-weight: 500;
      line-height: 1.47;
      letter-spacing: -0.75px;
      text-align: left;
      color: #1e1e1e;
      .s-rank-info {
        margin-right: 10px;
        font-size: 14px;
        line-height: 22px;
      }
    }

    .s-rank-pre-tour {
      margin: 0 12px;
      border: 1px solid #e0e0e0;
      border-radius: 4px;

      .s-rank-pre-title {
        padding: 11px 0;
        font-size: 12px;
        line-height: 15px;
        letter-spacing: -0.48px;
        color: #999;
      }

      .s-rank-pre-row {
        height: 46px;
        border-top: solid 1px #e0e0e0;

        .s-rank-pre-col-1 {
          padding-left: 12px;
          font-size: 12px;
          font-weight: 500;
          line-height: 18px;
          letter-spacing: -0.72px;
          color: #484848;
          &.col-1-last {
            padding-left: 10px !important;
          }
          .col-1-not-last {
            padding-left: 1px !important;
          }
        }

        .s-rank-pre-col-2 {
          font-size: 12px;
          font-weight: 500;
          line-height: 18px;
          letter-spacing: -0.24px;
          color: #464646;
        }
      }
    }
    //
    .button-link {
      margin: 30px 0 60px;
      .community-index-button {
        display: flex;
        height: 66px;
        padding: 12px;
        border-top: solid 1px #ddd;
        border-bottom: solid 1px #ddd;
        background-color: #fff;

        //
        .button-text {
          font-size: 14px;
          font-weight: 600;
          line-height: 22px;
          letter-spacing: -0.56px;
          color: $dodger-blue;
        }
        .button-text-small {
          padding-top: 4px;
          font-size: 12px;
          line-height: 17px;
          letter-spacing: -0.48px;
          color: #636363;
        }
        //
        .arrow-img {
          position: absolute;
          right: 6px;
          width: 36px;
          height: 36px;
        }
      }
    }
  }

  .bar {
    width: 1px;
    height: 18px;
    margin-top: 14px;
    background-color: #d9d9d9;
  }

  .d-flex:not(.flex-column) {
    flex-grow: 1;
  }
</style>
