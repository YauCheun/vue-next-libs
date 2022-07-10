/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { defineComponent, inject, onMounted, onUnmounted, ref } from "vue";
import "./index.scss";
import { TabContent, TabsKey } from "./types";
export default defineComponent({
  name: "ATabPane",
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  setup(props, ctx) {
    const show = ref<boolean>(false);
    const parent = inject<TabContent>(TabsKey);
    onMounted(() => {
      parent?.addPane({
        name: props.name,
        changeShow: (visible: boolean) => {
          show.value = visible;
        },
        titeSlot: ctx.slots.title,
      });
    });
    onUnmounted(() => {
      [parent?.removePane(props.name)];
    });
    return () => {
      return (
        <div class="pane" v-show={show.value}>
          {ctx.slots.default!()}
        </div>
      );
    };
  },
});
