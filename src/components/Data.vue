<template>
  <div
    v-if="this.$store.state.ActiveID == directory.parentid"
    @contextmenu.prevent="$refs.menu.open"
  >
    <div class="wrapper" @click="UpdateDiv">
      <img src="@/assets/Folder.png" class="logo" />
      <p class="name">{{directory.name}}</p>
      <p class="size">{{directory.size}} Byte</p>
    </div>
    <vue-context ref="menu" class="contextMenu">
      <li class="contextMenuEntries" @mouseover="onClick">
        <p>
          <i class="fas fa-eraser"></i>
          <span class="contextMenuText">Umbenennen</span>
        </p>
      </li>
      <li v-if="this.showChangeName == true">
        <input type="text" class="changeName" />
      </li>
      <li class="contextMenuEntries">
        <p>
          <i class="far fa-trash-alt" style="margin-left:2px"></i>
          <span class="contextMenuText">Löschen</span>
        </p>
      </li>
      <li class="contextMenuEntries">
        <p>
          <i class="fas fa-download"></i>
          <span class="contextMenuText">Herunterladen</span>
        </p>
      </li>
    </vue-context>
  </div>
</template>

<script>
import VueContext from "vue-context";
export default {
  data() {
    return {
      showChangeName: false,
    };
  },
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
    },
    onClick() {
      this.showChangeName = true,
      console.log("test")
    }
  }
};
</script>

<style scoped>
* {
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
  background-color: #eee;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 1);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 1);
  outline: none;
  list-style-type: none;
  padding: 0px;
  width: 180px;
  position: absolute;
  margin: 3px;
  border-radius: 4px;
  z-index: 10;
}
.contextMenuEntries:hover {
  width: 100%;
  margin: 0px;
  padding: 0px;
  background-color: rgb(216, 216, 216);
  cursor: pointer;
}
.contextMenuEntries p {
  margin: 0;
  margin-left: 8px;
  height: 40px;
  display: flex;
  align-items: center;
}
.contextMenuText {
  position: relative;
  left: 12px;
}
.changeName {
  display: block;
  position: relative;
  width: 180px;
  border: 0px;
  height: 30px;
  padding: 0;
  margin: 0;
  transition: .5s;
}
.changeNameShow{
  display: none;
}
</style>