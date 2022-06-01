<template>
  <div class="report-body">
    <v-radio-group
      :value="violationIndex"
      @change="set_violationIndex"
      :hide-details="true"
    >
      <v-radio
        class="report-radio"
        v-for="radio in radio_list"
        :label="radio.text"
        :key="radio.id"
        :value="radio.id"
        :color="'#3bb1ff'"
      ></v-radio>
    </v-radio-group>
    <!-- 기타 -->
    <textarea
      @focus="etc_focus"
      :value="etc"
      @input="set_etc_local"
      class="etc-box"
      placeholder="신고 사유를 직접 입력해주세요. (최대 80자)"
    ></textarea>
    <!--  -->
    <footer class="report-footer">
      <button class="footer-btn" @click="$router.go(-1)">취소</button>
      <slot name="report-btn" />
    </footer>
  </div>
</template>

<script>
  import radio_list from "@/assets/data/report_radio_list.js";
  import { mapMutations, mapState } from "vuex";

  export default {
    name: "report-body",
    computed: { ...mapState("reportStore", ["violationIndex", "etc"]) },
    data: () => ({
      radio_list: radio_list
    }),
    methods: {
      ...mapMutations("reportStore", ["set_violationIndex", "set_etc"]),
      set_etc_local($event) {
        this.set_etc($event.target.value);
      },
      // 기타 사유를 입력하게 될 경우 index를 기타로 변경
      etc_focus() {
        this.set_violationIndex(0);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .report-body {
    padding: 20px 14px 0;
    .etc-box {
      margin: 10px 0 0 2px;
      padding: 10px;
      width: 100%;
      height: 40px;
      font-size: 14px;
      letter-spacing: -0.39px;
      line-height: 18px;
      resize: none;
      border-radius: 4px;
      border: 1px solid #ddd;
    }
    .report-footer {
      display: flex;
      margin-top: 82px;
      padding: 10px 0;
      width: 100%;
      height: 60px;
      .footer-btn {
        flex: 1;
        color: #fff;
        font-size: 14px;
        letter-spacing: -0.28px;
        background-color: #c2c2c2;
        border-radius: 4px;
        &.major {
          background-color: $dodger_blue;
        }
        & + .footer-btn {
          margin-left: 7px;
        }
      }
    }
  }
</style>
