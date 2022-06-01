<template>
  <li class="community-team-item">
    <router-link
      :to="
        `/community/detail/${community_team_item.teamIndex}/${community_team_item.id}`
      "
      class="community-link"
    >
      <div class="info-wrap">
        <div class="title-area">
          <!-- new 처리 -->
          <div
            v-if="is_new(community_team_item.postsDate)"
            class="community-popular-rank"
          >
            <img
              :src="require('@/assets/images/icon_new@3x.png')"
              alt="new"
              class="new"
            />
          </div>
          <div v-if="filter_index === 0" class="community-category">
            {{ filters[community_team_item.category + 1].name }}
          </div>
          <strong
            class="post-title text-truncate"
            :class="[
              { title_with_img: community_team_item.photoUrl },
              { is_new: is_new(community_team_item.postsDate) }
            ]"
          >
            {{ community_team_item.title }}
          </strong>
        </div>
        <!--  -->
        <div class="text-area">
          <p
            class="post-content"
            :class="{ content_with_img: community_team_item.photoUrl }"
          >
            {{ community_team_item.content }}
          </p>
          <p class="post-footer">
            <span class="date not-kr">
              {{ community_team_item.postsDate }}
            </span>
            <span class="post-detail-info">
              조회
              <span class="not-kr">{{ community_team_item.viewCount }}</span>
            </span>
            <span class="post-detail-info">
              댓글
              <span class="not-kr">{{ community_team_item.commentCount }}</span>
            </span>
          </p>
        </div>
      </div>
      <!--  -->
      <div v-if="community_team_item.photoUrl" class="image-wrapper">
        <img
          v-show="image_onload"
          :ref="`thumbnail_image_${community_team_item.id}`"
          :style="image_size"
          class="thumbnail-image"
          :src="community_team_item.photoUrl"
          alt="썸네일"
        />
        <v-skeleton-loader
          v-show="!image_onload"
          width="94"
          height="94"
          type="image"
        ></v-skeleton-loader>
      </div>
    </router-link>
  </li>
</template>

<script>
  import { img_ratio_calculate } from "@/assets/scripts/imageCalculate.js";
  import { mapState } from "vuex";

  export default {
    name: "community-team-item",
    props: {
      community_team_item: {
        type: Object,
        default() {
          return {
            id: Number,
            postsDate: String,
            viewCount: Number,
            commentCount: Number,
            title: String,
            content: String,
            teamIndex: Number,
            photoUrl: String
          };
        }
      },
      index: { type: Number }
    },
    data() {
      return {
        filters: [
          { postType: -1, name: "전체" },
          { postType: 0, name: "자유" },
          { postType: 1, name: "경기" },
          { postType: 2, name: "사진" },
          { postType: 3, name: "선수" },
          { postType: 4, name: "뉴스" }
        ],
        image_size: {},
        image_onload: false
      };
    },
    computed: {
      ...mapState("communityStore", ["filter_index"])
    },
    methods: {
      is_new(date) {
        let time = new Date();
        return (
          Number(
            String(time.getFullYear()) +
              String("00" + (time.getMonth() + 1)).slice(-2) +
              String("00" + time.getDate()).slice(-2)
          ) -
            Number(
              date.split("-")[0] + date.split("-")[1] + date.split("-")[2]
            ) <=
          1
        );
      }
    },
    mounted() {
      const img = new Image();
      img.src = this.community_team_item.photoUrl;
      img.onload = () => {
        this.image_onload = true;
        const image = this.$refs[
          `thumbnail_image_${this.community_team_item.id}`
        ];

        this.image_size = img_ratio_calculate(
          image.naturalWidth,
          image.naturalHeight,
          "list-preview"
        );
      };
    }
  };
</script>

<style lang="scss" scoped>
  .community-team-item {
    height: 133px;
    padding: 18px 14px 0;
    border-bottom: solid 1px #e9e9e9;
    .community-link {
      display: flex;
      height: 100%;
      .info-wrap {
        flex: 1;
        display: flex;
        flex-direction: column;
        height: 100%;
        .title-area {
          display: flex;
          align-items: center;
          .community-popular-rank {
            margin-right: 6px;
            width: 18px;
            height: 18px;
            .new {
              max-width: 100%;
            }
          }
          .community-category {
            margin-right: 6px;

            font-size: 16px;
            font-weight: 500;
            line-height: 24px;
            letter-spacing: -0.32px;
            color: #42b4ff;
          }
          .post-title {
            display: inline-block;
            max-width: 213px;
            color: #1e1e1e;
            font-size: 16px;
            font-weight: 500;
            letter-spacing: -0.96px;
            line-height: 22px;
            &.title_with_img {
              max-width: 160px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              &.is_new {
                width: 120px;
              }
            }
          }
        }

        .text-area {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          flex: 1;
          margin-top: 12px;
          padding-bottom: 18px;

          .post-content {
            margin-bottom: 4px !important;
            max-height: 41px;
            overflow: hidden;
            text-overflow: ellipsis;

            color: #464646;
            font-size: 12px;
            line-height: 20px;
            letter-spacing: -0.48px;
          }

          .post-footer {
            font-size: 12px;
            letter-spacing: -0.48px;
            color: #999;
            .club,
            .date {
              display: inline-block;
              margin-right: 10px;
            }
            .club {
              color: $dodger_blue;
              font-weight: 500;
            }

            .post-detail-info {
              display: inline-block;

              & + .post-detail-info {
                margin-left: 6px;
              }
            }
          }
        }
      }
      .image-wrapper {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        margin-left: 16px;
        width: 94px;
        height: 94px;
      }
    }
    & + .community-list-item {
      border-top: 1px solid #e9e9e9;
    }

    @media screen and (max-width: 330px) {
      .community-link {
        .title-area {
          .post-title {
            &.title_with_img {
              max-width: 173px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              &.is_new {
                max-width: 143px !important;
              }
            }
          }
        }
        .text-area {
          .post-content {
            &.content_with_img {
              max-width: 202px;
            }
          }
        }
        .image-wrapper {
          width: 74px;
          height: 74px;
        }
      }
    }
  }
</style>
