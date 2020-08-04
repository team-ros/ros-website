<template>
  <div v-if="this.$store.state.ActiveID == directory.parentid" @click="UpdateDiv">
    <div class="wrapper" @contextmenu.prevent="$refs.menu.open">
      <img src="@/assets/Folder.png" class="logo" />
      <p class="name">{{directory.name}}</p>
      <p class="size">{{directory.size}} Byte</p>
    </div>
    <vue-context ref="menu" class="contextMenu">
      <li class="contextMenuEntries">
        <p>Umbenennen</p>
      </li>
      <li class="contextMenuEntries">
        <p>Löschen</p>
      </li>
      <li class="contextMenuEntries">
        <p>Herunterladen</p>
      </li>
    </vue-context>
  </div>
</template>

<script>
import VueContext from "vue-context";
export default {
  components: {
    VueContext
  },
  props: {
    directory: Object
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
*{
  font-family: helvetica;
}
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
.contextMenu {
  background-color: lightgray;
  -webkit-box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.75);
  box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.75);
  outline: none;
  list-style-type: none;
  padding: 0px;
  width: 150px;
  position: absolute;
    margin: 0px;

}
.contextMenuEntries:hover {
  width: 100%;
  margin: 0px;
  padding: 0px;
  background-color: grey;
  cursor: pointer;
}
</style>