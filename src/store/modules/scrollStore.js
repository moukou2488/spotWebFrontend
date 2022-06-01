export default {
  namespaced: true,
  state: {
    history_length: 1,
    scroll_info: {
      home: 0
    }
  },
  mutations: {
    set_scroll_info(state, payload) {
      const { route, scroll_y } = payload;
      state.scroll_info[route] = scroll_y;
    },
    add_history_length(state) {
      state.history_length += 1;
    },
    set_history_length(state, number) {
      state.history_length = number;
    }
  },
  actions: {}
};
