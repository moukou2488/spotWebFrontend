<template>
  <section class="config-index">
    <h3 class="list-title">알림</h3>
    <ul class="config-index-list">
      <li class="list-item">
        <router-link to="/config/push_alert" class="item-link">
          <span class="link-text">푸시 알림 설정</span>
          <img
            class="icon-image"
            :src="require('@/assets/images/btn_arrow_right@3x.png')"
            alt="오른 화살표 아이콘"
          />
        </router-link>
      </li>
    </ul>
    <!-- 선택적 접근 권한 요소 삭제 -->
    <!--  -->
    <h3 class="list-title">계정</h3>
    <ul class="config-index-list">
      <li class="list-item">
        <router-link to="/config/block_user" class="item-link">
          <span class="link-text">차단 사용자 관리</span>
          <img
            class="icon-image"
            :src="require('@/assets/images/btn_arrow_right@3x.png')"
            alt="오른 화살표 아이콘"
          />
        </router-link>
      </li>
      <li class="list-item">
        <a href="#" class="item-link" @click.prevent="open_logout_modal">
          <span class="link-text">로그아웃</span>
          <img
            class="icon-image"
            :src="require('@/assets/images/btn_arrow_right@3x.png')"
            alt="오른 화살표 아이콘"
          />
        </a>
      </li>
      <li class="list-item">
        <router-link to="/config/delete_user" class="item-link">
          <span class="link-text">탈퇴하기</span>
          <img
            class="icon-image"
            :src="require('@/assets/images/btn_arrow_right@3x.png')"
            alt="오른 화살표 아이콘"
          />
        </router-link>
      </li>
    </ul>
    <!--  -->
    <h3 class="list-title">서비스 정보</h3>
    <ul class="config-index-list">
      <li class="list-item">
        <p class="item-link">
          <span class="link-text">버전 정보</span>
          <span class="version">1.2.2</span>
        </p>
      </li>
    </ul>
    <!--  -->
    <h3 class="list-title">문의하기</h3>
    <ul class="config-index-list">
      <li class="list-item">
        <a href="#" class="item-link" @click.prevent="native_question_call">
          <span class="link-text">문의하기</span>
          <img
            class="icon-image"
            :src="require('@/assets/images/btn_arrow_right@3x.png')"
            alt="오른 화살표 아이콘"
          />
        </a>
      </li>
    </ul>
  </section>
</template>

<script>
  import { mapActions } from "vuex";

  export default {
    name: "config-index",
    methods: {
      ...mapActions("userStore", ["api_logout"]),
      open_logout_modal() {
        this.$eventBus.$emit("alert", { type: "logout" });
      },
      native_question_call() {
        if (window.webkit) {
          // ios 로그인 call
          window.webkit.messageHandlers.question.postMessage({});
        }
      }
    },
    mounted() {
      // 로그아웃
      this.$eventBus.$on("alert_close", async payload => {
        if (payload.type === "logout") {
          await this.api_logout();
          this.$router.push("/");
          location.reload();
        }
      });
    },
    beforeDestroy() {
      this.$eventBus.$off("alert_close");
    }
  };
</script>

<style lang="scss" scoped>
  .config-index {
    margin-top: 48px;
    .list-title {
      padding: 9px 0 9px 16px;
      font-size: 12px;
      letter-spacing: -0.48px;
      color: #464646;
      font-weight: normal;
    }
    .config-index-list {
      background-color: #fff;
      .list-item {
        .item-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 6px 0 16px;
          width: 100%;
          min-height: 44px;
          .link-text {
            font-size: 14px;
            letter-spacing: -0.56px;
            color: #1e1e1e;
          }
          .icon-image {
            width: 36px;
            height: 36px;
          }
          .version {
            display: inline-block;
            font-size: 14px;
            color: #ccc;
            margin-right: 12px;
          }
        }
        & + .list-item {
          border-top: 1px solid #e9e9e9;
        }
      }
    }
  }
</style>
