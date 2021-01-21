<template>
<div @mouseleave.prevent="$refs.menu.close">
  <div @contextmenu.prevent="$refs.menu.open">
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
      <img
        v-else-if="this.file.fileExtention == 'docx'"
        src="@/assets/doc.png"
        class="logo"
      />
      <img
        v-else-if="this.file.fileExtention == 'png'"
        src="@/assets/png.png"
        class="logo"
      />
      <img
        v-else-if="
          this.file.fileExtention == 'jpg' || this.file.fileExtention == 'jpeg'
        "
        src="@/assets/jpg.png"
        class="logo"
      />

      <img
        v-else-if="this.file.fileExtention == 'html'"
        src="@/assets/html.png"
        class="logo"
      />
      <img
        v-else-if="this.file.fileExtention == 'js'"
        src="@/assets/javascript.png"
        class="logo"
      />
      <img
        v-else-if="this.file.fileExtention == 'xml'"
        src="@/assets/xml.png"
        class="logo"
      />
      <img
        v-else-if="this.file.fileExtention == 'rtf'"
        src="@/assets/rtf.png"
        class="logo"
      />
      <img
        v-else-if="this.file.fileExtention == 'iso'"
        src="@/assets/iso.png"
        class="logo"
      />
      <img
        v-else-if="this.file.fileExtention == 'pdf'"
        src="@/assets/pdf.png"
        class="logo"
      />
      <img
        v-else-if="this.file.fileExtention == 'json'"
        src="@/assets/json-file.png"
        class="logo"
      />
      <img
        v-else-if="this.file.fileExtention == 'ai'"
        src="@/assets/ai.png"
        class="logo"
      />
      <img
        v-else-if="this.file.fileExtention == 'csv'"
        src="@/assets/csv.png"
        class="logo"
      />
      <img
        v-else-if="this.file.fileExtention == 'exe'"
        src="@/assets/exe.png"
        class="logo"
      />
      <img
        v-else-if="this.file.fileExtention == 'mp3'"
        src="@/assets/mp3.png"
        class="logo"
      />
      <img
        v-else-if="this.file.fileExtention == 'mp4'"
        src="@/assets/mp4.png"
        class="logo"
      />
      <img
        v-else-if="this.file.fileExtention == 'ppt'"
        src="@/assets/ppt.png"
        class="logo"
      />
      <img
        v-else-if="this.file.fileExtention == 'psd'"
        src="@/assets/psd.png"
        class="logo"
      />
      <img
        v-else-if="this.file.fileExtention == 'txt'"
        src="@/assets/txt.png"
        class="logo"
      />
      <img
        v-else-if="this.file.fileExtention == 'xls'"
        src="@/assets/xls.png"
        class="logo"
      />
      <img
        v-else-if="this.file.fileExtention == 'zip'"
        src="@/assets/zip.png"
        class="logo"
      />
      <img v-else src="@/assets/file.png" class="logo" />

      <input
        type="text"
        class="dataName"
        v-model="file.name"
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
    <div> 
    <vue-context ref="menu" class="contextMenu">
      <li class="contextMenuEntries" @click="changeNameSet">
        <p>
          <i class="fas fa-eraser"></i>
          <span
            v-if="this.$store.state.language == 'de'"
            class="contextMenuText"
            >Umbenennen</span
          >
          <span
            v-if="this.$store.state.language == 'en'"
            class="contextMenuText"
            >Rename</span
          >
        </p>
      </li>
      <li class="contextMenuEntries" @click="deleteFile">
        <p>
          <i class="far fa-trash-alt" style="margin-left: 2px"></i>
          <span
            v-if="this.$store.state.language == 'de'"
            class="contextMenuText"
            >Löschen</span
          >
          <span
            v-if="this.$store.state.language == 'en'"
            class="contextMenuText"
            >Delete</span
          >
        </p>
      </li>
      <div
        style="color: rgb(117, 117, 117); text-decoration: none"
      >
        <li class="contextMenuEntries" v-if="file.type != 'directory'">
          <a
            :href="this.sameOriginURL"
            :download="this.file.name"
          >
            <p>
              <i class="fas fa-download"></i>
              <span
                v-if="this.$store.state.language == 'de'"
                class="contextMenuText"
              >
                Herunterladen
              </span>
              <span
                v-if="this.$store.state.language == 'en'"
                class="contextMenuText"
              >
                Download
              </span>
            </p>
          </a>
        </li>
      </div>
      <li class="contextMenuEntries" @click="moveFileMenu()">
        <p>
          <i class="fas fa-angle-double-right"></i>
          <span
            v-if="this.$store.state.language == 'de'"
            class="contextMenuText"
            style="margin-left: 3px"
            >Verschieben nach</span
          >
          <span
            v-if="this.$store.state.language == 'en'"
            class="contextMenuText"
            style="margin-left: 3px"
            >Move to</span
          >
        </p>
      </li>
      <li class="contextMenuEntries v-context__sub">
        <p>
          <i class="fas fa-info-circle"></i>
          <span class="contextMenuText">Info</span>
        </p>
        <ul class="v-context">
          <li
            v-if="this.$store.state.language == 'de'"
            style="color: black; padding: 5px; padding-right: 10px"
          >
            <p>Erstellt am: {{ getHumanDate(this.file.date) }}</p>
            <p v-if="file.type != 'directory'">
              Typus: {{ this.file.fileExtention }}
            </p>
            <p>Object-ID: {{ this.file.id }}</p>
            <p>Dateigröße: {{ file.size | prettyBytes }}</p>
          </li>
          <li
            v-if="this.$store.state.language == 'en'"
            style="color: black; padding: 5px; padding-right: 10px"
          >
            <p>Created: {{ getHumanDate(this.file.date) }}</p>
            <p v-if="file.type != 'directory'">
              Type: {{ this.file.fileExtention }}
            </p>
            <p>Object-ID: {{ this.file.id }}</p>
            <p>File size: {{ file.size | prettyBytes }}</p>
          </li>
        </ul>
      </li>
    </vue-context>
    </div>
  </div>
  </div>
</template>


<script>
import VueContext from "ros-vue-context";
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
    moveFileMenu() {
      this.$emit("moveFileMenu");
      this.$store.dispatch("moveFileMenuName", this.file.name);
      this.$store.dispatch("moveFileMenuID", this.file.id)
    },
    async changeName(newName) {
      try {
        await api.object().move(this.file.id, this.file.parent, newName);
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
        console.log(response);
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
    }
  },
  async mounted() {
    await this.getFileURL();
      try {
        const response = await api.object().download(this.singleFileURL);
        this.sameOriginURL = response;
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    
  }
};
</script>
<style lang="scss" scoped>
@import "~ros-vue-context/src/sass/vue-context";

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
  margin: 10px;
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
