<template>
  <div
    v-if="more_btn_show"
    class="s-more-btn-list"
    @click.self="set_more_btn_show(false)"
  >
    <section class="footer">
      <p class="main-text">{{ more_btn_header }}</p>
      <ul class="more-btn-list">
        <li
          class="more-btn-list-item"
          v-for="(more_item, index) in more_btn_list.list"
          :key="more_item.text"
        >
          <a
            class="more-btn-list-link"
            href="#"
            @click.prevent="choose_item(index)"
          >
            <span>{{ more_item.text }}</span>
            <img
              v-if="more_item.arrow"
              class="icon-image"
              :src="require('@/assets/images/btn_arrow_right@3x.png')"
              alt="오른 화살표 아이콘"
            />
          </a>
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
  import { mapMutations, mapState, mapActions } from "vuex";
  export default {
    name: "s-more-btn-list",
    watch: {
      more_btn_choose_index(new_type) {
        if (this.more_btn_list.type === "other_user_report") {
          if (new_type === 0) {
            this.computed_report_path();
          } else if (new_type === 1) {
            this.open_dialog("block");
          }
        } else if (this.more_btn_list.type === "mine_detail") {
          if (new_type === 0) {
            this.go_modify();
          } else if (new_type === 1) {
            this.open_dialog("delete");
          }
        }
      }
    },
    computed: {
      ...mapState("modalStore", [
        "more_btn_header",
        "more_btn_show",
        "more_btn_list",
        "more_btn_choose_index",
        "more_btn_props_data"
      ]),
      ...mapState("userStore", ["user_info"]),
      ...mapState("companyStore", ["company_detail"]),
      ...mapState("communityStore", ["team_detail", "community_team"]),
      ...mapState("profileStore", ["user_profile_info"])
    },
    methods: {
      ...mapMutations("modalStore", [
        "set_more_btn_show",
        "set_more_btn_choose_index",
        "set_more_btn_props_data"
      ]),
      ...mapActions("modalStore", ["config_toast_show"]),
      ...mapMutations("companyWriteStore", [
        "set_modify_company_id",
        "set_payload_data"
      ]),
      //커뮤
      ...mapActions("communityStore", [
        "api_post_delete_community",
        "api_community_hide",
        "clear_commu_state"
      ]),
      ...mapMutations("communityStore", [
        "set_modify_community_id",
        "set_modify_complete"
      ]),
      choose_item(index) {
        this.set_more_btn_show(false);
        this.set_more_btn_choose_index(index);
        this.set_more_btn_props_data(this.more_btn_props_data);
      },
      // 신고,차단 공통
      computed_report_path() {
        if (!this.user_info) {
          this.$eventBus.$emit("alert", { type: "login" });
          return;
        }
        if (this.$route.name === "profile-user_page")
          this.$router.push(
            `/company/report/user/${this.user_profile_info.nickname}`
          );
        else if (this.$route.name === "company-detail") {
          this.$router.push(`/company/report/tour/${this.company_detail.id}`);
        } else {
          this.$router.push(`/company/report/commu/${this.team_detail.id}`);
        }
      },
      open_dialog(modal_type) {
        // 로그인 확인
        if (this.user_info) {
          // 이메일 인증 확인
          if (this.user_info.emailVerified === false) {
            this.$eventBus.$emit("alert", {
              type: "email-auth"
            });
          } else {
            // 모달창 열기
            this.$eventBus.$emit("alert", {
              type: modal_type
            });
          }
        } else {
          // 로그인 안 된 유저
          this.$eventBus.$emit("alert", {
            type: "login"
          });
        }
      },
      // 동행 수정하기
      go_modify() {
        if (this.$route.name === "company-detail") {
          if (this.this_company_recruit_close) {
            this.config_toast_show("마감된 동행입니다.");
            return;
          }
          this.set_modify_company_id(this.company_detail.id);

          this.set_payload_data(this.company_detail);
          this.$router.replace("/company/write");
        } else if (this.$route.name === "community-detail") {
          this.set_modify_complete(false);
          this.set_modify_community_id(this.team_detail.id);
          this.$router.replace(
            `/community/write/${this.community_team.team_idx}`
          );
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .s-more-btn-list {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10;

    background-color: rgba($color: #000000, $alpha: 0.55);
    .footer {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;

      border-radius: 20px 20px 0 0;
      background-color: #fff;
      .main-text {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 56px;

        color: #464646;
        font-size: 12px;
        letter-spacing: -0.72px;
      }
      .more-btn-list {
        .more-btn-list-item {
          border-top: 1px solid #e9e9e9;
          .more-btn-list-link {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 44px;
            padding-left: 16px;
            color: #1e1e1e;

            font-size: 14px;
            letter-spacing: -0.84px;

            .icon-image {
              width: 36px;
              height: 36px;
            }
          }
        }
      }
    }
  }
</style>
