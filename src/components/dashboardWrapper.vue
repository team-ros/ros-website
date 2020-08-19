<template>
  <div>
    <div class="bigContainer">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" />

      <nav>
        <div class="nav" id="blurBackgroundNav">
          <div>
            <a href>
              <img :src="require('@/assets/ros-logo.png')" style=" height:50px; " />
            </a>
          </div>
          <div style="display: flex; align-items:center; ">
            <span style="position: relative; ">Max Mustermann</span>
            <img
              :src="require('@/assets/user.png')"
              class="logo"
              style=" cursor: pointer; height: 40px; margin: .5px"
              @click="loadSlider"
            />
          </div>
        </div>
      </nav>

      <div class="leiste" id="blurBackgroundLeiste">
        <ul class="leiste-ul">
          <li>
            <div>
              <input
                type="text"
                class="such_box"
                placeholder="Suche nach Dateien"
                v-model="filterByName"
                @keypress.enter="sortData(filterByName)"
              />
              <img src="@/assets/searchIcon.png" class="such_box_icon" />
            </div>
          </li>
          <li class="leiste-ul-li">
            <dropdown @newFilter="sortData" />
          </li>
          <li class="leiste-ul-li leiste-button">
            <div class="upload-wrapper">
              <label>
                <i class="fas fa-upload"></i> Hochladen
              </label>
              <input type="file" name="my-upload-field" />
            </div>
          </li>
          <li class="leiste-ul-li leiste-button">
            <div class="upload-wrapper" @click="newDirectory">
              <label>
                <i class="fas fa-plus"></i>
                Neuer Ordner
              </label>
            </div>
          </li>
        </ul>
      </div>

      <div class="datencontainer" id="blurBackgroundData" v-if="this.filterByName == ''">
        <Data
          v-for="(directory, id) in orderBy(
            directorys,
            this.filterExpression,
            this.filterDirection
          )"
          v-bind:key="id"
          :directory="directory"
          style="height:150px"
        />

        <DataFiles
          v-for="(file, id) in orderBy(
            files,
            this.filterExpression,
            this.filterDirection
          )"
          v-bind:key="id + 100"
          :file="file"
          style="height:150px"
        />
      </div>
      <div class="datencontainer" id="blurBackgroundData" v-if="this.filterByName != ''">
        <Data
          v-for="(directory, id) in filterBy(directorys, this.filterByName)"
          v-bind:key="id"
          :directory="directory"
          style="height:150px"
        />

        <DataFiles
          v-for="(file, id) in filterBy(files, this.filterByName)"
          v-bind:key="id + 1000"
          :file="file"
          style="height:150px"
        />
      </div>
    </div>
    <accountSlider
      v-if="this.$store.state.activeSlider === true"
      @closeAccountSlider="closeAccountSlider"
    />
  </div>
</template>

<script>
import Vue from "vue";
import Vue2Filters from "vue2-filters";
import Data from "@/components/Data.vue";
import DataFiles from "@/components/DataFiles.vue";
import EventService from "@/services/EventService.js";
import accountSlider from "@/components/accountSlider.vue";
import dropdown from "@/components/dropdown.vue";

Vue.use(Vue2Filters);

export default {
  mixins: [Vue2Filters.mixin],
  data() {
    return {
      directorys: {},
      files: {},
      selectedFilter: "",
      options: ["Name", "Datum", "Dateityp", "Dateigröße"],
      filterExpression: "",
      filterDirection: "",
      filterByName: ""
    };
  },
  methods: {
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
    newDirectory() {},
    sortData(filterByWhat) {
      console.log(filterByWhat);
      if (filterByWhat == "filterBySize") {
        this.filterExpression = "size";
        this.filterDirection = -1;
      } else if (filterByWhat == "filterByName") {
        this.filterExpression = "name";
        this.filterDirection = 1;
      } else if (filterByWhat == "filterByDate") {
        this.filterExpression = "date";
        this.filterDirection = -1;
      } else if (filterByWhat == "filterByDatatype") {
        this.filterExpression = "type";
        this.filterDirection = 1;
      } else {
        this.filterByName = this.selectedFilter;
      }
    }
  },
  components: {
    Data,
    DataFiles,
    accountSlider,
    dropdown
  },
  created() {
    EventService.getDirectorys()
      .then(response => {
        this.directorys = response.data;
      })
      .catch(error => {
        console.log("There was an error:", error.response); // Logs out the error
      });
    EventService.getFiles()
      .then(response => {
        this.files = response.data;
      })
      .catch(error => {
        console.log("There was an error:", error.response); // Logs out the error
      });
  }
};
</script>

<style lang="scss" scoped>
@import "~selectize/dist/css/selectize.bootstrap3.css";

$rosblue: #0044b2;

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: Helvetica;
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
  background-image: linear-gradient(90deg, #5d8dfc, $rosblue);
  height: 50px;
  color: white;
  font-size: 25px;
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
}

.leiste {
  z-index: 10;
  left: 0;
  position: absolute;
  top: 50px;
  background-color: #f4faff;
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
  float: right;
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
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  overflow-wrap: break-word;
  padding-top: 95px;
}

.datencontainer div {
  float: left;
}

.such_box {
  position: absolute;
  width: 200px;
  height: 35px;
  top: 50%;
  transform: translateY(-50%);
  left: 41px;
  padding-left: 4px;
  border-radius: 6px;
  border: 1px solid #eee;
  outline: none;
  padding-left: 30px;
  transition: 0.5s;
  font-size: 15px;
  color: rgb(117,117,117);
  &:hover {
    width: 350px;
  }
}

.such_box_icon {
  height: 20px;
  position: absolute;
  left: 45px;
  transition: 0.5s;
}

.fa-search {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  right: 14px;
  color: grey;
  font-size: 15px;
}

.hideSlider {
  transform: translateX(-110%);
}
.upload-wrapper {
  position: relative;
  display: inline-block;
  cursor: pointer;
  height: 100%;
  width: 150px;
  text-align: center;
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
  filter: brightness(40%);
}
</style>
