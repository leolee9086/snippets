let 界面状态  = {
    鼠标状态:{
        最后鼠标点击元素:{},
        最后鼠标点击事件:{},
        当前鼠标坐标:{},
        当前鼠标元素:{},
    },
    键盘状态:{
        最后键盘输入元素:{},
        最后键盘输入事件:{},
    },
}
let 鼠标单击回调 = (鼠标事件)=>{
    界面状态.鼠标状态.最后鼠标点击元素=鼠标事件.target
    界面状态.鼠标状态.最后鼠标点击事件=鼠标事件
}
document.addEventListener(
    "click", (event) => {
        鼠标单击回调(event)
    }, true
)
document.addEventListener(
    "contextmenu", (event) => {
        鼠标单击回调(event)
    }, true
)
let 键盘事件回调= (键盘事件)=>{
    界面状态.键盘状态.最后键盘输入元素 = 键盘事件.target
    界面状态.键盘状态.最后键盘输入事件 = 键盘事件
}
document.addEventListener(
    "beforeinput",(键盘事件)=>{
        键盘事件回调(键盘事件)
    },true
)
export { 界面状态 as 界面状态}