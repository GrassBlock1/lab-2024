const { matterMarkdownAdapter } = require('@elog/cli')
const path = require("node:path");
const {rename, mkdir} = require("node:fs");


/**
 * 自定义文档插件
 * @param {DocDetail} doc doc的类型定义为 DocDetail
 * @param {ImageClient} imageClient 图床下载器，可用于图片上传
 * @return {Promise<DocDetail>} 返回处理后的文档对象
 */
const format = async (doc, imageClient) => {
    const cover = doc.properties.cover
    // 将 cover 字段中的 notion 图片下载到本地
    console.log('开始下载封面')
    if (imageClient)  {
        // 只有启用图床平台image.enable=true时或image.enablForExt=true，imageClient才能用，否则请自行实现图片上传
        const url = await imageClient.uploadImageFromUrl(cover, doc)
        console.log('封面下载成功')
        // cover 移动到对应文件夹中的 featured.jpg
        const oldFile = path.join(process.cwd(), "assets" , url)
        const format = url.split('.')[1]
        const newDir = path.join(process.cwd() , "content" , "posts", doc.properties.slug)
        const newFile = path.join(newDir,`/featured.${format}`)
        if (newDir) { mkdir(newDir, { recursive: true }, (err) => {
            if (err) throw err;
            console.log('似乎还没有文章文件夹...正在创建文件夹');
            rename(oldFile, newFile, function (err) {
                if (err) throw err;
                console.log('成功替换封面到正确的位置');
            });
        }); } else {
            rename(oldFile, newFile, function (err) {
                if (err) throw err;
                console.log('成功替换封面到正确的位置');
            });
        }
    }
    doc.body = matterMarkdownAdapter(doc);
    return doc;
};

module.exports = {
    format
};
