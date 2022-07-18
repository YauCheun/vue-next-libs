/* eslint-disable prettier/prettier */
import { defineComponent, PropType, ref, watch } from "vue";
import { cloneDeep } from "lodash";

import {
  nodeKey,
  RenderFunc,
  RequiredTreeNodeOptions,
  TreeNodeOptions,
} from "./types";
import "./index.scss";
import ATreeNode from "./node";
import { updateDownwards, updateUpwards } from "./utils";

export default defineComponent({
  name: "ATree",
  props: {
    source: {
      type: Array as PropType<TreeNodeOptions[]>,
      default: () => [],
    },
    lazyLoad: {
      type: Function as PropType<
        (
          node: RequiredTreeNodeOptions,
          callback: (children: TreeNodeOptions[]) => void
        ) => void
      >,
    },
    render: {
      type: Function as PropType<RenderFunc>,
    },
    showCheckbox: {
      type: Boolean,
      default: false,
    },
    checkStrictly: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["selcet-change", "check-change"],
  setup(props, ctx) {
    const flatList = ref<RequiredTreeNodeOptions[]>([]);
    const loading = ref(false);
    const selectedKey = ref<nodeKey>("");
    const ExpandNode = (
      node: RequiredTreeNodeOptions,
      children: TreeNodeOptions[] = []
    ) => {
      const trueChildren = children.length
        ? children
        : cloneDeep(node.children);
      node.children = trueChildren.map((item) => {
        return {
          ...item,
          level: item.level || node.level + 1,
          loading: false,
          disabled: item.disabled || false,
          expanded: item.expanded || false,
          selected: item.selected || false,
          // ?? 可选链
          checked: props.checkStrictly ? false : item.checked ?? node.checked,
          hasChildren: item.hasChildren || false,
          children: item.children || [],
          parentKey: node.nodeKey || null,
        };
      });
      const targetIndex = flatList.value.findIndex(
        (i) => i.nodeKey === node.nodeKey
      );
      if (targetIndex > -1) {
        flatList.value.splice(
          targetIndex + 1,
          0,
          ...(node.children as RequiredTreeNodeOptions[])
        );
      }
    };
    const collapseNode = (node: RequiredTreeNodeOptions) => {
      const delKeys: nodeKey[] = [];
      const recursion = (currentNode: RequiredTreeNodeOptions) => {
        if (currentNode.children.length) {
          currentNode.children.forEach((item) => {
            delKeys.push(item.nodeKey);
            if (item.expanded) {
              item.expanded = false;
              recursion(item as RequiredTreeNodeOptions);
            }
          });
        }
        if (delKeys.length) {
          flatList.value = flatList.value.filter(
            (i) => !delKeys.includes(i.nodeKey)
          );
        }
      };
      node.expanded;
      recursion(node);
    };
    const flattenTree = (
      source: TreeNodeOptions[]
    ): RequiredTreeNodeOptions[] => {
      const result: RequiredTreeNodeOptions[] = [];
      const recursion = (
        list: TreeNodeOptions[],
        level = 0,
        parent: RequiredTreeNodeOptions | null = null
      ): RequiredTreeNodeOptions[] => {
        return list.map((item) => {
          const node: RequiredTreeNodeOptions = {
            ...item,
            level,
            loading: false,
            disabled: item.disabled || false,
            expanded: item.expanded || false,
            selected: item.selected || false,
            checked: item.checked || false,
            hasChildren: item.hasChildren || false,
            children: item.children || [],
            parentKey: parent?.nodeKey || null,
          };
          result.push(node);
          if (node.selected) {
            selectedKey.value = node.nodeKey;
          }
          if (item.expanded && node.children.length) {
            node.children = recursion(node.children, level + 1, node);
          }
          return node;
        });
      };
      if (source.length) {
        recursion(source);
      }
      return result;
    };
    const handleToggleExpand = (node: RequiredTreeNodeOptions) => {
      if (loading.value) return;
      node.expanded = !node.expanded;
      if (node.expanded) {
        // 展开
        // 有可能是用户第一次展开，没有把children处理成RequiredTreeNodeOptions类型
        if (node.children.length) {
          ExpandNode(node);
        } else {
          // 懒加载
          if (props.lazyLoad && node.hasChildren) {
            loading.value = true;
            node.loading = true;
            props.lazyLoad(node, (children) => {
              ExpandNode(node, children);
              loading.value = false;
              node.loading = false;
            });
          } else {
            node.expanded = !node.expanded;
          }
        }
      } else {
        // 收起
        collapseNode(node);
      }
    };
    const handleSelectChange = (node: RequiredTreeNodeOptions) => {
      let newSelectKey: nodeKey = "";
      if (selectedKey.value !== node.nodeKey) {
        const oldSelectedIndex = flatList.value.findIndex(
          (i) => i.nodeKey === selectedKey.value
        );
        if (oldSelectedIndex > -1) {
          flatList.value[oldSelectedIndex].selected = false;
        }
        node.selected = true;
        newSelectKey = node.nodeKey;
      }
      selectedKey.value = newSelectKey;
      ctx.emit("selcet-change", node);
    };
    const handleCheckChange = ([check, node]: [
      boolean,
      RequiredTreeNodeOptions
    ]) => {
      node.checked = check;
      // checkStrictly true父子不联动 false 父子联动
      if (!props.checkStrictly) {
        updateDownwards(node, check);
        updateUpwards(node, flatList.value);
      }
      ctx.emit("check-change", [check, node]);
    };
    ctx.expose({
      getSelectedNode: (): RequiredTreeNodeOptions | undefined => {
        return flatList.value.find((i) => i.selected);
      },
      getCheckedNodes: (): RequiredTreeNodeOptions[] => {
        return flatList.value.filter((i) => i.checked);
      },
    });
    watch(
      () => props.source,
      (newVal) => {
        flatList.value = flattenTree(newVal);
        console.log(flatList.value, newVal);
      },
      { immediate: true }
    );
    console.log(ctx.slots);
    return () => {
      return (
        <div class="ant-tree-wrap">
          <div class="ant-tree">
            {flatList.value.map((node, index) => {
              return (
                <ATreeNode
                  key={node.nodeKey}
                  node={node}
                  iconSlot={ctx.slots.icon}
                  showCheckbox={props.showCheckbox}
                  render={props.render}
                  checkStrictly={props.checkStrictly}
                  onToggleExpand={handleToggleExpand}
                  onSelectChange={handleSelectChange}
                  onCheckChange={handleCheckChange}
                />
              );
            })}
          </div>
        </div>
      );
    };
  },
});
