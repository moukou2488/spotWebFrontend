<template>
  <section class="company-write-body">
    <h3 class="footer-title">모집정보</h3>
    <!-- 인원 -->
    <h4 class="data-label required">인원</h4>
    <div class="range-wrap">
      <input
        class="range-input"
        type="number"
        :value="payload_data.minimumMember"
        @input="change_minimumMenber"
        @blur="fill_value"
      />
      <span>명</span>
      <a href="#" class="slider-wrap" @click.prevent="unlock_member_disalbed">
        <v-range-slider
          class="custom-range-slider"
          :value="people_range"
          @input="local_set_people_range"
          :min="people_data.min"
          :max="people_data.max"
          :color="'#3bb1ff'"
          :track-color="'#ddd'"
          :hide-details="true"
          :disabled="payload_data.member_no_limit"
        >
        </v-range-slider>
      </a>
      <input
        class="range-input"
        type="number"
        :value="payload_data.maximumMember"
        @input="change_maximumMenber"
        @blur="fill_value"
      />
      <span>명</span>
    </div>
    <!-- 제한 없음 -->
    <div class="no_choice-wrap custom-checkbox-wrap">
      <input
        ref="people_limit_input"
        id="people-no_choice"
        :value="payload_data.member_no_limit"
        @input="set_people_range_no_limit($event.target.checked)"
        class="custom-checkbox"
        :class="{ active: payload_data.member_no_limit }"
        type="checkbox"
      />
      <label for="people-no_choice" class="custom-label">제한 없음</label>
    </div>

    <!-- 성별 -->
    <h4 class="data-label required">성별</h4>
    <v-radio-group
      :value="payload_data.requiredGender"
      @change="set_requiredGender"
      :row="true"
      :hide-details="true"
    >
      <v-radio :label="'남자'" :value="1" :color="'#3bb1ff'"></v-radio>
      <v-radio :label="'여자'" :value="2" :color="'#3bb1ff'"></v-radio>
      <v-radio :label="'제한없음'" :value="3" :color="'#3bb1ff'"></v-radio>
    </v-radio-group>

    <!-- 연령 -->
    <h4 class="data-label required">연령</h4>
    <div class="range-wrap">
      <div class="age-label-wrap">
        <input
          class="range-input"
          type="number"
          :value="payload_data.minimumAge"
          @input="change_minimumAge"
          @blur="fill_value"
        />
        <span>세</span>
      </div>
      <a href="#" class="slider-wrap" @click.prevent="unlock_age_disalbed">
        <v-range-slider
          class="custom-range-slider"
          :value="age_range"
          @input="local_set_age_range"
          :min="age_data.min"
          :max="age_data.max"
          :color="'#3bb1ff'"
          :track-color="'#ddd'"
          :hide-details="true"
          :disabled="payload_data.age_no_limit"
        >
        </v-range-slider>
      </a>
      <div class="age-label-wrap">
        <input
          class="range-input"
          type="number"
          :value="payload_data.maximumAge"
          @input="change_maximumAge"
          @blur="fill_value"
        />
        <span>세</span>
      </div>
    </div>
    <!-- 제한 없음 -->
    <div class="no_choice-wrap custom-checkbox-wrap">
      <input
        ref="age_limit_input"
        id="age-no_choice"
        :value="payload_data.age_no_limit"
        @input="set_age_no_limit($event.target.checked)"
        class="custom-checkbox"
        type="checkbox"
      />
      <label for="age-no_choice" class="custom-label">제한 없음</label>
    </div>
  </section>
</template>

