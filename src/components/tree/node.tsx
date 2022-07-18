/* eslint-disable prettier/prettier */
import { computed, defineComponent, PropType, Slot } from "vue";
import {
  CustomEventFuncType,
  RenderFunc,
  RequiredTreeNodeOptions,
} from "./types";
import RenderNode from "./render";
import ACheckBox from "../Checkbox/index";
export default defineComponent({
  name: "ATreeNode",
  props: {
    node: {
      type: Object as PropType<RequiredTreeNodeOptions>,
      required: true,
    },
    onToggleExpand: {
      type: Function as CustomEventFuncType<RequiredTreeNodeOptions>,
    },
    onSelectChange: {
      type: Function as CustomEventFuncType<RequiredTreeNodeOptions>,
    },
    onCheckChange: {
      type: Function as CustomEventFuncType<[boolean, RequiredTreeNodeOptions]>,
    },
    render: {
      type: Function as PropType<RenderFunc>,
    },
    iconSlot: {
      type: Function as PropType<Slot>,
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
  emits: ["toggle-expand", "select-change", "check-change"],
  setup(props, ctx) {
    // eslint-disable-next-line vue/no-setup-props-destructure
    const { node, render, iconSlot, checkStrictly } = props;
    const textCls = computed(() => {
      let result = "node-title";
      if (node.disabled) {
        result += " disabled";
      }
      if (node.selected && !props.showCheckbox) {
        result += " selected";
      }
      return result;
    });
    const halfChecked = computed(() => {
      let result = false;
      if (!checkStrictly && node.hasChildren) {
        const childChecked = node.children.filter((i) => i.checked);
        result = childChecked.length > 0 && childChecked.length < node.children.length;
      }

      return result;
    });
    const handleExpand = () => {
      ctx.emit("toggle-expand", node);
    };
    const handleSelect = (e: Event) => {
      e.stopPropagation();
      if (!node.disabled) {
        ctx.emit("select-change", node);
      }
    };
    const handleCheckChange = (checked: boolean) => {
      ctx.emit("check-change", [checked, node]);
    };
    const RenderArrow = (): JSX.Element => {
      return (
        <div class={["node-arrow", node.expanded ? "expanded" : ""]}>
          {node.hasChildren ? (
            iconSlot ? (
              iconSlot(node.loading)
            ) : node.loading ? (
              <i class="iconfont iconloading ico-loading"></i>
            ) : (
              <i class="iconfont iconExpand"></i>
            )
          ) : null}
        </div>
      );
    };
    const normalContent = (): JSX.Element => {
      return render ? (
        <RenderNode render={render} node={node} />
      ) : (
        <div class={textCls.value}>{node.name}</div>
      );
    };
    const RenderContent = (): JSX.Element => {
      if (props.showCheckbox) {
        return (
          <ACheckBox
            class="node-content node-text"
            modelValue={node.checked}
            disabled={node.disabled}
            halfChecked={halfChecked.value}
            onChange={handleCheckChange}
          >
            {normalContent()}
          </ACheckBox>
        );
      }
      return (
        <div class="node-content node-text" onClick={handleSelect}>
          {normalContent()}
        </div>
      );
    };
    return () => {
      return (
        <div
          class="ant-tree-node"
          style={{ paddingLeft: node.level * 18 + "px" }}
          onClick={handleExpand}
        >
          {RenderArrow()}
          {RenderContent()}
        </div>
      );
    };
  },
});
