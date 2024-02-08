+++
title = '不仅仅是迁移到 Hugo - 实验室日志'
date = 2024-02-01T19:07:20+08:00
draft = true
description = '大概也算是某种网站维护日志？希望这是一个好的开始。'
summary = "大概也算是某种网站维护日志？希望这是一个好的开始。"
categories = ['tech','announcement'] 
tags = ['垃圾技术','网站维护']
slug = "migrated-to-hugo-and-more"
+++
如你所见，实验室在经过我几天的折腾之后焕然一新。希望这次的更新能给你带来更好的体验！

说实话，当我接触到Hugo的时候我就一直筹划着这件事。这不正好放了寒假嘛，时间空余比较多，所以花了大概一周把迁移工作完成了。

以下是迁移记录。

## TL;DR
1. 从Hexo迁移到Hugo（主要）
2. 整理网站内容及结构
3. 托管服务切换到Cloudflare Pages
4. 在 envs.net 上建立了新的镜像

### 可能造成的影响
为了尽量减小迁移带来的影响，我[修改了部分配置](#部分细节)。但是以下方面仍有可能影响到原有的订户：
1. 对于使用RSS订阅本站更新的用户，需要将订阅源的地址修改为 `https://lab.imgb.space/index.xml` 。
2. 未来的一段时间内将不再提供评论功能，目前正在寻找新的方案。
3. 一部分质量较低的“水文”以及已经失去效用的文章和页面已经删除，所对应的链接已经失效。
4. 部分文章由于包含Hugo无法解析的特殊语法，导致排版等出现问题，我会尽快修复。

## 从Hexo迁移到Hugo
吸引我迁移到Hugo的原因主要是[PaperMod](https://github.com/adityatelange/hugo-PaperMod)，这个主题的设计非常符合我的审美。我一度有过将它移植到Hexo的想法，但最终因为能力有限加上精力不足，这个计划暂且搁置了。~~而且相较于移植，直接搬家到所对应的Hugo的成本更低一些。~~

其次Hugo构建等等的速度也比Hexo快很多，所以我决定迁移。

### 摘要
此部分工作自2024年1月17日开始，持续时间约一周，进行了包括但不限于内容迁移、主题选择和配置等工作。

### 部分细节
#### 挑选主题
前面提到我因为 [PaperMod](https://github.com/adityatelange/hugo-PaperMod) 这个主题而决定迁移，但是我在准备迁移时还是翻了一下 [Hugo Themes](https://themes.gohugo.io/)，发现了界面更为美观，功能性上也更强，文档也更为完备的 [Blowfish](https://blowfish.page/)，于是决定使用。

我使用 Git submodule 引入主题，这样可以方便地更新主题。之后按照 [主题的文档](https://blowfish.page/docs/installation/#set-up-theme-configuration-files) 将主题包含的的配置文件复制到了项目的 `config` 文件夹下并进行必要修改。

但是这个主题在我需要的功能上有一些缺失，所以我在迁移的过程中对主题自身还进行了一些小的修改。

#### 迁移文章
Hexo 和 Hugo 都使用 Markdown 作为文章的存储格式，所以迁移文章的工作相对来说比较简单。

不过由于 Hugo 对于 Front Matter 中的语法要求比较严格，单纯复制目前所有文章的 markdown 文件反而会导致渲染失败，比如迁移之前有一篇文章的 Front matter 的一部分是这样的：
```yaml
categories: 'tech'
```
会因为`categories`所要求的类型不匹配（要求array，得到string）而导致渲染失败。

所以我在迁移的时候，对要迁移的所有文章的 Front Matter 进行了一次检查和修改，具体方法是先在没有文章的情况下 `hugo server` 跑一个服务，然后把文章逐一地复制，看到报错就修改。好在2021年以后的文章都是在IDE里写的，出的问题比较少，而且这些文章占大多数。

不过找个 linter 或者其类似物应该更快一些，效果会更好。

Blowfish 获取封面的方式与我迁移前使用的 [Butterfly](https://butterfly.js.org/) 主题有所不同。Butterfly 只需要在 Front Matter 中指定 `cover` 字段，而 Blowfish 需要更改存放文章的文件目录结构，以我的年终总结文章为例，原来的目录结构是这样的：
```
content
└── posts
    ├── 2021-on-the-portal.md
    ├── 2022-year-review.md
    └── ...
```
为了让 Blowfish 能够正确获取封面，我需要将目录结构改为这样，并将封面文件置于与文章同级的文件夹中：
```
content
└── posts
    ├── 2021-on-the-portal
    │   ├── index.md
    │   └── featured.jpg
    ├── 2022-year-review
    │   ├── index.md
    │   └── featured.jpg
    └── ...
```
因为之前文章的封面大多都保存在基于OneDrive的图床上，所以我需要手动下载并上传到新的位置，好在文章数量上不算很多，工作量不大。

在这个过程中，我使用 curl 拉取在图床上的封面图片以减少打开浏览器的次数，但我发现图床的图片链接都是经过了一层重定向才能获取到图片，所以我需要使用 `-L` 参数来跟随重定向，比如：
```shell
curl -L -o featured.webp "https://obj.imgb.space/api/raw/?path=/img/2023/wine-office-exp.webp"
```
有关 -L 参数：
> (HTTP) If the server reports that the requested page has moved to a different location (indicated with a Location: header and a 3XX response code), this option makes curl redo the request on the new place.

对于文章中使用的 butterfly 中特有的[标签外挂](https://butterfly.js.org/posts/2df239ce) ，我在迁移的时候将其转换为了 Blowfish 所支持的 shortcode。

我主要使用的是 `{% note %}` 和 `{% timeline %}`，好在都能找到相对应的 shortcode，批量替换即可。

{% note %} 转换为 [Shortcodes · Blowfish](https://blowfish.page/docs/shortcodes/#alert) 中的 `alert` shortcode。

{% timeline %} 转换为 [Shortcodes · Blowfish](https://blowfish.page/docs/shortcodes/#timeline) 中的 `timeline` shortcode。
#### 迁移页面

#### 进一步配置
## 建立镜像
## 备注



