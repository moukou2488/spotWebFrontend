<template>
  <div class="company-search-keyword">
    <ul class="search-auto-complete-list">
      <li v-for="item in club_list" :key="item.key" class="auto-complete-item">
        <div
          class="icon-wrap map"
          @click="set_company_search_keyword(item.name)"
        >
          <img
            class="icon-image"
            :src="require('@/assets/images/ic_location@3x.png')"
            alt="map 아이콘"
          />
        </div>
        <p
          class="auto-complete-txt"
          @click="set_company_search_keyword(item.name)"
        >
          {{ item.name }}
        </p>
        <div class="icon-wrap search" @click="go_search(item.name)">
          <img
            class="icon-image"
            :src="require('@/assets/images/bt_search@3x.png')"
            alt="검색 아이콘"
          />
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import { createNamespacedHelpers } from "vuex";
  const { mapState, mapMutations } = createNamespacedHelpers("companyStore");

  export default {
    name: "company-search-keyword",
    computed: {
      ...mapState(["company_search_date", "company_search_keyword"])
    },
    data: () => ({
      club_list: [
        {
          key: 0,
          name: "잠실, 두산 베어스"
        },
        {
          key: 1,
          name: "고척, 키움 히어로즈"
        },
        {
          key: 2,
          name: "잠실, LG 트윈스"
        },
        {
          key: 3,
          name: "사직, 롯데 자이언츠"
        },
        {
          key: 4,
          name: "대구, 삼성 라이온즈"
        },
        {
          key: 5,
          name: "대전, 한화 이글스"
        },
        {
          key: 6,
          name: "광주, KIA 타이거즈"
        },
        {
          key: 7,
          name: "수원, kt wiz"
        },
        {
          key: 8,
          name: "문학, SSG 랜더스"
        },
        {
          key: 9,
          name: "창원, NC 다이노스"
        }
      ]
    }),
    methods: {
      ...mapMutations(["set_company_search_keyword"]),

      go_search(item_name) {
        // 자동 완성 돋보기 클릭시 액션
        this.set_company_search_keyword(item_name);
        if (this.company_search_date.start_date === "") {
          // 날짜 데이터가 비어있을 경우
          this.$router.push("/company/search/index");
          return;
        } else {
          // 날짜 데이터가 있는 경우 바로 검색
          this.$router.push("/company/search/result");
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .company-search-keyword {
    margin-top: 48px;
    .search-auto-complete-list {
      padding: 0 4px 0 13px !important;
      .auto-complete-item {
        display: flex;
        align-items: center;
        width: 100%;
        .icon-wrap {
          &.map {
            width: 22px;
            height: 22px;
          }
          &.search {
            width: 40px;
            height: 40px;
          }
          .icon-image {
            width: 100%;
            height: 100%;
          }
        }
        .auto-complete-txt {
          flex: 1;
          padding-left: 19px;
          font-size: 14px;
          line-height: 19px;
          color: #464646;
        }
      }
    }
  }
</style>
