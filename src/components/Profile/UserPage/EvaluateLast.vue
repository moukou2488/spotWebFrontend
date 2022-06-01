<template>
  <section class="evaluate-last">
    <header class="section-title-wrap">
      <h2 class="section-title">최근 동행 평가</h2>
    </header>

    <ul class="last_eval-list">
      <li
        class="last_eval-item"
        v-for="(last_evaluate_item, index) in last_evaluate_list"
        :key="index + '최근 동행 평가'"
      >
        <img
          class="weather-icon"
          :src="last_evaluate_item.weatherIndex | filter_index"
          alt="날씨 아이콘"
        />
        <div class="eval_info">
          <p class="text-top">
            <span class="nickname">
              {{
                last_evaluate_item.nickname
                  | filterd_nickname(last_evaluate_item.anonymous)
              }}
            </span>
            <span class="date">{{ last_evaluate_item.reviewDate }}</span>
          </p>
          <p class="detail-review">{{ last_evaluate_item.review }}</p>
        </div>
      </li>
    </ul>
  </section>
</template>

<script>
  import companyEvaluateWeatherCalculate from "@/assets/scripts/companyEvaluateWeatherCalculate.js";

  export default {
    name: "evaluate-last",
    props: {
      last_evaluate_list: {
        type: Array,
        required: true
      }
    },
    filters: {
      filterd_nickname(nickname, anonymous) {
        if (anonymous) return "익명";
        else return nickname;
      },
      filter_index(weather_point) {
        const result = companyEvaluateWeatherCalculate(weather_point);
        return result.icon_url;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .evaluate-last {
    .section-title-wrap {
      display: flex;
      align-items: center;
      height: 54px;
      padding: 0 14px;
      .section-title {
        font-size: 16px;
        font-weight: 500;
        line-height: 1.25;
        letter-spacing: -0.64px;
        color: #1e1e1e;
      }
    }

    .last_eval-list {
      .last_eval-item {
        display: flex;
        padding: 16px 16px 16px 14px;
        border-top: 1px solid #e9e9e9;
        .weather-icon {
          margin-right: 12px;
          width: 50px;
          height: 50px;
        }
        .eval_info {
          flex: 1;
          .text-top {
            display: flex;
            justify-content: space-between;
            font-weight: 500;
            .nickname {
              font-size: 14px;
              line-height: 19px;
              letter-spacing: -0.56px;
              color: #464646;
            }
            .date {
              font-size: 12px;
              line-height: 18px;
              letter-spacing: -0.72px;
              color: #999;
            }
          }

          .detail-review {
            margin-top: 5px !important;
            max-width: 280px;

            font-size: 12px;
            line-height: 18px;
            letter-spacing: -0.72px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #575757;
          }
          @media screen and (max-width: 330px) {
            .detail-review {
              max-width: 220px;
            }
          }
        }
      }
    }
  }
</style>
