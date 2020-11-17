<template>
  <div>
    <DataObjects @changeName="newName" />
  </div>
</template>

<script>
    export default {
        data(){
            return{
                name: "ROS"
            	}
            },
        methods: {
         newName(value){
          this.name = value 
         }
        }
      }
</script>

<style scoped>
</style>