const dockToJSON = (dock) => {
    const json = [];
    const subDockToJSON = (index) => {
      const data = [];
      dock.element
        .querySelectorAll(`span[data-index="${index}"]`)
        .forEach((item) => {
          data.push({
            type: item.getAttribute("data-type"),
            size: {
              height: parseInt(item.getAttribute("data-height")),
              width: parseInt(item.getAttribute("data-width")),
            },
            show: item.classList.contains("dock__item--active"),
            icon: item
              .querySelector("use")
              .getAttribute("xlink:href")
              .substring(1),
            hotkeyLangId: item.getAttribute("data-hotkeylangid"),
          });
        });
      return data;
    };
    const data0 = subDockToJSON(0);
    const data2 = subDockToJSON(1);
    if (data0.length > 0 || data2.length > 0) {
      // https://github.com/siyuan-note/siyuan/issues/5641
      json.push(data0);
    }
    if (data2.length > 0) {
      json.push(data2);
    }
    return {
      pin: dock.pin,
      data: json,
    };
  };
class customDock  {
  constructor(dock) {
    this.dock = dock
    this.内置面板列表=['file','bookmark','tag',"outline","graph","globalGraph", "backlink","inbox"]
    this.realToggleModel = this.dock.toggleModel
    this.dock.toggleModel = this.customToggle.bind(this)
  }
  customToggle(type,show = false, close = false){
    console.log(type,show,close,this.内置面板列表.indexOf(type))
    if(!type){
        return
    }
    if(this.内置面板列表.indexOf(type)>=0){
        this.realToggleModel.bind(this.dock)(type,show,close)
    }
    else{
        console.log("customDock")
        this.realToggleModel.bind(this.dock)()
    }
  }
  addCustom(param){
    if(!param.type){
        return
    }
    if(!param.render){
        return
    }
    let target=this.dock.element.querySelectorAll('div:has(.dock__item )')[param.index||0]
    if(!target){
        target = this.dock.element.querySelectorAll('div:has(.dock__item )')[0]
    }
    let html = `<span data-height="0" 
    data-width="240" 
    data-type="${param.type}" 
    data-index="${index}" 
    data-hotkeylangid="${param.hotkeyLangId}" 
    class="dock__item${param.show ? " dock__item--active" : ""} 
    b3-tooltips b3-tooltips__${this.getClassDirect(index)}" 
    aria-label="${item.label}">
    <svg><use xlink:href="#${item.icon}"></use></svg>
</span>`;
    target.insertAdjantHTML(
        'beforeEnd',html
    )
  }

}
let leftDock= new customDock(
    siyuan.layout.leftDock
)
export {leftDock as leftDock}
