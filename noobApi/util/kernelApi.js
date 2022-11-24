class KernelApiList {
    constructor(option = {
        思源伺服ip: "127.0.0.1",
        思源伺服端口: "6806",
        思源伺服协议: "http",
        apitoken: ""

    }) {
        let 思源伺服ip = option.思源伺服ip || option.siYuanIp || "127.0.0.1"
        let 思源伺服端口 = option.思源伺服端口 || option.siYuanPort || "6806"
        let 思源伺服协议 = option.思源伺服协议 || option.siYuanScheme || "http"
        this.apitoken = option.apitoken || ""
        this.思源伺服地址 = 思源伺服协议 + "://" + 思源伺服ip + ":" + 思源伺服端口
        if (option.siYuanServiceURL) { this.思源伺服地址 = option.siYuanServiceURL }
        if (option.思源伺服地址) { this.思源伺服地址 = option.思源伺服地址 }

        this.set("POST", "/api/block/appendBlock", 'appendBlock', '插入后置子块')
        this.set("POST", "/api/block/deleteBlock", 'deleteBlock', '删除块')
        this.set("POST", "/api/filetree/getDoc", 'getDoc', '获取文档')
        this.set("POST", "/api/query/sql", 'sql', 'sql')

    }
    async set(方法, 路径, 英文名, 中文名) {
        this[英文名] = this.生成方法(方法, 路径).bind(this)
        this[英文名]['raw'] = this.生成方法(方法, 路径, true).bind(this)

        中文名 ? this[中文名] = this[英文名] : null
    }
    生成方法(方法, 路径, flag) {
        return async function (data, apitoken = "", callback) {
            let resData = null
            if (data instanceof FormData) {
                data = data;
            } else {
                data = JSON.stringify(data);
            }
            let head = {
                'Authorization': 'Token ' + this.apitoken,

                'user-agent': 'Mozilla Mobile/4.0 MDN Example',
            }
            if (!this.apitoken) {
                head = {
                    'user-agent': 'Mozilla Mobile/4.0 MDN Example',

                }
            }
            await fetch(this.思源伺服地址 + 路径, {
                body: data,
                method: 方法,
                headers: head,
            }).then(function (response) { resData = response.json() })
            let realData = await resData
            if (!flag) {
                if (callback) { callback(realData.data ? realData.data : null) }
                return realData.data ? realData.data : null
            }
            else {
                if (callback) { callback(realData ? realData : null) }
                return realData ? realData : null

            }
        }
    }
}
export { KernelApiList }
export default new KernelApiList() 
