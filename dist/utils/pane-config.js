import {ConfigurePane} from "../components/panes/configure.js";
import {Debug} from "../components/panes/debug.js";
import {DesignTab} from "../components/panes/design.js";
import {Settings} from "../components/panes/settings.js";
import {Test} from "../components/panes/test.js";
export default [
  {
    key: "default",
    component: ConfigurePane,
    title: "Thiết lập",
    path: "/"
  },
  {
    key: "test",
    component: Test,
    path: "/test",
    title: "Thử phím"
  },
  {
    key: "design",
    component: DesignTab,
    path: "/design",
    title: "Thiết kế"
  },
  {
    key: "settings",
    component: Settings,
    path: "/settings",
    title: "Cài đặt"
  },
  {
    key: "debug",
    component: Debug,
    path: "/debug",
    title: "Debug"
  }
];
