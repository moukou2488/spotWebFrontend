<template>
  <nav class="stamp-write-top-bar top-bar">
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
        <span class="headline-text">나의 버디 일기 쓰기</span>
      </div>
      <div class="button-wrapper right" @click="check_uploading">완료</div>
    </div>
  </nav>
</template>

<script>
  import { mapState, mapActions, mapMutations } from "vuex";
  export default {
    name: "stamp-write-top-bar",
    data: () => ({
      is_uploading: false
    }),
    computed: {
      ...mapState("stampStore", [
        "modify_stamp_id",
        "stamp_diary",
        "stamp_count",
        "stamp_game",
        "stamp_photo",
        "stamp_exists"
      ])
    },
    methods: {
      ...mapActions("modalStore", ["config_toast_show"]),
      ...mapActions("communityStore", ["api_community_content_check"]),
      ...mapActions("stampStore", ["api_stamp_upload", "api_stamp_modify"]),
      ...mapMutations("companyWriteStore", ["clear_tourInfo"]),
      ...mapMutations("stampStore", ["clear_state"]),
      // 로딩중인지 확인
      check_uploading() {
        if (this.is_uploading) {
          this.config_toast_show("업로드 중입니다.");
        } else this.call_api_stamp_upload();
      },
      async call_api_stamp_upload() {
        this.is_uploading = true;
        // 내용 검증
        if (this.stamp_diary === "" || this.stamp_diary.trim().length === 0) {
          this.is_uploading = false;
          return this.config_toast_show("내용을 입력해주세요.");
        }

        // 횟수 검증
        if (
          this.stamp_exists.countExists === true &&
          (this.stamp_count === "" || this.stamp_count === 0)
        ) {
          this.is_uploading = false;
          return this.config_toast_show("횟수를 입력해주세요.");
        }

        // 경기 검증
        if (
          this.stamp_exists.gameExists === true &&
          this.stamp_game.homeTeam === ""
        ) {
          this.is_uploading = false;
          return this.config_toast_show("경기를 선택해주세요.");
        }

        // 사진 검증
        if (this.stamp_photo.url === null) {
          this.is_uploading = false;
          return this.config_toast_show("사진을 선택해주세요.");
        }

        // 욕설 확인
        const response = await this.api_community_content_check({
          title: "",
          content: this.stamp_diary
        });
        if (response.badWordsIn) {
          this.is_uploading = false;
          return this.config_toast_show(
            "욕설/비속어 포함된 게시글은 업로드 할 수 없습니다."
          );
        }
        if (!this.modify_stamp_id) {
          // 작성
          const response = await this.api_stamp_upload();
          this.$router.push(`/stamp/detail/${response.data.diaryId}`);
        } else {
          // 수정
          const response = await this.api_stamp_modify();
          this.$router.push(`/stamp/detail/${response.data.diaryId}`);
        }
        this.clear_tourInfo();
        this.clear_state();
      }
    },
    beforeDestroy() {
      this.clear_tourInfo();
    }
  };
</script>

<style lang="scss">
  .stamp-write-top-bar {
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
