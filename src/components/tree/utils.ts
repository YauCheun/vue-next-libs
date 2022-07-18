import { RequiredTreeNodeOptions } from "./types";

const updateDownwards = (node: RequiredTreeNodeOptions, check: boolean) => {
  const update = (children: RequiredTreeNodeOptions[]) => {
    if (children.length) {
      children.forEach((item) => {
        item.checked = check;
        if (item.children.length) {
          update(item.children as RequiredTreeNodeOptions[]);
        }
      });
    }
  };
  update(node.children as RequiredTreeNodeOptions[]);
};
const updateUpwards = (
  node: RequiredTreeNodeOptions,
  flatList: RequiredTreeNodeOptions[]
) => {
  const update = (currentNode: RequiredTreeNodeOptions) => {
    // 说明是子节点
    if (currentNode.parentKey) {
      const parentNode = flatList.find(
        (i) => i.nodeKey === currentNode.parentKey
      );
      if (parentNode) {
        // 父节点应该勾选的状态
        const parentChecked = !parentNode.children.some((i) => !i.checked);
        if (parentChecked !== parentNode.checked) {
          parentNode.checked = parentChecked;
          update(parentNode);
        }
      }
    }
  };
  update(node);
};
export { updateDownwards, updateUpwards };
