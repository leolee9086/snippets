import noobApi from "../noobApi/index.js";
let 事件桥 =new noobApi.事件桥类('themeEditorMain','themeEditorMain')
console.log(事件桥)
事件桥.call('noobApiMain','status__msg',{ msg: `主题修改器启用` })