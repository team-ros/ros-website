<template>
  <div v-if="this.$store.state.ActiveID == file.parentid">
    <div v-if="file.type == '.pdf'" class="wrapper" @contextmenu.prevent="$refs.menu.open">
      <img src="@/assets/pdf-logo.png" class="logo" />
      <p class="name">{{file.name}}</p>
      <p class="size">{{file.type}} </p>
    </div>
    <div v-if="file.type == '.docx'" class="wrapper" @contextmenu.prevent="$refs.menu.open">
      <img src="@/assets/docx-logo.png" class="logo" style="padding-left: 5px" />
      <p class="name">{{file.name}}</p>
      <p class="size">{{file.type}} </p>
    </div>
    <vue-context ref="menu" class="contextMenu">
      <li class="contextMenuEntries">
        <p>
          <i class="fas fa-eraser"></i> <span class="contextMenuText">Umbenennen </span>
        </p>
      </li>
      <li class="contextMenuEntries">
        <p>
          <i class="far fa-trash-alt" style="margin-left:2px"></i> <span class="contextMenuText"> Löschen </span>
        </p>
      </li>
      <li class="contextMenuEntries">
        <p>
          <i class="fas fa-download"></i><span class="contextMenuText">Herunterladen </span>
        </p>
      </li>
    </vue-context>
  </div>
</template>

<script>
import VueContext from "vue-context";

export default {
  components: {
    VueContext
  },
  props: {
    file: Object
  } 
};

</script>

<style scoped>
.event-link {
  color: black;
  text-decoration: none;
}
.wrapper {
  margin: 15px 20px 0px;
  padding: 5px;
  transition: 0.3s;
  position: relative;
  overflow-wrap: break-word;
  width: 120px;
}
.wrapper:hover {
  background-color: #f3f2f1;
  border-radius: 5px;
}
.logo {
  height: 95px;
  padding-left: 20px
}
.name {
  font-size: 13px;
  text-align: center;
  max-width: 120px;
  margin: 0;
}
.size {
  font-size: 11px;
  text-align: center;
  margin: 0;
}
.contextMenu {
  background-color: #eee;
 -webkit-box-shadow: 0px 0px 5px 0px rgba(0,0,0,1);
-moz-box-shadow: 0px 0px 5px 0px rgba(0,0,0,1);
box-shadow: 0px 0px 5px 0px rgba(0,0,0,1);
  outline: none;
  list-style-type: none;
  padding: 0px;
  width: 180px;
  position: absolute;
  margin: 3px;
  border-radius: 4px;
  z-index: 10;
}
.contextMenuEntries:hover {
  width: 100%;
  margin: 0px;
  padding: 0px;
  background-color: rgb(216, 216, 216);
  cursor: pointer;
}
.contextMenuEntries p {
  margin: 0;
  margin-left: 8px;
  height: 40px;
  display: flex;
  align-items: center;
}
.contextMenuText{
  position: relative;
  left: 12px;
}
</style>
