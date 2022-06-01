<template>
  <v-carousel
    class="s-carousel"
    height="148"
    cycle
    next-icon
    prev-icon
    delimiter-icon="$delimiter"
    hide-delimiter-background
    show-arrows-on-hover
  >
    <v-carousel-item v-for="slide_item in slides" :key="slide_item.id">
      <router-link
        class="s-carousel-slide-container-link"
        :to="slide_item.link"
      >
        <div
          class="s-carousel-slide-container"
          :style="`background-image: url(${slide_item.img})`"
        >
          <div class="s-carousel-slide">
            <div class="d-inline-flex align-center s-carousel-slide-tag">
              가이드
            </div>
            <div class="s-carousel-slide-title">{{ slide_item.title }}</div>
            <div class="s-carousel-slide-text" v-html="slide_item.text" />
          </div>
        </div>
      </router-link>
    </v-carousel-item>
  </v-carousel>
</template>

<script>
  export default {
    name: "s-carousel",
    data: () => ({
      slides: [
        {
          id: 0,
          title: "스팟버디 동행날씨 가이드",
          text: "함께 즐기세요! 단 몇 시간의 경기일지라도",
          img: require("@/assets/images/banner_promotion1.png"),
          link: "/about/weather"
        }
      ]
    })
  };
</script>

<style lang="scss">
  .s-carousel .v-carousel__controls {
    justify-content: flex-start;
    padding-left: 16px;

    .v-carousel__controls__item {
      width: 8px !important;
      height: 8px !important;
      margin: 0 8px 0 0;

      .v-icon {
        font-size: 8px !important;
        color: #fff;
        opacity: 1;
      }

      &.v-btn--active {
        background: #65c6ff !important;
        .v-icon {
          opacity: 0;
        }
      }
    }
  }

  .s-carousel-slide-container-link {
    display: inline-block;
    width: 100%;
    height: 100%;
    .s-carousel-slide-container {
      height: 100%;
      background-size: cover;
      background-position: center center;

      .s-carousel-slide {
        height: 100%;
        padding: 20px 15px;
        color: #1e1e1e;

        .s-carousel-slide-tag {
          padding: 0 8px;
          border-radius: 77px;
          height: 16px;
          line-height: 16px;
          font-size: 10px;
          letter-spacing: -0.4px;
          color: #fff;
          background-color: $dodger_blue;
        }

        .s-carousel-slide-title {
          margin-top: 8px;
          height: 25px;
          line-height: 25px;
          font-size: 18px;
          font-weight: 500;
          letter-spacing: -1.08px;
        }

        .s-carousel-slide-text {
          margin-top: 2px;
          font-size: 12px;
          letter-spacing: -0.72px;
          color: #575757;
        }
      }
    }
  }
</style>
