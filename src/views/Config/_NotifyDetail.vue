<template>
  <section>
    <top-bar :topbar_text="category" :topbar_type="'back'" />
    <config-notify-detail v-if="notify_detail" />
  </section>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import ConfigNotifyDetail from "@/components/Config/ConfigNotifyDetail.vue";
  import { mapMutations, mapState } from "vuex";

  export default {
    components: { TopBar, ConfigNotifyDetail },
    data: () => ({ category: "" }),
    computed: {
      ...mapState("configStore", ["terms_list", "notify_list", "notify_detail"])
    },
    methods: { ...mapMutations("configStore", ["set_notify_detail"]) },
    mounted() {
      // 새로고침 에러 방지
      this.category = this.$route.params.category;
      let search_list = [];
      if (this.category === "정보") {
        search_list = this.terms_list;
      } else if (this.category === "공지사항") {
        search_list = this.notify_list;
      }

      for (let i = 0; i < search_list.length; i++) {
        if (this.$route.params.item === search_list[i].item) {
          this.set_notify_detail(search_list[i]);
        }
      }
    }
  };
</script>
