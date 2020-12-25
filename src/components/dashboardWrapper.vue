<template>
  <div v-if="responseLoaded">
    <div class="bigContainer">
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
      />

      <nav>
        <div class="nav" id="blurBackgroundNav">
          <div>
            <a href>
              <img
                :src="require('@/assets/ros-logo.png')"
                style="height: 50px"
              />
            </a>
          </div>
          <div style="display: flex; align-items: center">
            <span style="position: relative; margin-right: 10px">{{
              user.displayName
            }}</span>
            <img
              :src="
                this.photoURL ? this.photoURL : require('@/assets/user.png')
              "
              class="logo"
              style="
                cursor: pointer;
                height: 40px;
                margin: 0.5px;
                margin-right: 10px;
              "
              @click="loadSlider"
            />
          </div>
        </div>
      </nav>

      <div class="leiste" id="blurBackgroundLeiste">
        <ul class="leiste-ul">
          <li class="leiste-ul-li leiste-button">
            <div
              v-if="this.pathIterator == -1"
              class="arrowBack"
              style="cursor: not-allowed"
            >
              <i
                class="fas fa-arrow-left"
                style="
                  margin-top: 50%;
                  transform: translateY(-50%);
                  margin-left: 30%;
                "
              ></i>
            </div>
            <div
              v-if="this.pathIterator != -1"
              class="arrowBack"
              @click="lastPath()"
            >
              <i
                class="fas fa-arrow-left"
                style="
                  margin-top: 50%;
                  transform: translateY(-50%);
                  margin-left: 30%;
                "
              ></i>
            </div>
          </li>
          <li>
            <div>
              <input
                v-if="this.$store.state.language == 'de'"
                type="text"
                class="such_box"
                placeholder="Suche nach Dateien"
                v-model="filterByName"
                @input="searchFiles()"
              />
              <input
                v-if="this.$store.state.language == 'en'"
                type="text"
                class="such_box"
                placeholder="Search for files"
                v-model="filterByName"
                @input="searchFiles()"
              />
            </div>
          </li>
          <li class="leiste-ul-li" style="float: right">
            <dropdown @newFilter="sortData" />
          </li>
          <li class="leiste-ul-li leiste-button">
            <div class="upload-wrapper">
              <label v-if="this.$store.state.language == 'de'">
                <i class="fas fa-upload" style="margin-right: 5px"></i>
                Hochladen
              </label>
              <label v-if="this.$store.state.language == 'en'">
                <i class="fas fa-upload" style="margin-right: 5px"></i> Upload
              </label>
              <input
                type="file"
                id="file"
                ref="file"
                v-on:change="uploadFile()"
              />
            </div>
          </li>
          <li class="leiste-ul-li leiste-button">
            <div class="upload-wrapper" @click="newFolder">
              <label v-if="this.$store.state.language == 'de'">
                <i class="fas fa-plus" style="margin-right: 5px"></i>
                Neuer Ordner
              </label>
              <label v-if="this.$store.state.language == 'en'">
                <i class="fas fa-plus" style="margin-right: 5px"></i>
                New Folder
              </label>
            </div>
          </li>
        </ul>
      </div>
      <div class="datencontainer" id="blurBackgroundData">
        <DataObjects
          v-for="entry in directorysOrdered || directorys.search"
          :key="entry.id"
          :file="entry"
          :directoryList="directorys"
          style="height: 150px"
          @deleteFolderInformation="deleteFolderField"
          @newPath="updatePath"
          @newCurrentPath="updateCurrentPath"
          @newParentPath="newParentPath"
          @moveFileMenu="updatemoveFileMenu"
        />
      </div>
    </div>
    <accountSlider
      v-if="this.$store.state.activeSlider === true"
      @closeAccountSlider="closeAccountSlider"
    />
    <div
      class="createDirectoryScreen createDirectoryScreenInactive"
      id="newFolderScreen"
    >
      <div class="createDirectoryField">
        <p
          v-if="this.$store.state.language == 'de'"
          class="createDirectoryFieldText"
        >
          Ordner erstellen
        </p>
        <p
          v-if="this.$store.state.language == 'en'"
          class="createDirectoryFieldText"
        >
          Create Folder
        </p>
        <img
          src="@/assets/closeX.png"
          width="16"
          height="16"
          class="createDirectoryFieldClose"
          @click="newFolderClose"
        />

        <input
          v-if="this.$store.state.language == 'de'"
          type="text"
          placeholder="Ihren Ordnernamen eingeben"
          class="createDirectoryFieldInput"
          v-model="newDirectoryName"
          v-on:input="activateButton"
          @keypress.enter="
            newDirectory(newDirectoryName);
            newFolderClose();
          "
        />
        <input
          v-if="this.$store.state.language == 'en'"
          type="text"
          placeholder="Enter your folder name"
          class="createDirectoryFieldInput"
          v-model="newDirectoryName"
          v-on:input="activateButton"
          @keypress.enter="
            newDirectory(newDirectoryName);
            newFolderClose();
          "
        />
        <input
          v-if="this.$store.state.language == 'de'"
          type="button"
          value="Erstellen"
          id="createDirectoryFieldButton"
          class="createDirectoryFieldButtonDisabled"
          @click="
            newDirectory(newDirectoryName);
            newFolderClose();
          "
          :disabled="this.newDirectoryName <= 1"
        />
        <input
          v-if="this.$store.state.language == 'en'"
          type="button"
          value="Create"
          id="createDirectoryFieldButton"
          class="createDirectoryFieldButtonDisabled"
          @click="
            newDirectory(newDirectoryName);
            newFolderClose();
          "
          :disabled="this.newDirectoryName <= 1"
        />
      </div>
    </div>
    <div
      class="deleteDirectoryScreen deleteDirectoryScreenInactive"
      id="deleteFolderScreen"
    >
      <div class="deleteDirectoryField">
        <img
          src="@/assets/closeX.png"
          width="16"
          height="16"
          class="deleteDirectoryFieldClose"
          @click="deleteFolderFieldClose"
        />
        <b v-if="this.$store.state.language == 'de'"> Wirklich Löschen? </b>
        <b v-if="this.$store.state.language == 'en'"> Delete? </b>
        <p
          v-if="this.$store.state.language == 'de'"
          class="deleteDirectoryFieldText"
        >
          Möchten sie
          <b>
            {{ this.folderNameCache.name }}
          </b>
          wirklich Löschen?
        </p>
        <p
          v-if="this.$store.state.language == 'en'"
          class="deleteDirectoryFieldText"
        >
          Do you really want to delete
          <b>
            {{ this.folderNameCache.name }}
          </b>
          ?
        </p>
        <input
          type="button"
          value="Löschen"
          id="deleteDirectoryFieldButton"
          class="deleteDirectoryFieldButton"
          @click="
            deleteFolderFieldClose();
            deleteFile();
          "
        />
      </div>
    </div>

    <!-- Verschieben Menu -->

    <div class="moveMenu createDirectoryScreenInactive" id="moveMenu">
      <div>
        <div class="moveMenuHeader">
          <div
            v-if="this.moveMenupathIterator == -1"
            class="moveMenuBack"
            style="cursor: not-allowed"
          >
            <i class="fas fa-arrow-left moveMenuArrow"></i>
          </div>
          <div
            class="moveMenuBack"
            v-if="this.moveMenupathIterator != -1"
            @click="moveMenuLastPath()"
          >
            <i class="fas fa-arrow-left moveMenuArrow"></i>
          </div>
          <div v-if="this.$store.state.language == 'de'">
            <p class="moveMenuText">Verschieben</p>
          </div>
          <div  v-if="this.$store.state.language == 'en'">
            <p class="moveMenuText">Move</p>
          </div>
          <div class="moveMenuCloseField" @click="moveMenuClose()">
            <img
              src="@/assets/closeX.png"
              width="16"
              height="16"
              class="moveMenuClose"
            />
          </div>
        </div>
        <div class="dataListClass">
          <DataList
            v-for="entry in directorysMove.listing"
            :key="entry.id"
            :file="entry"
            @MoveListing="newMoveListing"
            @MoveMenuNewCurrentPath="MoveMenuNewCurrentPath"
            @MoveMenunewParentPath="MoveMenunewParentPath"
          />
        </div>
        <div class="moveMenuButtonField">
          <input
          v-if="this.$store.state.language == 'de'"
            type="button"
            value="Hierher verschieben"
            class="moveMenuButton"
            @click="moveFile(), moveMenuClose()"
          />
          <input
          v-if="this.$store.state.language == 'en'"
            type="button"
            value="Move here"
            class="moveMenuButton"
            @click="moveFile(), moveMenuClose()"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue2Filters from "vue2-filters";
