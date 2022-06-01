import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState("modalStore", ["props_data"])
  },
  methods: {
    ...mapActions("modalStore", ["config_dialog_state", "config_toast_show"])
  }
};
