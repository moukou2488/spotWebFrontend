<template>
  <div class="profile-Spot-story list-wrap">
    <h3 class="profile-home-sub_title">SPOT BUDDY 이야기</h3>
    <ul class="profile-link-list">
      <li class="profile-link-wrap">
        <router-link to="/config/notify_list" class="profile-link">
          <span class="main_text">공지사항</span>
          <div class="icon-wrap">
            <img
              class="icon-image"
              :src="require('@/assets/images/btn_arrow_right@3x.png')"
              alt="오른 화살표 아이콘"
            />
          </div>
        </router-link>
      </li>
      <li class="profile-link-wrap">
        <router-link to="/config/question_list" class="profile-link">
          <span class="main_text">자주 묻는 질문</span>
          <div class="icon-wrap">
            <img
              class="icon-image"
              :src="require('@/assets/images/btn_arrow_right@3x.png')"
              alt="오른 화살표 아이콘"
            />
          </div>
        </router-link>
      </li>
      <li class="profile-link-wrap">
        <router-link to="/config/app_info" class="profile-link">
          <span class="main_text">정보</span>
          <div class="icon-wrap">
            <img
              class="icon-image"
              :src="require('@/assets/images/btn_arrow_right@3x.png')"
              alt="오른 화살표 아이콘"
            />
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "profile-Spot-story"
  };
</script>

<style lang="scss" scoped>
  @import "./ProfileHome.scss";
</style>
