import noobApi from "../noobApi/index.js";
import 获取文件markdown内容 from "./importers/index.js";
const fs = require("fs");
const path = require("path");
let 监听导入路径 = "C:/Users/al765/Desktop/noob导入";
let 已导入文件路径 = "C:/Users/al765/Desktop/noob已导入文件备份";
if (!fs.existsSync(监听导入路径)) {
  fs.mkdirSync(监听导入路径);
}
if (!fs.existsSync(已导入文件路径)) {
  fs.mkdirSync(已导入文件路径);
}
let 最近打开文档列表 = await noobApi.核心api.获取最近打开文档();
let 最近打开文档 = 最近打开文档列表[0];
let stmt = `select * from blocks where id = '${最近打开文档.rootID}'`;
let 最近打开文档信息 = (await noobApi.核心api.sql({ stmt }))[0];
function 获取无扩展文件名(文件路径) {
  文件路径 = 文件路径.replace(/\\/g, "/");
  let 文件名 = 文件路径.substring(文件路径.lastIndexOf("/"));

  文件名 = 文件名.substring(0, 文件名.lastIndexOf("."));
  console.log(文件名);
  return 文件名;
}
async function 导入所有文件() {
  let 文件列表 = fs.readdirSync(监听导入路径);
  for await (let 文件名 of 文件列表) {
    let 文件路径 = path.join(监听导入路径, 文件名);
    console.log(文件路径);

    if (fs.existsSync(文件路径) && !fs.lstatSync(文件路径).isDirectory()) {
      console.log(文件路径);
      let markdown = await 获取文件markdown内容(文件路径);
      console.log(markdown);
      const newID = Lute.NewNodeID();
      if (!(undefined === markdown)) {
        await noobApi.核心api.createDoc({
          notebook: 最近打开文档信息.box,
          md: markdown,
          path: 最近打开文档信息.path.replace(".sy", "/") + newID + ".sy",
          title: 获取无扩展文件名(文件路径),
        });
        if (!fs.existsSync(已导入文件路径 + "/" + 文件名)) {
          fs.renameSync(文件路径, 已导入文件路径 + "/" + 文件名);
        }
      }
    }
  }
}

await 导入所有文件();
fs.watch(监听导入路径, () => {
  导入所有文件();
});

