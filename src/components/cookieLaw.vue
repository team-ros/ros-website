<template>
  <footer>
    <cookie-law theme="blood-orange" buttonText="Akzeptieren!" message="Wir nutzen Cookies, um unsere Dienste zu erbringen und zu verbessern. Mit Nutzung dieser Seite akzeptieren Sie Cookies." ></cookie-law>
  </footer>
</template>
 
<script>
  import CookieLaw from 'vue-cookie-law'
  export default {
    components: { CookieLaw }
  }
</script>

<style lang="scss" scoped>

</style>