let https = require('https')

export async function getCookieStr(url) {
    let { session } = require('@electron/remote')
    let cookies = await session.defaultSession.cookies.get({ url: url })
    let str = ''
    let raw ={}
    cookies.forEach(
        cookie => {
            str += `${cookie.name}=${cookie.value};`
            raw[cookie.name]=cookie.value
        }
    )
    return {str,raw}
}
export async function GetJsonWithCookie(options) {
    let {str,raw} =await getCookieStr(options.url)
    !options.headers?options.headers={}:null
    !options.headers.Cookie?options.headers.Cookie=str:null
    if(raw._xsrf){
       options.headers["x-xsrftoken"] =raw._xsrf
    }

    

    return new Promise((resolve, reject) => {
        const req = https.request(options.url,options, res => {
            let data = ''; 

            res.on('data', chunk => data += chunk.toString()); 
            res.on('end', () => {
                resolve(data)
            });

        });
        req.on('error',(error)=> reject(error));
        req.end();
    })
}


