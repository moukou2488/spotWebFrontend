<template>
  <footer class="weather-footer">
    <div class="section-header">
      <h2 class="header-title">점수는 어떻게 반영되나요?</h2>
    </div>
    <!--  -->
    <ul class="info-container">
      <li class="info-item">
        <p class="title-text">
          총 평 5가지 날씨
        </p>
        <!--  -->
        <div class="info-wrap">
          <div class="info-text">
            <span class="color-text number">5, 3, 0 ,-3, -5</span>
            <span> (무지개, 맑음, 구름, 흐림, 천둥)</span>
          </div>
        </div>
      </li>
      <li class="info-item">
        <p class="title-text">
          간단평가
        </p>
        <!--  -->
        <div class="info-wrap">
          <div class="info-text">
            <span>
              상세날씨는 점수에 들어가지 않습니다. (맑은 날씨, 흐린 날씨)
            </span>
          </div>
        </div>
      </li>
      <li class="info-item">
        <p class="title-text">
          익명 여부
        </p>
        <!--  -->
        <div class="info-wrap">
          <div class="info-text">
            <span>
              실명으로 평가 작성 시
              <span class="color-text">작성자에게 +2</span>
            </span>
          </div>
          <div class="info-text">
            <span>
              익명으로 평가 작성 시
              <span class="color-text">작성자에게 +1</span>
            </span>
          </div>
        </div>
      </li>
      <li class="info-item">
        <p class="title-text">
          신고하기
        </p>
        <!--  -->
        <div class="info-wrap">
          <div class="info-text">
            <span>
              신고 처리 (접수 아님) 완료 시
              <span class="color-text">-5</span>
            </span>
          </div>
        </div>
      </li>
    </ul>
  </footer>
</template>

<script>
  export default {
    name: "weather-footer"
  };
</script>

<style lang="scss" scoped>
  .weather-footer {
    .section-header {
      padding: 14px 0 16px 16px;
      .header-title {
        color: #1e1e1e;
        font-size: 16px;
        font-weight: 500;
        line-height: 24px;
        letter-spacing: -0.64px;
      }
      border-bottom: 1px solid #e9e9e9;
    }
    .info-container {
      padding: 22px 0 28px 16px !important;
      .info-item {
        display: flex;
        width: 100%;
        .title-text {
          width: 119px;
          color: #575757;
          font-size: 12px;
          font-weight: 500;
        }
        //
        .info-wrap {
          .info-text {
            .color-text {
              color: $dodger_blue;
              &.number {
                font-size: 12px;
                letter-spacing: -0.72px;
              }
            }
            color: #999;
            font-size: 10px;
            letter-spacing: -0.6px;
            line-height: 18px;
          }
        }
        & + .info-item {
          margin-top: 18px;
        }
        @media screen and (max-width: 330px) {
          .title-text {
            width: 82px;
          }
        }
      }
    }
  }
</style>