import DataObjects from "@/components/DataObjects.vue";
import accountSlider from "@/components/accountSlider.vue";
import dropdown from "@/components/dropdown.vue";
import api from "@/api";
import NProgress from "nprogress";
import DataList from "@/components/DataList.vue";
import _ from "lodash";
NProgress.configure({ parent: "#blurBackgroundData" });

export default {
  mixins: [Vue2Filters.mixin],
  data() {
    return {
      directorys: {},
      directorysMove: {},
      files: {},
      selectedFilter: "",
      options: ["Name", "Datum", "Dateityp", "Dateigröße"],
      filterExpression: "",
      filterDirection: "",
      filterByName: "",
      user: {},
      responseLoaded: true,
      newDirectoryName: "",
      folderNameCache: JSON,
      currentParentPath: null,
      pathHistory: [],
      pathIterator: -1,
      currentPath: null,
      photoURL: false,
      moveMenucurrentParentPath: null,
      moveMenupathHistory: [],
      moveMenupathIterator: -1,
      moveMenucurrentPath: null,
    };
  },

  methods: {
    updateCurrentPath(newPath) {
      this.currentPath = newPath;
      this.pathIterator++;
    },
    MoveMenuNewCurrentPath(newPath) {
      this.moveMenucurrentPath = newPath;
      this.moveMenupathIterator++;
    },
    newParentPath(newParentPath) {
      this.currentParentPath = newParentPath;
      this.pathHistory.push(newParentPath);
    },
    MoveMenunewParentPath(newParentPath) {
      this.moveMenucurrentParentPath = newParentPath;
      this.moveMenupathHistory.push(newParentPath);
    },

    async moveFile() {
      try {
        const response = await api
          .object()
          .move(
            this.$store.state.fileID,
            this.moveMenucurrentPath,
            this.$store.state.fileNameMove
          );
        console.log(response);
        console.log(this.file);
        this.fileMoved();
      } catch (err) {
        console.log(err);
      }
    },
    loadSlider() {
      this.$store.dispatch("loadSlider");
      if (this.$store.state.activeSlider === true) {
        document
          .getElementById("blurBackgroundNav")
          .classList.add("blurBackground");
        document
          .getElementById("blurBackgroundData")
          .classList.add("blurBackground");
        document
          .getElementById("blurBackgroundLeiste")
          .classList.add("blurBackground");
      }
    },
    activateButton() {
      if (this.newDirectoryName.length >= 1) {
        document
          .getElementById("createDirectoryFieldButton")
          .classList.remove("createDirectoryFieldButtonDisabled");
        document
          .getElementById("createDirectoryFieldButton")
          .classList.add("createDirectoryFieldButtonAble");
      } else {
        document
          .getElementById("createDirectoryFieldButton")
          .classList.add("createDirectoryFieldButtonDisabled");
        document
          .getElementById("createDirectoryFieldButton")
          .classList.remove("createDirectoryFieldButtonAble");
      }
    },
    deleteFolderField(value) {
      this.folderNameCache = value;
      document
        .getElementById("deleteFolderScreen")
        .classList.remove("deleteDirectoryScreenInactive");
      document
        .getElementById("blurBackgroundNav")
        .classList.add("blurBackground");
      document
        .getElementById("blurBackgroundData")
        .classList.add("blurBackground");
      document
        .getElementById("blurBackgroundLeiste")
        .classList.add("blurBackground");
    },
    deleteFolderFieldClose() {
      document
        .getElementById("deleteFolderScreen")
        .classList.add("deleteDirectoryScreenInactive");
      document
        .getElementById("blurBackgroundNav")
        .classList.remove("blurBackground");
      document
        .getElementById("blurBackgroundData")
        .classList.remove("blurBackground");
      document
        .getElementById("blurBackgroundLeiste")
        .classList.remove("blurBackground");
    },
    updatePath(newPath) {
      this.directorys = newPath;
    },
    closeAccountSlider() {
      document
        .getElementById("blurBackgroundNav")
        .classList.remove("blurBackground");
      document
        .getElementById("blurBackgroundData")
        .classList.remove("blurBackground");
      document
        .getElementById("blurBackgroundLeiste")
        .classList.remove("blurBackground");
    },

    newFolder() {
      document
        .getElementById("newFolderScreen")
        .classList.remove("createDirectoryScreenInactive");
      document
        .getElementById("blurBackgroundNav")
        .classList.add("blurBackground");
      document
        .getElementById("blurBackgroundData")
        .classList.add("blurBackground");
      document
        .getElementById("blurBackgroundLeiste")
        .classList.add("blurBackground");
    },
    newFolderClose() {
      document
        .getElementById("newFolderScreen")
        .classList.add("createDirectoryScreenInactive");
      document
        .getElementById("blurBackgroundNav")
        .classList.remove("blurBackground");
      document
        .getElementById("blurBackgroundData")
        .classList.remove("blurBackground");
      document
        .getElementById("blurBackgroundLeiste")
        .classList.remove("blurBackground");
      this.newDirectoryName = "";
    },
    async uploadFile() {
      try {
        NProgress.start();
        const test123 = await api
          .object()
          .upload(this.$refs.file.files[0], undefined, this.currentPath);
        const response = await api.object().get(this.currentPath);
        this.directorys = response;
        console.log(test123);
        NProgress.done();
      } catch (err) {
        console.log(err);
      }
    },
    async newDirectory(name) {
      NProgress.start();
      try {
        await api.object().createDir(name, this.currentPath);
        const response = await api.object().get(this.currentPath);
        this.directorys = response;
        this.directorysMove = response;
        NProgress.done();
      } catch (err) {
        console.log(err);
      }
    },
    async deleteFile() {
      NProgress.start();
      try {
        await api.object().remove(this.folderNameCache.id);
        const response = await api.object().get(this.currentPath);
        this.directorys = response;
        NProgress.done();
      } catch (err) {
        console.log(err);
      }
    },
    async fileMoved() {
      NProgress.start();
      try {
        const response = await api.object().get(this.currentPath);
        this.directorys = response;

        NProgress.done();
      } catch (err) {
        console.log(err);
      }
    },
    async searchFiles() {
      try {
        if (this.filterByName == "") {
          const response = await api.object().get(this.currentPath);
          this.directorys = response;
          console.log(response);
        } else {
          const response = await api.object().search(this.filterByName);
          this.directorys = response;
          console.log(this.directorys);
        }
      } catch (err) {
        console.log(err);
      }
    },
    async lastPath() {
      NProgress.start();

      try {
        const response = await api
          .object()
          .get(this.pathHistory[this.pathIterator]);
        this.pathHistory.pop();
        this.pathIterator--;
        this.directorys = response;
        this.currentPath = this.currentParentPath;
        this.currentParentPath = this.pathHistory[this.pathIterator];
        NProgress.done();
      } catch (err) {
        console.log(err);
      }
    },
    async moveMenuLastPath() {
      try {
        const response = await api
          .object()
          .get(this.moveMenupathHistory[this.moveMenupathIterator]);
        this.moveMenupathHistory.pop();
        this.moveMenupathIterator--;
        this.directorysMove = response;
        this.moveMenucurrentPath = this.moveMenucurrentParentPath;
        this.moveMenucurrentParentPath = this.moveMenupathHistory[
          this.moveMenupathIterator
        ];
      } catch (err) {
        console.log(err);
      }
    },
    sortData(filterByWhat) {
      console.log(filterByWhat);
      if (filterByWhat == "filterBySize") {
        this.filterExpression = "size";
        this.filterDirection = "desc";
      } else if (filterByWhat == "filterByName") {
        this.filterExpression = "name";
        this.filterDirection = "asc";
      } else if (filterByWhat == "filterByDate") {
        this.filterExpression = "date";
        this.filterDirection = "desc";
      } else if (filterByWhat == "filterByDatatype") {
        this.filterExpression = "fileExtention";
        this.filterDirection = "asc";
      } else {
        this.filterByName = this.selectedFilter;
      }
    },
    updatemoveFileMenu() {
      document
        .getElementById("moveMenu")
        .classList.remove("createDirectoryScreenInactive");
      document
        .getElementById("blurBackgroundNav")
        .classList.add("blurBackground");
      document
        .getElementById("blurBackgroundData")
        .classList.add("blurBackground");
      document
        .getElementById("blurBackgroundLeiste")
        .classList.add("blurBackground");
    },
    moveMenuClose() {
      document
        .getElementById("moveMenu")
        .classList.add("createDirectoryScreenInactive");
      document
        .getElementById("blurBackgroundNav")
        .classList.remove("blurBackground");
      document
        .getElementById("blurBackgroundData")
        .classList.remove("blurBackground");
      document
        .getElementById("blurBackgroundLeiste")
        .classList.remove("blurBackground");
      this.resetMoveMenu();
    },
    async resetMoveMenu() {
      try {
        const response = await api.object().get(null);
        this.directorysMove = response;
        (this.moveMenucurrentParentPath = null),
          (this.moveMenupathHistory = []),
          (this.moveMenupathIterator = -1),
          (this.moveMenucurrentPath = null),
          console.log("Unterhalb reset Move Menu:");
        console.log(this.directorysMove);
      } catch (err) {
        console.log(err);
      }
    },
    newMoveListing(newList) {
      this.directorysMove = newList;
    },
  },

  async mounted() {
    try {
      const response = await api.object().get(this.currentPath);
      this.user = api.firebase().auth().currentUser;
      this.directorys = response;
      this.directorysMove = response;
      console.log(this.directorys);
      this.photoURL = api.firebase().auth().currentUser.photoURL;
    } catch (err) {
      console.log(err);
    }
  },
  computed: {
    directorysOrdered() {
      return _.orderBy(
        this.directorys.listing,
        this.filterExpression,
        this.filterDirection
      );
    },
  },
  components: {
    DataObjects,
    accountSlider,
    dropdown,
    DataList,
  },
};
</script>

