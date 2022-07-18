<template>
  <div class="demo-box">
    <h2>treeDemo</h2>
    <a-tree :source="list"></a-tree>
  </div>
</template>

<script lang="tsx">
import { defineComponent, ref } from "vue";
import { TreeNodeOptions } from "../types";

function recursion(path = "0", level = 3, h = 3): TreeNodeOptions[] {
  const list = [];
  for (let i = 0; i < h; i += 1) {
    const nodeKey = `${path}-${i}`;
    const treeNode: TreeNodeOptions = {
      nodeKey,
      name: nodeKey,
      children: [],
      hasChildren: level > 0,
      // expanded: true,
    };
    if (level > 0) {
      treeNode.children = recursion(nodeKey, level - 1);
    }
    list.push(treeNode);
  }
  return list;
}
export default defineComponent({
  name: "treeDemo",
  setup(props, ctx) {
    const list = ref<TreeNodeOptions[]>([]);
    list.value = recursion();
    return {
      list,
    };
  },
});
</script>
