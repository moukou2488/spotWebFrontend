import more_btn_list from "@/assets/data/more_btn_list.js";

function modal_on(bool) {
  if (bool) {
    document.querySelector("html").classList.add("modal-on");
  } else {
    document.querySelector("html").classList.remove("modal-on");
  }
}

export default {
  namespaced: true,
  state: {
    modal_state: false,

    dialog_state: false,
    dialog_type: "",
    dialog_scroll_height: 0,

    // toast 상태
    toast_show: false,
    toast_msg: "",
    toast_timeout: null,

    props_data: null,

    // cropper
    cropper_show: false,
    cropper_url: "",

    // 더보기 버튼 리스트
    more_btn_show: false,
    more_btn_header: "프로필 사진 바꾸기",
    more_btn_list: [],
    more_btn_choose_index: null,
    more_btn_props_data: null
  },
  mutations: {
    set_modal_state(state, bool) {
      state.modal_state = bool;
    },
    set_dialog_state(state, bool) {
      state.dialog_state = bool;
    },
    set_dialog_type(state, str) {
      state.dialog_type = str;
    },
    set_dialog_scroll_height(state, height) {
      state.dialog_scroll_height = height;
    },
    set_toast_show(state, bool) {
      state.toast_show = bool;
    },
    set_toast_msg(state, str_msg) {
      state.toast_msg = str_msg;
    },
    set_toast_timeout(state, timeout) {
      state.toast_timeout = timeout;
    },
    set_props_data(state, payload) {
      state.props_data = payload;
    },
    set_body_modal_state(state, bool) {
      modal_on(bool);
    },
    set_cropper_show(state, bool) {
      modal_on(bool);
      state.cropper_show = bool;
    },
    set_cropper_url(state, url) {
      state.cropper_url = url;
    },

    //
    set_more_btn_show(state, bool) {
      modal_on(bool);
      state.more_btn_show = bool;
      if (bool) {
        state.more_btn_choose_index = null;
      }
    },
    set_more_btn_list(state, type) {
      state.more_btn_list = more_btn_list[type];
    },
    set_more_btn_choose_index(state, number) {
      state.more_btn_choose_index = number;
      state.more_btn_show = false;
    },
    set_more_btn_header(state, text) {
      state.more_btn_header = text;
    },
    set_more_btn_props_data(state, data) {
      state.more_btn_props_data = data;
    }
  },
  actions: {
    config_modal_state({ commit }, bool) {
      commit("set_body_modal_state", bool);
      commit("set_modal_state", bool);
    },

    config_dialog_state({ commit }, config_info) {
      if (config_info === false) {
        commit("set_dialog_state", false);
        commit("set_props_data", null);
      }
      const {
        modal_state,
        modal_type,
        dialog_scroll_height,
        props_data
      } = config_info;

      commit("set_body_modal_state", modal_state);

      commit("set_dialog_scroll_height", dialog_scroll_height);
      commit("set_dialog_type", modal_type);
      commit("set_dialog_state", modal_state);

      if (props_data) commit("set_props_data", props_data);
    },

    config_toast_show({ state, commit }, toast_msg) {
      // 2초가 진행 중이라면 timeout 초기화
      if (state.toast_timeout !== null) {
        clearTimeout(state.toast_timeout);
      }
      commit("set_toast_show", true);
      commit("set_toast_msg", toast_msg);

      // 2초 뒤 toast 닫기 및 timeout 등록 해제
      const timeout = setTimeout(() => {
        commit("set_toast_show", false);
        commit("set_toast_timeout", null);
      }, 2000);

      // timeout 등록
      commit("set_toast_timeout", timeout);
    },

    config_more_btn_show({ commit }, payload) {
      commit("set_more_btn_show", true);
      commit("set_more_btn_list", payload.type);
      commit("set_more_btn_header", payload.header);
    }
  }
};
