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
        @click="
          updateAccountSliderState();
          closeBlock();
        "
      />
      <div class="logout">
        <img src="@/assets/logout.png" width="35" height="35" @click="logout" />
      </div>

      <h1>Account</h1>

      <p v-if="this.$store.state.language == 'de'">
        Hier sind Ihre Accountinformationen zu sehen
      </p>
      <p v-if="this.$store.state.language == 'en'">
        Here you can see your account information
      </p>
      <input
        type="text"
        :placeholder="user.displayName"
        class="accountInfos"
        readonly
      />
      <input
        type="text"
        :placeholder="user.email"
        class="accountInfos"
        readonly
      />
      <h3 v-if="this.$store.state.language == 'de'">Sprache</h3>
      <h3 v-if="this.$store.state.language == 'en'">Language</h3>
      <p class="languageBox">
        <span @click="languageDE()" class="language"> Deutsch </span>|
        <span @click="languageEN()" class="language"> English </span>
      </p>
      <h3 v-if="this.$store.state.language == 'de'">Passwort zurücksetzen?</h3>
      <h3 v-if="this.$store.state.language == 'en'">reset password?</h3>
      <button
        class="resetButton"
        @click="resetPassword()"
        v-if="this.$store.state.language == 'de'"
      >
        PASSWORT ZURÜCKSETZEN
      </button>
      <button
        class="resetButton"
        @click="resetPassword()"
        v-if="this.$store.state.language == 'en'"
      >
        RESET PASSWORD
      </button>
      <h3 v-if="this.$store.state.language == 'de'">Projektwebsite</h3>
      <h3 v-if="this.$store.state.language == 'en'">Project website</h3>
      <a href="https://project.ros-cloud.at/">ROS Cloud</a>
      <h3 v-if="this.$store.state.language == 'de'">Soziale Medien</h3>
      <h3 v-if="this.$store.state.language == 'en'">Social Media</h3>
      <a
        href="https://www.instagram.com/ros_cloud/?hl=de"
        class="fa fa-instagram"
      >
        <span style="margin-left: 4px">Instagram</span>
      </a>
      <a href="https://twitter.com/cloud_ros" class="fa fa-twitter">
        <span style="margin-left: 4px">Twitter</span>
      </a>
      <a
        href="https://at.linkedin.com/in/ros-cloud-5b53aa1b0"
        class="fa fa-linkedin"
      >
        <span style="margin-left: 4px">LinkedIn</span>
      </a>
      <h3 v-if="this.$store.state.language == 'de'">Hilfe</h3>
      <h3 v-if="this.$store.state.language == 'en'">Help</h3>
      <router-link to="/impressum">
        <a v-if="this.$store.state.language == 'de'" href="#">Impressum</a>
        <a v-if="this.$store.state.language == 'en'" href="#">imprint</a>
      </router-link>
      <router-link to="/dsgvo">
        <a v-if="this.$store.state.language == 'de'" href="#">DSGVO</a>
        <a v-if="this.$store.state.language == 'en'" href="#">GDPR</a>
      </router-link>
      <a href="mailto:support@ros-cloud.at?subject=Support">Support</a>
      <button v-if="this.$store.state.language == 'de'" class="deleteAccountButton" @click="deleteAccount()">
        ACCOUNT LÖSCHEN
      </button>
       <button v-if="this.$store.state.language == 'en'" class="deleteAccountButton" @click="deleteAccount_en()">
        DELETE ACCOUNT
      </button>
    </div>
    <div class="emailMessage" v-if="this.emailSent">
      <img
        src="@/assets/closeX.png"
        width="16"
        height="16"
        class="closeIcon"
        @click="closeBlock()"
      />
      <p>
        Eine E-Mail zum Passwort zurücksetzen wurde erfolgreich an
        <b> {{ this.user.email }} </b> gesendet.
      </p>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import "firebase/auth";
export default {
  data: function () {
    return {
      password1: null,
      password2: "",
      regexPassword: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      passwordStrongCreate: false,
      disabledButton: true,
      user: {},
      emailSent: false,
    };
  },
  mounted() {
    this.user = api.firebase().auth().currentUser;
    console.log(this.user);
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
      api
        .firebase()
        .auth()
        .signOut()
        .catch(function (error) {
          //Falls beim LogOut ein Fehler ist ->
          console.log(error);
        })
        .then(() => {
          //Falls beim LogOut kein Fehler ist:
          // Lösche Cookie und leite auf Login weiter

          this.$router.push("/");
        });
    },
    async resetPassword() {
      const self = this;
      api
        .firebase()
        .auth()
        .sendPasswordResetEmail(this.user.email)
        .then(function () {
          self.emailSent = true;
        })
        .catch(function (error) {
          console.log(error);
        });
    },

    deleteAccount() {
      var check = window.prompt("Um Ihren Account inklusive sämtlichen Dateien unwiderruflich zu löschen bitte folgendes Eingeben: Löschen ");
      if (check == "Löschen") {
        var user = api.firebase().auth().currentUser;
        user
          .delete()
          .then(() => {
            this.$router.push("/");
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    deleteAccount_en() {
      var check = window.prompt("To delete your account including all files irrevocably please enter the following: Delete");
      if (check == "Delete") {
        var user = api.firebase().auth().currentUser;
        user
          .delete()
          .then(() => {
            this.$router.push("/");
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    },
    closeBlock() {
      this.emailSent = false;
    },
    languageDE() {
      this.$store.dispatch("changeLanguage", "de");
    },
    languageEN() {
      this.$store.dispatch("changeLanguage", "en");
    },
  },
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
  box-shadow: -10px 0px 16px 1px rgba(0, 0, 0, 0.4);
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
  margin-top: 15px;
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
.deleteAccountButton {
  width: 100%;
  margin-top: 15px;
  height: 35px;
  background-color: #BE5450;
  border-radius: 3px;
  color: #ffffff;
  border-color: #BE5450;
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
.logout:hover {
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
.emailMessage {
  background-color: #5cb85c;
  position: absolute;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  left: 0;
  bottom: 0;
  min-height: 80px;
}
.closeIcon {
  position: absolute;
  right: 5px;
  top: 10px;
  margin: 5px;
  padding: 5px;
  padding-top: 10px;

  cursor: pointer;
}
.languageBox {
  margin: 0px;
}
.language {
  cursor: pointer;
}
</style>