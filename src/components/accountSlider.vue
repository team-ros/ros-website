<template>
  <div id="accountSlider" class="accountSlider">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
    />
    <div class="accountSliderContent">
      <img
        src="@/assets/closeX.png"
        width="30"
        height="30"
        class="buttonImg"
        id="imageX"
        @click="updateAccountSliderState"
      />
      <div class="logout">
        <img src="@/assets/logout.png" width="35" height="35"  @click="logout" />
      </div>
      <h1>Account</h1>
      <p>Hier sind ihre Accountinformationen zu sehen</p>
      <input
        type="text"
        :placeholder="user.vorname + ' ' + user.nachname"
        class="accountInfos"
        readonly
      />
      <input type="text" :placeholder="user.email" class="accountInfos" readonly />
      <h3>Passwort zurücksetzen?</h3>
      <input
        v-on:input="passwordStrongTestCreate"
        class="rightPageContentInputfield"
        v-model="password1"
        type="password"
        placeholder
        required
        id="password1"
        @blur="validOrInvalidPasswordCreate1"
      />
      <input
        v-on:input="passwordStrongTestCreate"
        @change="isDisabled"
        class="rightPageContentInputfield"
        v-model="password2"
        type="password"
        placeholder
        required
        id="password2"
        @blur="validOrInvalidPasswordCreate2"
      />

      <button :disabled="disabledButton" class="resetButton">PASSWORT ÄNDERN</button>
      <h3>Projektwebsite</h3>
      <a href="http://ros-cloud.at/">ROS Cloud</a>
      <h3>Social Media</h3>
      <a href="https://www.instagram.com/ros_cloud/?hl=de" class="fa fa-instagram">
        <span style="margin-left: 4px">Instagram</span>
      </a>
      <a href="https://twitter.com/cloud_ros" class="fa fa-twitter">
        <span style="margin-left: 4px">Twitter</span>
      </a>
      <a href="https://at.linkedin.com/in/ros-cloud-5b53aa1b0" class="fa fa-linkedin">
        <span style="margin-left: 4px">LinkedIn</span>
      </a>
      <h3>Hilfe</h3>
      <router-link to="/impressum">
        <a href="#">Impressum</a>
      </router-link>
      <a href="#">Support</a>
    </div>
  </div>
</template>

<script>

import firebase from "firebase";
export default {
  data: function() {
    return {
      password1: null,
      password2: "",
      regexPassword: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      passwordStrongCreate: false,
      disabledButton: true,
      user: {}
    };
  },
  mounted() {
    this.user = this.$cookies.get("user");
  },
  methods: {
    updateAccountSliderState() {
      this.$store.dispatch("startUpdateAccountSliderState");
      this.$emit("closeAccountSlider");
    },
    passwordStrongTestCreate() {
      if (
        this.regexPassword.test(this.password1) &&
        this.regexPassword.test(this.password2)
      ) {
        this.passwordStrongCreate = true;
      } else {
        this.passwordStrongCreate = false;
      }
    },
    validOrInvalidPasswordCreate1() {
      if (this.regexPassword.test(this.password1)) {
        document.getElementById("password1").classList.add("inputValid");
        document.getElementById("password1").classList.remove("inputInvalid");
      } else {
        document.getElementById("password1").classList.add("inputInvalid");
        document.getElementById("password1").classList.remove("inputValid");
      }
    },
    validOrInvalidPasswordCreate2() {
      if (this.regexPassword.test(this.password2)) {
        document.getElementById("password2").classList.add("inputValid");
        document.getElementById("password2").classList.remove("inputInvalid");
      } else {
        document.getElementById("password2").classList.add("inputInvalid");
        document.getElementById("password2").classList.remove("inputValid");
      }
    },
    isDisabled() {
      if (
        this.password1 == this.password2 &&
        this.passwordStrongCreate === true
      ) {
        this.disabledButton = false;
      } else {
        this.disabledButton = true;
      }
    },
    logout() {
      let self = this;
      firebase
        .auth()
        .signOut()
        .catch(function(error) {
          //Falls beim LogOut ein Fehler ist ->
          console.log(error);
        })
        .then(function() {
          //Falls beim LogOut kein Fehler ist:
          // Lösche Cookie und leite auf Login weiter
          self.$cookies.remove("user");
          self.$cookies.remove("token");
          self.$router.push("/");
        });
    }
  }
};
</script>

<style lang="scss" scoped>
$rosblue: #0044b2;
$rosfont: montserrat;
::-webkit-scrollbar {
  width: 0px; /* Remove scrollbar space */
}
* {
  font-family: $rosfont;
  overflow: hidden;
}
.accountSlider {
  width: 400px;
  height: 100%;
  z-index: 200;
  right: 0;
  top: 0;
  color: black;
  background-color: #ffffff;
  box-shadow: -6px 0px 16px 1px rgba(0, 0, 0, 0.75);
  position: fixed;
  padding: 0px 35px 0px 35px;
  overflow-y: scroll;
}
.accountSliderContent {
  display: grid;
  align-content: center;
  justify-content: center;
}
.buttonImg {
  position: relative;
  top: 30px;
  cursor: pointer;
}
.hideSlider {
  transform: translateX(-110%);
}

h1 {
  margin-top: 40px;
}
h1,
h3 {
  margin-bottom: 0;
}
h3 {
  margin-top: 30px;
  margin-bottom: 10px;
}
.accountInfos {
  display: block;
  width: 98.5%;
  border-color: #adadad;
  border-top: none;
  border-left: none;
  border-right: none;
  outline: none;
  font-size: 16px;
  color: black;
  padding: 2px;
  height: 30px;
}
.resetButton {
  width: 100%;
  margin-top: 10px;
  height: 35px;
  background-color: $rosblue;
  border-radius: 3px;
  color: #ffffff;
  border-color: $rosblue;
  font-size: 18px;
  cursor: pointer;
  outline: none;
  transition: opacity 0.5s ease-out;
  -moz-transition: opacity 0.5s ease-out;
  -webkit-transition: opacity 0.5s ease-out;
  -o-transition: opacity 0.5s ease-out;
}
.resetButton:disabled {
  opacity: 40%;
}
a {
  text-decoration: none;
  color: black;
}
.fa {
  margin-bottom: 3px;
}
.rightPageContentInputfield {
  display: block;
  width: 98.5%;
  border-color: #adadad;
  border-top: none;
  border-left: none;
  border-right: none;
  outline: none;
  font-size: 16px;
  color: black;
  padding: 2px;
  height: 30px;
}
.logout {
  margin-left: 290px;
}
.logout:hover{
  cursor: pointer;
}
.inputValid {
  border-color: $rosblue;
  transition: ease-in-out 0.5s;
}
.inputInvalid {
  border-color: #cc0000;
  transition: ease-in-out 0.5s;
}
</style>