<template>
  <div @contextmenu.prevent="$refs.menu.open" :title="file.name">
    <div
      class="wrapper"
      @mouseover="addHoverName"
      @mouseleave="removeHoverName"
      :class="{ fileDeleted: fileDeleted }"
    >
      <img
        v-if="this.file.type == 'directory'"
        src="@/assets/Folder2.png"
        class="logo logo2"
        @click="getNewPath()"
      />
      <img v-else-if="filetype == 'docx'" src="@/assets/doc.png" class="logo" />
      <img v-else-if="filetype == 'png'" src="@/assets/png.png" class="logo" />
      <img
        v-else-if="filetype == 'jpg' || filetype == 'jpeg'"
        src="@/assets/jpg.png"
        class="logo"
      />

      <img v-else-if="filetype == 'html'" src="@/assets/html.png" class="logo" />
      <img v-else-if="filetype == 'js'" src="@/assets/javascript.png" class="logo" />
      <img v-else-if="filetype == 'xml'" src="@/assets/xml.png" class="logo" />
      <img v-else-if="filetype == 'rtf'" src="@/assets/rtf.png" class="logo" />
      <img v-else-if="filetype == 'iso'" src="@/assets/iso.png" class="logo" />
      <img v-else-if="filetype == 'pdf'" src="@/assets/pdf.png" class="logo" />
      <img
        v-else-if="filetype == 'json'"
        src="@/assets/json-file.png"
        class="logo"
      />
      <img v-else-if="filetype == 'ai'" src="@/assets/ai.png" class="logo" />
      <img v-else-if="filetype == 'csv'" src="@/assets/csv.png" class="logo" />
      <img v-else-if="filetype == 'exe'" src="@/assets/exe.png" class="logo" />
      <img v-else-if="filetype == 'mp3'" src="@/assets/mp3.png" class="logo" />
      <img v-else-if="filetype == 'mp4'" src="@/assets/mp4.png" class="logo" />
      <img v-else-if="filetype == 'ppt'" src="@/assets/ppt.png" class="logo" />
      <img v-else-if="filetype == 'psd'" src="@/assets/psd.png" class="logo" />
      <img v-else-if="filetype == 'txt'" src="@/assets/txt.png" class="logo" />
      <img v-else-if="filetype == 'xls'" src="@/assets/xls.png" class="logo" />
      <img v-else-if="filetype == 'zip'" src="@/assets/zip.png" class="logo" />
      <img v-else src="@/assets/file.png" class="logo">

      <input
        type="text"
        class="dataName"
        v-model="newName"
        v-bind:placeholder="file.name"
        :disabled="changeNameActive == false"
        :class="{ dataNameHover: hovername, seeWriteable: seeWriteable }"
        @keypress.enter="
          finishNameChange();
          changeName(newName);
        "
        @focusout="
          finishNameChange();
          changeName(newName);
        "
        ref="search"
      />
      <p v-if="file.type != 'directory'" class="size">
        {{ file.size | prettyBytes }}
      </p>
      <p v-if="file.type == 'directory'" class="size">
        {{ getHumanDate(this.file.date) }}
      </p>
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
          <i class="far fa-trash-alt" style="margin-left: 2px"></i>
          <span class="contextMenuText">Löschen</span>
        </p>
      </li>
      <div
        @click="downloadFile"
        style="color: rgb(117, 117, 117); text-decoration: none"
        :href="singleFileURL"
        :download="file.name"
      >
        <li class="contextMenuEntries" v-if="file.type != 'directory'">
          <a :href="this.sameOriginURL" :download="this.file.name">
            <p>
              <i class="fas fa-download"></i>
              <span class="contextMenuText"> Herunterladen </span>
            </p>
          </a>
        </li>
      </div>
      <li class="contextMenuEntries v-context__sub">
        <p>
          <i class="fas fa-angle-double-right"></i>
          <span class="contextMenuText" style="margin-left: 3px"
            >Verschieben nach</span
          >
        </p>
        <ul class="v-context">
          <li v-for="directory in directoryList.listing" :key="directory.id">
            <a
              v-if="directory.type == 'directory' && directory.id != file.id"
              @click="moveFile(file.id, directory.id, file.name)"
              style="color: black"
            >
              {{ directory.name }}
            </a>
          </li>
        </ul>
      </li>
      <li class="contextMenuEntries v-context__sub">
        <p>
          <i class="fas fa-info-circle"></i>
          <span class="contextMenuText">Info</span>
        </p>
        <ul class="v-context">
          <li style="color: black; padding: 5px; padding-right: 10px">
            <p>Erstellt am: {{ getHumanDate(this.file.date) }}</p>
            <p v-if="file.type != 'directory'">Typus: {{ this.filetype }}</p>
            <p>Object-ID: {{ this.file.id }}</p>
            <p>Dateigröße: {{ file.size | prettyBytes }}</p>
          </li>
        </ul>
      </li>
    </vue-context>
  </div>
</template>


<script>
import VueContext from "vue-context";
import "vue-context/src/sass/vue-context.scss";
import moment from "moment";
import NProgress from "nprogress";

import api from "@/api";

export default {
  data() {
    return {
      showChangeName: false,
      changeNameActive: false,
      hovername: false,
      seeWriteable: false,
      fileDeleted: false,
      box: null,
      filetype: "",
      newName: "",
      singleFileURL: "",
      sameOriginURL: "",
    };
  },
  components: {
    VueContext,
  },
  props: {
    file: Object,
    directoryList: Object,
  },
  methods: {
    changeNameSet() {
      this.changeNameActive = true;
      this.seeWriteable = true;
      this.$nextTick(function () {
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
      this.$emit("deleteFolderInformation", this.file);
    },
    async changeName(newName) {
      try {
        await api.object().move(this.file.id, this.file.parent, newName);
      } catch (err) {
        console.log(err);
      }
    },
    async moveFile(ID, directoryID, name) {
      try {
        const response = await api.object().move(ID, directoryID, name);
        console.log(response);
        this.$emit("fileMoved");
      } catch (err) {
        console.log(err);
      }
    },
    getHumanDate(date) {
      return moment(date).format("DD.MM.YYYY");
    },
    async getNewPath() {
      NProgress.start();
      try {
        const response = await api.object().get(this.file.id);
        this.$emit("newCurrentPath", this.file.id);
        this.$emit("newPath", response);
        this.$emit("newParentPath", this.file.parent);
        NProgress.done();
      } catch (err) {
        console.log(err);
      }
    },
    async getFileURL() {
      try {
        const response = await api.object().get(this.file.id);
        if (response.url) this.singleFileURL = response.url;
      } catch (err) {
        console.log(err);
      }
    },
    async downloadFile() {
      try {
        const response = await api.object().download(this.singleFileURL);
        this.sameOriginURL = response;
      } catch (err) {
        console.log(err);
      }
    },
  },
  async mounted() {
    await this.getFileURL();
    const re = /(?:.([^.]+))?$/;
    this.filetype = re.exec(this.file.name)[1];
  },
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
  margin: 40px 20px 0px;
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
  a {
    color: $rosblue;
  }
}
.contextMenuEntries p {
  margin: 0;
  margin-left: 8px;
  height: 40px;
  display: flex;
  align-items: center;
}
.contextMenuEntries {
  a {
    color: rgb(117, 117, 117);
    text-decoration: none;
  }
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
  padding-left: 40px;
  margin-bottom: 2px;
}
</style>
