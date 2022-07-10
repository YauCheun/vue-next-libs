import { Slot } from "vue";

const TabsKey = "TabsKey";

interface TabPaneContent {
  name: string;
  changeShow: (visible: boolean) => void;
  titeSlot?: Slot;
}
interface TabContent {
  addPane: (item: TabPaneContent) => void;
  removePane: (name: string) => void;
}

export { TabsKey, TabPaneContent, TabContent };
