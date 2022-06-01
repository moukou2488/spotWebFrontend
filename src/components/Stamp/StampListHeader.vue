<template>
  <header class="stamp-list-header">
    <ul class="tab-list">
      <li class="tab-list-item">
        <a
          class="tab-list-link"
          :class="{ active: stamp_list_header === 'all' }"
          href="#"
          @click.prevent="set_stamp_list_header('all')"
          >버디 일기
        </a>
      </li>
      <li class="tab-list-item">
        <a
          class="tab-list-link"
          :class="{ active: stamp_list_header === 'my' }"
          href="#"
          @click.prevent="check_login_user"
          >나의 버디 일기
        </a>
      </li>
    </ul>
    <!--  -->
    <div class="view-selector-wrap">
      <a
        class="view-selector"
        href="#"
        @click.prevent="set_stamp_list_type('grid')"
      >
        <img
          class="btn-image"
          :src="
            stamp_list_type === 'grid'
              ? require('@/assets/images/stamp_btn_grid@3x_active.png')
              : require('@/assets/images/stamp_btn_grid@3x.png')
          "
          alt="그리드 뷰 버튼 이미지"
        />
      </a>
      <!--  -->
      <span class="divider"></span>
      <!--  -->
      <a
        class="view-selector"
        href="#"
        @click.prevent="set_stamp_list_type('feed')"
      >
        <img
          class="btn-image"
          :src="
            stamp_list_type === 'feed'
              ? require('@/assets/images/stamp_btn_feed@3x_active.png')
              : require('@/assets/images/stamp_btn_feed@3x.png')
          "
          alt="피드 뷰 버튼 이미지"
        />
      </a>
    </div>
  </header>
</template>

<script>
  import { mapMutations, mapState } from "vuex";
  export default {
    name: "stamp-list-header",
    computed: {
      ...mapState("stampStore", ["stamp_list_type", "stamp_list_header"]),
      ...mapState("userStore", ["user_info"])
    },
    methods: {
      ...mapMutations("stampStore", [
        "set_stamp_list_type",
        "set_stamp_list_header"
      ]),
      check_login_user() {
        if (this.user_info) {
          if (this.user_info.emailVerified === false) {
            this.$eventBus.$emit("alert", { type: "email-auth" });
          }
          this.set_stamp_list_header("my");
        } else
          this.$eventBus.$emit("alert", {
            type: "login"
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .stamp-list-header {
    margin-top: 48px;
    .tab-list {
      display: flex;

      .tab-list-item {
        flex: 1;

        height: 40px;

        .tab-list-link {
          display: inline-flex;
          justify-content: center;
          align-items: center;

          width: 100%;
          height: 100%;

          font-size: 14px;
          color: #373737;
          letter-spacing: -0.56px;
          font-weight: 500;
          border-bottom: 1px solid #e9e9e9;

          &.active {
            border-bottom: 2px solid $dodger_blue;
            color: $dodger_blue !important;
          }
        }
      }
    }

    //
    .view-selector-wrap {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      width: 100%;
      padding: 16px 14px 0 0;

      .view-selector {
        display: inline-block;
        width: 18px;
        height: 18px;
        .btn-image {
          width: 100%;
          height: 100%;
        }
      }

      .divider {
        display: inline-block;
        width: 1px;
        height: 10px;
        background-color: #ddd;
        margin: 0 6px;
      }
    }
  }
</style>
