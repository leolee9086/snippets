
export async function 获取可用端口号(端口号){
    return new Promise((resolve, reject) => {
        let http = require('http')
        let 测试服务 = http.createServer()
        let 可用端口号 = 端口号||3000
        测试服务.on(
            'listening',()=>{
                console.log(端口号)

                测试服务.close(()=>{
                    resolve(可用端口号)
                })
                
            }
        )
        测试服务.on(
            'error',async(error)=>{
                console.log(error)
                if(error.code==='EADDRINUSE'){
                    resolve(await 获取可用端口号(可用端口号+1))
                }
                else{
                    reject(error)
                }
            }
        )
        测试服务.listen(端口号)
    })
    
}
