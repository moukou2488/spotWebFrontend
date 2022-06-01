<template>
  <section class="company-write-header">
    <!-- 제목 -->
    <div class="company-title-wrap">
      <input
        class="title-input s-textarea"
        type="text"
        placeholder="제목(*)"
        :value="payload_data.tourTitle"
        @input="set_tourTitle($event.target.value)"
      />
    </div>
    <!-- content -->
    <div class="company-content-wrap border-top-e9">
      <div v-if="placeholder.tourContent.show" class="placeholder">
        {{ placeholder.tourContent.placeholder }}
      </div>
      <textarea
        id="tourContent"
        class="company-content s-textarea"
        :value="payload_data.tourContent"
        style="width: 100%;"
        @input="set_tourContent($event.target.value)"
        @focus="control_placeholder($event.target, true)"
        @blur="control_placeholder($event.target, false)"
      ></textarea>
    </div>
    <!-- 테마 -->
    <div class="company-theme-wrap border-top-e9">
      <div v-if="placeholder.tourThemes.show" class="placeholder">
        {{ placeholder.tourThemes.placeholder }}
      </div>
      <company-theme-list
        :theme_list="payload_data.tourThemes"
        :delete_item="true"
      >
        <template v-slot:text_area>
          <textarea
            id="tourThemes"
            class="company-theme s-textarea"
            type="text"
            :value="last_theme"
            @input="set_theme"
            @focus="control_placeholder($event.target, true)"
            @blur="
              theme_blur($event.target.value);
              control_placeholder($event.target, false);
            "
          ></textarea>
        </template>
      </company-theme-list>
    </div>
    <!-- 지역, 날짜 -->
    <div class="company-loc_date-wrap border-top-e9">
      <company-write-badge-game />
      <company-write-badge-date />
    </div>
  </section>
</template>

<script>
  import CompanyWriteBadgeGame from "@/components/Company/CompanyWriteBadgeGame";
  import CompanyWriteBadgeDate from "@/components/Company/CompanyWriteBadgeDate";
  import CompanyThemeList from "@/components/Company/CompanyThemeList.vue";

  import { mapActions, mapMutations, mapState } from "vuex";

  export default {
    name: "company-write-header",
    components: {
      CompanyWriteBadgeGame,
      CompanyWriteBadgeDate,
      CompanyThemeList
    },
    computed: {
      ...mapState("companyWriteStore", ["payload_data"])
    },
    data: () => ({
      placeholder: {
        tourContent: {
          show: true,
          placeholder:
            "동행에게 원하는 점, 부탁할 점, 주의사항 등의 하고 싶은 말을 자유롭게 작성해주세요.(*)"
        },
        tourThemes: {
          show: true,
          placeholder: `(선택) 사진, 맛집 등 원하는 테마 키워드를 입력해주세요.
  키워드는 쉼표로 구분됩니다. `
        }
      },
      last_theme: "",
      is_empty_theme: false
    }),
    methods: {
      ...mapMutations("companyWriteStore", [
        "set_tourTitle",
        "set_tourContent",
        "push_tourThemes",
        "delete_last_theme"
      ]),
      ...mapActions("modalStore", ["config_toast_show"]),
      control_placeholder(target, bool) {
        const { id } = target;

        if (bool) {
          // focus
          this.placeholder[id].show = false;
        } else {
          // blur 인데 값이 없는 경우
          if (this.payload_data[id].length === 0)
            this.placeholder[id].show = true;
        }
      },
      set_theme($event) {
        const input_text = $event.target.value;

        if (input_text) this.is_empty_theme = false;

        this.last_theme = input_text;
        if (input_text.includes(",")) {
          const input_value = input_text.split(",")[0];
          for (let i = 0; i < this.payload_data.tourThemes.length; i++) {
            if (this.payload_data.tourThemes[i] === input_value) {
              this.config_toast_show("이미 있는 동행 테마 입니다.");
              this.last_theme = "";
              return;
            }
          }

          this.push_tourThemes(input_value);
          this.last_theme = "";
          this.is_empty_theme = true;
        }
      },
      theme_blur(value) {
        if (value.length > 0) {
          for (let i = 0; i < this.payload_data.tourThemes.length; i++) {
            if (this.payload_data.tourThemes[i] === value) {
              this.config_toast_show("이미 있는 동행 테마 입니다.");
              this.last_theme = "";
              return;
            }
          }
          this.push_tourThemes(value);
          this.last_theme = "";
        }
      }
    },
    mounted() {
      // 임시 저장 또는 수정의 경우 placeholder 제거
      if (
        this.payload_data.tourContent.length > 0 ||
        this.payload_data.tourThemes.length > 0
      ) {
        this.placeholder.tourContent.show = false;
        this.placeholder.tourThemes.show = false;
      }

      // BackSpace로 테마 지우기
      document.querySelector("#tourThemes").addEventListener("keyup", e => {
        if (e.key === "Backspace") {
          // 그냥 텍스트를 지우는 거랑 구별하기 위한 제어처리
          if (this.is_empty_theme) {
            this.delete_last_theme();
            return;
          }
          if (e.target.value === "") this.is_empty_theme = true;
          else this.is_empty_theme = false;
        }
      });
    }
  };
</script>

<style lang="scss" scoped>
  .company-write-header {
    margin-top: 48px;
    padding: 0 20px;
    color: #464646;
    .company-title-wrap {
      padding: 14px 6px;
      margin-top: 16px;
      font-size: 18px;
      font-weight: 500;
      letter-spacing: -0.72px;
      .title-input {
        width: 100%;
      }
    }
    .placeholder {
      position: absolute;

      pointer-events: none;
      user-select: none;
      color: #adadad;
    }

    .s-textarea,
    .placeholder {
      font-size: 14px;
      line-height: 22px;
      letter-spacing: -0.28px;
    }

    .s-textarea {
      color: #464646;
    }

    // 동행 작성간 자동완성 될 경우 마진
    .company-theme-list + .s-textarea {
      margin-left: 10px;
    }

    .company-content-wrap {
      position: relative;

      .company-content {
        height: 130px;
      }
    }

    .company-theme-wrap {
      position: relative;
      display: flex;
      .hash-tag {
        display: inline-block;
        margin-right: 6px;
        font-size: 14px;
      }
      .company-theme {
        width: 100%;
        // flex: 1;
        // width: 100%;
      }
    }

    .company-date_detail-wrap {
      .company-date_detail {
        height: 94px;
      }
    }

    .border-top-e9 {
      padding: 18px 6px;
      border-top: 1px solid #e9e9e9;
      textarea {
        width: 100%;
        line-height: 1.71;
        letter-spacing: -0.56px;
        font-size: 14px;
        resize: none;
        &::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }
</style>
