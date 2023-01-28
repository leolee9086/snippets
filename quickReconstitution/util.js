import noobApi from "../noobApi/index.js";
export async function 转换当前文档为上级文档一级标题() {
  let 当前文档id = noobApi.自定义菜单.当前菜单.菜单状态.当前块id;
  let 当前文档信息 = (
    await noobApi.核心api.sql({
      stmt: `select * from blocks where id='${当前文档id}'`,
    })
  )[0];
  let IDpath = 当前文档信息.path.replace(".sy", "");
  let 路径id数组 = IDpath.split("/");
  if (路径id数组.length === 1) {
    return;
  } else {
    let 上级文档id = 路径id数组[路径id数组.length - 2];
    await 转换文档为目标文档标题(当前文档id, 上级文档id);
  }
}
async function 转换文档为目标文档标题(文档id, 目标文档id) {
  let 目标文档内容 = await noobApi.核心api.getDoc({
    id: 目标文档id,
    size: 102400,
  });
  let div = document.createElement("div");
  div.innerHTML = 目标文档内容.content;
  let 目标块id = div
    .querySelector("[data-node-id]")
    .getAttribute("data-node-id");
  let data = await noobApi.核心api.doc2Heading({
    srcID: 文档id,
    after: false,
    targetID: 目标块id,
  });
  if (data && data.srcTreeBox) {
    await noobApi.核心api.removeDoc({
      noteBook: data.srcTreeBox,
      path: data.srcTreePath,
    });
    window.location.reload();
  }
}
export async function 根据标题拆分文档(标题id){
    let 标题信息 = (await noobApi.核心api.sql(
        {
            stmt:`select * from blocks where id = '${标题id}'`
        }
    ))[0]
    await 根据标题级别拆分文档(标题信息.root_id,标题信息.type)
}
async function 根据标题级别拆分文档(文档id, 标题级别) {
  let 标题列表 = await noobApi.核心api.sql({
    stmt: `select * from blocks where parent_id='${文档id}' and type = 'h${标题级别.replace(
      "h",
      ""
    )}'`,
  });
  标题列表.forEach((标题) => {
    noobApi.核心api.heading2Doc({
      targetNoteBook:标题.box,
      srcHeadingID: 标题.id,
      targetPath: 标题.path,
      pushMode: 0,
    });
  });
}
