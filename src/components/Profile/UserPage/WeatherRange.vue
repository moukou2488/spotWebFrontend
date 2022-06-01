<template>
  <section class="weather-range">
    <header class="section-header">
      <p class="header-title-wrap">
        <strong class="header-title">동행날씨</strong>
        <!-- ios 에서는 (safari 에서는) :focus 가 없다. -->
        <button class="question-btn" :class="{ focus: is_focus }">
          <img
            class="question-icon"
            :src="require('@/assets/images/ic_question@3x.png')"
            alt="도움말 아이콘"
          />
          <div class="question-info">
            동행날씨는 스팟버디에서 안전한 서비스 환경을 조성하기 위해,
            사용자로부터 받은 평가, 후기, 신고접수 등을 종합해서 만들어진 상호
            평가 제도입니다.
          </div>
        </button>
      </p>
      <span class="weather-icon-text">
        {{ computed_user_weather.icon_text }}
      </span>
    </header>
    <div class="weather-range-wrap">
      <div
        class="weather-range-indicator"
        :style="{ width: `${computed_user_weather_range}%` }"
      ></div>

      <div
        class="weather-pointer"
        :style="{ left: `${computed_user_weather_range}%` }"
      >
        <div class="pointer-wrap">
          <div class="pointer"></div>
        </div>

        <div class="pointer-text-wrap" :class="computed_weather_pointer">
          <div class="ponter-text">
            <span class="sub-text">{{ computed_user_weather.sub_text }}</span>
            <p class="weather-point-info">
              <span class="sub_text">
                {{ computed_user_weather.icon_text }}
              </span>
              <span class="point">{{ user_weather }}</span>
              <span class="percent">%</span>
            </p>
          </div>
          <img
            class="weather-icon"
            :src="computed_user_weather.icon_url"
            alt=""
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import weatherCalculate from "@/assets/scripts/weatherCalculate.js";
  export default {
    name: "weather-range",
    props: {
      user_weather: {
        type: Number,
        required: true
      }
    },
    computed: {
      computed_user_weather_range() {
        if (this.user_weather > 0) {
          if (this.user_weather >= 100) return 100;
          else return this.user_weather - 1;
        } else {
          return 0;
        }
      },
      computed_user_weather() {
        return weatherCalculate(this.user_weather);
      },
      computed_weather_pointer_position() {
        if (this.user_weather >= 50) return "text-right";
        return "text-left";
      },
      computed_weather_pointer() {
        if (this.user_weather >= 80) {
          return "right";
        } else if (this.user_weather < 80 && this.user_weather > 11) {
          return "mid";
        } else {
          return "left";
        }
      }
    },
    data: () => ({
      is_focus: false
    }),
    methods: {
      handle_question_click($event) {
        const event_target = $event.target;

        const question_mark = document.querySelector(".question-btn");
        const question_icon = document.querySelector(".question-icon");

        if (event_target === question_mark || event_target === question_icon) {
          this.is_focus = true;
        } else {
          this.is_focus = false;
        }
      }
    },
    mounted() {
      window.addEventListener("touchstart", this.handle_question_click);
    },
    destroyed() {
      window.removeEventListener("touchstart", this.handle_question_click);
    }
  };
</script>

<style lang="scss" scoped>
  .weather-range {
    height: 151px;
    padding: 0 14px;
    border-bottom: 8px solid #f0f0f0;
    background-color: #fff;
    .section-header {
      position: relative;
      display: flex;
      justify-content: space-between;
      padding: 11px 0 16px;
      .header-title-wrap {
        display: flex;
        align-items: center;
        .header-title {
          color: #1e1e1e;
          font-size: 16px;
          font-weight: 500;
          line-height: 24px;
          letter-spacing: -0.64px;
        }
        .question-btn {
          margin: 2px 0 0 2px;
          .question-icon {
            width: 16px;
            height: 16px;
            vertical-align: top;
          }
          .question-info {
            display: none;
            position: absolute;
            top: 42px;
            left: 0;
            z-index: 1;
            padding: 8px 10px;

            color: #464646;
            font-size: 12px;
            line-height: 18px;
            letter-spacing: -0.24px;
            text-align: left;

            background-color: #d5eeff;
            border-radius: 4px;
            &:before {
              position: absolute;
              top: -8px;
              left: 60px;
              width: 0;
              height: 0;
              border-top: 11px solid #d5eeff;
              border-left: 6px solid transparent;
              border-right: 6px solid transparent;
              transform: rotate(-180deg);
              content: "";
            }
          }
          &.focus {
            .question-info {
              display: block;
            }
          }
        }
      }
      .weather-icon-text {
        color: $dodger_blue;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.56px;
      }
    }

    .weather-range-wrap {
      position: relative;
      margin: 0 4px;
      background-color: #ddf1ff;
      .weather-range-indicator {
        height: 4px;
        border-radius: 50px;
        width: 50%;
        background-image: linear-gradient(
          to right,
          #2f83ba,
          $dodger_blue 21%,
          #5bbeff 41%,
          #6bc4ff 62%,
          #7acaff 81%,
          #acdeff 100%
        );
      }
      .weather-pointer {
        position: absolute;
        top: -5px;
        .pointer-wrap {
          padding: 4px;
          width: 14px;
          height: 14px;
          opacity: 70%;
          background-color: #ddf1ff;
          border-radius: 50%;
          .pointer {
            width: 6px;
            height: 6px;
            background-color: $dodger_blue;
            border-radius: 50%;
          }
        }

        .pointer-text-wrap {
          display: flex;
          align-items: center;
          position: absolute;
          top: 29px;

          &.left {
            left: 10px;
            flex-direction: row-reverse;
            .weather-icon {
              margin-right: 6px;
            }
          }

          &.mid {
            right: -22px;
            .weather-icon {
              margin-left: 6px;
            }
          }

          &.right {
            right: 10px;
            .weather-icon {
              margin-left: 6px;
            }
          }

          .ponter-text {
            white-space: nowrap;
            .sub-text {
              font-size: 12px;
              line-height: 18px;
              letter-spacing: -0.72px;
              text-align: right;
              color: #999;
            }
            .weather-point-info {
              color: $dodger_blue;
              font-weight: 500;
              & > span {
                display: inline-block;
              }
              .sub_text {
                margin-right: 2px;
                font-size: 16px;
                line-height: 24px;
                letter-spacing: -0.32px;
              }
              .point {
                margin-right: 1px;
                font-size: 24px;
                line-height: 33px;
                letter-spacing: -0.96px;
              }
              .percent {
                font-size: 12px;
                line-height: 17px;
              }
            }
          }

          .weather-icon {
            width: 58px;
            height: 58px;
          }
        }
      }
    }
  }
</style>
