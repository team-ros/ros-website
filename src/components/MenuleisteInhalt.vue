<template>
  <router-link class="event-link" :to="{name: 'Data'}">
    <div class="wrapper">
      <img src="@/assets/FolderSmall.png" class="logo" />
      <p class="name">{{directory.name}}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    directory: Object
  },
};
</script>

<style scoped>
.event-link {
  color: black;
  text-decoration: none;
}
.wrapper {
  display: flex;
  width: 250px;
  margin: 0;
  height: 40px;
  display: flex;
  align-items: center;
  transition: 0.3s;
}
.router-link-exact-active{

  font-weight: bold;
}
.wrapper:hover {
  background-color: rgb(216, 216, 216);
}


.logo {
  height: 20px;
  margin-right: 15px;
  margin-left: 10px;
}
</style>