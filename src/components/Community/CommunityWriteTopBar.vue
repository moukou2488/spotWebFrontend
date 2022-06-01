<template>
  <nav class="community-write-top-bar top-bar">
    <div class="top-bar-wrap x">
      <div class="button-wrapper left">
        <a class="button-link" href="#" @click.prevent="$router.go(-1)">
          <img
            class="button-image"
            :src="require('@/assets/images/close_btn@3x.png')"
            alt="창 닫기"
          />
        </a>
      </div>
      <div class="headline-wrap">
        <span class="headline-text">{{ topbar_text }}</span>
      </div>
      <div class="button-wrapper right" @click="community_upload">완료</div>
    </div>
  </nav>
</template>

<script>
  import { mapState } from "vuex";
  export default {
    name: "community-write-top-bar",
    methods: {
      community_upload() {
        this.$emit("community_upload");
      }
    },
    computed: {
      ...mapState("communityStore", ["modify_community_id", "community_team"]),
      topbar_text() {
        return this.modify_community_id ? "수정하기" : "글쓰기";
      }
    }
  };
</script>

<style lang="scss">
  .community-write-top-bar {
    .right {
      width: 48px;
      height: 40px;
      margin: 4px 8px 4px 0;
      font-size: 14px;
      letter-spacing: -0.56px;
      justify-content: center;
      color: #373737;
    }
  }
</style>
