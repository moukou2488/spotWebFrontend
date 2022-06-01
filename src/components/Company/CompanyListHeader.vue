<template>
  <header class="company-list-header">
    <div class="list-header-wrap">
      <p class="list-header-title">함께 할 동행을 구해보세요!</p>
    </div>
    <div class="list-header-body">
      <p class="list-header-body-text">
        하단의 플러스 버튼을 통해 동행 모집 글을 작성할 수 있습니다.
      </p>
    </div>
    <!--  -->
    <swiper class="list-order-swiper" :options="swiper_option">
      <swiper-slide
        v-for="order_item in order_list"
        :key="order_item.id"
        class="list-order-wrap"
        :class="{ active: company_list_order == order_item.type }"
      >
        <a
          href="#"
          class="list-order-btn"
          @click.prevent="change_company_list_order(order_item.type)"
          >{{ order_item.text }}
        </a>
      </swiper-slide>
    </swiper>
  </header>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  export default {
    name: "company-list-header",
    computed: {
      ...mapState("companyStore", ["company_list_order"]),
      ...mapState("userStore", ["user_info"])
    },
    data: () => ({
      order_list: [
        {
          id: 0,
          type: "latest",
          text: "등록일순"
        },
        {
          id: 1,
          type: "popular",
          text: "관심순"
        },
        {
          id: 2,
          type: "gender",
          text: "내 성별 모집만"
        },
        {
          id: 3,
          type: "age",
          text: "내 연령대 모집만"
        },
        {
          id: 4,
          type: "weather",
          text: "동행 날씨 맑은순"
        },
        {
          id: 5,
          type: "end",
          text: "모집마감일순"
        }
      ],
      swiper_option: {
        slidesPerView: "auto",
        freeMode: true,
        spaceBetween: 4
      }
    }),
    methods: {
      ...mapActions("companyStore", ["get_tour_list"]),
      ...mapActions("modalStore", ["config_toast_show"]),
      change_company_list_order(order_type) {
        if (order_type === "gender" || order_type === "age") {
          if (this.user_info === null) {
            this.config_toast_show("로그인이 필요한 기능입니다.");
            return;
          }
        }
        this.get_tour_list(order_type);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .company-list-header {
    padding-top: 18px;
    .list-header-wrap {
      display: flex;
      width: 100%;
      height: 21px;
      margin-bottom: 6px;
      justify-content: space-between;
      align-items: center;
      .list-header-title {
        font-size: 15px;
        line-height: 21px;
        font-weight: bold;
        letter-spacing: -0.6px;
      }
    }
    .list-header-body {
      font-size: 12px;
      color: #999;
      letter-spacing: -0.48px;
      margin-bottom: 15px;
      .list-header-body-text {
        padding-top: 2px;
      }
    }

    .list-order-swiper {
      margin-bottom: 16px;
      .list-order-wrap {
        display: inline-flex;
        width: auto !important;
        height: 24px;
        padding: 0 11px;
        align-items: center;
        border: 1px solid #e0e0e0;
        border-radius: 20px;
        &.active {
          background-color: $dodger_blue;
          color: #fff !important;
          border-color: $dodger_blue;
        }

        .list-order-btn {
          line-height: 26px;
          font-size: 12px;
          letter-spacing: -0.6px;

          &:first-child + .division {
            display: inline-block;
            width: 1px;
            height: 10px;
            margin: 0 6px;
            background-color: #c2c2c2;
          }
        }
      }
    }
  }
</style>
