import 工作空间 from "./workspace/index.js";
import { 代码片段路径 } from "./util/file.js";
import requireHacker from "./util/requireHacker.js";

if (!window.noobApi) {
  await import("./api.js");

  if (window.require) {
    let { 监听文件修改 } = await import("./util/file.js");
    let 监听选项 = {
      监听路径: 工作空间.代码片段路径,
      监听配置: {
        persistent: true,
        recursive: true,
      },
      文件类型: ["js"],
      事件类型: ["change"],
    };

    监听文件修改(监听选项);
    requireHacker.setExternalDeps(代码片段路径 + "/node_modules");

    try {
      if (require("express") && require("ws")) {
        window.noobApi.事件桥服务器 = (
          await import("./messageBridge/server.js")
        )["default"];
        window.noobApi.主窗口事件桥 = (
          await import("./messageBridge/mainBridge.js")
        )["default"];
        window.noobApi.事件桥类 = (await import("./messageBridge/index.js"))[
          "default"
        ];
      }
    } catch (e) {
      console.warn("事件服务器注册错误，检查是否存在相应依赖");
    }
  }
}
export default noobApi
