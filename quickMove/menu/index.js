import 注册移动块到指定文档菜单 from './moveBlockToDoc.js'
import 注册移动块到当前位置菜单 from './moveBlockToCurrent.js' 
import 注册移动块到最近文档菜单 from './moveDocToRecent.js'

export default function 注册菜单(){
    注册移动块到当前位置菜单()
    注册移动块到指定文档菜单()
    注册移动块到最近文档菜单()
}
