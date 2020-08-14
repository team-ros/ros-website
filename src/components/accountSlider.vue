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

      <h1>Account</h1>
      <p>Hier sind ihre Accountinformationen zu sehen</p>
      <input type="text" placeholder="dein Name" class="accountInfos" readonly />
      <input type="text" placeholder="deine E-Mail Adresse" class="accountInfos" readonly />
      <input type="text" placeholder="dein Abonnement Ende " class="accountInfos" readonly />
      <h3>Passwort zurücksetzen?</h3>
      <input
        v-model="password1"
        v-on:input="passwordStrongTest"
        type="password"
        class="accountInfos"
        id="newPassword1"
        placeholder="neues Passwort"
        required
      />
      <input
        v-model="password2"
        v-on:input="passwordStrongTest"
        type="password"
        class="accountInfos"
        id="newPassword2"
        placeholder="neues Passwort wiederholen"
        required
      />

      <button :disabled="this.passwordStrong != true" class="resetButton">PASSWORT ÄNDERN</button>
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
      <a href="#" style="margin-bottom:3px">Impressum</a>
      <a href="#">Support</a>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      password1: "",
      password2: "",
      regex: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
      passwordStrong: false
    };
  },
  methods: {
    updateAccountSliderState() {
      this.$store.dispatch("startUpdateAccountSliderState");
      this.$emit('closeAccountSlider')
    },
    passwordStrongTest() {
      if(this.regex.test(this.password1) && this.password1 == this.password2){
        this.passwordStrong = true;
      }
      else{
        this.passwordStrong = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
$rosblue: #0044b2;


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
}
.accountSliderContent {
  display: grid;
  align-content: center;
  justify-content: center;
}
.buttonImg {
  margin: 15px;
  float: right;
  cursor: pointer;
  right: 10px;
  justify-items: end;
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
input:focus,
input:valid {
  border-color: $rosblue;
  transition: ease-in-out 0.5s;
}
</style>