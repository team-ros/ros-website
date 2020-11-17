<template>
  <div>
    <div v-bind:class="{ success: isGood, errorBlock: isBad }">
      <p
        class="errorMessage"
        v-if="this.errorCode == 'auth/email-already-in-use'"
      >
        Diese E-Mail ist bereits bei uns registriert.
      </p>
      <p class="errorMessage" v-if="this.errorCode == 'auth/invalid-email'">
        Diese E-Mail ist nicht valid.
      </p>
      <p class="errorMessage" v-if="this.errorCode == 'auth/weak-password'">
        Das von Ihnen eingegebene Passwort ist zu schwach.
      </p>
      <p
        class="errorMessage"
        v-if="this.errorCode == 'auth/operation-not-allowed'"
      >
        Thrown if email/password accounts are not enabled. Enable email/password
        accounts in the Firebase Console, under the Auth tab.
      </p>
      <p class="errorMessage" v-if="this.errorCode == 'no'">
        Erfolgreich registriert
      </p>
      <img
        src="@/assets/closeX.png"
        width="16"
        height="16"
        class="closeIcon"
        @click="closeBlock()"
      />
    </div>
  </div>
</template>

<script>
export default {
data: function (){
    return{
        isGood: false,
        isBad: false,
    }
},
  methods: {
    closeBlock() {
      this.$emit("closeErrorBlock");
    },
    typeOfError(){
        if(this.errorCode == 'no'){
            this.isGood = true
            this.isBad = false
        } else {
            this.isGood = false
            this.isBad = true
        }
    }
  },
  props: {
    errorCode: String,
  },
  mounted() {
      this.typeOfError();
  }
};
</script>

<style lang="scss" scoped>
.errorBlock {
  width: 40vw;
  height: 80px;
  background-color: #cc0000;
  left: 50%;
  bottom: 0;
  position: absolute;
}
.success {
  width: 40vw;
  height: 80px;
  left: 50%;
  bottom: 0;
  position: absolute;
  background-color: #5cb85c;
}
.closeIcon {
  position: absolute;
  right: 5px;
  top: 10px;
  cursor: pointer;
}
.errorMessage {
  text-align: center;
  position: relative;
  top: 25%;
  transform: translateY(-25%);
}
</style>