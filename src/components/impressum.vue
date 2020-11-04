<template>
  <div class="impressumdiv">
    <img src="@/assets/ros-logo.png" class="header--icon" />
    <h1 class="adsimple-121389708">Impressum</h1>
    <p class="adsimple-121389708"></p>
    <p>Team ROS</p>
    <p class="adsimple-121389708">
      Rennweg 89b, 1030 Wien
      <br />1030 Wien, <br />Österreich
    </p>

    <p>ROS ist ein Abschlussprojekt der HTL Rennweg</p>
    <p class="adsimple-121389708">
      <strong>Tel.: </strong> 01 2421510
      <br />
      <strong>E-Mail: </strong>
      <a href="mailto:team@ros-cloud.at">team@ros-cloud.at</a>
    </p>
    <p>
      Kontextmenü erstellt von
      <a href="https://github.com/rawilk/vue-context">rawilk </a>
    </p>
    <p>
      <a href="https://randallwilk.dev/docs/vue-context/v6/introduction">
        Website von rawilk
      </a>
    </p>
    <br />
    <div>
      Icons erstellt von
      <a
        href="https://www.flaticon.com/de/autoren/smashicons"
        title="Smashicons"
        >Smashicons</a
      >
      from
      <a href="https://www.flaticon.com/de/" title="Flaticon"
        >www.flaticon.com</a
      >
    </div>
    <p>
      <a href=""> moment.js </a> zum konvertieren eines Unix timestamps in eine,
      für Menschen, lesbare Form
    </p>
    <p>
      Das Grundgerüst des
      <a href="https://vuejsexamples.com/animated-dropdown-menu-with-vue-js/">
        dropdown Menüs
      </a>
    </p>
    <p>
      die progressBar von
      <a href="https://www.npmjs.com/package/nprogress"> nprogress </a>
    </p>
    <p></p>
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
.impressumdiv {
  position: absolute;
  left: 10%;
  right: 10%;
}
.header--icon {
  position: relative;
  height: 70px;
}
</style>