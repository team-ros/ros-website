<template>
  <div>
    
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
    errorCode: Error,
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