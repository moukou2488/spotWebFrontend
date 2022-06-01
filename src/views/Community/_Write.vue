<template>
  <div class="community-write view">
    <community-write-top-bar @community_upload="check_uploading" />
    <div
      class="d-flex flex-column flex-shrink-0 flex-grow-1  community_write_main"
    >
      <div class="community_write_category_wapper pd-row-14">
        <div class="community_write_category_label">
          카테고리 선택
        </div>
        <v-select
          :items="category"
          v-model="postInfo.category"
          dense
          outlined
          single-line
          :menu-props="{ auto: true, offsetY: true }"
          placeholder="선택해주세요"
          hide-details
          height="44"
        ></v-select>
      </div>
      <div>
        <input
          v-model="postInfo.title"
          placeholder="제목을 입력하세요."
          class="community_write_title"
          maxlength="75"
        />
      </div>
      <div class="d-flex justify-center community_write_content_wrapper">
        <div v-if="placeholder_show" class="placeholder">
          {{ placeholder }}
        </div>
        <textarea
          v-model="postInfo.content"
          class="community_write_content"
          @focus="control_placeholder(true)"
          @blur="control_placeholder(false)"
        ></textarea>
      </div>

      <!-- 이미지 미리보기 스와이퍼 -->
      <write-image-swipter-container
        v-if="previewImage.length"
        @image_delete="delete_image"
        :image_list="previewImage"
      />
    </div>

    <s-toast :where="'bottom-bar'" />

    <footer class="community_write_footer">
      <div class="empty-checkbox-wrap">
        <input
          v-model="postInfo.isAnonymous"
          id="isAnonymous"
          class="anonymous-wrap empty-checkbox"
          type="checkbox"
        />
        <label for="isAnonymous" class="empty-label">익명</label>
      </div>
      <div class="community_write_photo">
        <label
          @click.prevent="img_click"
          class="image-label"
          for="profile_image"
        >
          <img
            class="icnon-image"
            :src="require('@/assets/images/ic_camera_gray@3x.png')"
            alt="카메라 아이콘"
          />
        </label>
        <input
          id="profile_image"
          accept="image/*"
          multiple="multiple"
          ref="image"
          class="d-none"
          type="file"
          @input="pickFile"
        />
      </div>
    </footer>
  </div>
</template>

