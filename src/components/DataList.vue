<template>
  <div>
    <div
      class="wrapper"
      id="wrapper"
      v-if="this.file.type == 'directory'"
      @click="getNewPath()"
    >
      <img src="@/assets/Folder2.png" class="logo" />

      <p>{{ file.name }}</p>
    </div>
  </div>
</template>


<script>
import api from "@/api";

export default {
  data() {
    return {};
  },
  props: {
    file: Object,
    directoryList: Object,
  },
  methods: {
    async getNewPath() {
      try {
        const response = await api.object().get(this.file.id);
        this.$emit("MoveListing", response);
        this.$emit("MoveMenuNewCurrentPath", this.file.id);
        this.$emit("MoveMenunewParentPath", this.file.parent);
      } catch (err) {
        console.log(err);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
$rosblue: #0047bb;
$rosfont: montserrat;
* {
  font-family: $rosfont;
}
.event-link {
  color: black;
  text-decoration: none;
}
.wrapper {
  margin: 0px;
  display: flex;
}
.wrapper:hover {
  background-color: rgb(216, 216, 216);
  border-radius: 5px;
  cursor: pointer;
}
.logo {
  height: 30px;
  position: relative;
  margin: 10px;
}
</style>
