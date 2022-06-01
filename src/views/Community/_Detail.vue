<template>
  <div class="community-detail">
    <community-detail-top-bar :topbar_text="community_team.team" />
    <s-post-detail />
    <s-toast v-if="toast_show" :where="'bottom-bar'" />
    <s-comment />
  </div>
</template>

<script>
  import SPostDetail from "@/components/Community/s-post-detail.vue";
  import SComment from "@/components/Community/s-comment.vue";
  import CommunityDetailTopBar from "@/components/Community/CommunityDetailTopBar.vue";
  import SToast from "@/components/Common/SToast.vue";
  import { mapMutations, mapState } from "vuex";
  export default {
    name: "community-detail",
    components: {
      SPostDetail,
      SComment,
      CommunityDetailTopBar,
      SToast
    },
    computed: {
      ...mapState("communityStore", ["community_team"]),
      ...mapState("modalStore", ["toast_show"])
    },
    methods: {
      ...mapMutations("communityStore", ["set_modify_complete"])
    },
    beforeRouteLeave(to, from, next) {
      this.set_modify_complete(false);
      next();
    }
  };
</script>
