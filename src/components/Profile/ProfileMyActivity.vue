<template>
  <section class="profile-my_activity list-wrap">
    <h3 class="profile-home-sub_title">나의 활동</h3>
    <ul class="profile-link-list">
      <li class="profile-link-wrap">
        <router-link to="/profile/my_community_list" class="profile-link">
          <span class="main_text">나의 작성 글</span>
          <div class="icon-wrap">
            <span class="sub_text">{{ my_community_list.length }}</span>
            <img
              class="icon-image"
              :src="require('@/assets/images/btn_arrow_right@3x.png')"
              alt="오른 화살표 아이콘"
            />
          </div>
        </router-link>
      </li>
      <li class="profile-link-wrap">
        <router-link to="/profile/my_community_comment" class="profile-link">
          <span class="main_text">나의 작성 댓글</span>
          <div class="icon-wrap">
            <span class="sub_text">{{ my_community_comment.length }}</span>
            <img
              class="icon-image"
              :src="require('@/assets/images/btn_arrow_right@3x.png')"
              alt="오른 화살표 아이콘"
            />
          </div>
        </router-link>
      </li>
      <li class="profile-link-wrap">
        <router-link to="/profile/my_community_scrap" class="profile-link">
          <span class="main_text">나의 스크랩</span>
          <div class="icon-wrap">
            <span class="sub_text">{{ my_community_scrap.length }}</span>
            <img
              class="icon-image"
              :src="require('@/assets/images/btn_arrow_right@3x.png')"
              alt="오른 화살표 아이콘"
            />
          </div>
        </router-link>
      </li>
    </ul>
  </section>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  export default {
    name: "profile-my-activity",
    computed: {
      ...mapState("profileStore", [
        "my_community_list",
        "my_community_comment",
        "my_community_scrap"
      ])
    },
    methods: {
      ...mapActions("profileStore", [
        "api_get_my_community_list",
        "api_get_my_community_comment",
        "api_get_my_community_scrap"
      ])
    },
    async mounted() {
      await this.api_get_my_community_list();
      await this.api_get_my_community_comment();
      await this.api_get_my_community_scrap();
    }
  };
</script>

<style lang="scss" scoped>
  @import "./ProfileHome.scss";
</style>
