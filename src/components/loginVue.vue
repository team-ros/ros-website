<template>
  <div>
    <div class="bigWrapper">
      <div class="wrapper">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />

        <div class="loginForm">
          <div class="leftPage">
            <div class="slidershow">
              <div class="slides">
                <input
                  type="radio"
                  name="r"
                  id="r1"
                  checked
                  @click="firstSlideActive()"
                />
                <input
                  type="radio"
                  name="r"
                  id="r2"
                  @click="secondSlideActive()"
                />

                <div class="slide s1" v-if="this.$store.state.language == 'de'">
                  <img src="@/assets/Slide1.png" alt />
                </div>
                <div class="slide s1" v-if="this.$store.state.language == 'en'">
                  <img src="@/assets/Slide1_us.png" alt />
                </div>
                <div class="slide" v-if="this.$store.state.language == 'de'">
                  <img src="@/assets/Slide2.png" alt />
                </div>
                <div class="slide" v-if="this.$store.state.language == 'en'">
                  <img src="@/assets/Slide2_us.png" alt />
                </div>

                <div class="navigation">
                  <label
                    for="r1"
                    class="bar sliderButtonActive"
                    id="navLabel1"
                  ></label>
                  <label for="r2" class="bar" id="navLabel2"></label>
                </div>
              </div>
            </div>
          </div>
          <div class="rightPage" id="rightPage">
            <div id="logo">
              <img src="@/assets/ros-logo.png" class="rightPageContentLogo" />
              <p class="languageBox">
                <span @click="languageDE()" class="language"> Deutsch </span>|
                <span @click="languageEN()" class="language"> English </span>
              </p>
            </div>

            <div class="rightPageContent">
              <div class="loginActive" id="rightPageContentLogin">
                <h1 v-if="this.$store.state.language == 'de'">
                  Willkommen zurück!
                </h1>
                <h1 v-if="this.$store.state.language == 'en'">Welcome Back!</h1>
                <br />

                <p
                  class="rightPageContentGrey"
                  id="rightPageContentLoginEmailfield"
                  v-if="this.$store.state.language == 'de'"
                >
                  E-Mail
                </p>
                <p
                  class="rightPageContentGrey"
                  id="rightPageContentLoginEmailfield"
                  v-if="this.$store.state.language == 'en'"
                >
                  E-mail
                </p>
                <input
                  @input="validOrInvalidEmail"
                  v-model="email"
                  class="rightPageContentInputfield"
                  type="text"
                  placeholder
                  required
                  id="email"
                />
                <p
                  v-if="this.$store.state.language == 'de'"
                  class="rightPageContentGrey"
                >
                  Passwort
                </p>
                <p
                  v-if="this.$store.state.language == 'en'"
                  class="rightPageContentGrey"
                >
                  Password
                </p>
                <input
                  @input="validOrInvalidPassword"
                  v-on:input="passwordStrongTestLogin"
                  v-model="passwordlogin"
                  class="rightPageContentInputfield"
                  type="password"
                  placeholder
                  required
                  id="password"
                />
                <br />

                <button
                  :disabled="this.passwordStrong != true"
                  class="rightPageContentLoginbutton"
                  @click="regularLogin"
                >
                  LOGIN
                </button>

                <button
                  @click="loginWithGoogle"
                  value="G+"
                  class="rightPageContentGooglebutton"
                >
                  <i class="fa fa-google-plus" style="color: #db4a39"></i>
                </button>
                <p
                  v-if="this.$store.state.language == 'de'"
                  class="rightPageContentText"
                >
                  Noch keinen Account?
                  <span
                    style="color: #002c6b; cursor: pointer"
                    id="createAccountButton"
                    @click="createSwitch(), closeErrorBlock()"
                  >
                    Erstelle einen!
                  </span>
                </p>
                <p
                  v-if="this.$store.state.language == 'en'"
                  class="rightPageContentText"
                >
                  No account yet?
                  <span
                    style="color: #002c6b; cursor: pointer"
                    id="createAccountButton"
                    @click="createSwitch(), closeErrorBlock()"
                  >
                    Create one!
                  </span>
                </p>
                <p
                  v-if="this.$store.state.language == 'de'"
                  class="rightPageContentText"
                  style="margin-top: -5px"
                  @click="resetPassword()"
                >
                  <span style="color: #002c6b; cursor: pointer">
                    Passwort vergessen?
                  </span>
                </p>
                <p
                  v-if="this.$store.state.language == 'en'"
                  class="rightPageContentText"
                  style="margin-top: -5px"
                  @click="resetPassword()"
                >
                  <span style="color: #002c6b; cursor: pointer">
                    Forgot Password?
                  </span>
                </p>
              </div>

              <div class="registerInactive" id="rightPageContentRegister">
                <div id="blurDiv">
                  <h1 v-if="this.$store.state.language == 'de'">Willkommen!</h1>
                  <h1 v-if="this.$store.state.language == 'en'">Welcome!</h1>
                  <br />

                  <p class="rightPageContentGrey">Name</p>
                  <input
                    v-model="name"
                    id="name"
                    class="rightPageContentInputfield"
                    type="text"
                    placeholder
                    required
                    @input="validOrInvalidName"
                  />
                  <p class="rightPageContentGrey">E-Mail</p>
                  <input
                    @input="validOrInvalidEmailCreate"
                    v-model="emailCreate"
                    class="rightPageContentInputfield"
                    type="text"
                    placeholder
                    required
                    id="emailCreate"
                  />
                  <p
                    v-if="this.$store.state.language == 'de'"
                    class="rightPageContentGrey"
                  >
                    Passwort
                  </p>
                  <p
                    v-if="this.$store.state.language == 'en'"
                    class="rightPageContentGrey"
                  >
                    Password
                  </p>
                  <input
                    v-on:input="passwordStrongTestCreate"
                    class="rightPageContentInputfield"
                    v-model="password1"
                    type="password"
                    placeholder
                    required
                    id="password1"
                    @input="validOrInvalidPasswordCreate1"
                  />
                  <p
                    v-if="this.$store.state.language == 'de'"
                    class="rightPageContentGrey"
                  >
                    Passwort wiederholen
                  </p>
                  <p
                    v-if="this.$store.state.language == 'en'"
                    class="rightPageContentGrey"
                  >
                    Repeat password
                  </p>
                  <input
                    v-on:input="passwordStrongTestCreate"
                    class="rightPageContentInputfield"
                    v-model="password2"
                    type="password"
                    placeholder
                    required
                    id="password2"
                    @input="validOrInvalidPasswordCreate2"
                  />
                  <br />

                  <button
                    v-if="this.$store.state.language == 'de'"
                    :disabled="this.passwordStrongCreate != true"
                    class="rightPageContentLoginbutton"
                    style="width: 100%"
                    @click="registerAccount()"
                  >
                    REGISTRIEREN
                  </button>
                  <button
                    v-if="this.$store.state.language == 'en'"
                    :disabled="this.passwordStrongCreate != true"
                    class="rightPageContentLoginbutton"
                    style="width: 100%"
                    @click="registerAccount()"
                  >
                    REGISTER
                  </button>
                  <p
                    v-if="this.$store.state.language == 'de'"
                    class="rightPageContentText"
                  >
                    Du hast schon einen Account?
                    <span
                      style="color: #002c6b; cursor: pointer"
                      id="loginAccountButton"
                      @click="loginSwitch(), closeErrorBlock()"
                      >Zum Login!</span
                    >
                  </p>
                  <p
                    v-if="this.$store.state.language == 'en'"
                    class="rightPageContentText"
                  >
                    Already have an account?
                    <span
                      style="color: #002c6b; cursor: pointer"
                      id="loginAccountButton"
                      @click="loginSwitch(), closeErrorBlock()"
                    >
                      Login!</span
                    >
                  </p>
                </div>
                <div
                  v-if="this.$store.state.language == 'de'"
                  class="passwordSafety"
                  id="passwordSafety"
                >
                  <p style="margin-top: 0">
                    Aufgrund der Sicherheit Ihrere Daten stellen wir folgende
                    Mindestanforderungen für Passwörter
                  </p>
                  <hr
                    style="
                      border: 0;
                      height: 1px;
                      background-image: linear-gradient(
                        to right,
                        rgba(0, 0, 0, 0),
                        rgba(0, 0, 0, 0.75),
                        rgba(0, 0, 0, 0)
                      );
                    "
                  />
                  <ul>
                    <li>mindestens 8 Zeichen lang</li>
                    <li>mindestens ein Großbuchstabe</li>
                    <li>mindestens ein Kleinbuchstabe</li>
                    <li>mindestens ein Sonderzeichen</li>
                  </ul>
                </div>

                <div
                  v-if="this.$store.state.language == 'en'"
                  class="passwordSafety"
                  id="passwordSafetyEn"
                >
                  <p style="margin-top: 0">
                    Due to the security of your data, we set the following
                    minimum requirements for passwords
                  </p>
                  <hr
                    style="
                      border: 0;
                      height: 1px;
                      background-image: linear-gradient(
                        to right,
                        rgba(0, 0, 0, 0),
                        rgba(0, 0, 0, 0.75),
                        rgba(0, 0, 0, 0)
                      );
                    "
                  />
                  <ul>
                    <li>at least 8 characters lonag</li>
                    <li>at least one capital letter</li>
                    <li>at least one lower case letter</li>
                    <li>at least one special character</li>
                  </ul>
                </div>

                <p
                  v-if="this.$store.state.language == 'de'"
                  class="rightPageContentText"
                >
                  unsere
                  <span
                    @mouseover="showPasswordSafety"
                    @mouseleave="leavePasswordSafety"
                    style="color: #002c6b; cursor: pointer"
                    >Mindestanforderungen</span
                  >
                  für ein Passwort
                </p>
                <p
                  v-if="this.$store.state.language == 'en'"
                  class="rightPageContentText"
                >
                  our
                  <span
                    @mouseover="showPasswordSafetyEn"
                    @mouseleave="leavePasswordSafetyEn"
                    style="color: #002c6b; cursor: pointer"
                    >minimum requirements</span
                  >
                  for a password
                </p>
              </div>
            </div>
          </div>
          <div class="passwortRecoveryBlock" v-if="this.emailSent">
            <p
              class="passwortRecoveryBlockMessage"
              v-if="this.$store.state.language == 'de'"
            >
              Eine E-Mail zum Passwort ändern wurde an {{ this.email }} gesendet
            </p>
            <p
              class="passwortRecoveryBlockMessage"
              v-if="this.$store.state.language == 'en'"
            >
              A password change email was sent to: {{ this.email }}
            </p>
            <img
              src="@/assets/closeX.png"
              width="16"
              height="16"
              class="closeIcon"
              @click="closeErrorBlock()"
            />
          </div>
          <div class="loginError" v-if="this.loginError">
            <p
              v-if="this.userNotFound && this.$store.state.language == 'de'"
              class="passwortRecoveryBlockMessage"
            >
              Die von Ihnen eingegebenen Benutzerdaten stimmen nicht überein
            </p>
            <p
              v-if="this.userNotFound && this.$store.state.language == 'en'"
              class="passwortRecoveryBlockMessage"
            >
              The user data you entered does not match
            </p>
            <p
              v-if="this.passwordFalse && this.$store.state.language == 'de'"
              class="passwortRecoveryBlockMessage"
            >
              Das von Ihnen eingegebene Passwort ist falsch
            </p>
            <p
              v-if="this.passwordFalse && this.$store.state.language == 'en'"
              class="passwortRecoveryBlockMessage"
            >
              The password you entered is incorrect
            </p>
            <img
              src="@/assets/closeX.png"
              width="16"
              height="16"
              class="closeIcon"
              @click="closeErrorBlock()"
            />
          </div>

          <div v-if="this.errorCode" class="loginError">
            <p
              class="passwortRecoveryBlockMessage"
              v-if="
                this.errorCode == 'auth/email-already-in-use' &&
                this.$store.state.language == 'de'
              "
            >
              Diese E-Mail ist bereits bei uns registriert.
            </p>
            <p
              class="passwortRecoveryBlockMessage"
              v-if="
                this.errorCode == 'auth/email-already-in-use' &&
                this.$store.state.language == 'en'
              "
            >
              This email is already registered with us.
            </p>
            <p
              class="passwortRecoveryBlockMessage"
              v-if="
                this.errorCode == 'auth/invalid-email' &&
                this.$store.state.language == 'de'
              "
            >
              Diese E-Mail ist nicht valid.
            </p>
            <p
              class="passwortRecoveryBlockMessage"
              v-if="
                this.errorCode == 'auth/invalid-email' &&
                this.$store.state.language == 'en'
              "
            >
              This email is not valid.
            </p>
            <p
              class="passwortRecoveryBlockMessage"
              v-if="this.errorCode == 'auth/weak-password'"
            >
              Das von Ihnen eingegebene Passwort ist zu schwach.
            </p>
            <p
              class="passwortRecoveryBlockMessage"
              v-if="this.errorCode == 'auth/operation-not-allowed'"
            >
              Thrown if email/password accounts are not enabled. Enable
              email/password accounts in the Firebase Console, under the Auth
              tab.
            </p>
            <p
              class="passwortRecoveryBlockMessage"
              v-if="this.errorCode == 'no'"
            >
              Erfolgreich registriert
            </p>
            <img
              src="@/assets/closeX.png"
              width="16"
              height="16"
              class="closeIcon"
              @click="closeErrorBlock()"
            />
          </div>
        </div>
      </div>

      <div class="footer">
        <div class="geomap">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2659.810763052766!2d16.39565561632648!3d48.19099747922772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d075e036ac393%3A0x9326dcbe2d63c038!2sHTL%20Rennweg!5e0!3m2!1sde!2sat!4v1596491956547!5m2!1sde!2sat"
            width="100%"
            height="300"
            frameborder="0"
            style="border: 0"
            allowfullscreen
            aria-hidden="false"
            tabindex="0"
          ></iframe>
        </div>
        <div class="copyright">
          © ROS 2021
          <span style="margin: 5px">|</span>
          <router-link to="/impressum">
            <a v-if="this.$store.state.language == 'de'" href="#">Impressum</a>
            <a v-if="this.$store.state.language == 'en'" href="#">imprint</a>
          </router-link>
          <span style="margin: 5px">|</span>
          <router-link to="/dsgvo">
            <a v-if="this.$store.state.language == 'de'" href="#">DSGVO</a>
            <a v-if="this.$store.state.language == 'en'" href="#">GDPR</a>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import "firebase/auth";
