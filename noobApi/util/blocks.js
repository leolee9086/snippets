//记得导入这个文件，路径要对，怎么个对法自己琢磨一下呗
import 核心api from './kernelApi.js'
export async function 根据目标id移动块到文档(当前块id, 目标id) {
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

export async function 根据目标id移动块所在文档(当前块id, 目标id) {
    if (!当前块id) { return }
    if (!目标id) { return }
    let { path: fromPath, box: fromNotebook } = (await 核心api.获取文档({ id: 当前块id, size: 102400 }, ''))
    let { path: toPath, box: toNotebook, rootID } = (await 核心api.获取文档({ id: 目标id, size: 102400 }, ''))
    await 核心api.批量移动文档(
        {
            fromPaths: [fromPath], fromNotebook, toPath, toNotebook
        }
    )
}
export async function 根据id移动块到目标id后(当前待移动块id, 当前移动目标id) {
    if(当前待移动块id===当前移动目标id){
        return
    }
    let 当前移动目标属性 = await noobApi.核心api.sql({ stmt: `select * from blocks where id = '${当前移动目标id}'` })
    if (当前移动目标属性[0]&&当前移动目标属性[0].type !== 'd') {
        let 父块id = 当前移动目标属性[0].parent_id
        let 当前块dom = (await noobApi.核心api.获取文档({ id: 当前待移动块id, size: 102400 }, '')).content
        let 目标块存在 = (await noobApi.核心api.获取文档({ id: 当前待移动块id, size: 102400 }, '')).content
        if (目标块存在) {
            await noobApi.核心api.删除块({ id: 当前待移动块id })
            await noobApi.核心api.插入块(
                {
                    "dataType": "dom",
                    "data": 当前块dom,
                    "parentID": 父块id,
                    "previousID": 当前移动目标id
                }
            )
        }
    }
}
export default {
    根据目标id移动块到文档,
    根据目标id移动块所在文档,
    根据id移动块到目标id后,
}