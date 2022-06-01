import router from "@/router/index.js";
import store from "@/store/index.js";
import eventBus from "@/eventBus.js";

export default [
  {
    path: "/company",
    name: "company",
    redirect: "/company/index",
    component: () => import("@/views/Company/Company.vue"),
    children: [
      // 동행 리스트
      {
        path: "index",
        name: "company-index",
        beforeEnter(to, from, next) {
          // 동행 상세에서 뒤로 갈 경우 리스트를 초기화하지 않도록

          if (from.name !== "company-detail")
            store.commit("companyStore/set_company_list", []);
          next();
        },
        component: () => import("@/views/Company/_Index.vue")
      },
      {
        path: "detail",
        redirect: "/company/index"
      },
      // 동행 상세 보기
      {
        path: "detail/:id",
        name: "company-detail",
        beforeEnter: async (to, from, next) => {
          // 유저 정보 셋업
          await store.dispatch("userStore/api_users");
          // 동행 상세 데이터 셋업
          await store.dispatch(
            "companyStore/api_get_tour_detail",
            to.params.id
          );
          if (store.getters.user_info) {
            await store.dispatch(
              "companyStore/api_get_my_company_list",
              to.params.id
            );
          }
          next();
        },
        component: () => import("@/views/Company/_Detail.vue")
      },
      // 신고하기
      {
        path: "report/:item/:id",
        name: "company-report",
        async beforeEnter(to, from, next) {
          await store.dispatch("userStore/api_users");
          const user_info = store.getters.user_info;
          if (!user_info) {
            eventBus.$emit("alert", { type: "login" });
            next(from); // 이전 페이지로 돌아가기
          } else {
            // 이메일 인증
            if (user_info.emailVerified === false) {
              eventBus.$emit("alert", { type: "email-auth" });
              next(from);
            } else {
              store.commit("reportStore/set_report_item", to.params.item);
              store.commit("reportStore/set_report_id", to.params.id);
              store.commit("reportStore/set_etc", "");
              store.commit("reportStore/set_violationIndex", 1);
              next();
            }
          }
        },
        component: () => import("@/views/Company/_Report.vue")
      },
      // 동행 작성
      {
        path: "write",
        name: "company-write",
        async beforeEnter(to, from, next) {
          await store.dispatch("userStore/api_users");
          const user_info = store.getters.user_info;
          if (!user_info) {
            store.dispatch("modalStore/config_dialog_state", {
              modal_state: true,
              modal_type: "login",
              dialog_scroll_height: window.scrollY
            });
            next(from); // 이전 페이지로 돌아가기
          } else {
            // 이메일 인증
            if (user_info.emailVerified === false) {
              eventBus.$emit("alert", { type: "email-auth" });
              next(from);
            } else {
              // 작성 후 뒤로가기 -> 작성 페이지로 다시 가지 않게 방지
              if (
                from.name === "company-detail" &&
                store.state.companyWriteStore.modify_company_id === null
              )
                router.go(-1);
              else {
                next();
              }
            }
          }
        },
        component: () => import("@/views/Company/_Write.vue")
      },
      // 동행 작성
      {
        path: "write/date_picker",
        name: "company-write-date_picker",
        component: () => import("@/views/Company/Write/_DatePicker.vue")
      },
      {
        path: "write/game_picker/:item",
        name: "company-write-game_picker",
        component: () => import("@/views/Company/Write/_GamePicker.vue")
      },
      // 동행 검색
      {
        path: "search",
        name: "company-search",
        component: () => import("@/views/Company/_Search.vue"),
        redirect: "/company/search/index",
        children: [
          {
            path: "index",
            name: "company-search-index",
            component: () => import("@/views/Company/Search/_Index.vue")
          },
          {
            path: "keyword",
            name: "company-search-keyword",
            component: () => import("@/views/Company/Search/_Keyword.vue")
          },
          {
            path: "date",
            name: "company-search-date",
            component: () => import("@/views/Company/Search/_Date.vue")
          },
          {
            path: "result",
            name: "company-search-result",
            component: () => import("@/views/Company/Search/_Result.vue")
          }
        ]
      },
      {
        path: "theme/:theme",
        name: "company-theme",
        component: () => import("@/views/Company/_Theme.vue"),
        async beforeEnter(to, from, next) {
          await store.dispatch(
            "companyStore/api_tour_search_theme",
            to.params.theme
          );
          next();
        }
      }
    ]
  }
];
