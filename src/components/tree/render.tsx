import { defineComponent, PropType, render } from "vue";
import { RenderFunc, RequiredTreeNodeOptions } from "./types";
export default defineComponent({
  name: "RenderNode",
  props: {
    render: {
      type: Function as PropType<RenderFunc>,
      required: true,
    },
    node: {
      type: Object as PropType<RequiredTreeNodeOptions>,
      required: true,
    },
  },
  setup(props, ctx) {
    return () => {
      return props.render(props.node);
    };
  },
});
