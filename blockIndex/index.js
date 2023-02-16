import noobApi from "../noobApi/index.js";
import { 序号设置 } from "./序号设置.js";
noobApi.自定义菜单.状态栏帮助菜单.注册自定义菜单项({
id: "测试菜单项",
文字: `测试菜单项`,
图标: `#iconRefresh`,
点击回调函数: () =>{
  //window.location.reload()
  },
事件配置:{
  click:()=>{console.log("测试")}
}
})
生成任务列表序号();
//生成标题序号()
setTimeout(生成任务列表序号, 1000);
//setTimeout(生成标题序号, 1000);

document.head.insertAdjacentHTML(
  "beforeEnd",
  `<style>
    .protyle-wysiwyg [data-node-id].li[data-subtype="t"] .protyle-action.protyle-action--task:before {
        content:var(--custom-index) ;        
    }
    .protyle-wysiwyg [data-type="NodeHeading"] [contenteditable="true"]:before{
        content:var(--custom-index);
    }
    .sy__outline [data-node-id] .b3-list-item__text:before{
        content:var(--custom-index);

    }
    </style>`
);
async function 生成标题序号() {
  let 文档面包屑数组 = document.querySelectorAll(
    ".protyle-breadcrumb__bar span:first-child[data-node-id]"
  );
  文档面包屑数组.forEach((文档面包屑元素) => {
    let 文档id = 文档面包屑元素.getAttribute("data-node-id");
    生成文档内标题序号(文档id);
  });
  setTimeout(生成标题序号, 1000);
}
async function 生成文档内标题序号(文档id) {
  let 文档内容 = await noobApi.核心api.getDoc({ id: 文档id, size: 102400 });
  let 临时元素 = document.createElement("div");
  临时元素.innerHTML = 文档内容.content;
  let 标题元素数组 = 临时元素.querySelectorAll(
    '[data-type="NodeHeading"]:not( [data-type="NodeBlockQueryEmbed"] div)'
  );
  let 计数器 = [0, 0, 0, 0, 0, 0];
  let 上一个标题级别 = 1;
  for (let i = 0; i < 标题元素数组.length; ++i) {
    let 当前标题级别 = parseInt(
      标题元素数组[i].getAttribute("data-subtype").replace("h", "")
    );
    if (当前标题级别 <= 上一个标题级别) {
      for (let j = 0; j < 计数器.length; ++j) {
        if (j + 1 > 当前标题级别) {
          计数器[j] = 0;
        }
      }
    }
    计数器[当前标题级别 - 1] += 1;
    let 标题id = 标题元素数组[i].getAttribute("data-node-id");
    document
      .querySelectorAll(`.protyle-wysiwyg div[data-node-id='${标题id}']`)
      .forEach((一级标题元素) => {
        一级标题元素
          .querySelector('[contenteditable="true"]')
          .setAttribute(
            "style",
            `--custom-index:"${序号设置.默认设置[当前标题级别 - 1](
              计数器[当前标题级别 - 1]
            )} "`
          );
      });
    document
      .querySelectorAll(`.sy__outline [data-node-id="${标题id}"]`)
      .forEach((大纲项目) => {
        大纲项目.setAttribute(
          "style",
          `--custom-index:"${序号设置.默认设置[当前标题级别 - 1](
            计数器[当前标题级别 - 1]
          )} "`
        );
      });
    上一个标题级别 = 当前标题级别 + 0;
  }
}
async function 生成任务列表序号() {
  let 任务列表元素数组 = document.querySelectorAll(
    '.protyle-wysiwyg [data-type="NodeList"]:has([data-subtype="t"])'
  );
  任务列表元素数组.forEach((任务列表元素) => {
    同步生成序号(任务列表元素);
  });
  let 聚焦任务列表项元素数组 = document.querySelectorAll(
    '.protyle-wysiwyg [data-subtype="t"]:not(.list .li)'
  );
  聚焦任务列表项元素数组.forEach((任务列表项元素) => {
    异步生成序号(任务列表项元素);
  });
 // setTimeout(生成任务列表序号, 1000);
}
function 同步生成序号(任务列表元素) {
  let 元素id = 任务列表元素.getAttribute("data-node-id");

  let 任务选框数组 = 任务列表元素.querySelectorAll(
    `[data-node-id="${元素id}"]>div>.protyle-action.protyle-action--task`
  );
  任务选框数组.forEach((任务选框, 下标) => {
    任务选框.setAttribute("style", `--custom-index :"${下标 + 1}."`);
  });
}
async function 异步生成序号(任务列表项元素) {
  let 元素id = 任务列表项元素.getAttribute("data-node-id");
  let 响应 = await fetch("/api/query/sql", {
    method: "post",
    body: JSON.stringify({
      stmt: `select * from blocks where id = (select parent_id from blocks where id ='${元素id}') `,
    }),
  });
  let data = await 响应.json();
  let 父块内容 = await (
    await fetch("/api/filetree/getDoc", {
      method: "post",
      body: JSON.stringify({
        id: data.data[0].id,
        size: 102400,
      }),
    })
  ).json();
  let div = document.createElement("div");
  div.innerHTML = 父块内容.data.content;
  div.querySelectorAll(".li").forEach((元素, 下标) => {
    if (元素.getAttribute("data-node-id") === 元素id) {
      任务列表项元素
        .querySelector(".protyle-action.protyle-action--task")
        .setAttribute("style", `--custom-index :"${下标 + 1}."`);
    }
  });
}
