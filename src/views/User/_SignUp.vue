<template>
  <div class="sign-up view">
    <top-bar :topbar_type="'back'" :topbar_text="'회원가입'" />
    <router-view />
  </div>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";

  export default {
    name: "user-sign-up",
    components: { TopBar }
  };
</script>
