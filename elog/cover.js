const { matterMarkdownAdapter } = require('@elog/cli')
const path = require("node:path");
const {rename, unlink} = require("node:fs");


/**
 * 自定义文档插件
 * @param {DocDetail} doc doc的类型定义为 DocDetail
 * @param {ImageClient} imageClient 图床下载器，可用于图片上传
 * @return {Promise<DocDetail>} 返回处理后的文档对象
 */
const format = async (doc, imageClient) => {
    const cover = doc.properties.cover
    // 将 cover 字段中的 notion 图片下载到本地
    if (imageClient)  {
        // 只有启用图床平台image.enable=true时或image.enablForExt=true，imageClient才能用，否则请自行实现图片上传
        const url = await imageClient.uploadImageFromUrl(cover, doc)
        // cover 移动到对应文件夹中的 featured.jpg
        const oldFile = process.cwd() + "/assets" + url
        const format = url.split('.')[1]
        const newFile = process.cwd() + "/content/posts/" + doc.properties.slug + "/featured." + format
        rename(oldFile,newFile,function (err) {
            if (err) throw err
            console.log('成功替换封面')
        })
    }
    doc.body = matterMarkdownAdapter(doc);

    const oldname = process.cwd() + "/content/posts/" + doc.properties.slug + "/" + doc.properties.title + ".md"
    const newname = process.cwd() + "/content/posts/" + doc.properties.slug + "/index.md"
    rename(oldname,newname,function (err) {
        if (err) throw err
        console.log('尝试替换文章名称以正常显示封面...成功')
    })

    return doc;
};

module.exports = {
    format
};
