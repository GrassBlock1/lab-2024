const path = require("path");

/**
 * 自定义图片路径处理器
 * @param {DocDetail} doc doc的类型定义为 DocDetail
 * @param {string} outputDir 配置文件中图片的存放位置
 * @return {dirPath: string, prefixKey: string} 返回处理后图片存放地址dirPath和文档中图片的前缀prefixKey
 */
const getImagePath = (doc, outputDir) => {
    // 当前文档的存在路径，例如：docs/yuque
    const docPath = doc.docPath
    // 当前文档标题
    const slug = doc.properties.slug
    // 当前文档其他属性
    // 具体可查看elog.cache.json文件docs中的结构
    const properties = doc.properties
    // 根据自己的计算，返回该文档中图片的存放位置
    // 图片存放根目录outputDir为：docs/images
    // 假设文档标题为【标题1】，文档存放路径docPath为: docs/yuque
    // 那么图片存放位置dirPath为: docs/images/标题1
    // 文档图片前缀prefixKey为: ./images/标题1

    // 假设文档标题为【标题2】，文档存放路径docPath为: docs/yuque/一级文件夹
    // 那么图片存放位置dirPath为: docs/images/标题2/
    // 文档图片前缀prefixKey为: ../images/标题2
    const dirPath = path.join(outputDir, slug)
    const prefixKey = path.join("/img", slug)
    // 必须返回这两个字段
    return {
        dirPath,
        prefixKey
    }
};

module.exports = {
    getImagePath,
};