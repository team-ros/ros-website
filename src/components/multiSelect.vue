<template>
  <treeselect v-model="value" :multiple="true" :options="source" />
</template>

<script>
import Treeselect from "@riophae/vue-treeselect";

export default {
  components: { Treeselect },
  data: function() {
    return {
      value: null,
      source: [
        {
          id: "node-1",
          label: "Node 1",
          children: [
            {
              id: "node-1-a",
              label: "Node 1-A"
            }
          ]
        },
        {
          id: "node-2",
          label: "Node 2"
        }
      ]
    };
  }
};
</script>

<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css"></style>