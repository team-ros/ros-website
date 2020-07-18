<template>
  <div v-if="this.$store.state.ActiveID == file.parentid">
    <div class="wrapper">
      <img src="@/assets/pdf-logo.png" class="logo" />
      <p class="name">{{file.name}}</p>
      <p class="size">{{file.type}} </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    file: Object
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
  position: relative;
  overflow-wrap: break-word;
  width: 120px;
}
.wrapper:hover {
  background-color: #f3f2f1;
  border-radius: 5px;
}
.logo {
  height: 95px;
  padding-left: 25px
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