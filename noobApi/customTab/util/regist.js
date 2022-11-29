import { hackLayout, tab注册表 } from './hack.js'
export function 注册自定义tab(类型, 构造函数) {
    tab注册表[类型] = 构造函数
    hackLayout()
}


