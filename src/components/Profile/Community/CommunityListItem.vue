<template>
  <li class="community-list-item">
    <router-link
      class="community-link"
      :to="
        `/community/detail/${community_list_item.teamIndex}/${community_list_item.id}`
      "
    >
      <div
        class="text-area"
        :class="{ with_photo: community_list_item.photoUrl }"
      >
        <strong class="post-title">{{ community_list_item.title }}</strong>
        <p class="post-content">{{ community_list_item.content }}</p>
        <p class="post-footer">
          <span class="club">{{ computed_club_name }}</span>
          <span class="date">{{ community_list_item.postsDate }}</span>
          <span class="post-detail-info">
            조회 {{ community_list_item.viewCount }}
          </span>
          <span class="post-detail-info">
            댓글 {{ community_list_item.commentCount }}
          </span>
        </p>
      </div>
      <div v-if="community_list_item.photoUrl" class="image-wrapper">
        <img
          v-show="image_onload"
          :ref="`thumbnail_image_${community_list_item.id}`"
          :style="image_size"
          class="thumbnail-image"
          :src="community_list_item.photoUrl"
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
    name: "community-list-item",
    props: {
      community_list_item: {
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
      }
    },
    data: () => ({ image_size: {}, image_onload: false }),
    computed: {
      computed_club_name() {
        return clubCalculate(this.community_list_item.teamIndex);
      }
    },
    mounted() {
      const img = new Image();
      img.src = this.community_list_item.photoUrl;
      img.onload = () => {
        this.image_onload = true;
        const image = this.$refs[
          `thumbnail_image_${this.community_list_item.id}`
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
  .community-list-item {
    .community-link {
      display: flex;
      padding: 18px 14px;
      .text-area {
        flex: 1;
        .post-title {
          display: inline-block;
          margin-bottom: 12px;
          max-width: 350px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          color: #1e1e1e;
          font-size: 16px;
          font-weight: 500;
          letter-spacing: -0.96px;
        }
        .post-content {
          margin-bottom: 4px !important;
          height: 41px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: pre-line;
          max-width: 300px;

          color: #464646;
          font-size: 12px;
          line-height: 20px;
          letter-spacing: -0.48px;
        }

        &.with_photo {
          .post-title {
            max-width: 237px;
          }
          .post-content {
            max-width: 237px;
          }
        }

        .post-footer {
          display: flex;
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
            width: auto;
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

        .thumbnail-image {
          vertical-align: top;
        }
      }
    }
    & + .community-list-item {
      border-top: 1px solid #e9e9e9;
    }

    @media screen and (max-width: 330px) {
      .community-link {
        .text-area {
          .post-title {
            max-width: 290px;
          }
          .post-content {
            max-width: 290px;
          }
          &.with_photo {
            .post-title {
              max-width: 202px;
            }
            .post-content {
              max-width: 202px;
            }
          }
        }
        .image-wrapper {
          width: 74px;
          height: 74px;
          margin-left: 10px;
        }
      }
    }
  }
</style>
