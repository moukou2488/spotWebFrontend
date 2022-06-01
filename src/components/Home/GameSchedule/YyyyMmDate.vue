<template>
  <div class="yyyy-mm-date not-kr">
    <div class="date-wrap year-wrap">
      <span class="date-number">{{ this_search_month[0] }}</span>
      <span class="date-number">{{ this_search_month[1] }}</span>
      <span class="date-number">{{ this_search_month[2] }}</span>
      <span class="date-number">{{ this_search_month[3] }}</span>
    </div>
    <div class="dot-wrap">
      <span class="dot"></span>
      <span class="dot"></span>
    </div>
    <div class="date-wrap month-wrap">
      <span class="date-number">{{ this_search_month[5] }}</span>
      <span class="date-number">{{ this_search_month[6] }}</span>
      <a
        class="date-picker-link"
        href="#"
        @click.prevent="date_pick_active = true"
      >
        <img
          class="icon-image"
          :src="require('@/assets/images/Home_month_picker@3x.png')"
          alt="달력 아이콘"
        />
      </a>
    </div>
    <div
      v-if="date_pick_active"
      @click.self="date_pick_active = false"
      class="date-picker-wrap"
    >
      <v-date-picker
        type="month"
        v-model="this_search_month"
        class="date-picker"
        :no-title="true"
        :full-width="true"
        locale="ko-KR"
        color="#3bb1ff"
        @click:month="change_month"
      />
    </div>
  </div>
</template>

<script>
  import { mapMutations, mapState } from "vuex";
  export default {
    name: "yyyy-mm-date",
    computed: {
      ...mapState("gameScheduleStore", ["search_year", "search_month"])
    },
    watch: {
      date_pick_active(bool) {
        if (bool) {
          document.querySelector("html").classList.add("modal-on");
        } else {
          document.querySelector("html").classList.remove("modal-on");
        }
      },
      search_month(new_val) {
        // 월이 바뀌면 다시 v-picker 용 데이터 셋업
        this.this_search_month = this.search_year + "-" + new_val;
      }
    },
    data: () => ({
      this_search_month: "",
      date_pick_active: false
    }),
    methods: {
      ...mapMutations("gameScheduleStore", [
        "set_search_year",
        "set_search_month"
      ]),
      change_month() {
        // v-picker 용 데이터는 YYYY-MM 형태
        this.set_search_year(this.this_search_month.split("-")[0]);
        this.set_search_month(this.this_search_month.split("-")[1]);
        this.date_pick_active = false;
      }
    },
    mounted() {
      // v-picker 용 데이터 셋업
      this.this_search_month = this.search_year + "-" + this.search_month;
    }
  };
</script>

<style lang="scss" scoped>
  .yyyy-mm-date {
    display: flex;
    align-items: center;
    .date-wrap {
      display: flex;
      align-items: center;
      .date-number {
        display: inline-flex;
        justify-content: center;
        align-items: center;
        width: 14px;
        height: 16px;

        color: #fff;
        font-size: 12px;
        font-weight: 500;
        line-height: 16px;

        border-radius: 2px;
        background-color: #5dbfff;
        & + .date-number {
          margin-left: 2px;
        }
      }
      .date-picker-link {
        display: inline-block;
        vertical-align: top;
        width: 18px;
        height: 18px;
        margin-left: 1px;
        .icon-image {
          width: 100%;
          height: 100%;
        }
      }
    }

    .dot-wrap {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 8px;
      height: 16px;
      .dot {
        display: inline-block;
        vertical-align: top;
        width: 2px;
        height: 2px;
        border-radius: 50%;
        background-color: #5dbfff;
        & + .dot {
          margin-top: 4px;
        }
      }
    }
    .date-picker-wrap {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: 999;
      display: flex;
      padding: 0 44px;
      align-items: center;
      background-color: rgba($color: #000, $alpha: 0.55);
      .date-picker {
        width: 100%;
        height: 240px;
      }
    }
  }
</style>
