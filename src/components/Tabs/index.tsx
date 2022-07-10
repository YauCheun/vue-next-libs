import { defineComponent, onMounted, provide, reactive, ref, watch } from "vue";
import "./index.scss";
import { TabContent, TabPaneContent, TabsKey } from "./types";
export default defineComponent({
  name: "ATabs",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, ctx) {
    const paneTabs = reactive<TabPaneContent[]>([]);
    const currentShowName = ref(props.modelValue);
    // console.log(currentShowName.value);
    const addPane = (item: TabPaneContent) => {
      paneTabs.push(item);
    };
    const removePane = (name: string) => {
      if (paneTabs.length) {
        const index = paneTabs.findIndex((i) => i.name === name);
        if (index >= 0) {
          paneTabs.splice(index, 1);
        }
      }
    };
    const updatePaneVisible = () => {
      paneTabs.forEach((item) => {
        item.changeShow(item.name === currentShowName.value);
      });
    };
    onMounted(() => {
      if (!currentShowName.value && paneTabs.length) {
        ctx.emit("update:modelValue", paneTabs[0].name);
      }
      updatePaneVisible();
    });
    watch(
      () => props.modelValue,
      (newVal) => {
        console.log(newVal);
        currentShowName.value = newVal;
        updatePaneVisible();
      }
    );
    const tabClick = (name: string) => {
      if (currentShowName.value !== name) {
        ctx.emit("update:modelValue", name);
      }
    };
    provide<TabContent>(TabsKey, {
      addPane,
      removePane,
    });
    const renderTabs = () => {
      // <div class="ant-tab-pane">A</div>
      return paneTabs.map((item) => {
        const extralCls = item.name === currentShowName.value ? "active" : "";
        return (
          <div
            class={"ant-tab-pane " + extralCls}
            onClick={tabClick.bind(null, item.name)}
          >
            {item.titeSlot ? item.titeSlot(item.name) : item.name}
          </div>
        );
      });
    };
    return () => {
      return (
        <div class="ant-tabs">
          <div class="navs">{renderTabs()}</div>
          {ctx.slots.default!()}
        </div>
      );
    };
  },
});
