export async function 获取所有发布范围文档属性(){
    let sql = `
    select *
        from attributes
        where name = 'custom-publish-access'
        and block_id in (
            select id from blocks where type='d'
        )
        `
    return await noobApi.核心api.sql({stmt:sql})
}