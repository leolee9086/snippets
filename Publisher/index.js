import ZhiHuAdapter from './zhihu.js'
import { GetJsonWithCookie } from './util/cookieRequest.js'
/*function sendRequest() { 
    const req = https.request({ 
      method: 'GET', 
      host: 'www.zhihu.com', 
      port: 443, 
      path: '/api/v4/me?include=account_status%2Cis_bind_phone%2Cis_force_renamed%2Cemail%2Crenamed_fullname', 
      headers: { 
        Cookie: str 
      } 
    }, res => { 
      let data = ''; 
      res.on('data', chunk => data += chunk.toString()); 
      res.on('end', () => {
        console.log(req._header) 
        console.log('response body: ', data); 
        console.log('response cookie: ', res.headers['set-cookie']); 
      }); 
    }); 
    req.on('error', console.error); 
    req.end(); 
  } 
  sendRequest()*/


var res = await GetJsonWithCookie({
    url: 'https://api.bilibili.com/x/web-interface/nav?build=0&mobi_app=web',
  })
console.log(res)