import ZhiHuAdapter from './zhihu.js' 
let {session} = require('@electron/remote')
let https = require('https')
let cookies =await session.defaultSession.cookies.get({url:'https://www.zhihu.com'})
let str=''
cookies.forEach(
	cookie=>str+=`${cookie.name}=${cookie.value};`
)
console.log(str)
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
window.$ ={
    ajax:(...args)=>{console.log(...args)}
}

let res= await fetch(
	'https://www.zhihu.com/api/v4/me?include=account_status%2Cis_bind_phone%2Cis_force_renamed%2Cemail%2Crenamed_fullname',
  	{
		credentials:'include',
		mode:'cors',
		method:'get',
		headers:{
		"cookie":str
		}
	}
)
let apitoken = window.siyuan
console.log(await res)
