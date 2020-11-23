<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import api from "@/api";

export default {
  methods: {
    async CheckIfUserIsSignedIn(n) {
      for (let i = 0; i <= n; i++) {
        console.log("USER:", api.firebase().auth().currentUser);
        if (api.firebase().auth().currentUser) return true;
        await this.timeout(300);
      }
      return false;
    },
    timeout(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
  },

  async created() {
    if (!(await this.CheckIfUserIsSignedIn(3))) {
      this.$router.push("/");
    } else {
      if (this.$route.path != "/dashboard") this.$router.push("/dashboard");
    }
  }
};
</script>

<style scoped></style>
