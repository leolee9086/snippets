let https = require('https')
let { session } = require('@electron/remote')

export async function getCookieStr(url) {
    let cookies = await session.defaultSession.cookies.get({ url: url })
    let str = ''
    let raw = {}
    cookies.forEach(
        cookie => {
            str += `${cookie.name}=${cookie.value};`
            raw[cookie.name] = cookie.value
        }
    )
    console.log(str,raw)
    return { str, raw }
}
const filter = {
    urls: ['https://*.zhihu.com/*', '*://electron.github.io/*']
  }
  
session.defaultSession.webRequest.onBeforeSendHeaders(filter,async(details, callback) => {
    try {
        console.log(details.url)
        if (details.url&&details.url.indexOf('zhuanlan.zhihu.com/api') > -1) {
            console.log(details.requestHeaders)
            details.requestHeaders.Cookie=(await getCookieStr(details.url)).str
            console.log(details.requestHeaders.Cookie)
            var cookieHeader = details.requestHeaders.Cookie

            if (cookieHeader.length) {
                var cookieStr = cookieHeader[0].value
                var _xsrf = (await getCookieStr(details.url)).raw._xsrf
                if (_xsrf) {
                    details.requestHeaders['x-xsrftoken']=_xsrf
                       
                }
                console.log('cookieStr', cookieHeader)
            }
            console.log('details.requestHeaders', details)
        }

    } catch (e) { console.error(e)}
    callback?callback( { requestHeaders: details.requestHeaders }):null

}
)



export async function GetJsonWithCookie(options) {
    let { str, raw } = await getCookieStr(options.url)
    !options.headers ? options.headers = {} : null
    !options.headers.Cookie ? options.headers.Cookie = str : null
    if (raw._xsrf) {
        options.headers["x-xsrftoken"] = raw._xsrf
        console.log(options.headers)
    }
    return new Promise((resolve, reject) => {
        const req = https.request(options.url, options, res => {
            let data = '';
            res.on('data', chunk => data += chunk.toString());
            res.on('end', () => {
                console.log(res)

                resolve(data)
            });

        });
        req.on('error', (error) => reject(error));
        req.end();
    })
}


