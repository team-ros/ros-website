<template>
  <div v-if="this.$store.state.ActiveID == directory.parentid" @click="UpdateDiv">
    <div class="wrapper">
      <img src="@/assets/Folder.png" class="logo" />
      <p class="name">{{directory.name}}</p>
      <p class="size">{{directory.size}} Byte</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    directory: Object,
  },
  methods: {
    UpdateDiv() {
      this.$store.dispatch("StartUpdateDiv", this.directory.id),
        console.log("Es geht");
    }
  }
};
</script>

<style scoped>
.event-link {
  color: black;
  text-decoration: none;
}
.wrapper {
  margin: 15px 20px 0px;
  padding: 5px;
  transition: 0.3s;
}
.wrapper:hover {
  background-color: #f3f2f1;
  border-radius: 5px;
}
.logo {
  height: 95px;
}
.name {
  font-size: 13px;
  text-align: center;
  max-width: 120px;
  margin: 0;
}
.size {
  font-size: 11px;
  text-align: center;
  margin: 0;
}
</style>