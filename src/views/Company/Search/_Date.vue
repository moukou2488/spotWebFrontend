<template>
  <div class="company-search-date">
    <v-date-picker
      v-model="search_date_range"
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
  </div>
</template>

<script>
  import moment from "moment";

  import { createNamespacedHelpers } from "vuex";
  const { mapState, mapActions } = createNamespacedHelpers("companyStore");

  export default {
    name: "company-search-date",
    computed: { ...mapState(["company_search_date"]) },
    data: () => ({
      search_date_range: []
    }),
    methods: {
      ...mapActions(["action_company_search_date"]),
      date_format: date => moment(date).format("D"),
      header_format: date => moment(date).format("YYYY.MM"),
      check_date() {
        let first_date_array = this.search_date_range[0].split("-");

        if (this.search_date_range.length == 2) {
          let second_date_array = this.search_date_range[1].split("-");

          // 거꾸로 클릭한 경우
          if (
            Number(first_date_array[1]) > Number(second_date_array[1]) ||
            Number(first_date_array[2]) > Number(second_date_array[2])
          ) {
            this.search_date_range = [second_date_array.join("-")];
          }
        }

        this.action_company_search_date(this.search_date_range);
      }
    },
    mounted() {
      if (this.company_search_date.start_date !== "") {
        this.search_date_range = [
          this.company_search_date.start_date,
          this.company_search_date.end_date
        ];
      }
    },
    destroyed() {
      if (this.search_date_range.length === 1) {
        this.action_company_search_date([
          this.search_date_range[0],
          this.search_date_range[0]
        ]);
      }
    }
  };
</script>

<style lang="scss">
  .company-search-date {
    margin-top: 48px;
    .v-date-picker-header {
      padding: 11px 5px !important;
    }
    .v-date-picker-table {
      padding: 0 !important;
      tbody {
        tr {
          height: 34px;
        }
      }
    }
    .v-btn__content {
      font-size: 14px !important;
    }
  }
</style>
