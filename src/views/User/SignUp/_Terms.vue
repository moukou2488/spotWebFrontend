<template>
  <div class="sign-up-terms view custom-pd" role="main">
    <div class="check-all custom-checkbox-wrap">
      <input
        id="all-check"
        class="custom-checkbox agree left14"
        v-model="all_check"
        @change="toggle_all_check"
        type="checkbox"
      />
      <label for="all-check" class="custom-label agree bold"
        >전체 동의합니다.</label
      >
    </div>
    <ul class="term-list">
      <li class="term" v-for="term in terms_list" :key="term.id">
        <div class="custom-checkbox-wrap">
          <input
            :id="term.id"
            class="custom-checkbox agree"
            v-model="terms_list[term.id].checked"
            type="checkbox"
          />
          <label
            :for="term.id"
            class="custom-label agree"
            :class="term.required ? 'required' : 'option'"
          >
            {{ term.text }}
          </label>
          <button
            :id="term.id"
            v-if="term.detail"
            @click="set_modal_on"
            class="term-detail-btn"
          />
        </div>
      </li>
    </ul>
    <s-footer>
      <button
        class="btn large "
        :class="finish ? 'fill' : 'fill_disabled'"
        @click="go_sign_up_form"
        :disabled="!finish"
      >
        확인
      </button>
    </s-footer>
    <s-modal v-if="modal_state" :head_title="modal_info.head_title">
      <template v-slot:body>
        <p v-html="modal_info.terms_detail" class="modal-detail"></p>
      </template>
      <template v-slot:foot>
        <button class="btn fill large" @click="modal_off">확인</button>
      </template>
    </s-modal>
  </div>
</template>

<script>
  import SFooter from "@/layouts/SFooter.vue";
  import terms_list from "@/assets/data/terms_list.js";
  import SModal from "@/components/Common/SModal.vue";
  import { mapMutations } from "vuex";

  import { createNamespacedHelpers } from "vuex";
  const { mapActions, mapState } = createNamespacedHelpers("modalStore");

  export default {
    name: "sign-up-terms",
    components: { SFooter, SModal },
    computed: { ...mapState(["modal_state"]) },
    watch: {
      terms_list: {
        deep: true,
        handler() {
          let bool = true;
          let finish = true;
          for (const el in this.terms_list) {
            // 전체 동의 확인
            if (!this.terms_list[el].checked) {
              bool = false;
            }
            // 필수 요소 확인
            if (this.terms_list[el].required) {
              if (!this.terms_list[el].checked) {
                finish = false;
              }
            }
          }
          this.all_check = bool;
          this.finish = finish;
        }
      }
    },
    data() {
      return {
        all_check: false,
        terms_list: {
          age: {
            ...terms_list.age,
            checked: false
          },
          spot_term: {
            ...terms_list.spot_term,
            checked: false
          },
          personal_term: {
            ...terms_list.personal_term,
            checked: false
          },
          ad_term: {
            ...terms_list.ad_term,
            checked: false
          }
        },
        finish: false,

        modal_info: {
          id: null,
          head_title: null,
          terms_detail: null
        }
      };
    },
    methods: {
      ...mapMutations("userStore", ["set_check_ad_term"]),
      ...mapActions(["config_modal_state"]),
      toggle_all_check() {
        const bool = this.all_check;
        for (const el in this.terms_list) {
          this.terms_list[el].checked = bool;
        }
      },
      set_modal_on(event) {
        const ID = event.target.id;
        const modal_info = {
          id: ID,
          head_title: this.terms_list[ID].text,
          terms_detail: this.terms_list[ID].detail
        };

        this.modal_info = modal_info;
        this.config_modal_state(true);
      },
      modal_off() {
        this.config_modal_state(false);
      },
      go_sign_up_form() {
        if (!this.finish) {
          return alert("필수 사항에 동의해주세요!");
        } else {
          this.set_check_ad_term(this.terms_list.ad_term.checked);
          this.$router.push("/user/sign-up/form");
        }
      }
    },
    mounted() {
      this.$eventBus.$on("alert_close", payload => {
        if (payload.type == "login") this.$router.push("/");
      });
    },
    destroyed() {
      this.$eventBus.$off("alert_close");
    }
  };
</script>

<style lang="scss" scoped>
  .sign-up-terms {
    // 100vh - topnav
    height: calc(100vh - 48px);

    padding-top: 26px !important;

    .check-all {
      margin-bottom: 18px;
      font-size: 14px;
      padding-left: 14px;
      .bold {
        font-weight: bolder;
        font-size: 14px;
        color: #1e1e1e;
      }
    }

    .custom-checkbox-wrap {
      display: flex;
      justify-content: space-between;
    }

    .term-list {
      padding: 24px 6px 0 14px !important;
      font-size: 12px;
      font-weight: normal;
      color: #2a2a2a;
      border-top: 1px solid #e9e9e9;

      .term {
        & + .term {
          margin-top: 22px;
        }
        .term-detail-btn {
          display: inline-block;
          vertical-align: top;
          width: 36px;
          height: 36px;
          background: url("~@/assets/images/arrow_btn3x.png") center;
          background-size: cover;
        }
      }
    }
    .modal-detail {
      padding: 16px 15px 11px;
      max-height: 355px;
      overflow: scroll;
      word-break: break-all;
      white-space: pre-line;
    }
  }
</style>
