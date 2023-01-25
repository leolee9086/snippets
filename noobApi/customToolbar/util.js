function getAllProtyles() {
  let protyles = [];
  const getProtyle = (layout) => {
    if (layout.model && layout.model.editor && layout.model.editor.protyle) {
      protyles.push(layout.model.editor.protyle);
    }
    if (layout.children) {
      layout.children.forEach((child) => getProtyle(child));
    }
  };
  getProtyle(window.top.siyuan.layout.layout);
  return protyles;
}
export function 获取工具栏对应protyle(工具栏元素) {
  let protyles = getAllProtyles();
  if (protyles) {
    let 当前protyle = protyles.find((protyle) => {
      return protyle.toolbar.element == 工具栏元素;
    });
    return 当前protyle;
  }
}
export function 获取工具栏对应range(工具栏元素) {
  let protyle = 获取工具栏对应protyle(工具栏元素);
  if (protyle) {
    return protyle.toolbar.range;
  }
}
export function 获取工具栏对应块元素(工具栏元素) {
  let range = 获取工具栏对应range(工具栏元素);
  return 获取上层块元素(range.commonAncestorContainer);
}
function 获取上层块元素(dom元素) {
  if (dom元素.tagName == "DIV" && dom元素.getAttribute("data-node-id")) {
    return dom元素;
  } else {
    dom元素 = dom元素.parentElement;
    return 获取上层块元素(dom元素);
  }
}
