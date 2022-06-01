<template>
  <div class="company-write-date_picker">
    <company-write-nav :headline="'날짜 선택'">
      <template v-slot:right-btn>
        <button class="temp-save-btn" @click="go_back">확인</button>
      </template>
    </company-write-nav>

    <v-date-picker
      class="s-date-picker"
      v-model="company_write_date_range"
      :no-title="true"
      :range="true"
      :full-width="true"
      show-adjacent-months
      locale="ko-KR"
      color="#3bb1ff"
      :day-format="d => date_format(d)"
      :header-date-format="d => header_format(d)"
      @click:date="check_date"
    />
    <s-toast :where="'bottom'" />
  </div>
</template>

<script>
  import moment from "moment";
  import CompanyWriteNav from "@/components/Company/CompanyWriteNav.vue";
  import SToast from "@/components/Common/SToast.vue";

  import { mapActions, mapMutations, mapState } from "vuex";

  export default {
    name: "company-write-date_picker",
    components: { CompanyWriteNav, SToast },
    computed: {
      ...mapState("companyWriteStore", ["payload_data"])
    },
    data: () => ({
      company_write_date_range: [],
      choose_game_date: "",
      today: moment().format("YYYY-MM-DD")
    }),
    methods: {
      ...mapMutations("companyWriteStore", [
        "set_tourStartDate",
        "set_tourEndDate"
      ]),
      ...mapActions("modalStore", ["config_toast_show"]),
      date_format: date => moment(date).format("D"),
      header_format: date => moment(date).format("YYYY.MM"),
      check_date(choose_date) {
        if (choose_date < this.today) {
          this.config_toast_show("잘못된 날짜 선택입니다.");
          this.company_write_date_range = [this.choose_game_date];
          return;
        }

        //   두번째 클릭
        let first_date_array = this.company_write_date_range[0].split("-");

        if (this.company_write_date_range.length == 2) {
          let second_date_array = this.company_write_date_range[1].split("-");
          // 거꾸로 클릭한 경우
          if (
            Number(first_date_array[1]) > Number(second_date_array[1]) ||
            Number(first_date_array[2]) > Number(second_date_array[2])
          ) {
            this.set_tourStartDate(second_date_array.join("-"));
            this.company_write_date_range = [second_date_array.join("-")];
          } else {
            this.set_tourEndDate(second_date_array.join("-"));
          }
        } else {
          this.set_tourStartDate(first_date_array.join("-"));
        }
      },
      go_back() {
        if (this.company_write_date_range.length === 1) {
          if (this.company_write_date_range[0] < this.choose_game_date) {
            this.config_toast_show("선택한 경기가 포함된 일정이 아닙니다.");
            return;
          }
        } else {
          if (this.company_write_date_range[0] > this.choose_game_date) {
            this.config_toast_show("선택한 경기가 포함된 일정이 아닙니다.");
            return;
          }
        }
        this.$router.go(-1);
      }
    },
    mounted() {
      this.choose_game_date =
        moment().format("YYYY") +
        "-" +
        this.payload_data.tourTeam
          .split(",")[1]
          .split(" ")[1]
          .replace("/", "-");

      if (
        this.payload_data.tourStartDate !== "" &&
        this.payload_data.tourStartDate !== null
      ) {
        this.company_write_date_range = [
          this.payload_data.tourStartDate,
          this.payload_data.tourEndDate
        ];
        return;
      }
      // 다른 방법을 통해 날짜 선택 페이지로 접근했을 경우
      if (this.payload_data.tourTeam === "") {
        this.$router.go(-1);
        this.config_toast_show("잘못된 접근입니다.");
        return;
      }

      this.set_tourStartDate(this.choose_game_date);
      this.company_write_date_range = [this.choose_game_date];
    },
    destroyed() {
      // 날짜 하루 고르고 튀는 사람
      if (this.company_write_date_range.length === 1) {
        this.set_tourEndDate(this.company_write_date_range[0]);
      }
      if (this.company_write_date_range[0] > this.choose_game_date) {
        this.config_toast_show("선택한 경기가 포함된 일정이 아닙니다.");
        this.set_tourStartDate(this.choose_game_date);
        this.set_tourEndDate(this.choose_game_date);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .s-date-picker {
    margin-top: 48px;
  }
</style>
