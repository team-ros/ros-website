<template>
  <div class="impressumdiv">
     <img src="@/assets/ros-logo.png" class="header--icon"/>
    <h1 class="adsimple-121389708">Impressum</h1>
     <p class="adsimple-121389708"></p>
    <p>Team ROS</p>
    <p class="adsimple-121389708">
      Rennweg 89b, 1030 Wien
      <br />1030 Wien,
      <br />Österreich
    </p>

    <p> ROS ist  ein Abschlussprojekt der HTL Rennweg  </p>
    <p class="adsimple-121389708">
      <strong>Tel.: </strong> 01 2421510
      <br />
      <strong>E-Mail: </strong>
      <a href="mailto:team@ros-cloud.at">team@ros-cloud.at</a>
    </p>
   
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
$rosfont: montserrat;
* {
  font-family: $rosfont;
}
.impressumdiv{
    position: absolute;
    left: 10%;
    right: 10%;
    
}
.header--icon{
  position: relative;
  height: 70px;
}
</style>