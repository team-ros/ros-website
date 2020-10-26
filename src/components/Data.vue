<template>
  <div
    v-if="this.$store.state.ActiveID == directory.parentid"
    @contextmenu.prevent="$refs.menu.open"
    :title="directory.name"
  >
    <div
      class="wrapper"
      @mouseover="addHoverName"
      @mouseleave="removeHoverName"
      :class="{fileDeleted: fileDeleted}"
    >
      <img src="@/assets/Folder.png" class="logo" @click="UpdateDiv" />
      <input
        type="text"
        class="dataName"
        v-bind:placeholder="directory.name"
        :disabled="changeNameActive == false"
        :class="{dataNameHover: hovername, seeWriteable: seeWriteable }"
        @keypress.enter="finishNameChange"
        @focusout="finishNameChange"
        ref="search"
      />
      <p class="size">{{directory.size | prettyBytes}}</p>
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
      <a href download style="color: rgb(117, 117, 117); text-decoration: none">
        <li class="contextMenuEntries">
          <p>
            <i class="fas fa-download"></i>
            <span class="contextMenuText">Herunterladen</span>
          </p>
        </li>
      </a>
      <li class="contextMenuEntries v-context__sub">
        <p>
          <i class="fas fa-angle-double-right"></i>
          <span class="contextMenuText">Verschieben nach</span>
        </p>
        <ul class="v-context">
          <li
            class="contextMenuEntries moveItems"
            v-for="(directoryItem, id) in directorys"
            v-bind:key="id"
            :directorys="directorys"
          >
            <span
              v-if="directoryItem.parentid == $store.state.ActiveID && directoryItem.name != directory.name"
            >{{directoryItem.name}}</span>
          </li>
        </ul>
      </li>
    </vue-context>
  </div>
</template>

<script>
import Vue from "vue";
import "vue-context/src/sass/vue-context.scss";
import VueContext from "vue-context";
import Vue2Filters from "vue2-filters";
Vue.use(Vue2Filters);

export default {
  mixins: [Vue2Filters.mixin],

  data() {
    return {
      showChangeName: false,
      changeNameActive: false,
      hovername: false,
      seeWriteable: false,
      fileDeleted: false,
      box: null
    };
  },
  components: {
    VueContext
  },
  props: {
    directory: Object,
    directorys: Array
  },
  methods: {
    UpdateDiv() {
      this.$store.dispatch("StartUpdateDiv", this.directory.id),
        console.log("Es geht");
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
    deleteFile() {
      this.box = window.confirm(
        "Wollen sie den Ordner " + this.directory.name + " wirklich löschen?"
      );
      if (this.box == true) {
        this.fileDeleted = true;
      } else if (this.box == false) {
        this.fileDeleted = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$rosblue: #0047bb;
$rosfont: montserrat;
* {
  font-family: $rosfont;
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
  height: 85px;
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
  background-color: white;
  -webkit-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 1);
  -moz-box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 1);
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 1);
  outline: none;
  list-style-type: none;
  padding: 0px;
  width: 240px;
  position: absolute;
  margin: 3px;
  border-radius: 4px;
  z-index: 10;
  color: rgb(117, 117, 117);
}
.contextMenuEntries:hover {
  background-color: #f4faff;
  color: $rosblue;
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
.fileDeleted {
  display: none;
}
.moveItems {
  position: relative;
  padding-left: 10px;
  color: rgb(117, 117, 117);
}
</style>