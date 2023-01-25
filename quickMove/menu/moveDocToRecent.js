import noobApi from "../../noobApi/index.js";
import { 根据id移动块到目标id后 } from "../../noobApi/util/blocks.js";
const { 根据目标id移动块到文档, 根据目标id移动块所在文档 } = noobApi.内容块;
function 渲染子菜单(e) {
  let 当前菜单项 = e.currentTarget;
  if (当前菜单项.querySelector("div")) {
    return;
  }
  let 子菜单容器 = noobApi.DOM工具.生成单个dom元素(
    `<div class="b3-menu__submenu" ><div>`
  );
  let 移动当前文档到最近文档菜单 = noobApi.DOM工具.生成单个dom元素(
    `<button class="b3-menu__item  " data-item-id="移动当前文档到最近文档菜单">
    <svg class="b3-menu__icon" style="">
        <use xlink:href="#iconMove"></use>
    </svg>
    <span class="b3-menu__label">移动当前文档到最近</span>
</button>`,
    {
      mouseover: () => {
        //插入子菜单(移动当前文档到最近文档菜单);
      },
    }
  );
  子菜单容器.appendChild(移动当前文档到最近文档菜单);
  当前菜单项.appendChild(子菜单容器);
  插入子菜单(移动当前文档到最近文档菜单);

}
async function 插入子菜单(元素) {
  if (元素.querySelector("div.b3-menu__submenu")) {
    return;
  }
  let 子菜单容器 = noobApi.DOM工具.生成单个dom元素(
    `<div class="b3-menu__submenu" ><div>`
  );
  let 最近文档列表 = await noobApi.核心api.获取最近打开文档();
  最近文档列表.forEach((文档) => {
    子菜单容器.appendChild(
      noobApi.DOM工具.生成单个dom元素(
        `<button class="b3-menu__item  b3-menu__item--show" data-item-id="${文档.title}">
      <svg class="b3-menu__icon" style="">
          <use xlink:href="#iconMove"></use>
      </svg>
      <span class="b3-menu__label">${文档.title}</span>
  </button>`,
        {
          click: () => {
            let 当前块id = noobApi.自定义菜单.当前菜单.菜单状态.当前块id;
            console.log(当前块id)
            根据目标id移动块所在文档(当前块id, 文档.rootID);
          },
        }
      )
    );
  });
  元素.appendChild(子菜单容器);
}
export default function 注册菜单() {
  noobApi.自定义菜单.编辑器菜单.注册自定义菜单项({
    id: "移动当前文档到最近文档菜单",
    文字: "快速移动文档",
    图标: "#iconMove",
    事件配置: {
      mouseover: (e) => {
        渲染子菜单(e);
      },
    },
  });
}
