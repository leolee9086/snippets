export function  shellCmd(target,cmd,path){
    const spawn =require("cross-spawn")
    return new Promise((resolve, reject) => {
        let args = cmd.split(/\s+/)
        const processer = spawn(target, args, {
            cwd: path,
        });
        
        let output = "";
        processer.stdout
            .on("data", (data) => {
                output += data; // 获取输出日志
            })
            .pipe(process.stdout);

            processer.stderr
            .on("data", (data) => {
                output += data; // 获取报错日志
            })
            .pipe(process.stderr);

            processer.on("close", (code) => {
            if (!code) {
                resolve({ code: 0, data: output }); // 如果没有报错就输出正常日志
                return output
            } else {
                reject({ code: code, data: output }); // 如果报错就输出报错日志
                return null
            }
        });
    });
}

export function npmCmd(cmd, path) {    
    if(window.npmPath){
        return shellCmd(window.npmPath,cmd,path)
    }
    else{
        return shellCmd('npm',cmd,path)
    }
}
export function pnpmCmd(cmd, path) {    
    if(window.pnpmPath){
        return shellCmd(window.pnpmPath,cmd,path)
    }
    else{
        return shellCmd('pnpm',cmd,path)
    }
}
export {npmCmd as npm命令行工具}
export {shellCmd as 命令行工具}