<style lang="scss" scoped>
@import "~selectize/dist/css/selectize.bootstrap3.css";

$rosblue: #0044b2;
$rosfont: montserrat;
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: $rosfont;
}

.selectize-input {
  width: 300px;
}
.bigContainer {
  width: 100%;
}
.nav {
  z-index: 100;
  display: flex;
  justify-content: space-between;
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  background-image: linear-gradient(60deg, #adadad, $rosblue);
  height: 60px;
  color: white;
  font-size: 25px;
  padding-left: 10px;
  padding-top: 5px;
}

.nav {
  list-style-type: none;
}

.nav li {
  display: inline-block;
  padding: 20px;
  height: 50px;
}

.logo {
  height: 30px;
  margin: auto;
  border-radius: 100%;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
}

.leiste {
  z-index: 10;
  left: 0;
  position: absolute;
  top: 60px;
  background-color: #eee;
  width: 100%;
  height: 50px;
  padding: 0px;
  align-items: center;
}
.leiste-button {
  padding: 0;
  margin: 0;
  transition: 0.3s;
  border-radius: 3px;
  height: 100%;
}
.leiste-button:hover {
  background-color: rgb(216, 216, 216);
  cursor: pointer;
}

.leiste-ul-li {
  float: left;
}

.leiste-ul li {
  display: inline-block;
  list-style: none;
}

.datencontainer {
  z-index: 9;
  position: absolute;
  background-color: white;
  overflow: auto;
  bottom: 0;
  width: 100%;
  left: 0;
  overflow-wrap: break-word;
  top: 110px;
}

.datencontainer div {
  float: left;
}
.such_box_icon {
  height: 20px;
  position: absolute;
  left: 42.5%;
  transition: 0.5s;
}

.such_box {
  position: absolute;
  width: 250px;
  height: 35px;
  text-align: center;
  top: 15%;
  transform: translate(-50%);
  left: 50%;
  border-radius: 6px;
  border: 1px solid #eee;
  outline: none;
  transition: 0.5s;
  font-size: 15px;
  color: rgb(117, 117, 117);
  &:hover {
    width: 350px;
  }
}

.hideSlider {
  transform: translateX(-110%);
}
.upload-wrapper {
  position: relative;
  display: inline-block;
  cursor: pointer;
  height: 100%;
  width: 160px;
  text-align: center;
}
.arrowBack {
  position: relative;
  cursor: pointer;
  height: 50px;
  width: 50px;
}
.upload-wrapper label {
  display: inline-block;
  height: 35px;
  margin-top: 15px;
  transition: 0.3s;
  border-radius: 3px;
  color: #000;
  cursor: pointer;
}
.upload-wrapper input[type="file"] {
  position: absolute;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  width: 100%;
  height: 50px;
  opacity: 0;
  z-index: 99;
  display: block;
  cursor: pointer;
}

.uploaded-file-name {
  position: relative;
  z-index: 999;
  display: inline-block;
}
.multiselect {
  width: 450px;
  margin-top: 7px;
  margin-left: 10px;
}
.blurBackground {
  transition: 0.2s filter linear;
  -webkit-transition: 0.2s -webkit-filter linear;
  -moz-transition: 0.2s -moz-filter linear;
  -ms-transition: 0.2s -ms-filter linear;
  -o-transition: 0.2s -o-filter linear;
  filter: brightness(30%);
  pointer-events: none;
}
.createDirectoryScreen {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
}
.createDirectoryScreenInactive {
  display: none;
}
.createDirectoryField {
  position: relative;
  top: 45%;
  left: 50%;
  transform: translate(-50%);
  height: 200px;
  width: 350px;
  background-color: white;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.4);
  padding: 30px;
}
.createDirectoryFieldText {
  position: relative;
  font-size: 20px;
  letter-spacing: 1.2px;
  display: inline-block;
  font-weight: 500;
}
.createDirectoryFieldInput {
  position: relative;
  width: 100%;
  height: 35px;
  padding: 10px;
  border: 0px;
  margin-top: 30px;
  margin-bottom: 30px;
  border: 1px solid;
  left: 50%;
  transform: translateX(-50%);
}
.createDirectoryFieldClose {
  float: right;
  cursor: pointer;
}

