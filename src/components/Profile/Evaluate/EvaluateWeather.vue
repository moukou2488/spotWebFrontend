<template>
  <section class="evaluate-weather">
    <div class="section-title-wrap">
      <h2 class="section-title">{{ user_nick }}님의 동행날씨는?</h2>
      <img
        class="required-image"
        :src="require('@/assets/images/required_star@3x.png')"
        alt="필수표시"
      />
    </div>

    <div class="weahter-choice-wrap">
      <div
        class="weather-choice-card"
        v-for="(weather, index) in weather_list"
        :key="weather.hangle_text"
      >
        <a href="#" class="image-wrap" @click.prevent="check_weather(index)">
          <img
            v-if="reverse_evaluate_weather_index === index"
            class="image-icon checked"
            :src="require('@/assets/images/Btn_agree_active_sky3x.png')"
            alt="날씨 아이콘"
          />
          <img
            class="image-icon"
            :src="weather.profile_url"
            alt="날씨 아이콘"
          />
        </a>
        <p class="weather-text">{{ weather.hangle_text }}</p>
      </div>
    </div>
  </section>
</template>

<script>
  import { mapGetters, mapMutations } from "vuex";
  export default {
    name: "evaluate-weather",
    props: {
      user_nick: {
        type: String,
        required: true
      }
    },
    computed: {
      ...mapGetters("profileStore", ["reverse_evaluate_weather_index"]),
      computed_weather_index() {
        let return_point;
        switch (this.checked) {
          case 0:
            return_point = 5;
            break;
          case 1:
            return_point = 3;
            break;
          case 2:
            return_point = 0;
            break;
          case 3:
            return_point = -3;
            break;
          case 4:
            return_point = -5;
            break;
          default:
            return_point = 999;
            break;
        }
        return return_point;
      }
    },
    data: () => ({
      weather_list: [
        {
          hangle_text: "무지개",
          profile_url: require("@/assets/images/profile_weather_sky.png")
        },
        {
          hangle_text: "맑음",
          profile_url: require("@/assets/images/profile_weather_sun.png")
        },
        {
          hangle_text: "구름",
          profile_url: require("@/assets/images/profile_weather_cloud.png")
        },
        {
          hangle_text: "흐림",
          profile_url: require("@/assets/images/profile_weather_rainy.png")
        },
        {
          hangle_text: "천둥",
          profile_url: require("@/assets/images/profile_weather_thunder.png")
        }
      ],
      checked: null
    }),
    methods: {
      ...mapMutations("profileStore", ["set_evaluate_weather_index"]),
      check_weather(index) {
        this.checked = index;
        this.set_evaluate_weather_index(this.computed_weather_index);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .evaluate-weather {
    padding: 0 24px;
    background-color: #fafafa;
    .section-title-wrap {
      display: flex;
      align-items: center;
      .section-title {
        padding: 18px 0;
        color: #464646;
        font-size: 15px;
        font-weight: 500;
        line-height: 1.33;
        letter-spacing: -0.6px;
        white-space: nowrap;
      }
      .required-image {
        margin-left: 2px;
        width: 9px;
        height: 21px;
      }
    }

    .weahter-choice-wrap {
      display: flex;
      justify-content: space-between;
      padding-bottom: 20px;
      .weather-choice-card {
        .image-wrap {
          position: relative;
          display: inline-block;
          width: 40px;
          height: 40px;
          .image-icon {
            width: 100%;
            height: 100%;

            &.checked {
              position: absolute;
            }
          }
        }
        .weather-text {
          margin-top: 9px !important;

          font-size: 13px;
          line-height: 1.38;
          letter-spacing: -0.52px;
          text-align: center;
          color: #797979;
        }
      }
    }
  }
</style>
