<template>
  <treeselect
    v-model="value"
    :multiple="true"
    :options="source"
    placeholder="Filtern"
    :disable-branch-nodes="true"
    :show-count="true"
    search-nested
    :auto-load-root-options="false"
  />
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
          label: "Dateityp",
          children: [
            {
              id: "node-1-a",
              label: ".pdf"
            },
            {
              id: "node-1-b",
              label: ".docx"
            }
          ]
        },
        {
          id: "node-3",
          label: "Datum",
          children: [
            {
              id: "node-3-a",
              label: "neuste zuerst"
            },
            {
              id: "node-3-b",
              label: "älteste zuerst"
            }
          ]
        },
        {
          id: "node-4",
          label: "Größe",
          children: [
            {
              id: "node-4-a",
              label: "absteigend"
            },
            {
              id: "node-4-b",
              label: "aufsteigend"
            }
          ]
        }
      ]
    };
  }
};
</script>

<style src="@riophae/vue-treeselect/dist/vue-treeselect.min.css"></style>