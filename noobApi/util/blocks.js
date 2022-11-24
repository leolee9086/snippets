//记得导入这个文件，路径要对，怎么个对法自己琢磨一下呗
import 核心api from './kernelApi.js'
export async function 移动块(当前块id, 目标id) {
    if (!当前块id) { return }
    if (!目标id) { return }
    let 当前块dom = (await 核心api.获取文档({ id: 当前块id, size: 102400 }, '')).content
    let 目标文档id = (await 核心api.获取文档({ id: 目标id, size: 102400 }, '')).rootID
    if (目标文档id) {
        await 核心api.删除块(
            {
                id: 当前块id
            }, ''
        )
        await 核心api.插入后置子块(
            {
                "data": 当前块dom,
                "dataType": "dom",
                "parentID": 目标文档id
            }
        )
    }
}
