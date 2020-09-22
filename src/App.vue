<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data() {
    return {
      directorys: {},
      files: {}
    };
  },
  components: {},
  created() {
    // Falls beim Öffnen der Website auf EGAL WELCHER Seite (AUSSER LOGIN!!) kein Cookie ist -> auf Login leiten.
    if (this.$route.path != "/") {
      if (!this.$cookies.isKey("user")) {
        this.$router.push('/')
      }
    }
  },
  
};
</script>
<style scoped>


</style>

