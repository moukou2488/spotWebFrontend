<template>
  <section class="evaluate-detail">
    <div class="evaluate-detail-header">
      <div class="title-wrap">
        <strong class="section-title">상세 날씨</strong>
        <div class="anonymous-checkbox-wrap">
          <input
            id="anonymous"
            :value="evaluate_anonymous"
            @input="set_evaluate_anonymous($event.target.checked)"
            class="custom-checkbox"
            :class="{ active: evaluate_anonymous }"
            type="checkbox"
          />
          <label for="anonymous" class="custom-label">익명</label>
        </div>
        <button class="question-btn question-icon-wrap">
          <img class="question-icon" :src="question_url" alt="물음표 아이콘" />
        </button>
      </div>
    </div>
    <div v-show="is_focus" class="question-info-wrap">
      <p class="question-info">
        익명 체크 시, 모든 평가 사항(동행날씨 고르기, 맑은 날씨, 흐린 날씨, 상세
        날씨)은 닉네임이 드러나지 않는 익명으로 작성됩니다.
      </p>
    </div>

    <textarea
      class="evaluate-detail-textbox"
      placeholder="내용을 입력해주세요. (500자 제한)"
      :value="evaluate_detail"
      @input="set_evaluate_detail($event.target.value)"
    ></textarea>

    <footer class="button-wrap">
      <button @click="api_post_tour_review" class="btn fill large">
        완료하기
      </button>
    </footer>
  </section>
</template>

<script>
  import { mapActions, mapMutations, mapState } from "vuex";
  export default {
    name: "evaluate-detail",
    watch: {
      evaluate_anonymous(newVal) {
        this.is_focus = newVal;
      }
    },
    data: () => ({
      is_focus: false
    }),
    computed: {
      ...mapState("profileStore", ["evaluate_anonymous", "evaluate_detail"]),
      question_url() {
        return this.is_focus
          ? require("@/assets/images/ic_question_active@3x.png")
          : require("@/assets/images/ic_question@3x.png");
      }
    },
    methods: {
      ...mapMutations("profileStore", [
        "set_evaluate_anonymous",
        "set_evaluate_detail"
      ]),
      ...mapActions("profileStore", ["api_post_tour_review"]),

      handle_question_click($event) {
        const event_target = $event.target;

        const question_mark = document.querySelector(".question-btn");
        const question_icon = document.querySelector(".question-icon");

        if (event_target === question_mark || event_target === question_icon) {
          this.is_focus = true;
        } else {
          this.is_focus = false;
        }
      }
    },
    mounted() {
      window.addEventListener("touchstart", this.handle_question_click);
      if (this.evaluate_anonymous) this.is_focus = true;
    },
    destroyed() {
      window.removeEventListener("touchstart", this.handle_question_click);
    }
  };
</script>

<style lang="scss" scoped>
  .evaluate-detail {
    margin-top: 32px;
    padding: 0 14px;
    .title-wrap {
      display: flex;

      .section-title {
        color: #1e1e1e;
        font-size: 16px;
        font-weight: 500;
        line-height: 18px;
        letter-spacing: -0.32px;
      }

      .anonymous-checkbox-wrap {
        display: inline-flex;
        position: relative;
        margin: 0 6px 0 12px;
        [type="checkbox"].custom-checkbox {
          display: none;

          &:checked + .custom-label:before,
          &.active + .custom-label:before {
            background: url("~@/assets/images/check_b_active@3x.png") center;
            background-size: cover;
          }
        }

        .custom-label {
          display: inline-flex;
          align-items: center;

          color: #464646;
          font-size: 12px;
          line-height: 20px;
          letter-spacing: -0.24px;
          &:before {
            display: inline-block;
            width: 16px;
            height: 16px;
            margin-right: 10px;
            vertical-align: top;
            background: url("~@/assets/images/check_b_inactive@3x.png") center;
            background-size: cover;
            content: "";
          }
        }
      }

      .question-icon-wrap {
        margin-top: 2px;
        width: 16px;
        height: 18px;

        .question-icon {
          width: 100%;
          height: 100%;
        }
      }
    }

    .question-info-wrap {
      position: relative;
      padding: 8px 10px;
      margin: 11px 0 8px;
      background-color: #d5eeff;
      border-radius: 4px;
      .question-info {
        font-size: 12px;
        line-height: 18px;
        letter-spacing: -0.24px;
        color: #464646;
      }
      &:before {
        position: absolute;
        top: -8px;
        left: 129px;
        width: 0;
        height: 0;
        border-top: 11px solid #d5eeff;
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
        transform: rotate(-180deg);
        content: "";
      }
    }

    .evaluate-detail-textbox {
      width: 100%;
      min-height: 118px;
      padding: 14px 12px;
      margin-top: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      resize: none;

      color: #464646;
      font-size: 14px;
      line-height: 22.5px;
      letter-spacing: -0.39px;
    }
    .button-wrap {
      margin: 40px 0;
    }
  }
</style>
