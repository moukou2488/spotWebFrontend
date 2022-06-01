export default {
  methods: {
    set_focus(event, bool) {
      const ID = event.target.id;
      if (ID.includes("birth")) this.focus.birth = bool;
      else this.focus[event.target.id] = bool;
      this.focus[event.target.id] = bool;
    }
  }
};
