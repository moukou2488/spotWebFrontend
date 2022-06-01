<template>
  <div class="stamp-write-body">
    <div class="stamp-cover-img"></div>
    <div class="stamp-cover-option">
      <div class="option">
        <span class="option-text">로고</span>
        <div class="empty-checkbox-wrap p7">
          <input
            :checked="!stamp_exists.logoExists"
            @click="set_stamp_exists('logoExists')"
            id="logo-option"
            class="anonymous-wrap empty-checkbox"
            type="checkbox"
          />
          <label for="logo-option" class="option-lable empty-label"
            >표시 안함</label
          >
        </div>
      </div>
      <div class="option">
        <span class="option-text">직관 횟수</span>
        <div class="option-right">
          <div class="count-wrapper">
            <input
              :value="stamp_count"
              maxlength="8"
              @input="set_stamp_count($event.target.value)"
              class="count"
              type="number"
            />
          </div>
          <div class="divide-bar"></div>
          <div class="empty-checkbox-wrap p7">
            <input
              :checked="!stamp_exists.countExists"
              @click="set_stamp_exists('countExists')"
              id="count-option"
              class="anonymous-wrap empty-checkbox"
              type="checkbox"
            />
            <label for="count-option" class="option-lable empty-label"
              >표시 안함</label
            >
          </div>
        </div>
      </div>
      <div class="option">
        <span class="option-text">경기 선택</span>
        <div class="option-right">
          <div class="game">
            <company-write-badge-game />
          </div>
          <div class="divide-bar p7"></div>
          <div class="empty-checkbox-wrap p7">
            <input
              :checked="!stamp_exists.gameExists"
              @click="set_stamp_exists('gameExists')"
              id="game-option"
              class="anonymous-wrap empty-checkbox"
              type="checkbox"
            />
            <label for="game-option" class="option-lable empty-label"
              >선택 안함</label
            >
          </div>
        </div>
      </div>
    </div>
    <div class="custom-br" />
    <div class="stamp_write_content_wrapper">
      <div
        v-if="placeholder_show && modify_stamp_id === null"
        class="placeholder"
      >
        {{ placeholder }}
      </div>
      <textarea
        :value="stamp_diary"
        @input="set_stamp_diary($event.target.value)"
        class="stamp_write_content"
        @focus="control_placeholder(true)"
        @blur="control_placeholder(false)"
      ></textarea>
    </div>
  </div>
</template>

<script>
  import CompanyWriteBadgeGame from "@/components/Company/CompanyWriteBadgeGame";
  import { mapActions, mapMutations, mapState } from "vuex";
  export default {
    name: "stamp-write-body",
    components: { CompanyWriteBadgeGame },
    data: () => ({
      placeholder: `다녀온 직관 여행에 대한 일기를 작성하세요 :)`,
      placeholder_show: true,
      is_uploading: false,
      exists: {
        logo: false,
        count: false,
        game: false
      }
    }),
    computed: {
      ...mapState("stampStore", [
        "stamp_count",
        "stamp_diary",
        "stamp_exists",
        "modify_stamp_id"
      ])
    },
    methods: {
      ...mapMutations("stampStore", [
        "set_stamp_count",
        "set_stamp_exists",
        "set_stamp_diary"
      ]),
      ...mapActions("stampStore", ["api_stamp_upload"]),
      control_placeholder(bool) {
        if (bool) {
          // focus
          this.placeholder_show = false;
        } else {
          // blur 인데 값이 없는 경우
          if (this.stamp_diary.length === 0) this.placeholder_show = true;
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .stamp-write-body {
    .stamp-cover-option {
      height: 160px;
      padding: 8px 0;
    }
    .option {
      display: flex;
      justify-content: space-between;
      height: 48px;
      padding: 7px 16px;
      .option-right {
        display: inline-flex;
      }
      .option-text {
        padding: 7px 0;
        font-size: 14px;
        line-height: 20px;
        letter-spacing: -0.28px;
      }
      .option-lable {
        font-size: 12px;
      }
      .count-wrapper {
        width: 20px;
        margin-bottom: 10px;
        border-bottom: 1px solid $dodger_blue;
        .count {
          width: 20px;
          font-size: 12px;
          font-weight: normal;
          letter-spacing: -0.72px;
          line-height: 18px;
          text-align: center;
        }
      }
      .game {
        margin-bottom: 15px;
      }
      .divide-bar {
        width: 1px;
        height: 16px;
        background-color: #ddd;
        margin: 7px 12px;
      }
      .p7 {
        padding: 7px 0 !important;
      }
    }
  }

  .stamp_write_content_wrapper {
    position: relative;
    max-height: 490px;
    min-height: 122px;
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
      font-size: 14px;
      line-height: 28px;
      letter-spacing: -0.56px;

      white-space: break-spaces;
    }
    .stamp_write_content {
      width: 100%;
      height: 95px;
      margin-bottom: 65px;
      font-size: 14px;
      line-height: 28px;
      letter-spacing: -0.64px;
      color: #464646;
      resize: none;
    }
  }
</style>
