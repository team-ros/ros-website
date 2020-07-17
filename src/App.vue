<template>
  <div id="app">
    <div class="bigContainer">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" />

    <nav>
      <ul class="nav">
        <a href>
          <img :src="require('./assets/ros-logo.png')" style="margin-left: 15px; height:50px" />
        </a>
        <li>
          <span>Max Mustermann</span>
          <img :src="require('./assets/user.png')" class="logo" style="transform: translateY(6px);" />
        </li>
      </ul>
    </nav>

    <div class="menubar">
      <p style="color:#797979; font-weight: 300; padding-left:10px;">Deine Daten</p>
      <hr class="menubar-line" style="margin-left:10px;" />
      <!-- Vue Single File Components -->

      <MenuleisteInhalt
        v-for="(directory, id) in directorys"
        v-bind:key="id"
        :directory="directory"
      />
    </div>

    <div class="leiste">
      <ul class="leiste-ul">
        <li>
          <div class="such_box">
            <input type="text" placeholder="Suchen.." />
            <i class="fas fa-search"></i>
          </div>
        </li>

        <li class="leiste-ul-li">
          <div class="leiste-button">
            <i class="fas fa-upload" style="margin-top:12px;"></i>
            Hochladen
          </div>
        </li>
        <li class="leiste-ul-li">
          <div class="leiste-button">
            <i class="fas fa-plus" style="margin-top:12px; "></i>
            Neuer Ordner
          </div>
        </li>
      </ul>
    </div>

    <div class="datencontainer">
      <Data
        v-for="(directory, id) in directorys"
        v-bind:key="id"
        :directory="directory"
        style="height:150px"
      />

      <DataFiles v-for="(file, id) in files" v-bind:key="id+10" :file="file" style="height:150px" />
    </div>
    <accountSlider/>
  </div>
  </div>
</template>

<script>
import Data from "@/components/Data.vue";
import DataFiles from "@/components/DataFiles.vue";
import MenuleisteInhalt from "@/components/MenuleisteInhalt.vue";
import EventService from "@/services/EventService.js";
import accountSlider from '@/components/accountSlider.vue';

export default {
  data() {
    return {
      directorys: {},
      files: {}
    };
  },
  components: {
    Data,
    DataFiles,
    MenuleisteInhalt,
    accountSlider
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
.bigContainer{
  overflow: hidden;
}
nav ul {
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
}

.logo {
  height: 30px;
  margin: auto;
}

.menubar {
  z-index: 100;
  position: absolute;
  background-color: #f3f2f1;
  width: 250px;
  top: 50px;
  height: auto;
  left: 0;
  margin: 0;
  padding-top: 15px;
  padding-left: 0px;
  bottom: 0;
}

.menubar-line {
  height: 1px;
  width: 230px;
  margin-top: 4px;
  background-color: #797979;
}

.leiste {
  z-index: 10;
  left: 0;
  position: absolute;
  top: 50px;
  background-color: #f3f2f1;
  width: 100%;
  height: 40px;
  padding-left: 250px;
}
.leiste-button {
  height: 40px;
  transition: 0.3s;
  border-radius: 3px;
}
.leiste-button:hover {
  height: 40px;
  background-color: rgb(216, 216, 216);
  cursor: pointer;
}

.leiste-ul-li {
  float: right;
  margin-left: 100px;
  margin-right: 10px;
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
  padding-left: 250px;
  padding-top: 85px;
  display: flex;
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

</style>