<template>
  <nav class="profile-top-bar top-bar">
    <div class="top-bar-wrap main">
      <div class="headline-wrap">
        <span class="headline-text">{{ topbar_text }}</span>
      </div>
      <div class="button-wrapper">
        <router-link class="button-link" to="/config/home">
          <img
            class="button-image"
            :src="require('@/assets/images/btn_config@3x.png')"
            alt="설정 아이콘"
          />
        </router-link>
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
  export default {
    props: {
      topbar_text: {
        type: String,
        require: true
      }
    }
  };
</script>

<style lang="scss" scoped>
  .headline-text {
    font-size: 17px !important;
  }
  @media screen and (max-width: 330px) {
    .profile-top-bar {
      .top-bar-wrap {
        .headline-wrap {
          .headline-text {
            // 닉네임이 너무 긴 경우 예외처리
            font-size: 13px !important;
          }
        }
      }
    }
  }
</style>