import VueMobileDetection from "vue-mobile-detection";
Vue.use(VueMobileDetection);
import Vue from "vue";

export default {
  data: function () {
    return {
      passwordlogin: "",
      password1: "",
      password2: "",
      email: "",
      emailCreate: "",
      name: "",
      regexPassword: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      regexEmail: /^\S+@\S+\.\S+$/,
      regexName: /^[a-zäÄöÖüÜß ,.'-]+$/i,
      passwordStrong: false,
      passwordStrongCreate: false,
      passwordSafety: false,
      errorCode: false,
      emailSent: false,
      passwordRecoveryMessage: "",
      userNotFound: false,
      passwordFalse: false,
      loginError: false,
    };
  },
  created() {
    if (this.$isMobile()) {
      window.location.href = "https://app.ros-cloud.at/";
    }
  },
  methods: {
    firstSlideActive() {
      document.getElementById("navLabel1").classList.add("sliderButtonActive");
      document
        .getElementById("navLabel2")
        .classList.remove("sliderButtonActive");
    },
    secondSlideActive() {
      document
        .getElementById("navLabel1")
        .classList.remove("sliderButtonActive");
      document.getElementById("navLabel2").classList.add("sliderButtonActive");
    },
    createSwitch() {
      document
        .getElementById("rightPageContentLogin")
        .classList.remove("loginActive");
      document
        .getElementById("rightPageContentLogin")
        .classList.add("loginInactive");

      document
        .getElementById("rightPageContentRegister")
        .classList.remove("registerInactive");
      document
        .getElementById("rightPageContentRegister")
        .classList.add("registerActive");
    },
    loginSwitch() {
      document
        .getElementById("rightPageContentLogin")
        .classList.remove("loginInactive");
      document
        .getElementById("rightPageContentLogin")
        .classList.add("loginActive");

      document
        .getElementById("rightPageContentRegister")
        .classList.remove("registerActive");
      document
        .getElementById("rightPageContentRegister")
        .classList.add("registerInactive");
    },
    passwordStrongTestLogin() {
      if (this.regexPassword.test(this.passwordlogin)) {
        this.passwordStrong = true;
      } else {
        this.passwordStrong = false;
      }
    },
    passwordStrongTestCreate() {
      if (
        this.regexPassword.test(this.password1) &&
        this.regexPassword.test(this.password2) &&
        this.password1 === this.password2
      ) {
        this.passwordStrongCreate = true;
      } else {
        this.passwordStrongCreate = false;
      }
    },

    validOrInvalidEmail() {
      if (this.email == "") {
        document.getElementById("email").classList.remove("inputInvalid");
      } else if (this.regexEmail.test(this.email)) {
        document.getElementById("email").classList.add("inputValid");
        document.getElementById("email").classList.remove("inputInvalid");
      } else {
        document.getElementById("email").classList.add("inputInvalid");
        document.getElementById("email").classList.remove("inputValid");
      }
    },
    validOrInvalidPassword() {
      if (this.passwordlogin == "") {
        document.getElementById("password").classList.remove("inputInvalid");
      } else if (this.regexPassword.test(this.passwordlogin)) {
        document.getElementById("password").classList.add("inputValid");
        document.getElementById("password").classList.remove("inputInvalid");
      } else {
        document.getElementById("password").classList.add("inputInvalid");
        document.getElementById("password").classList.remove("inputValid");
      }
    },
    validOrInvalidName() {
      if (this.name == "") {
        document.getElementById("name").classList.remove("inputInvalid");
      } else if (this.regexName.test(this.name)) {
        document.getElementById("name").classList.add("inputValid");
        document.getElementById("name").classList.remove("inputInvalid");
      } else {
        document.getElementById("name").classList.add("inputInvalid");
        document.getElementById("name").classList.remove("inputValid");
      }
    },
    validOrInvalidEmailCreate() {
      if (this.emailCreate == "") {
        document.getElementById("emailCreate").classList.remove("inputInvalid");
      } else if (this.regexEmail.test(this.emailCreate)) {
        document.getElementById("emailCreate").classList.add("inputValid");
        document.getElementById("emailCreate").classList.remove("inputInvalid");
      } else {
        document.getElementById("emailCreate").classList.add("inputInvalid");
        document.getElementById("emailCreate").classList.remove("inputValid");
      }
    },
    validOrInvalidPasswordCreate1() {
      if (this.password1 == "") {
        document.getElementById("password1").classList.remove("inputInvalid");
      } else if (this.regexPassword.test(this.password1)) {
        document.getElementById("password1").classList.add("inputValid");
        document.getElementById("password1").classList.remove("inputInvalid");
      } else {
        document.getElementById("password1").classList.add("inputInvalid");
        document.getElementById("password1").classList.remove("inputValid");
      }
    },
    validOrInvalidPasswordCreate2() {
      if (this.password2 == "") {
        document.getElementById("password2").classList.remove("inputInvalid");
      } else if (this.regexPassword.test(this.password2)) {
        document.getElementById("password2").classList.add("inputValid");
        document.getElementById("password2").classList.remove("inputInvalid");
      } else {
        document.getElementById("password2").classList.add("inputInvalid");
        document.getElementById("password2").classList.remove("inputValid");
      }
    },
    showPasswordSafety() {
      document
        .getElementById("passwordSafety")
        .classList.add("showPasswordSafety");
      document.getElementById("blurDiv").classList.add("blurBackground");
      document.getElementById("logo").classList.add("blurBackground");
    },
    leavePasswordSafety() {
      document
        .getElementById("passwordSafety")
        .classList.remove("showPasswordSafety");
      document.getElementById("blurDiv").classList.remove("blurBackground");
      document.getElementById("logo").classList.remove("blurBackground");
    },
    showPasswordSafetyEn() {
      document
        .getElementById("passwordSafetyEn")
        .classList.add("showPasswordSafety");
      document.getElementById("blurDiv").classList.add("blurBackground");
      document.getElementById("logo").classList.add("blurBackground");
    },
    leavePasswordSafetyEn() {
      document
        .getElementById("passwordSafetyEn")
        .classList.remove("showPasswordSafety");
      document.getElementById("blurDiv").classList.remove("blurBackground");
      document.getElementById("logo").classList.remove("blurBackground");
    },
    loginWithGoogle: function () {
      let self = this;
      const PreGoogleProvider = api.firebase().auth;
      const GoogleProvider = new PreGoogleProvider.GoogleAuthProvider();

      GoogleProvider.addScope("profile");
      GoogleProvider.addScope("email");

      api.firebase().auth().useDeviceLanguage();

      api
        .firebase()
        .auth()
        .signInWithPopup(GoogleProvider)
        .catch((error) => {
          // Wenn ein Fehler beim Anmelden auftritt:
          console.log(error);
        })
        .then(function () {
          //Wenn kein Fehler auftritt gehts hier weiter

          api
            .firebase()
            .auth()
            .onAuthStateChanged(function (user) {
              if (user) {
                self.$router.push("/dashboard");
              }
            });
        });
    },

    loginTrue() {},
    regularLogin() {
      api
        .firebase()
        .auth()
        .signInWithEmailAndPassword(this.email, this.passwordlogin)
        .then((user) => {
          console.log(user);
          this.$router.push("/dashboard");
        })
        .catch((error) => {
          console.log(error);
          if (error.code === "auth/user-not-found") {
            this.loginError = true;
            this.userNotFound = true;
          } else if (error.code === "auth/wrong-password") {
            this.loginError = true;
            this.passwordFalse = true;
          }
        });
    },
    async registerAccount() {
      try {
        await api
          .firebase()
          .auth()
          .createUserWithEmailAndPassword(this.emailCreate, this.password2)
          .catch((error) => {
            console.log(error);
            this.errorCode = error.code;
          })
          .then((user) => {
            console.log(user);
            api
              .firebase()
              .auth()
              .currentUser.updateProfile({
                displayName: this.name,
              })
              .then(() => {
                this.$router.push("/dashboard");
              });
          });
      } catch (err) {
        console.log(err);
      }
    },
    async resetPassword() {
      if (this.regexEmail.test(this.email)) {
        const self = this;
        api
          .firebase()
          .auth()
          .sendPasswordResetEmail(this.email)
          .then(function () {
            self.emailSent = true;
          })
          .catch(function (error) {
            console.log(error);
          });
        document.getElementById("email").classList.remove("inputInvalid");
        /* document.getElementById("email").classList.remove("inputValid"); */
        /* document.getElementById("email").value = ""; */
      } else {
        document.getElementById("email").classList.add("inputInvalid");
        document.getElementById("email").classList.remove("inputValid");
      }
    },
    errorRegister(err) {
      this.errorCode = err.code || err;
      console.log(this.errorCode);
      this.emptyFields();
    },
    closeErrorBlock() {
      this.errorCode = false;
      this.emailSent = false;
      this.userNotFound = false;
      this.loginError = false;
      this.passwordFalse = false;
    },
    emptyFields() {
      this.name = "";
      this.emailCreate = "";
      this.password1 = "";
      this.password2 = "";
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
@import url("https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600&display=swap");
$rosblue: #0044b2;
$rosfont: montserrat;

* {
  font-family: $rosfont;
  font-weight: 500;
}
.bigWrapper {
  background-color: $rosblue;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}

.wrapper {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0px 0px 13px 1px rgba(0, 0, 0, 0.75);
}

.loginForm {
  width: 80vw;
  height: 70vh;
}

.leftPage {
  width: 50%;
  height: 100%;
  background-color: $rosblue;
  float: left;
  display: flex;
}

.rightPage {
  width: 50%;
  height: 100%;
  background-color: #eee;
  margin-left: 50%;
}

.rightPageContent {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  display: grid;
  align-content: center;
  justify-content: center;
}

.rightPageContentGrey {
  color: #000;
  margin-bottom: 4px;
  font-size: 18px;
  font-weight: 300;
}

.rightPageContentInputfield {
  width: 340px;
  border-color: #adadad;
  border-top: none;
  border-left: none;
  border-right: none;
  outline: none;
  background-color: #eee;
  font-size: 16px;
  color: black;
  padding: 2px;
}

::placeholder {
  color: black;
}

.rightPageContentLoginbutton {
  width: 170px;
  height: 40px;
  border-radius: 5px;
  color: $rosblue;
  margin-right: 4px;
  margin-top: 20px;
  border-color: $rosblue;
  border-width: 2px;
  font-weight: 300;
  font-size: 18px;
  cursor: pointer;
  transition: opacity 0.5s ease-out;
  -moz-transition: opacity 0.5s ease-out;
  -webkit-transition: opacity 0.5s ease-out;
  -o-transition: opacity 0.5s ease-out;
}
.rightPageContentLoginbutton:disabled {
  opacity: 0.5;
}
.rightPageContentGooglebutton {
  margin-top: 20px;
  font-size: 18px;
  width: 170px;
  height: 40px;
  border-radius: 5px;
  border-color: #db4a39;
  border-width: 2px;
  cursor: pointer;
}

.rightPageContentLogo {
  height: 80px;
  margin: 15px;
  position: absolute;
}

.rightPageContentText {
  font-size: 12px;
  position: relative;
  text-align: center;
}

.loginActive {
  display: inline;
}

.registerActive {
  display: inline;
}

.loginInactive {
  display: none;
}

.registerInactive {
  display: none;
}

.slidershow {
  position: relative;
  width: 700px;
  height: 400px;
  overflow: hidden;
  margin: auto;
}

.navigation {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
}

.bar {
  width: 40px;
  height: 8px;
  border-radius: 4px;
  background: #002c6b;

  margin: 380px 10px 0px;
}

.bar:hover {
  background-color: #eee;
  cursor: pointer;
}

input[name="r"] {
  position: absolute;
  visibility: hidden;
}

.slides {
  width: 500%;
  height: 100%;
  display: flex;
}

.slide {
  width: 20%;
  transition: 0.6s;
  min-width: 20%;
}

.slide img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
h1 {
  margin-bottom: 0;
  text-align: center;
}
#r1:checked ~ .s1 {
  margin-left: 0;
}

#r2:checked ~ .s1 {
  margin-left: -20%;
}

.sliderButtonActive {
  background-color: #eee;
}
.footer {
  position: absolute;
  bottom: -400px;
  left: 0;
  background-color: #10222e;
  width: 100%;
  height: 400px;
  margin: 0px;
  -webkit-box-shadow: 0px -5px 10px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 0px -5px 10px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 0px -5px 10px 0px rgba(0, 0, 0, 0.75);
}

.geomap {
  display: flex;
  justify-content: center;
  margin: 15px;
}

.copyright {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60px;
  letter-spacing: 1px;
  color: #eee;
}

a {
  text-decoration: none;
  color: #eee;
}

.inputValid {
  border-color: $rosblue;
  transition: ease-in-out 0.5s;
}
.inputInvalid {
  border-color: #cc0000;
  transition: ease-in-out 0.5s;
}
.passwordSafety {
  display: none;
  padding: 15px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 5px;
  height: 200px;
  width: 300px;
  background-color: #eee;
  color: black;
  border: 1px solid black;
}
.showPasswordSafety {
  display: block;
}
.blurBackground {
  transition: 0.1s filter linear;
  -webkit-transition: 0.3s -webkit-filter linear;
  -moz-transition: 0.3s -moz-filter linear;
  -ms-transition: 0.3s -ms-filter linear;
  -o-transition: 0.3s -o-filter linear;
  -webkit-filter: blur(2px);
  -moz-filter: blur(2px);
  -o-filter: blur(2px);
  -ms-filter: blur(2px);
  filter: blur(2px);
}
.passwortRecoveryBlock {
  width: 40vw;
  height: 80px;
  left: 50%;
  bottom: 0;
  position: absolute;
  background-color: #5cb85c;
}
.loginError {
  width: 40vw;
  height: 80px;
  left: 50%;
  bottom: 0;
  position: absolute;
  background-color: #ff0033;
}
.closeIcon {
  position: absolute;
  right: 5px;
  top: 10px;
  cursor: pointer;
}
.passwortRecoveryBlockMessage {
  text-align: center;
  position: relative;
  transform: translateY(-20%);
  padding: 25px;
}
.languageBox {
  position: absolute;
  top: 0;
  right: 15px;
}
.language {
  cursor: pointer;
}
</style>