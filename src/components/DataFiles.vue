<template>
  <div v-if="this.$store.state.ActiveID == file.parentid" @contextmenu.prevent="$refs.menu.open">
    <div
      v-if="file.type == '.pdf'"
      class="wrapper"
      @mouseover="addHoverName"
      @mouseleave="removeHoverName"
      :class="{fileDeleted: fileDeleted}"
    >
      <img src="@/assets/pdf-logo.png" class="logo" />
      <input
        type="text"
        class="dataName"
        v-bind:placeholder="file.name + file.type"
        :disabled="changeNameActive == false"
        :class="{dataNameHover: hovername, seeWriteable: seeWriteable }"
        @keypress.enter="finishNameChange"
        @focusout="finishNameChange"
        ref="search"
      />
      <p class="size">{{file.size | prettyBytes}}</p>
    </div>
    <div
      v-if="file.type == '.docx'"
      class="wrapper"
      @mouseover="addHoverName"
      @mouseleave="removeHoverName"
      :class="{fileDeleted: fileDeleted}"
    >
      <img src="@/assets/docx-logo.png" class="logo" style="padding-left: 5px" />
      <input
        type="text"
        class="dataName"
        v-bind:placeholder="file.name + file.type"
        :disabled="changeNameActive == false"
        :class="{dataNameHover: hovername, seeWriteable: seeWriteable }"
        @keypress.enter="finishNameChange"
        @focusout="finishNameChange"
        ref="search"
      />
      <p class="size">{{file.size | prettyBytes}}</p>
    </div>
    <vue-context ref="menu" class="contextMenu">
      <li class="contextMenuEntries" @click="changeNameSet">
        <p>
          <i class="fas fa-eraser"></i>
          <span class="contextMenuText">Umbenennen</span>
        </p>
      </li>
      <li class="contextMenuEntries" @click="deleteFile">
        <p>
          <i class="far fa-trash-alt" style="margin-left:2px"></i>
          <span class="contextMenuText">Löschen</span>
        </p>
      </li>
      <a href="" download="" style="color: black; text-decoration: none"> 
      <li class="contextMenuEntries" >
        <p>
          <i class="fas fa-download"></i>
          <span class="contextMenuText"> Herunterladen </span>
        </p>
      </li>
      </a>
    </vue-context>
  </div>
</template>

<script>
import VueContext from "vue-context";

export default {
  data() {
    return {
      showChangeName: false,
      changeNameActive: false,
      hovername: false,
      seeWriteable: false,
      fileDeleted: false,
      box: null,
    };
  },
  components: {
    VueContext
  },
  props: {
    file: Object
  },
  methods: {
    onClick() {
      (this.showChangeName = true), console.log("test");
    },
    changeNameSet() {
      this.changeNameActive = true;
      this.seeWriteable = true;
      this.$nextTick(function() {
        this.$refs.search.focus();
      });
    },
    addHoverName() {
      this.hovername = true;
    },
    removeHoverName() {
      this.hovername = false;
    },
    finishNameChange() {
      (this.changeNameActive = false), (this.seeWriteable = false);
    },
    deleteFile(){
      this.box = window.confirm("Wollen sie die Datei "+ this.file.name + " wirklich löschen?")
      if(this.box ==true){
      this.fileDeleted = true;
      } else if(this.box==false){
        this.fileDeleted =false;
      }
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
  margin: 15px 15px 0px;
  padding: 5px;
  transition: 0.3s;
  position: relative;
  overflow-wrap: break-word;
  width: 140px;
}
.wrapper:hover {
  background-color: #f3f2f1;
  border-radius: 5px;
}
.logo {
  height: 95px;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
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
.dataName {
  border: 0;
  text-align: center;
  color: black;
  display: block;
  background-color: #fff;
  transition: 0.3s;
  border: 1px solid transparent;
}
.dataName::placeholder {
  color: black;
}
.dataNameHover {
  background-color: #f3f2f1;
}
.seeWriteable {
  border-radius: 4px;
  border: 2px solid rgb(50, 115, 220);
}
.fileDeleted{
  display: none;
}
</style>
