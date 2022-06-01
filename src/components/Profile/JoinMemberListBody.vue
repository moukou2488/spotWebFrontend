<template>
  <ul class="join-member-list-body">
    <join-member-list-item
      v-for="member in join_member_list"
      :key="member"
      :user_nick="member"
    />
  </ul>
</template>

<script>
  import JoinMemberListItem from "./JoinMemberListItem.vue";

  import { mapActions } from "vuex";

  export default {
    name: "join-member-list-body",
    components: { JoinMemberListItem },

    data: () => ({
      join_member_list: []
    }),
    methods: {
      ...mapActions("profileStore", ["api_get_confirm_member"])
    },
    async mounted() {
      const member_list = await this.api_get_confirm_member();
      this.join_member_list = member_list;
    }
  };
</script>
