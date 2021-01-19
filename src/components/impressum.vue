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
    <br />
    <br />
    <br />

    <b> Folgende Libraries oder Templates unterliegen der MIT-Lizenz </b>
    <p>
      Kontextmenü-template von
      <a href="https://github.com/rawilk/vue-context">rawilk </a>
    </p>
    <p>
      progressBar von
      <a href="https://www.npmjs.com/package/nprogress"> nprogress </a>
    </p>
    <p>
      <a href="https://momentjs.com/"> moment.js </a> zum konvertieren eines Unix timestamps in eine,
      für Menschen, lesbare Form
    </p>
    <br />
        <b> restliche Quellenangaben  </b>

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
    <p>  <a href="https://www.flaticon.com/de/packs/file-types">exakte Quelle </a>der Icons </p>
    
    <p>
      Das Grundgerüst des
      <a href="https://vuejsexamples.com/animated-dropdown-menu-with-vue-js/">
        dropdown Menüs
      </a>
    </p>

    <p>
      <a href="https://www.anthonyboyd.graphics/?utm_source=file_shortcuts&utm_medium=downloaded_files"> Mockup von Macbook </a>
      <a href="https://www.oursky.com/?utm_medium=web&utm_source=mockuphone"> Mockup von Iphone </a>
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