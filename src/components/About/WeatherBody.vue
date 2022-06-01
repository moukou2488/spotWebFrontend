<template>
  <section class="weather-body">
    <div class="what_is_weather">
      <div class="section-header">
        <h2 class="header-title">동행날씨란?</h2>
        <div class="tag-wrap">
          <div class="tag">안전한 여행</div>
          <div class="tag">매너있는 여행</div>
        </div>
      </div>
      <!--  -->
      <p class="info-wrap">
        동행날씨는 스팟버디에서<span class="dodger">
          안전한 서비스 환경을 조성하기 위해, 사용자로부터 받은 평가, 후기,
          신고접수 등을 종합해서 만들어진 상호 평가 제도</span
        >입니다.<br />
        동행날씨 평가, 평가 작성 방법 (익명/실명), 신고와 차단에 할당된 점수
        배점 시스템을 통해 동행날씨 지수가 계산됩니다. 동행날씨는 50%(구름)부터
        시작합니다.
      </p>
    </div>
    <!--  -->
    <div class="ppt_weather">
      <ul class="weather-list">
        <li
          v-for="weather_item in weather_list"
          :key="weather_item.id"
          class="weather-list-item"
        >
          <div class="weather-img-wrap">
            <img
              class="weather-img"
              :src="weather_item.img"
              alt="날씨 이미지"
            />
          </div>
          <div class="weather-info-wrap">
            <div class="main-info">
              <p class="percent-wrap">
                <span class="number">{{ weather_item.percentage_min }}</span>
                <span class="percentage">%</span>
                <span class="division">-</span>
                <span class="number">{{ weather_item.percentage_max }}</span>
                <span class="percentage">%</span>
              </p>
              <span class="weather-nick">{{ weather_item.nick }}</span>
              <span class="weather-text">{{ weather_item.text }}</span>
            </div>
            <p class="sub-text">
              {{ weather_item.sub_text }}
            </p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
  export default {
    name: "weather-body",
    data: () => ({
      weather_list: [
        {
          id: 0,
          img: require("@/assets/images/profile_weather_sky.png"),
          percentage_min: 81,
          percentage_max: 100,
          nick: "무지개",
          text: "오늘의 날씨 무지개 등장!",
          sub_text: "무지개처럼 동행에 좋은 기억을 가져다 줄 버디랍니다"
        },
        {
          id: 1,
          img: require("@/assets/images/profile_weather_sun.png"),
          percentage_min: 61,
          percentage_max: 80,
          nick: "맑음",
          text: "오늘의 날씨 맑음",
          sub_text: "구름 한점 없는 맑은 하늘처럼 매너 있고 센스가 있어요 "
        },
        {
          id: 2,
          img: require("@/assets/images/profile_weather_cloud.png"),
          percentage_min: 41,
          percentage_max: 60,
          nick: "구름",
          text: "오늘의 날씨 포근",
          sub_text: "설렘을 안고 동행을 만날 준비를 하고 있는 버디랍니다"
        },
        {
          id: 3,
          img: require("@/assets/images/profile_weather_rainy.png"),
          percentage_min: 21,
          percentage_max: 40,
          nick: "흐림",
          text: "오늘의 날씨 흐림",
          sub_text: "매너 있는 멋쟁이 버디가 되기 위한 노력이 필요해요"
        },
        {
          id: 4,
          img: require("@/assets/images/profile_weather_thunder.png"),
          percentage_min: 0,
          percentage_max: 20,
          nick: "천둥",
          text: "오늘의 날씨 우르르쾅쾅",
          sub_text: "아무래도 올해 산타를 만나긴 어렵겠어요..."
        }
      ]
    })
  };
</script>

<style lang="scss" scoped>
  .weather-body {
    .what_is_weather {
      .section-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 13px 14px 13px 16px;
        border-bottom: 1px solid #e9e9e9;
        .header-title {
          color: #1e1e1e;
          font-size: 16px;
          font-weight: 500;
          line-height: 24px;
          letter-spacing: -0.64px;
        }
        .tag-wrap {
          display: flex;
          .tag {
            padding: 5px 17px;

            color: #5dbfff;
            font-size: 12px;
            line-height: 18px;
            letter-spacing: -0.48px;
            text-align: center;
            border: 1px solid #5dbfff;
            border-radius: 30px;
            & + .tag {
              margin-left: 6px;
            }
          }
        }
      }
      .info-wrap {
        padding: 20px 16px !important;
        font-size: 12px;
        line-height: 24px;
        letter-spacing: -0.72px;
        color: #575757;
        .dodger {
          color: $dodger_blue;
        }
      }
      border-bottom: 8px solid #f0f0f0;
    }
    //
    .ppt_weather {
      padding: 24px 0 !important;
      .weather-list {
        .weather-list-item {
          display: flex;
          padding-left: 18px;
          .weather-img-wrap {
            width: 72px;
            height: 72px;
            margin-right: 15px;
            .weather-img {
              width: 100%;
              height: 100%;
            }
          }
          .weather-info-wrap {
            display: flex;
            flex-direction: column;
            justify-content: center;
            .main-info {
              display: flex;
              align-items: flex-end;
              .percent-wrap {
                display: flex;
                align-items: center;
                color: $dodger_blue;
                font-weight: 500;

                .number {
                  font-size: 18px;
                  letter-spacing: -0.36px;
                }
                .division {
                  display: inline-block;
                  margin: 0 2px;
                }
                .percentage {
                  align-self: flex-end;
                  display: inline-block;
                  margin-bottom: 3px;
                  font-size: 10px;
                }
              }
              .weather-nick {
                display: inline-block;
                margin-left: 8px;
                font-size: 14px;
                font-weight: 500;
                letter-spacing: -0.56px;
                color: #575757;
              }
              .weather-text {
                display: inline-block;
                margin-left: 4px;
                font-size: 12px;
                letter-spacing: -0.72px;
                color: #575757;
              }
              @media screen and (max-width: 330px) {
                display: unset;
                .weather-nick {
                  margin: 0;
                }
              }
            }
            .sub-text {
              margin-top: 4px !important;
              font-size: 10px;
              letter-spacing: -0.6px;
              color: #636363;
            }
          }
          & + .weather-list-item {
            margin-top: 28px;
          }
        }
      }
      border-bottom: 8px solid #f0f0f0;
    }
  }
</style>
