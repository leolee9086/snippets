import { 重复执行直到返回 } from '../../util/common.js'
let tab 
export  function 展平Layout() {
    let array = []
    function flatten(tree) {
        if (tree.children && tree.children instanceof Array) {
            tree.children.forEach(
                item => {
                    array.push(item)
                    if (item.children && item.children instanceof Array) {
                        flatten(item)
                    }
                }
            )
        }
    }
    flatten(window.siyuan.layout.centerLayout)
    return array
}
function 获取tab原型() {
    let array = 展平Layout()
    let tab =  array.filter(
        item => { return item.headElement }
    )[0]
    if(tab){
    return tab.constructor
    }
}
tab = await 重复执行直到返回(获取tab原型)
class customTab extends  tab{
    constructor(options){
        let {panel,title,icon,data} = options
        let docIcon = JSON.stringify({type:options.type,data:data})
        super({panel,title,icon,docIcon})
        this.type = options.type
        this.data = options.data

    }
    save(){
        this.docIcon = JSON.stringify({type:this.type,data:this.data})
    }
}
export  {customTab as Tab}
