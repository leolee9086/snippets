let fg = require("fast-glob");

let 总路径 = "D:/wiki";
let 文件夹目录 = fs.readdirSync(总路径);
console.log(文件夹目录);
let 总文件夹数 = 文件夹目录.length;
let 总文件目录 = [];
let 总页面目录 = [];
let 总索引目录 = []
if (!fs.existsSync("D:/wiki/list.json")) {
  文件夹目录.forEach((文件夹名, i) => {
    生成目录(总路径 + "/" + 文件夹名);
    总文件目录 = 总文件目录.concat(解析目录(总路径 + "/" + 文件夹名));
    console.log(i + 1 + "/" + 总文件夹数);
  });

  fs.writeFileSync("D:/wiki/list.json", JSON.stringify(总文件目录, null, 2));
}else{
    总文件目录 =JSON.parse(fs.readFileSync("D:/wiki/list.json"),"utf-8")
    总文件分类(总文件目录)
    索引转换为markdown索引(总索引目录)
}
function 索引转换为markdown索引(总索引目录){
    let markdown =  ''
    总索引目录.forEach(
        索引条目=>{
            markdown+=`## ${索引条目.标题.replace('Category:','')}
            ${索引条目.wikiText}\n\n` 
        }
    )
    fs.writeFileSync("D:/wiki/CategoryList.md", markdown);

}
function 总文件分类(总文件目录){
    总文件目录.forEach(
        文件属性=>{
            if(!文件属性.类别&&文件属性.标题&&文件属性.标题.indexOf('Template:')>=0){
                文件属性.类别="Template"
            }
            else if(!文件属性.类别&&文件属性.标题&&文件属性.标题.indexOf('File:')>=0){
                文件属性.类别="File"
            }
            else if(!文件属性.类别&&文件属性.标题&&文件属性.标题.indexOf('Wikipedia:')>=0){
                文件属性.类别="Wikipedia"
            }
            else if(!文件属性.类别&&文件属性.标题&&文件属性.标题.indexOf('Topic:')>=0){
                文件属性.类别="Topic"
            }
            else if(!文件属性.类别&&文件属性.标题&&文件属性.标题.indexOf('Draft:')>=0){
                文件属性.类别="Draft"
            }
            else if(!文件属性.类别&&文件属性.标题&&文件属性.标题.indexOf('Module:')>=0){
                文件属性.类别="Module"
            }
            else if(!文件属性.类别&&文件属性.标题&&文件属性.标题.indexOf('MOS:')>=0){
                文件属性.类别="MOS"
            }
            else if(!文件属性.类别&&文件属性.标题&&文件属性.标题.indexOf('Portal:')>=0){
                文件属性.类别="Portal"
            }
            else if(!文件属性.类别&&文件属性.标题&&文件属性.标题.indexOf('WikiProject:')>=0){
                文件属性.类别="WikiProject"
            }
            else if(!文件属性.类别&&文件属性.标题&&文件属性.标题.indexOf('MediaWiki:')>=0){
                文件属性.类别="MediaWiki"
            }
            else if(!文件属性.类别&&文件属性.标题&&文件属性.标题.indexOf('Help:')>=0){
                文件属性.类别="Help"
            }
            else if(!文件属性.类别&&文件属性.标题&&文件属性.标题.indexOf('Category:')>=0){
                文件属性.类别="Category"
            }

            else if(!文件属性.类别||文件属性.类别=='Page') {
                文件属性.类别='Page'
                文件属性.输出标题 = 合法化(文件属性.标题)
                总页面目录.push(文件属性)
            }
            if(文件属性.类别=='Category'){
                文件属性.输出标题 = 文件属性.标题.replace('Category:','')
                文件属性.输出标题 = 合法化(文件属性.输出标题)
                if(!文件属性.wikiText){
                    try{
                    文件属性.wikiText=获取文件wikiText(文件属性.文件名)
                    }catch(e){
                        console.error(e)
                    }
                }
                总索引目录.push(文件属性)
            }
        }
    )
    console.log(总页面目录.length)
    fs.writeFileSync("D:/wiki/pageList.json", JSON.stringify(总页面目录, null, 2));
    fs.writeFileSync("D:/wiki/CategoryList.json", JSON.stringify(总索引目录, null, 2));

}
function 获取文件wikiText(文件名){
    let 文本内容 = fs.readFileSync(文件名,'utf-8')
    let temp = (new DOMParser()).parseFromString(文本内容,"text/xml")
    return temp.querySelector('text').textContent

}
function 合法化(文件名){
    let 原始文件名 = 文件名+''
    文件名=文件名.replace(/\//g,'[[斜杠]]')
    文件名=文件名.replace(/\\/g,'[[反斜杠]]')
    文件名=文件名.replace(/\:/g,'[[冒号]]')
    文件名=文件名.replace(/\*/g,'[[星号]]')
    文件名=文件名.replace(/\?/g,'[[问号]]')
    文件名=文件名.replace(/\"/g,'[[双引号]]')
    文件名=文件名.replace(/\</g,'[[左尖括号]]')
    文件名=文件名.replace(/\>/g,'[[右尖括号]]')
    文件名=文件名.replace(/\|/g,'[[竖杠]]')
    return 文件名
}
function 生成目录(文件路径) {
  if (fs.existsSync(文件路径 + "/list.json")) {
    return;
  }
  let 文件列表 = fg.sync(文件路径 + "/**");
  let 文件属性列表 = [];
  文件列表.forEach((文件名) => {
    if (文件名 && 文件名.endsWith(".xml")) {
      let 文本内容 = fs.readFileSync(文件名, "utf-8");
      let temp = new DOMParser().parseFromString(文本内容, "text/xml");
      let 文件属性 = { 文件名: 文件名 };
      if (temp.querySelector("title")) {
        文件属性.标题 = temp.querySelector("title").textContent;
        if (文件属性.标题 && 文件属性.标题.startsWith("Category:")) {
          文件属性.类别 = "Category";
        }
      }
      文件属性列表.push(文件属性);
    }
  });
  fs.writeFileSync(
    文件路径 + "/list.json",
    JSON.stringify(文件属性列表, null, 2)
  );
}
function 解析目录(文件路径) {
  let 列表文件路径 = 文件路径 + "/list.json";
  let 文件列表 = JSON.parse(fs.readFileSync(列表文件路径, "utf-8"));
  return 文件列表;
}
