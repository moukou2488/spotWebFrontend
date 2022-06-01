<template>
  <li class="stamp-list-item">
    <router-link
      class="stamp-detail-link"
      :to="`/stamp/detail/${stamp_item.diaryId}`"
    >
      <div class="image-wrapper">
        <img
          v-show="image_load"
          class="background-photo"
          :src="stamp_item.photoUrl"
          alt="버디 일기 이미지"
        />
        <v-skeleton-loader
          v-show="!image_load"
          width="100%"
          height="114"
          type="image"
        />
      </div>
      <div class="like-count">
        <a
          class="footer--like-link"
          href="#"
          @click.prevent="toggle_scrap(stamp_item.diaryId)"
        >
          <img
            class="like--btn"
            width="20"
            height="20"
            :src="
              is_like === true
                ? require('@/assets/images/ic_recommended_active@3x.png')
                : require('@/assets/images/ic_recommended@3x.png')
            "
            alt="좋아요 버튼"
          />
          <span class="like--count">{{ like_count }}</span>
        </a>
      </div>
    </router-link>
  </li>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  export default {
    name: "stamp-list-item",
    props: {
      stamp_item: {
        type: Object,
        requred: true,
        default() {
          return {
            diaryId: Number,
            diaryContent: String,
            nickname: String,
            photoUrl: String,
            watchCount: Number,
            likeCount: Number,
            location: String,
            gameDate: String,
            homeTeam: String,
            awayTeam: String,
            publicStatus: Boolean,
            logoExists: Boolean,
            countExists: Boolean,
            gameExists: Boolean
          };
        }
      }
    },
    computed: { ...mapState("userStore", ["user_info"]) },
    data: () => ({
      image_load: false,
      is_like: false,
      like_count: 0
    }),
    methods: {
      ...mapActions("stampStore", [
        "api_stamp_like_check",
        "api_stamp_like",
        "api_stamp_cancle_like"
      ]),
      async toggle_scrap(diaryId) {
        if (this.is_like) {
          await this.api_stamp_cancle_like(diaryId);
          this.is_like = false;
          this.like_count--;
        } else {
          await this.api_stamp_like(diaryId);
          this.is_like = true;
          this.like_count++;
        }
      }
    },
    async mounted() {
      const img = new Image();
      img.src = this.stamp_item.photoUrl;
      img.onload = () => {
        this.image_load = true;
      };

      if (this.user_info) {
        const is_like = await this.api_stamp_like_check(
          this.stamp_item.diaryId
        );

        this.is_like = is_like;
      }

      this.like_count = this.stamp_item.likeCount;
    }
  };
</script>

<style lang="scss" scoped>
  .stamp-list-item {
    position: relative;
    margin: 0 1% 2px;
    flex-basis: 31%;

    .stamp-detail-link {
      display: inline-block;
      width: 100%;
      height: 114px;

      .image-wrapper {
        width: 100%;
        height: 100%;

        .background-photo {
          width: 100%;
          height: 100%;
          border-radius: 4px;
        }
      }
      //
      .like-count {
        position: absolute;
        right: 6px;
        bottom: 8px;
        display: inline-flex;
        align-items: center;
        .footer--like-link {
          display: flex;
          align-items: center;
          .like--count {
            display: inline-block;
            margin-left: 2px;
            font-size: 12px;
            color: #f0f0f0;
            letter-spacing: -0.12px;
          }
        }
      }
    }
  }
</style>
