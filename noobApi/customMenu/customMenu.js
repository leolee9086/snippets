let 自定义菜单 = {}
export class  自定义菜单原型{
    菜单注册表=[]
    constructor(){
        自定义菜单[this.constructor.name]=this
        console.log(自定义菜单)
    }
    get 待渲染菜单项目数组(){
        return this.菜单注册表.filter(
            菜单项=>{
                if(this.筛选函数){
                    return this.筛选函数(菜单项)
                }
                else{
                    return 菜单项
                }
            }
        )
    }
    菜单状态={}
    判断函数(){}
    注册自定义菜单项(菜单项){ this.菜单注册表.push(菜单项) }
    注册自定义子菜单项(查找条件, 子菜单项){
        let 目标菜单项 = this.菜单注册表.find(
            菜单项 => { return 查找条件(菜单项) }
        )
        if (目标菜单项) {
            !目标菜单项.子菜单配置 ? 目标菜单项.子菜单配置 = [] : null
            let 重复子菜单项 = 目标菜单项.子菜单配置.find(
                待检查项子菜单项 => { return 待检查项子菜单项.id == 子菜单项.id }
            )
            console.log(目标菜单项, 子菜单项)
            if (!重复子菜单项) {
                目标菜单项.子菜单配置.push(子菜单项)
            }
        }
        else return
    }
}
export default 自定义菜单