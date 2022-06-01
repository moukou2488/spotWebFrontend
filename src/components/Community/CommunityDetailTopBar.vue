<template>
  <nav class="community-detail-top-bar top-bar">
    <!-- 뒤로가기 버튼이 있는 top-bar -->
    <div class="top-bar-wrap back">
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
        <div class="button-link" @click="call_api_scrap">
          <img class="button-image" :src="scrap_img" alt="스크랩 아이콘" />
        </div>
        <s-more-btn :set_list="set_list" />
      </div>
    </div>
  </nav>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  import SMoreBtn from "@/components/Common/SMoreBtn.vue";
  export default {
    name: "community-detail-top-bar",
    components: { SMoreBtn },
    props: {
      topbar_text: {
        type: String
      }
    },
    computed: {
      ...mapState("communityStore", [
        "team_detail",
        "scrap_state",
        "community_team"
      ]),
      ...mapState("userStore", ["user_info"]),
      scrap_img() {
        return this.scrap_state
          ? require("@/assets/images/btn_scrap_done@3x.png")
          : require("@/assets/images/btn_scrap@3x.png");
      },
      is_my_community_detail() {
        return (
          this.user_info !== null &&
          this.team_detail.nickname === this.user_info.nickname
        );
      },
      set_list() {
        let moreBtnList = {
          type: null,
          header: null
        };
        if (this.user_info !== null && this.is_my_community_detail)
          moreBtnList.type = "mine_detail";
        else moreBtnList.type = "community_detail_other";
        moreBtnList.header = "구단 게시글 관리하기";
        return moreBtnList;
      }
    },
    methods: {
      ...mapActions("communityStore", ["api_scrap_add", "api_scrap_delete"]),
      ...mapActions("modalStore", ["config_toast_show"]),
      async call_api_scrap() {
        if (this.user_info) {
          if (this.user_info.emailVerified === false) {
            this.$eventBus.$emit("alert", { type: "email-auth" });
          } else {
            if (this.scrap_state) {
              await this.api_scrap_delete(this.team_detail.id);
              this.config_toast_show("스크랩이 취소되었습니다.");
            } else {
              await this.api_scrap_add(this.team_detail.id);
              this.config_toast_show("글이 스크랩되었습니다.");
            }
          }
        } else {
          this.$eventBus.$emit("alert", {
            type: "login"
          });
          return;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .community-detail-top-bar {
    .headline-wrap {
      margin-left: 2px;
      justify-content: flex-start;
    }
    .button-wrapper {
      &.right {
        .button-link {
          width: 30px;
        }
      }
    }
  }
</style>
