<template>
  <nav class="top-bar">
    <!-- main-page 에 쓰이는 top-bar -->
    <div v-if="topbar_type === 'main'" class="top-bar-wrap main">
      <div class="headline-wrap">
        <span class="headline-text">{{ topbar_text }}</span>
      </div>
      <div class="button-wrapper">
        <slot name="search-icon" />
        <!-- 동적 class 할당: on -> 알림-->
        <s-alert-icon />
        <a class="button-link" href="#" @click.prevent="click_profile">
          <img
            class="button-image"
            :src="require('@/assets/images/bt_mypage@3x.png')"
            alt="마이 페이지 아이콘"
          />
        </a>
      </div>
    </div>
    <!-- 뒤로가기 버튼이 있는 top-bar -->
    <div v-else-if="topbar_type === 'back'" class="top-bar-wrap back">
      <div class="button-wrapper left">
        <slot name="back-btn">
          <a class="button-link" href="#" @click.prevent="$router.go(-1)">
            <img
              class="button-image"
              :src="require('@/assets/images/arrow_btn@3x.png')"
              alt="뒤로가기"
            />
          </a>
        </slot>
      </div>
      <div class="headline-wrap">
        <span class="headline-text">{{ topbar_text }}</span>
      </div>
      <div class="button-wrapper right">
        <slot name="top_bar_right" />
      </div>
    </div>
    <!-- x 표시가 있는 top-bar -->
    <div v-else-if="topbar_type === 'x'" class="top-bar-wrap x">
      <div class="button-wrapper left"></div>
      <div class="headline-wrap">
        <span class="headline-text">{{ topbar_text }}</span>
      </div>
      <div class="button-wrapper right">
        <a class="button-link" href="#" @click.prevent="$router.go(-1)">
          <img
            class="button-image"
            :src="require('@/assets/images/close_btn@3x.png')"
            alt="창 닫기"
          />
        </a>
      </div>
    </div>
  </nav>
</template>

<script>
  import SAlertIcon from "./SAlertIcon.vue";

  import { mapGetters } from "vuex";

  export default {
    name: "top-bar",
    components: { SAlertIcon },
    props: {
      topbar_type: {
        type: String,
        default: "main"
      },
      topbar_text: {
        type: String,
        default: "SPOTBUDDY"
      }
    },
    computed: {
      ...mapGetters(["user_info"])
    },
    methods: {
      click_profile() {
        if (this.user_info) {
          this.$router.push("/profile/home");
        } else {
          this.$router.push("/user/sign-in");
        }
      }
    }
  };
</script>

<style lang="scss">
  .top-bar {
    position: fixed;
    z-index: 9;
    top: 0;
    width: 100%;
    height: 48px;
    padding: 0 4px;
    background-color: #fff;
    border-bottom: 1px solid #e9e9e9;

    .button-wrapper {
      display: flex;
      align-items: center;
      min-width: 40px;
      margin: 4px 0;

      .button-link {
        position: relative;
        display: inline-block;
        width: 40px;
        height: 40px;
        &#alert {
          &.on:after {
            position: absolute;
            top: 8px;
            right: 8px;
            width: 6px;
            height: 6px;

            background-color: $dodger_blue;
            border-radius: 100%;
            content: "";
          }
        }

        .button-image {
          width: 100%;
          height: 100%;
        }
      }
    }

    .top-bar-wrap {
      display: flex;
      height: 100%;
      .headline-wrap {
        display: flex;
        align-items: center;
        flex: 1;
      }
      &.main {
        .headline-wrap {
          padding-left: 14px;
          .headline-text {
            font-size: 18px;
            line-height: 21px;
            font-weight: 600;
            letter-spacing: -0.36px;
          }
        }
      }

      &.back,
      &.x {
        .headline-wrap {
          justify-content: center;

          .headline-text {
            font-size: 16px;
            line-height: 24px;
            font-weight: 500;
            letter-spacing: -0.32px;
          }
        }
      }

      &.back {
        .headline-text {
          overflow-x: hidden;
          text-overflow: ellipsis;
          max-width: 260px;
          white-space: nowrap;
        }
      }
      .headline-text {
        color: #373737;
      }
    }
  }
</style>
