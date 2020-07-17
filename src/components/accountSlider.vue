<template>
  <div id="accountSlider" class="accountSlider">
        <button id="closeButton" @click="updateAccountSliderState">
            <img src="@/assets/closeX.png" width="30" class="buttonImg" id="imageX" />
        </button>
    </div>
</template>

<script>
export default{
  methods: {
    updateAccountSliderState() {
      this.$store.dispatch("startUpdateAccountSliderState")
    }
  }
}
</script>

<style scoped>
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
.buttonImg {
  margin: 10px;
  float: right;
  cursor: pointer;
}
.hideSlider {
  transform: translateX(-110%);
}
</style>