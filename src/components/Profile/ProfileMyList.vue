<template>
  <section class="profile-my-list">
    <router-link to="/profile/my_favorite_list">
      <div class="my-item">
        <img
          class="my-item-image"
          :src="require('@/assets/images/btn_profile_favorite@3x.png')"
          alt="나의 관심"
        />
        <span class="my-item-title">나의 관심</span>
        <span class="my-item-count">{{ count_favorite_list }}</span>
      </div>
    </router-link>

    <router-link to="/profile/my_regist_company_list">
      <div class="my-item">
        <img
          class="my-item-image"
          :src="require('@/assets/images/btn_profile_list@3x.png')"
          alt="모집 내역"
        />
        <span class="my-item-title">모집 내역</span>
        <span class="my-item-count">{{ count_regist_company_list }}</span>
      </div>
    </router-link>

    <router-link to="/profile/my_join_company_list">
      <div class="my-item">
        <img
          class="my-item-image"
          :src="require('@/assets/images/btn_profile_people@3x.png')"
          alt="참여 내역"
        />
        <span class="my-item-title">참여 내역</span>
        <span class="my-item-count">{{ count_join_company_list }}</span>
      </div>
    </router-link>
  </section>
</template>

<script>
  import { mapActions, mapGetters } from "vuex";
  export default {
    name: "profile-my-list",
    computed: {
      ...mapGetters("profileStore", [
        "count_favorite_list",
        "count_join_company_list",
        "count_regist_company_list"
      ])
    },
    methods: {
      ...mapActions("profileStore", [
        "get_favorite_company_list",
        "get_join_company_list",
        "get_regist_company_list"
      ])
    },
    async mounted() {
      await this.get_favorite_company_list();
      await this.get_join_company_list();
      await this.get_regist_company_list();
    }
  };
</script>

<style lang="scss" scoped>
  .profile-my-list {
    display: flex;
    justify-content: space-between;
    padding: 20px 34px 16px;
    .my-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      .my-item-image {
        width: 46px;
        height: 46px;
        margin-bottom: 6px;
      }
      .my-item-title {
        display: inline-block;
        margin-bottom: 1px;
        font-size: 14px;
        letter-spacing: -0.56;
        color: #464646;
        font-weight: 500;
      }
      .my-item-count {
        font-size: 12px;
        color: $dodger_blue;
        letter-spacing: -0.24px;
      }
    }
  }
</style>
