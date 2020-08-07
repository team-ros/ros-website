<template>
  <div id="app">
    <div class="bigContainer">
      <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" />

      <nav>
        <div class="nav" id="blurBackgroundNav">
          <div>
            <a href>
              <img :src="require('./assets/ros-logo.png')" style=" height:50px; " />
            </a>
          </div>
          <div style="display: flex; align-items:center; ">
            <span style="position: relative; ">Max Mustermann</span>
            <img
              :src="require('./assets/user.png')"
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
            <treeSelect class="multiselect" placeholder="Where are you from?" />
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

      <div class="datencontainer" id="blurBackgroundData">
        <Data
          v-for="(directory, id) in directorys"
          v-bind:key="id"
          :directory="directory"
          style="height:150px"
        />

        <DataFiles
          v-for="(file, id) in files"
          v-bind:key="id+10"
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
import Data from "@/components/Data.vue";
import DataFiles from "@/components/DataFiles.vue";
import EventService from "@/services/EventService.js";
import accountSlider from "@/components/accountSlider.vue";
import treeSelect from "@/components/treeSelect.vue";

export default {
  data() {
    return {
      directorys: {},
      files: {}
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
    newDirectory(){
      
    }
  },
  components: {
    Data,
    DataFiles,
    accountSlider,
    treeSelect
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

<style scoped>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: Helvetica;
}

.bigContainer {
  overflow: hidden;
}
.nav {
  z-index: 100;
  display: flex;
  justify-content: space-between;

  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  background-image: linear-gradient(90deg, #5d8dfc, #0048fd);
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
  background-color: #f3f2f1;
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
  position: relative;
  width: 400px;
  top: 5px;
}

.such_box input[type="text"] {
  width: 100%;
  padding: 5px;
  padding-right: 60px;
  box-sizing: border-box;
  background: white;
  border: 2px solid #fff;
  border-radius: 3px;
  font-size: 13px;
  color: black;
  outline: none;
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