
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
//来自query挂件
export function HTMLDecode(text) {
    // REF: [javascript处理HTML的Encode(转码)和Decode(解码)总结 - 孤傲苍狼 - 博客园](https://www.cnblogs.com/xdp-gacl/p/3722642.html)
    let temp = document.createElement("div");
    temp.innerHTML = text;
    return temp.textContent;;
}

export function 解析ial字符串(ial) {
    // 解析 ial 字符串
    // ial 字符串格式： {: key="value" key="value" ...}
    // 返回对象：{key: value, key: value, ...}
    if (ial == '' || ial == null) return {};
    let IAL = ial
        .replace(/\\/g, '\\\\')
        .replace(/\s*(\S+)="(.*?)"/g, ',"$1":"$2"')
        .replace(/^\{\:\s*\,\s*/, '{');
    IAL = JSON.parse(IAL);
    for (const key in IAL) IAL[key] = HTMLDecode(IAL[key]);
    return IAL;
}
