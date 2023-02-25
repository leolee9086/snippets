import block from "./util/blocks.js";
import 核心api from "./util/kernelApi.js";
import 自定义菜单 from "./customMenu/index.js";
import 添加自定义随机背景图 from "./customBackground/index.js";
import { 注册自定义题图按钮 } from "./customBackground/index.js";
import 自定义工具栏 from "./customToolbar/index.js";
import { 生成单个dom元素 } from "./util/dom.js";
import { Tab, 注册自定义tab } from "./customTab/index.js";
import * as layoutUtil from "./util/layouts.js";
import 注册图标 from "./customIcon/index.js";
import 注册url动作 from "./UrlAction/index.js";
import { leftDock } from "./customDock/index.js";
import { Protyle } from "./customTab/util/Protyle.js";
import {BlockListEditor} from   "./customTab/blockList/index.js"

添加自定义随机背景图();
let noobApi = {
  自定义菜单: 自定义菜单,
  内容块: block,
  编辑器: {
    自定义工具栏: 自定义工具栏,
    注册自定义题图按钮,
    Protyle,
    BlockListEditor
  },
  核心api: 核心api,
  DOM工具: {
    生成单个dom元素,
    注册图标,
  },
  布局: {
    注册自定义tab,
    Tab,
    util: layoutUtil,
  },
  url动作: {
    注册url动作,
  },
  界面: {
    leftDock,
  },
};
window.noobApi = noobApi;