<script>
  import { mapState, mapActions, mapMutations } from "vuex";

  export default {
    name: "company-write-body",

    computed: {
      ...mapState("companyWriteStore", ["payload_data"]),
      people_range() {
        return [
          this.payload_data.minimumMember,
          this.payload_data.maximumMember
        ];
      },
      age_range() {
        return [this.payload_data.minimumAge, this.payload_data.maximumAge];
      }
    },
    data: () => ({
      people_data: {
        min: 1,
        max: 10
      },
      age_data: {
        min: 20,
        max: 100
      }
    }),
    methods: {
      ...mapMutations("companyWriteStore", [
        "set_people_range",
        "set_people_range_no_limit",
        "set_age_no_limit",
        "set_requiredGender",
        "set_age_range"
      ]),

      ...mapActions("modalStore", ["config_toast_show"]),

      // 멤버 제어 컴포넌트 스크립트
      local_set_people_range(people_range_list) {
        if (
          Number(people_range_list[0]) === 1 &&
          Number(people_range_list[1]) === 10
        ) {
          this.$refs.people_limit_input.checked = true;
        } else {
          this.$refs.people_limit_input.checked = false;
        }
        this.set_people_range(people_range_list);
      },
      // 연령 제어 컴포넌트 스크립트
      local_set_age_range(age_range_list) {
        if (
          Number(age_range_list[0]) === 20 &&
          Number(age_range_list[1]) === 100
        ) {
          this.$refs.age_limit_input.checked = true;
        } else {
          this.$refs.age_limit_input.checked = false;
        }
        this.set_age_range(age_range_list);
      },

      // 동행 인원 최솟값 제어
      change_minimumMenber($event) {
        const { minimumMember, maximumMember } = this.payload_data;
        const input_number = $event.target.value;

        if (input_number) {
          if (input_number > maximumMember) {
            this.set_people_range([String(minimumMember), maximumMember]);
            this.config_toast_show("최소 인원이 최대 인원보다 클 수 없습니다.");
          } else {
            this.set_people_range([String(input_number), maximumMember]);
          }
        }
      },
      // 동행 인원 최댓값 제어
      change_maximumMenber($event) {
        const { minimumMember, maximumMember } = this.payload_data;
        const input_number = Number($event.target.value);

        if (input_number) {
          if (input_number === 1) {
            return;
          }
          if (maximumMember === 10) {
            this.set_people_range([minimumMember, minimumMember]);
            return;
          }
          if (input_number < minimumMember) {
            // if(input_number < 9){}
            this.set_people_range([minimumMember, String(maximumMember)]);
            this.config_toast_show(
              "최대 인원이 최소 인원보다 작을 수 없습니다."
            );
          } else this.set_people_range([minimumMember, input_number]);
        }
      },

      // 동행 연령 제한 최솟값 제어
      change_minimumAge($event) {
        const { minimumAge, maximumAge } = this.payload_data;
        const input_number = $event.target.value;

        if (input_number) {
          if (input_number.length <= 1) {
            return;
          }
          if (input_number > maximumAge) {
            this.set_age_range([String(minimumAge), maximumAge]);
            this.config_toast_show("최소 연령이 최대 연령보다 클 수 없습니다.");
          } else {
            this.set_age_range([String(input_number), maximumAge]);
          }
        }
      },

      // 동행 연령 제한 최솟값 제어
      change_maximumAge($event) {
        const { minimumAge, maximumAge } = this.payload_data;
        const input_number = $event.target.value;
        if (input_number) {
          if (input_number.length <= 1) {
            return;
          }
          if (maximumAge === 100) {
            this.set_age_range([minimumAge, minimumAge]);
            return;
          }
          if (input_number < minimumAge) {
            // if(input_number < 9){}
            this.set_age_range([minimumAge, String(maximumAge)]);
            this.config_toast_show(
              "최대 연령이 최소 연령보다 작을 수 없습니다."
            );
          } else this.set_age_range([minimumAge, input_number]);
        }
      },

      // 제한 없음일 때 range 클릭하면 제한 없음 풀어주는 스크립트
      unlock_member_disalbed() {
        if (this.payload_data.member_no_limit) {
          this.$refs.people_limit_input.checked = false;
          this.set_people_range_no_limit(false);
        }
      },

      // 제한 없음일 때 range 클릭하면 제한 없음 풀어주는 스크립트
      unlock_age_disalbed() {
        if (this.payload_data.age_no_limit) {
          this.$refs.age_limit_input.checked = false;
          this.set_age_no_limit(false);
        }
      },

      // 한 자리수 또는 값 없이 입력하고 다른 짓 할려고 하는 경우
      fill_value() {
        const {
          minimumMember,
          maximumMember,
          minimumAge,
          maximumAge
        } = this.payload_data;
        this.set_people_range([String(minimumMember), String(maximumMember)]);
        this.set_age_range([String(maximumAge), String(minimumAge)]);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .company-write-body {
    position: relative;
    padding: 0 20px 30px;
    .footer-title {
      padding-top: 24px;
      color: #1e1e1e;
      font-size: 16px;
      letter-spacing: -0.96px;
    }
    .data-label {
      font-size: 14px;
      letter-spacing: -0.28px;
      color: #464646;
      margin: 23px 0 13px;
    }
    .range-wrap {
      display: flex;
      height: 32px;
      align-items: center;
      .range-input {
        display: inline-block;
        width: 26.75px;
        // margin: 0 4px 4px 0;
        padding-bottom: 4px;
        font-size: 12px;
        letter-spacing: -0.24px;
        color: #373737;
        text-align: center;
        border-bottom: 1px solid;
      }
      .age-label-wrap {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 4px;
        .range-input {
          min-width: 18px;
          margin-bottom: 0;
        }
      }

      .slider-wrap {
        display: flex;
        width: 100%;
        margin: 0 18px;
      }
    }
    .no_choice-wrap {
      margin-top: 19px;
      .custom-label {
        font-size: 12px;
        color: #373737;
        letter-spacing: -0.24px;

        &:before {
          position: relative;
          top: 1px;
          width: 16px;
          height: 16px;
        }
      }
    }
  }
</style>
