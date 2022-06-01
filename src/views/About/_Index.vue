<template>
  <div class="d-flex flex-column">
    <div
      class="about-background-container"
      :style="`background-image: url(${item.image})`"
      v-for="(item, itemIndex) in about_list"
      v-bind:key="itemIndex"
    >
      <div class="about-background">
        <div class="about-circle">{{ item.index }}</div>
        <div class="about-title">{{ item.title }}</div>
        <div class="about-text">{{ item.description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "about",
    data() {
      return {
        about_list: [
          {
            image: require("@/assets/images/about_1.png"),
            index: "01",
            title: "감성적 가치",
            description:
              "여행을 자신의 개성을 표출하는 도구로 활용하는 여행객들에게 기존 테마여행에 직관이라는 특성을 더하여 차별화된 경험 제공하고 있습니다. 또한 SPOT MAP을 SNS로 공유함으로써, 자신을 표출하는 감성적 가치도 제공하고 있습니다."
          },
          {
            image: require("@/assets/images/about_2.png"),
            index: "02",
            title: "경제적 가치",
            description:
              "전문 가이드보다 저렴한 비용으로 투어 파트너의 현지화된 특색 있는 투어 및 체험이 가능하여 경제적 가치를 제공하고 있습니다. 뿐만 아니라, 경기 티켓까지 포함된 투어를 제공함으로써 경제적 효율성을 높이고 있습니다."
          },
          {
            image: require("@/assets/images/about_3.png"),
            index: "03",
            title: "사회적 가치",
            description:
              "투어 파트너에게 수익창출의 기회 마련 및 시장 진입의 편리성을 제공하고 있습니다. 또한 스팟은 성장 및 발전의 장의 역할도 수행하며 투어 파트너들에게 인적네트워크 확대 기회도 제공하고 있습니다."
          }
        ]
      };
    }
  };
</script>

<style lang="scss" scoped>
  .about-background-container {
    background-position: center center;
    background-size: cover;
    height: 218px;
    & + .about-background-container {
      margin-top: 8px;
    }

    .about-background {
      height: 100%;
      padding-top: 20px;
      background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.61) -7%,
        rgba(0, 0, 0, 0.247) 103%
      );
      color: #fff;

      .about-circle {
        width: 48px;
        height: 16px;
        margin-left: 15px;
        border-radius: 50px;
        border: solid 1px #fff;
        text-align: center;
        line-height: 16px;
        font-weight: 700px;
        font-size: 10px;
      }

      .about-title {
        height: 25px;
        line-height: 25px;
        padding: 0 15px;
        margin-top: 33px;
        font-weight: 700;
        font-size: 22px;
        letter-spacing: -0.44px;
      }

      .about-text {
        font-size: 12px;
        font-weight: 400;
        letter-spacing: -0.48px;
        margin-top: 16px;
        padding-left: 15px;
        padding-right: 66px;
        line-height: 1.67;
      }
    }
  }
</style>
