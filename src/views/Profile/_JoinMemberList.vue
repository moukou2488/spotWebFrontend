<template>
  <div class="profile-join_member_list">
    <top-bar :topbar_text="'참여자 목록'" :topbar_type="'back'" />
    <join-member-list-header />
    <div class="custom-br"></div>
    <join-member-list-body />
  </div>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import JoinMemberListHeader from "@/components/Profile/JoinMemberListHeader.vue";
  import JoinMemberListBody from "@/components/Profile/JoinMemberListBody.vue";

  export default {
    name: "profile-join_member_list",
    components: { TopBar, JoinMemberListHeader, JoinMemberListBody }
  };
</script>

<style></style>
