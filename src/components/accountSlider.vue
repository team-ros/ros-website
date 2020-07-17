<template>
  <div class="accountSlider">
    <button id="closeButton"> 
    <img src="@/assets/closeX.png" width="30" class="buttonImg" id="imageX"/>
    </button>
  </div>
</template>

<script>
export default {
};
/*eslint-disable */

window.onload = function(){

const closeButton = document.getElementById("closeButton");
const accountSlider = document.getElementById("accountSlider");

closeButton.onclick = hideSlider();

function hideSlider(){
    document.getElementById("accountSlider").addEventListener("click", hideSlider);
}

}
/*eslint-enable */



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
.hideSlider{
    transform: translateX(-110%);
}
</style>