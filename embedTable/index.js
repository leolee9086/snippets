import { Model } from "./model.js";
import { 重渲染配置表 } from "./replace.js";
setTimeout(渲染所有嵌入块表格, 1000);
let model =new Model()
/*model.all(() => {
  setTimeout(渲染所有嵌入块表格, 500);
});*/
model.on('msg',()=>{
  console.log("测试")
  setTimeout(渲染所有嵌入块表格, 500);})
setInterval(()=>{
  model.send('msg',{
    pushMode:0,
    data:{aaa:0}
  })
},1000)
setInterval(渲染所有嵌入块表格, 3000);
async function 渲染所有嵌入块表格() {
  let 嵌入块列表 = document.querySelectorAll(
    '[data-type="NodeBlockQueryEmbed"]'
  );
  嵌入块列表.forEach((嵌入块元素) => {
    try {
      渲染表格(嵌入块元素);
    } catch (e) {
      console.error(e);
    }
  });
  //测试代码,用于生成嵌入块表格
  let 块列表 = document.querySelectorAll(
    ' div.protyle-wysiwyg.protyle-wysiwyg--attr [data-node-id] div[contenteditable="true"]'
  );
  块列表.forEach((块元素) => {
    if (!块元素.querySelector("span.custom-shadow") && 块元素.innerHTML) {
      块元素.insertAdjacentHTML(
        "beforeEnd",
        '<span class="custom-shadow" style="display:block;top:calc(100% + 32px)">'
      );
    } else if (块元素.querySelector("span.custom-shadow")) {
      let shadowContainer = 块元素.querySelector("span.custom-shadow"),
        root;
      root = shadowContainer.shadowRoot
        ? shadowContainer.shadowRoot
        : shadowContainer.attachShadow({ mode: "open" });
      root.innerHTML = "<div></div>";
    }
  });
}
async function 渲染表格(嵌入块元素) {
  let sql = 嵌入块元素.getAttribute("data-content");
  let id = 嵌入块元素.getAttribute("id");
  let 重渲染配置 = await 获取重渲染配置(sql, id);
  if (
    重渲染配置 &&
    重渲染配置.sql替换 &&
    重渲染配置.sql替换 instanceof Function
  ) {
    sql = await 重渲染配置.sql替换(sql, id);
  }
  if (sql && 重渲染配置) {
    let 查询结果 = await 获取查询结果(sql);
    if (查询结果 && 查询结果[0]) {
      if (校验查询结果为嵌入(查询结果)) {
        return;
      }

      let 表格 = document.createElement("table");
      表格.setAttribute("contenteditable", false);
      表格.setAttribute("spellcheck", false);
      表格.setAttribute("class", "custom-queryTable");
      表格.innerHTML = "<colgroup></colgroup>";
      for (let i = 0; i < Object.getOwnPropertyNames(查询结果[0]).length; i++) {
        表格.querySelector("colgroup").innerHTML += "<col></col>";
      }
      let 表头 = await 生成表头(查询结果[0], 重渲染配置, sql, id);
      let 表身 = await 生成表身(查询结果, 重渲染配置, sql, id);
      表格.appendChild(表头);
      表格.appendChild(表身);
        刷新表格(嵌入块元素, 表格);
    }
  }
}
function 获取重渲染配置(sql, id) {
  let 重渲染配置 = 重渲染配置表.find((item) => {
    return item.判定函数(sql, id);
  });
  return 重渲染配置;
}
function 校验查询结果为嵌入(查询结果) {
  let 字段名列表 = Object.getOwnPropertyNames(查询结果[0]);
  return (
    JSON.stringify(字段名列表) ==
    `["alias","box","content","created","fcontent","hash","hpath","ial","id","length","markdown","memo","name","parent_id","path","root_id","sort","subtype","tag","type","updated"]`
  );
}
async function 刷新表格(嵌入块元素, 表格) {
  let 插入容器 = 嵌入块元素.querySelector(
    ".ft__smaller.ft__secondary.b3-form__space--small"
  );
  if (!插入容器) {
    return;
  }
  if (!插入容器.shadowRoot) {
    插入容器.attachShadow({ mode: "open" });
  }
  let 旧表格=  插入容器.shadowRoot.querySelector('table')
  if(旧表格&&旧表格.innerHTML!==表格.innerHTML){
    旧表格.innerHTML= 表格.innerHTML
    return
  }
  if(旧表格&&旧表格.innerHTML===表格.innerHTML){
    return
  }
  if(!旧表格){
  插入容器.shadowRoot.innerHTML = "";
  插入容器.shadowRoot.innerHTML += `
    <link rel="stylesheet" type="text/css" href="/snippets/embedTable/table.css">
    
    </link>
    `;
  插入容器.shadowRoot.appendChild(表格)
  }
  插入容器.shadowRoot.querySelector('table').style.width="100%"
}
async function 获取查询结果(sql) {
  let data = await fetch("/api/query/sql", {
    method: "post",
    body: JSON.stringify({
      stmt: sql,
    }),
  });
  return (await data.json()).data;
}
async function 生成表头(结果条目, 重渲染配置, sql, id) {
  let 字段名列表 = Object.getOwnPropertyNames(结果条目);
  if (
    重渲染配置 &&
    重渲染配置.字段过滤 &&
    重渲染配置.字段过滤 instanceof Function
  ) {
    字段名列表 = await 重渲染配置.字段过滤(字段名列表, sql, id);
  }

  let 表头元素 = document.createElement("thead");
  表头元素.innerHTML = "<thead><tr></tr></thead>";
  for await (let 字段名 of 字段名列表) {
    if (
      重渲染配置 &&
      重渲染配置.表头替换 &&
      重渲染配置.表头替换 instanceof Function
    ) {
      字段名 = await 重渲染配置.表头替换(字段名, sql, id);
    }
    表头元素.querySelector("tr").innerHTML += `<th>${字段名}</th>`;
  }
  return 表头元素;
}
async function 生成表身(查询结果, 重渲染配置, sql, id) {
  let 表身元素 = document.createElement("tbody");
  let 字段名列表 = Object.getOwnPropertyNames(查询结果[0]);
  
  if (
    重渲染配置 &&
    重渲染配置.字段过滤 &&
    重渲染配置.字段过滤 instanceof Function
  ) {
    字段名列表 =await 重渲染配置.字段过滤(字段名列表, sql, id);
  }
  for await (let 结果条目 of 查询结果) {
    表身元素.appendChild(
      await 生成行(结果条目, 字段名列表, 重渲染配置, sql, id)
    );
  }
  return 表身元素;
}
async function 生成行(结果条目, 字段名列表, 重渲染配置, sql, id) {
  let 行元素 = document.createElement("tr");
  for await (let 属性名 of 字段名列表) {
    let 属性值 = 结果条目[属性名];
    if (
      重渲染配置 &&
      重渲染配置.表身替换 &&
      重渲染配置.表身替换 instanceof Function
    ) {
      属性值 =await 重渲染配置.表身替换(属性值, 结果条目, sql, id, 属性名);
    }
    行元素.innerHTML += `<td>${属性值}</td>`;
  }

  return 行元素;
}