.createDirectoryFieldButtonDisabled {
  width: 100px;
  height: 35px;
  background-color: #eee;
  color: grey;
  font-weight: 500;
  border: 0;
  cursor: not-allowed;
}
.createDirectoryFieldButtonAble {
  width: 100px;
  height: 35px;
  background-color: $rosblue;
  color: #e5e1e6;
  font-weight: 500;
  border: 0;
  cursor: pointer;
}
.deleteDirectoryScreen {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  width: 100%;
  height: 100%;
}
.deleteDirectoryScreenInactive {
  display: none;
}
.deleteDirectoryField {
  position: relative;
  top: 45%;
  left: 50%;
  transform: translate(-50%);
  min-height: 160px;
  width: 330px;
  word-break: break-word;
  background-color: white;
  box-shadow: 0px 0px 10px 1px rgba(0, 0, 0, 0.4);
  padding: 30px;
}
.deleteDirectoryFieldText {
  position: relative;
  color: grey;
  margin-top: 10px;
  display: inline-block;
  font-weight: 400;
}
.deleteDirectoryFieldClose {
  float: right;
  cursor: pointer;
}
.deleteDirectoryFieldButton {
  width: 90px;
  margin-top: 20px;
  height: 34px;
  background-color: $rosblue;
  color: #e5e1e6;
  font-weight: 500;
  border: 0;
}
.moveMenu {
  position: absolute;
  left: 50%;
  top: 25%;
  transform: translate(-50%);
  width: 55vw;
  height: 50vh;
  background-color: #eee;
  border-color: black;
  border: 1px solid;
  z-index: 9999999999;
}
.moveMenuHeader {
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 10000;
  background-color: #eee;
  height: 60px;
  border-bottom: 1px solid #b0b0b0;
  margin-bottom: 10px;
}
.moveMenuClose {
  position: absolute;
  cursor: pointer;
  top: 50%;
  transform: translateY(-50%);
  right: 32%;
}
.moveMenuButton {
  width: 35%;
  height: 98%;
  background-color: $rosblue;
  color: #e5e1e6;
  font-weight: 500;
  border: 0;
  text-align: center;
  &:hover {
    cursor: pointer;
  }
}
.moveMenuBack {
  position: absolute;
  cursor: pointer;
  height: 100%;
  width: 50px;
  &:hover {
    background-color: rgb(216, 216, 216);
  }
}
.moveMenuButtonField {
  padding: 10px;
  text-align: center;
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 199999990000;
  background-color: #eee;
  height: 50px;
  border-top: 1px solid #b0b0b0;
}
.dataListClass {
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  overflow-y: scroll;
  max-height: 38vh;
  padding-left: 10px;
  padding-right: 10px;
}
::-webkit-scrollbar {
  width: 0px;
}
.moveMenuText {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 30%;
  font-size: 20px;
  font-weight: 500;
}
.moveMenuArrow {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
.moveMenuCloseField {
  position: absolute;
  right: 0px;
  cursor: pointer;
  height: 100%;
  width: 50px;
  &:hover {
    background-color: rgb(216, 216, 216);
  }
}
</style>
