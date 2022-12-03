/*class DOM监听器 {
  constructor(option) {
    this.监听目标 = option.监听目标
    this.监听选项 = option.监听选项 || {
      attributes: true, childList: true, subtree: true
    }
    this.监听器回调 = option.监听器回调
    this.监听器序列 = []
    this.判定监听目标()
    this.开始监听()
    this.自动刷新监听目标()
  }
  判定监听目标() {

    if (typeof (this.监听目标) == 'string') {

      this.监听目标序列 = document.querySelectorAll(this.监听目标)
      if ((this.监听目标) == "document") { this.监听目标序列 = [document] }
    }
    else if (this.是否DOM(this.监听目标)) {
      this.监听目标序列 = [this.监听目标]
    }
    else if (this.是否DOM序列(this.监听目标)) {
      this.监听目标序列 = this.监听目标
    }
  }
  开始监听() {
    if (this.监听目标序列 && this.监听目标序列[0]) {
      this.监听目标序列.forEach(element => {
        let 监听器 = new MutationObserver((mutationsList, observer) => {
          this.监听器回调(mutationsList, observer)
          this.结束监听()
        })
        监听器.observe(element, this.监听选项)
        this.监听器序列.push(监听器)
      });
    }

  }
  自动刷新监听目标() {
    let 监听器 = new MutationObserver(() => {
      this.判定监听目标()
      this.开始监听()
    })
    监听器.observe(document, {
      attributes: true, childList: true, subtree: true
    })
    let blocks = document.querySelectorAll(`protyle-wysiwyg div[data-node-id]`)
    blocks.forEach(block =>
      block.addEventListener("click", (event) => this.判定并获取块id(event))
    )
  }
  结束监听() {
    this.监听器序列.forEach(
      监听器 => {
        监听器.disconnect()
        监听器 = null
      }
    )
  }
  是否DOM序列(判定目标) {
    return 判定目标 instanceof HTMLCollection;
  }

  是否DOM(判定目标) {
    if (typeof HTMLElement === 'object') {
      return 判定目标 instanceof HTMLElement;
    }
    else {
      return 判定目标 && typeof 判定目标 === 'object' && 判定目标.nodeType === 1 && typeof 判定目标.nodeName === 'string';
    }
  }
  判定并获取块id(event) {
    if (event && event.target) {
      let target = event.target
      this.获取id(target)
    }
  }
  获取id(target) {
    if (target.getAttribute("data-node-id")) {
      naive.当前块id = target.getAttribute("data-node-id")
      naive.事件总线.emitt("当前块id改变", naive.当前块id)
    }
    else target = target.parentElement
    this.获取id(target)
  }
}

const hideElements = (panels, protyle) => {
  if (!protyle) {
    if (panels.includes("dialog")) {
      for (let i = 0; i < window.siyuan.dialogs.length; i++) {
        if (window.siyuan.dialogs[i].destroy()) {
          i--;
        }
      }
    }
    return;
  }
  if (panels.includes("hint")) {
    clearTimeout(protyle.hint.timeId);
    protyle.hint.element.classList.add("fn__none");
  }
  if (protyle.gutter && panels.includes("gutter")) {
    protyle.gutter.element.classList.add("fn__none");
    protyle.gutter.element.innerHTML = "";
    // https://ld246.com/article/1651935412480
    protyle.wysiwyg.element
      .querySelectorAll(".protyle-wysiwyg--hl")
      .forEach((item) => {
        item.classList.remove("protyle-wysiwyg--hl");
      });
  }
  if (protyle.toolbar && panels.includes("toolbar")) {
    protyle.toolbar.element.classList.add("fn__none");
  }
  if (protyle.toolbar && panels.includes("util")) {
    const pinElement =
      protyle.toolbar.subElement.querySelector('[data-type="pin"]');
    if (
      !pinElement ||
      (pinElement && !pinElement.classList.contains("ft__primary"))
    ) {
      protyle.toolbar.subElement.classList.add("fn__none");
    }
  }
  if (panels.includes("select")) {
    protyle.wysiwyg.element
      .querySelectorAll(".protyle-wysiwyg--select")
      .forEach((item) => {
        item.classList.remove("protyle-wysiwyg--select");
      });
  }
};
const disabledProtyle = (protyle) => {
  hideElements(["gutter", "toolbar", "select", "hint", "util"], protyle);
  protyle.disabled = true;
  protyle.wysiwyg.element.setAttribute("contenteditable", "false");
  protyle.wysiwyg.element
    .querySelectorAll('[contenteditable="true"][spellcheck="false"]')
    .forEach((item) => {
      item.setAttribute("contenteditable", "false");
    });
};
class protyleEditor {
  constructor() {
    window.siyuan.ws.ws.addEventListener("message", () => {
      this.hackBacklink();
    });
    document.addEventListener("mouseover", () => {
      this.hackBacklink();
    });
    let 监听选项1 = {
      监听目标: `[data-node-id]`,
      监听器回调: () => this.hackBacklink(),
    };

    this.DOM监听器1 = new DOM监听器(监听选项1);

    this.hackBacklink();
  }
  async hackBacklink() {
    let 目标元素组 = document.querySelectorAll(
      `.backlinkList.fn__flex-1 ul [data-treetype="backlink"] .b3-list-item__text,.backlinkMList.fn__flex-1 ul [data-treetype="backlink"] .b3-list-item__text`
    );
    let 目标元素组1 = document.querySelectorAll(
      ".protyle-wysiwyg__embed:not(.protyle-wysiwyg__embed .protyle-wysiwyg__embed)"
    );
    this.createEditor(目标元素组);
    this.createEditor(目标元素组1);

    //window.requestAnimationFrame(async() => this.hackBacklink())
  }
  createEditor(目标元素组) {
    this.渲染计数器 = 0
    目标元素组.forEach( (块元素, i) =>
      setTimeout(() => {
        if(window.siyuan.mobileEditor){
          return
        }
       
        if (块元素.parentElement.dataset.type == "NodeDocument") {
          this.渲染计数器 -= 1
          return;
        }
        if (!this.isInViewPort(块元素)) {
          this.渲染计数器 -= 1
          if (块元素.shadowRoot) {
            let element = 块元素.shadowRoot.querySelector("iframe");
            element.setAttribute('src', '')
          }
          return;
        }
        if (this.渲染计数器 > 5) {
          return
        }
        this.渲染计数器 += 1
        if (!块元素.shadowRoot) {
          块元素.attachShadow({ mode: "open" });

          let rect =块元素.getBoundingClientRect
          let element = document.createElement("iframe");
          element.classList.add(
            "block__popover",
            "block__popover--move",
            "block__popover--top"
          );
          element.setAttribute("loading", 'lazy');
          element.setAttribute("border", 0);
          element.setAttribute("width", "100%");
          element.setAttribute("height", rect.height+"px");

          element.setAttribute("frameBorder", "none");
          element.setAttribute(
            "src",
            `/stage/build/mobile/?hideToolBar=true&&id=${(块元素.dataset && 块元素.dataset.id) ||
            块元素.previousElementSibling.dataset.id
            }`
          );
          
          element.className = "block__edit  fn__flex-1 protyle fn__none";
          document.body.appendChild(element)

          块元素.shadowRoot.appendChild(element);
          element.classList.remove("fn__none")
          element.refreshParent =()=>{
            console.log("全部刷新")
            console.log(element.contentWindow)
            块元素.parentElement.parentElement.querySelector(".protyle-icon.protyle-action__reload.protyle-icon--first").click()
          }
         
        } else {
          let element = 块元素.shadowRoot.querySelector("iframe");
          if (
            element &&
            element.getAttribute("src") !==
            `/stage/build/mobile/?embed=true&&id=${(块元素.dataset && 块元素.dataset.id) ||
            块元素.previousElementSibling.dataset.id
            }`
          ) {
            element.setAttribute(
              "src",
              `/stage/build/mobile/?embed=true&&id=${(块元素.dataset && 块元素.dataset.id) ||
              块元素.previousElementSibling.dataset.id
              }`
            );
          }
        }
      }, 10)
    );
  }
  isInViewPort(element) {
    const viewWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const { top, right, bottom, left ,width,height} = element.getBoundingClientRect();
    return (top<0&&top+height<viewHeight)||0<top<viewHeight
  }
}
if (!window.siyuan.mobileEditor) {
  window.onload =window.protyleEditor= new protyleEditor()
} else {
  if (window.parent !== window)
    window.fetch = window.parent
  window.siyuan.ws.ws = window.parent.siyuan.ws.ws
}


setPosition = (element, x, y, targetHeight = 0, targetLeft = 0) => {
  element.style.top = y + "px";
  element.style.left = x + "px";
  const rect = element.getBoundingClientRect();
  // windows 下悬浮菜单在 drag 位置时无法点击
  let dragBarHeight = 0;
  /// #if !BROWSER
  if ("windows" === window.siyuan.config.system.os) {
    dragBarHeight = window.parent.document.getElementById("drag").clientHeight;
  }
  /// #endif
  // 上下超出屏幕
  if (rect.bottom > window.innerHeight || rect.top < dragBarHeight) {
    const top = y - rect.height - targetHeight;
    if (top > dragBarHeight && (top + rect.height) < window.innerHeight - dragBarHeight) {
      // 上部
      element.style.top = top + "px";
    } else if (top <= dragBarHeight) {
      // 位置超越到屏幕上方外时，需移动到屏幕顶部。eg：光标在第一个块，然后滚动到上方看不见的位置，按 ctrl+a
      element.style.top = dragBarHeight + "px";
    } else {
      // 依旧展现在下部，只是位置上移
      element.style.top = Math.max(30, window.innerHeight - rect.height) + "px";
    }
  }
  if (rect.right > window.innerWidth) {
    // 展现在左侧
    element.style.left = `${window.innerWidth - rect.width - targetLeft}px`;
  } else if (rect.left < 0) {
    // 依旧展现在左侧，只是位置右移
    element.style.left = "0";
  }
};

function 获取元素绝对坐标(element) {
  element = element
    ? element
    : window.frameElement.parentElement || window.frameElement;
  var result = { left: element.offsetLeft, top: element.offsetTop };
  element.offsetParent ? (element = element.offsetParent) : null;
  while (element) {
    result["left"] += element.offsetLeft;
    result["top"] += element.offsetTop;
    element = element.offsetParent;
  }
  return result;
}

function changeEditMode(mode = 0) { // 切换编辑模式
  let toolbarEdit = document.getElementById('toolbarEdit');
  if (toolbarEdit) {
    if (window.siyuan.mobileEditor) {
     
      let editable = toolbarEdit.firstElementChild.getAttribute('xlink:href') === '#iconPreview';
      let event = new MouseEvent('click');
    
      window.siyuan.mobileEditor.protyle.gutter.element.addEventListener("dragstart", (event) => {
        let selectIds = [event.target.getAttribute("data-node-id")];
        const selectElements = window.siyuan.mobileEditor.protyle.wysiwyg.element.querySelectorAll(".protyle-wysiwyg--select");
        if (selectElements.length > 0) {
            selectIds = [];
            selectElements.forEach(item => {
                selectIds.push(item.getAttribute("data-node-id"));
            });
        }
        if (selectElements.length === 0) {
            event.dataTransfer.setDragImage(window.siyuan.mobileEditor.protyle.wysiwyg.element.querySelector(`[data-node-id="${selectIds[0]}"]`), 0, 0);
        }
        event.target.style.opacity = "0.1";
        window.parent.siyuan.dragElement = event.target;
        window.parent.siyuan.dragElement.setAttribute("data-selected-ids", selectIds.toString());
        window.parent.dragFrom=window
  
    }
    
    );

      switch (mode) {
        case 0:
          if (editable) {
            toolbarEdit.dispatchEvent(event)
            break
          }
          else break;
        case 1:
          if (!editable) {
            toolbarEdit.dispatchEvent(event);
            if ((window.parent !== window) && window.parent.siyuan) {
              window.addEventListener("click",()=>{
                setTimeout(()=>{
                  window.tribleClickCounter = 0
                },1000)
                !window.tribleClickCounter?window.tribleClickCounter=1:window.tribleClickCounter+=1
                if(window.tribleClickCounter>=3){
                  console.log('三击')
                  window.tribleClickCounter=0
                }
              })
              window.siyuan.menus.menu.element = window.parent.siyuan.menus.menu.element
              window._menu = window.parent.siyuan.menus.menu
              window.realmenu = window.siyuan.menus.menu
              let pop = window.siyuan.menus.menu.popup
              
              window.siyuan.menus.menu.popup = function (options, isLeft) {
                options.x = options.x + window.frameElement.getBoundingClientRect().left - 320;
                options.y = options.y + window.frameElement.getBoundingClientRect().top
                window.parent.siyuan.menus.menu.popup(options, false)
                window.siyuan.menus.menu.element = window.parent.siyuan.menus.menu.element
              }
              window.domWatcher = new DOM监听器({
                监听目标: `[data-node-id]`,
                监听器回调: () => {
                  setTimeout(() => {
                    if (!document.querySelector("span.protyle-breadcrumb__item").querySelector(".protyle-breadcrumb__text")) {
                      document.querySelector("span.protyle-breadcrumb__item").innerHTML +=
                        `<span class="protyle-breadcrumb__text" title="${document.querySelector(".toolbar__title.b3-text-field").value
                        }">${document.querySelector(".toolbar__title.b3-text-field").value
                        }</span>`
                      window.frameElement.style.height = document.querySelector(".protyle-wysiwyg").scrollHeight + 36 + "px"
                    }
                    else {
                      document.querySelector("span.protyle-breadcrumb__item").querySelector(".protyle-breadcrumb__text").outerHTML =
                        `<span class="protyle-breadcrumb__text" title="${document.querySelector(".toolbar__title.b3-text-field").value
                        }">${document.querySelector(".toolbar__title.b3-text-field").value
                        }</span>`
                      window.frameElement.style.height = document.querySelector(".protyle-wysiwyg").scrollHeight + 36 + "px"
              
                    }
                                }, 100)
                }

              })
            }

            break
          }
          else break;
        default:
          throw new Error(mode);
      }
    }
    else window.addEventListener('focus', () => changeEditMode(mode), { once: true })
  }
}
function focalize(id, callback = null) {

  const breadcrumbs = document.querySelector('.protyle-breadcrumb>.protyle-breadcrumb__bar');
  if (breadcrumbs) {
    let crumb = document.createElement("span");
    crumb.className = 'protyle-breadcrumb__item';
    crumb.setAttribute("data-node-id", id);
    breadcrumbs.appendChild(crumb);
    crumb.click();
    window.addEventListener('error',()=>focalize(id, callback), {once:true})
    // crumb.dispatchEvent(CTRL_CLICK_EVENT);
    crumb.remove();
    setTimeout(() => {
      if (!document.querySelector("span.protyle-breadcrumb__item").querySelector(".protyle-breadcrumb__text")) {
        document.querySelector("span.protyle-breadcrumb__item").innerHTML +=
          `<span class="protyle-breadcrumb__text" title="${document.querySelector(".toolbar__title.b3-text-field").value
          }">${document.querySelector(".toolbar__title.b3-text-field").value
          }</span>`
        window.frameElement.style.height = document.querySelector(".protyle-wysiwyg").scrollHeight + 36 + "px"
      }
      else {
        document.querySelector("span.protyle-breadcrumb__item").querySelector(".protyle-breadcrumb__text").outerHTML =
          `<span class="protyle-breadcrumb__text" title="${document.querySelector(".toolbar__title.b3-text-field").value
          }">${document.querySelector(".toolbar__title.b3-text-field").value
          }</span>`
        window.frameElement.style.height = document.querySelector(".protyle-wysiwyg").scrollHeight + 36 + "px"

      }
    }, 200)

    if (typeof callback === 'function') setTimeout(callback, 100);
  }
  else setTimeout(() => focalize(id, callback), 200);
}

function jumpTo(id, callback = null) {

  const editor = document.querySelector('div.protyle-wysiwyg div[data-node-id] div[contenteditable][spellcheck]');
  if (editor) {
    let ref = document.createElement("span");
    ref.setAttribute("data-type", "block-ref");
    ref.setAttribute("data-subtype", "s");
    ref.setAttribute("data-id", id);
    editor.appendChild(ref);
    ref.click();
    ref.remove();

    if (typeof callback === 'function') setTimeout(callback, 500);
  }
  else setTimeout(() => jumpTo(id, callback), 500);
}

async function goto(id, focus = 0, editable = 1) {
  // 是否聚焦
  // if (parseInt(focus) === 1 || focus === 'true') 
  focalize(id)

 // jumpTo(id); // v2.0.15+ 可直接跳转

  // 是否可编辑
  if (parseInt(editable) === 1 || editable === 'true') setTimeout(() => changeEditMode(1), 50);
  else setTimeout(() => changeEditMode(0), 50);

}
async function jump(...args) {
  try {
    await goto(...args);
  } catch (e) {
    if (e.message === args[0]) {
      setTimeout(() => jump(...args), 500);
    }
    else throw e;
  }
}

function jumpToID() {
  let url = new URL(window.location.href);
  let id = url.searchParams.get('id');

  let focus = url.searchParams.get('focus');
  if (url.searchParams.get('embed')) {
    focus = true
  }
  let editable = 1;
  setTimeout(() => jump(id, focus, editable), 0);
}
let url = new URL(window.location.href);

if (url.searchParams.get('id')) {
  setTimeout(() => {
    try {
      setTimeout(jumpToID, 0);
      setTimeout(()=>{
      document.head.querySelector("#editorFontSize").innerHTML += `
      .toolbar,.protyle-background,#keyboardToolbar{
        display:none !important;
      }
      `},100)

    } catch (err) {
      console.error(err);
    }
  }, 0)
}
  window.addEventListener('mouseup',()=>{
    if(window.dragFrom){
      console.log(window.dragFrom)
    window.dragFrom.location.reload()
    window.dragFrom.frameElement.refreshParent()

    window.dragFrom=null
    }
    })
*/

