<template>
  <section class="about-weather">
    <top-bar :topbar_text="'[가이드] 동행날씨 가이드'" :topbar_type="'back'" />
    <weather-header />
    <weather-body />
    <weather-footer />
  </section>
</template>

<script>
  import TopBar from "@/components/Common/TopBar.vue";
  import WeatherHeader from "@/components/About/WeatherHeader.vue";
  import WeatherBody from "@/components/About/WeatherBody.vue";
  import WeatherFooter from "@/components/About/WeatherFooter.vue";

  export default {
    name: "about-weather",
    components: { TopBar, WeatherHeader, WeatherBody, WeatherFooter }
  };
</script>

<style lang="scss" scoped>
  .about-weather {
  }
</style>
