<template>
  <li class="community-popular-item">
    <router-link
      :to="
        `/community/detail/${community_popular_item.teamIndex}/${community_popular_item.id}`
      "
      class="community-link"
    >
      <div class="community-popular-rank not-kr">
        {{ _.padStart(index + 1, 2, "0") }}
      </div>
      <div class="text-area">
        <strong class="post-title">{{ community_popular_item.title }}</strong>
        <p class="post-content">{{ community_popular_item.content }}</p>
        <p class="post-footer">
          <span class="club">{{ computed_club_name }}</span>
          <span class="post-detail-info">
            조회
            <span class="not-kr">{{ community_popular_item.viewCount }}</span>
          </span>
          <span class="post-detail-info">
            댓글
            <span class="not-kr">
              {{ community_popular_item.commentCount }}
            </span>
          </span>
        </p>
      </div>
      <div v-if="community_popular_item.photoUrl" class="image-wrapper">
        <img
          v-show="image_onload"
          :ref="`thumbnail_image_${community_popular_item.id}`"
          :style="image_size"
          class="thumbnail-image"
          :src="community_popular_item.photoUrl"
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
  import clubCalculate from "@/assets/scripts/clubCalculate.js";
  import { img_ratio_calculate } from "@/assets/scripts/imageCalculate.js";

  export default {
    name: "community-popular-item",
    props: {
      community_popular_item: {
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
    computed: {
      computed_club_name() {
        return clubCalculate(this.community_popular_item.teamIndex);
      }
    },
    data: () => ({
      image_size: {},
      image_onload: false
    }),
    methods: {
      computed_club(teamIndex) {
        return clubCalculate(teamIndex);
      }
    },
    mounted() {
      const img = new Image();
      img.src = this.community_popular_item.photoUrl;
      img.onload = () => {
        this.image_onload = true;
        const image = this.$refs[
          `thumbnail_image_${this.community_popular_item.id}`
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
  .community-popular-item {
    .community-link {
      display: flex;
      padding: 18px 14px 0;
      .community-popular-rank {
        min-width: 20px;
        height: 27px;
        font-size: 18px;
        font-weight: 500;
        letter-spacing: -0.72px;
        color: #42b4ff;
      }
      .text-area {
        flex: 1;
        padding-left: 6px;
        .post-title {
          display: inline-block;
          margin-bottom: 2px;
          max-width: 213px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #1e1e1e;
          font-size: 16px;
          font-weight: 500;
          letter-spacing: -0.96px;
        }
        .post-content {
          margin-bottom: 5px !important;
          height: 41px;
          max-height: 41px;
          max-width: 300px;
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
            font-weight: 400;
            & + .post-detail-info {
              margin-left: 6px;
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
        .text-area {
          .post-title {
            max-width: 171px;
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
