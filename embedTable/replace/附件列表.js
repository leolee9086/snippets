let 附件列表 = {
  判定函数: (sql, id) => {
    return sql && sql.startsWith("SELECT * FROM assets");
  },
  字段过滤:async (字段名数组, 嵌入块sql, 嵌入块id) => {
    return ['block_id','docpath','预览']
  },
  表身替换: (表身内容, 结果条目, 嵌入块sql, 嵌入块id, 字段名) => {
    if (字段名 === "预览") {
     // let 图片格式列表 = ["jpg", "webp", "jpeg", "png", "svg", "gif",''];
     // if (图片格式列表.indexOf(结果条目.name.split(".").pop()) >= 0) {
       return `<img src='/assets/${结果条目.name}'></img>`;
     // } else {
     //   return 结果条目.name;
     // }
    } else {
      return 表身内容;
    }
  },
};
export default 附件列表;
