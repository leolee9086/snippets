
function 重复执行直到返回(函数,间隔,警告){
    let 执行次数 =0 
    return new Promise((resolve, reject) => {
        if(!间隔){
            间隔 = 500
        }
        let 工具函数 = setInterval(async() => {
            try{
                执行次数+=1
                if(执行次数>10){
                    console.warn(函数,!警告?'执行过多次，请检查':警告)
                }
                let 执行结果 = await 函数()
                if(执行结果!==undefined){
                    执行次数=0
                    clearInterval(工具函数)
                    resolve(执行结果)
                }
            }catch(e){
                执行次数=0
  
                clearInterval(工具函数)
                reject(e)
            }
        }, 间隔);
    })
  }
  const noobPort = await 重复执行直到返回(()=>{return window.noobPort},100,"noob-core的执行可能出问题了")
  const {noobApi} =await import(`http://127.0.0.1:${noobPort}/core/frontEnd/noobApi`);
  export default noobApi