<script>
  import CommunityWriteTopBar from "@/components/Community/CommunityWriteTopBar.vue";
  import SToast from "@/components/Common/SToast.vue";
  import WriteImageSwipterContainer from "@/components/Community/WriteImageSwipterContainer.vue";

  import { mapActions, mapMutations, mapState } from "vuex";

  export default {
    name: "community-write",
    components: { CommunityWriteTopBar, SToast, WriteImageSwipterContainer },
    computed: {
      ...mapState("communityStore", [
        "community_team",
        "team_detail",
        "filter_index",
        "modify_community_id"
      ])
    },
    data: () => ({
      filters: ["전체 글", "자유", "경기", "사진", "선수", "뉴스"],
      category: [
        { text: "자유", value: 0 },
        { text: "경기", value: 1 },
        { text: "사진", value: 2 },
        { text: "선수", value: 3 },
        { text: "뉴스", value: 4 }
      ],
      postInfo: {
        content: "",
        multipartFile: [],
        deleteFileNames: []
      },
      previewImage: [], // 업로드 될 사진들
      placeholder: `**커뮤니티 이용규칙**

  1. 타인비방 및 과도한 비속어 남용을 금지하고 있어요.
  2. 법률에 반하는 온라인 상 금전거래는 금지하고 있어요.
  3. 게시물과 댓글 등 커뮤니티 내부의 저작권은 작성한 이용자 및 회원에게 있어요.
  4. 개인정보 공유 및 침해를 금지하고 있어요.
  5. 스팟버디가 안내한 부적절한 내용이 담긴 게시물 혹은 댓글은 예고없이 비공개처리 혹은 삭제될 수 있어요.

  자세한 내용의 커뮤니티 이용규칙은 공지사항을 통해 확인할 수 있습니다. 이용자 및 회원의 해당 이용규칙 미확인으로 인해 발생하는 문제에 대해 당사는 책임이 없음을 명시합니다. `,
      placeholder_show: true,
      is_uploading: false
    }),
    methods: {
      ...mapMutations("communityStore", ["set_modify_community_id"]),
      ...mapActions("communityStore", [
        "api_community_upload",
        "api_community_modify",
        "api_community_content_check"
      ]),
      ...mapActions("modalStore", ["config_toast_show"]),
      // 로딩중인지 확인
      check_uploading() {
        if (this.is_uploading) {
          this.config_toast_show("업로드 중입니다.");
        } else this.call_api_community_upload();
      },
      async call_api_community_upload() {
        this.is_uploading = true;
        this.postInfo.teamIndex = this.community_team.team_idx;

        // 카테고리 검증
        if (this.postInfo.category == null) {
          this.is_uploading = false;
          return this.config_toast_show("카테고리를 선택해주세요.");
        }

        // 제목 검증
        if (
          this.postInfo.title == null ||
          this.postInfo.title.trim().length == 0
        ) {
          this.is_uploading = false;
          return this.config_toast_show("제목을 입력해주세요.");
        }

        // 내용 검증
        if (
          this.postInfo.content == null ||
          this.postInfo.content.trim().length == 0
        ) {
          this.is_uploading = false;
          return this.config_toast_show("내용을 입력해주세요.");
        }

        // 욕설 확인
        const response = await this.api_community_content_check(this.postInfo);
        if (response.badWordsIn) {
          this.is_uploading = false;
          return this.config_toast_show(
            "욕설/비속어 포함된 게시글은 업로드 할 수 없습니다."
          );
        }

        if (!this.modify_community_id) {
          // 작성
          const response = await this.api_community_upload(this.postInfo);
          this.$router.push(
            `/community/detail/${this.community_team.team_idx}/${response.data.id}`
          );
        } else {
          // 수정
          await this.api_community_modify(this.postInfo);
          this.$router.push(
            `/community/detail/${this.community_team.team_idx}/${this.modify_community_id}`
          );
        }
      },
      pickFile() {
        const files = this.$refs.image.files;

        if (this.previewImage.length + files.length > 10) {
          this.config_toast_show("사진은 최대 10장만 첨부 가능합니다.");
          for (let i = 0; i < 10 - this.previewImage.length; i++) {
            this.postInfo.multipartFile.push(files[i]);
            let reader = new FileReader();
            reader.onload = e => this.previewImage.push(e.target.result);
            reader.readAsDataURL(files[i]);
          }
        } else {
          files.forEach(file => {
            this.postInfo.multipartFile.push(file);
            let reader = new FileReader();
            reader.onload = e => this.previewImage.push(e.target.result);
            reader.readAsDataURL(file);
          });
        }
      },
      img_click() {
        if (this.previewImage.length >= 10) {
          this.config_toast_show("사진은 최대 10장만 첨부 가능합니다.");
          return;
        }
        // ios 권한 설정
        if (window.webkit)
          window.webkit.messageHandlers.profileImage.postMessage("");
        else this.$refs.image.click();
      },
      delete_image(index) {
        const delete_img_url = this.previewImage[index];

        if (delete_img_url.startsWith("http"))
          this.postInfo.deleteFileNames.push(delete_img_url);

        this.previewImage.splice(index, 1);
        this.postInfo.multipartFile.splice(index, 1);
      },
      control_placeholder(bool) {
        if (bool) {
          // focus
          this.placeholder_show = false;
        } else {
          // blur 인데 값이 없는 경우
          if (this.postInfo.content.length === 0) this.placeholder_show = true;
        }
      }
    },
    mounted() {
      if (this.modify_community_id) {
        this.postInfo.category = this.filter_index + 1;
        this.postInfo.title = this.team_detail.title;
        this.postInfo.content = this.team_detail.content;
        this.postInfo.isAnonymous = this.team_detail.anonymous;
        this.previewImage = this.team_detail.photoUrls;
        if (this.postInfo.content.length > 0) this.placeholder_show = false;
      }
    },
    beforeRouteLeave(to, from, next) {
      this.set_modify_community_id(null);
      next();
    }
  };
</script>

<style lang="scss" scoped>
  .community-write {
    .community_write_main {
      margin-top: 48px;
      min-height: calc(100vh - 48px);

      .community_write_category_wapper {
        height: 110px;
        border-bottom: solid 1px #e9e9e9;
        .community_write_category_label {
          padding: 18px 0 10px;
          font-size: 14px;
          font-weight: 500;
          line-height: 20px;
          letter-spacing: -0.28px;
          color: #464646;
        }
      }
      .community_write_title {
        width: 100%;
        height: 63px;
        border-bottom: solid 1px #e9e9e9;
        padding: 22px 14px 14px;
        font-size: 20px;
        font-weight: 500;
        line-height: 27px;
        letter-spacing: -1.2px;
        color: #1e1e1e;
      }
      .community_write_content_wrapper {
        position: relative;
        max-height: 490px;
        min-height: 402px;
        padding: 18px 14px 0;
        .placeholder {
          position: absolute;
          top: 18px;
          left: 14px;
          right: 14px;

          pointer-events: none;
          background-color: #fff;
          user-select: none;
          color: #adadad;
          font-size: 16px;
          line-height: 28px;
          letter-spacing: -0.64px;

          white-space: break-spaces;
        }
        .community_write_content {
          width: 100%;
          margin-bottom: 65px;
          font-size: 16px;
          line-height: 28px;
          letter-spacing: -0.64px;
          color: #464646;
          resize: none;
        }
      }
      .talk-team-post-write-content {
        margin-top: 48px;
        background: #fff !important;
        min-height: 100vh;
      }
    }
    .community_write_footer {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 9;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 54px;
      padding: 0 14px;
      border-top: solid 1px #e9e9e9;
      .community_write_photo {
        .image-label {
          display: inline-block;
          height: 30px;
          width: 30px;
          cursor: pointer;
          vertical-align: top;
          .icnon-image {
            width: 100%;
            height: 100%;
          }
        }
      }
      .anonymous-wrap {
        margin-bottom: 16px;
        padding-top: 26px;

        .custom-label {
          font-size: 12px;
          font-weight: 500;
          line-height: 18px;
          color: #777;
        }
      }
    }
  }
</style>
