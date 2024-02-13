+++
title = '不仅仅是迁移到 Hugo - 实验室日志'
date = 2024-02-01T19:07:20+08:00
draft = false
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
1. 对于使用RSS订阅本站更新的用户，需要将订阅源的地址修改为 `https://lab.imgb.space/posts/index.xml` 。
2. 未来的一段时间内将不再提供评论功能，目前正在寻找新的方案。
3. 一部分质量较低的“水文”以及已经失去效用的文章和页面已经删除，所对应的链接已经失效。
4. 部分文章由于包含Hugo无法解析的特殊语法，导致排版等出现问题，我会尽快修复。

## 从Hexo迁移到Hugo
吸引我迁移到Hugo的原因主要是[PaperMod](https://github.com/adityatelange/hugo-PaperMod)，这个主题的设计非常符合我的审美。我一度有过将它移植到Hexo的想法，但最终因为能力有限加上精力不足，这个计划暂且搁置了。~~而且相较于移植，直接搬家到所对应的Hugo的成本更低一些。~~

其次Hugo构建等等的速度也比Hexo快很多，所以我决定迁移。

### 摘要
此部分工作自2024年1月17日开始，持续时间约半个月，进行了包括但不限于内容迁移、主题选择和配置等工作。

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

`{% note %}` 转换为 [Shortcodes · Blowfish](https://blowfish.page/docs/shortcodes/#alert) 中的 `alert` shortcode。

`{% timeline %}` 转换为 [Shortcodes · Blowfish](https://blowfish.page/docs/shortcodes/#timeline) 中的 `timeline` shortcode。
#### 迁移页面
区别于Hexo，Hugo 未对文章和页面进行明确的区分，所以除了复制 markdown 文件以外还需要一些额外的配置。

为了实现与使用 Hexo 时相近的效果（即博文都在 URL 路径的 /post/ 下，页面都在 / 下，且拥有不同的样式），先将文章和页面的markdown文件分别置于 `posts` 和 `pages` 文件夹下，然后在 `config/_default/config.toml` 对永久链接进行配置：
```toml
[permalinks]
    [permalinks.page]
        posts = '/post/:slug/'
        pages = '/:filename/'

[permalinks.section]
        posts = '/posts/'
```
这里利用了 Hugo 的 Section 特性，将文章和页面分别置于不同的 Section 下，然后分别配置了永久链接。

同时为了让 Blowfish 的首页能够正确显示文章（而不是页面），还需要对 `config/_default/params.toml` 进行配置：
```toml
mainSections = ["posts"]
```
（如果你直接复制了主题的配置，这一段配置应当在15行左右，直接取消掉注释编辑即可。）这样就能让首页只显示文章了。

最后，利用 Blowfish 内建的的 `simple` layout，这样就能让页面拥有与文章不同的样式了，只需要在页面的 Front Matter 中加上：
```yaml
layout: simple
```
#### 恢复友链
Blowfish 并没有特别用于友链的页面模版，所以我根据现有的 `simple` 模版进行了一些修改，使其能够适应友链页面的需求。

layouts/_default/friends.html:
```html
...
<section class="max-w-full mt-6 prose dark:prose-invert">
    {{ .Content | emojify }}
    {{ partial "link-list.html" . }}
    <!-- 这里通过引入了一个新的 partial 来实现友链的展示，同时便于复用组件和维护。-->
</section>
...
```
也可以不新建 layout，直接使用 `simple` layout 并在友链的 markdown 中使用该 partial。

layouts/partials/link-list.html:
```html
<section class="w-80 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
    {{ range .Site.Data.link }}
    <!-- 遍历读取 link.yml 中的数据并渲染对应的容器。-->
    <a href="{{ .link }}" target="_blank" rel="external" class="min-w-full">
        <div class="min-h-full border border-neutral-200 dark:border-neutral-700 border-2 rounded overflow-hidden shadow-2xl relative">
            <div class="w-full thumbnail_card nozoom" style="background-image:url({{ .avatar }});"></div>
            <div class="px-6 pt-4 pb-2">
                <div class="font-bold text-xl text-neutral-800 decoration-primary-500 hover:underline hover:underline-offset-2 dark:text-neutral">
                    {{ .name | emojify }}
                    <span class="text-xs align-top cursor-default text-neutral-400 dark:text-neutral-500">
              <span class="rtl:hidden">&#8599;</span>
              <span class="ltr:hidden">&#8598;</span>
            </span>
                </div>
                <div class="py-1 prose dark:prose-invert">
                    {{ .descr | emojify }}
                </div>
            </div>
        </div>
    </a>
    {{ end }}
</section>
```
复用了主题中[List Shortcode](https://blowfish.page/docs/shortcodes/#list)，通过遍历读取 data/link.yml 中的数据来生成友链列表，以便于管理。

data/link.yml:
```yaml
- name: "Example"
  link: "https://example.com"
  avatar: "https://example.com/avatar.jpg"
  descr: "This is an example."

```
直接套用了 Butterfly 的[友链格式](https://butterfly.js.org/posts/dc584b87/#%E5%8F%8B%E6%83%85%E9%8F%88%E6%8E%A5%E6%B7%BB%E5%8A%A0)，免去重写的麻烦。
#### 进一步配置
这里只记录除主题提供的配置以外的一些配置。

**自定义页脚**

主要用途是放[萌备](https://icp.gov.moe)。

layout/partials/footer.html:
```html
<!--需要先行复制一份blowfish原有的footer-->
...
  <div class="flex items-center justify-between">
    {{/* Copyright */}}
    {{ if .Site.Params.footer.showCopyright | default true }}
    <p class="text-sm text-neutral-500 dark:text-neutral-400">
      {{- with replace .Site.Params.copyright "{ year }" now.Year  }}
      {{ . | emojify | markdownify }}
      {{- else }}
      &copy;
      {{ now.Format "2006" }}
      {{ .Site.Author.name | markdownify | emojify }}
      {{- end }}
      <br>
        <!--主要部分，需要设置 showCopyright 为 true-->
      {{/* Custom footer */}}
      {{ if .Site.Params.footer.customFooter | default false }}
      {{ .Site.Params.footer.customFooter | emojify | markdownify | safeHTML }}
    {{ end }}
    </p>
    {{ end }}
...
```
config/_default/params.toml:
```toml
[footer]
  showCopyright = true
  customFooter = "<a href=\"https://icp.gov.moe\">萌ICP备</a>"
```
此处提供的并非最佳实践，但是刚好能满足需求。

**umami**

Blowfish 本身并没有提供对 umami 的支持，但提供了在 head 标签内和页脚额外插入代码的支持，只需要把需要的统计代码放入 `layout/partials/extended-head.html` 中即可，比如：
```html
<script async src="https://umami.local/script.js" data-website-id="5a879b0a-2609-4f12-8aea-712c35435e52"></script>
```

**引入图标**

Blowfish 内嵌了一小部分 fontawesome 6 图标，同时也支持引入自定义SVG图标，将要引用的图标放到 `assets/icons` 即可。

但无论是从 fontawesome 官网还是项目的 GitHub release 页面下载的 SVG 图标都是黑色的，与主题使用的颜色并不相符，看起来十分不协调。后来经过一番寻找，在 [主题文档](https://blowfish.page/samples/icons/) 里找到了这句话：

> In order achieve automatic color filling every SVG path needs `fill=“currentColor”` XML attribute.

用记事本等打开 SVG 文件，找到 `<path>` 标签，将 `fill` 的值改为 "currentColor" 即可。

**RSS**

Blowfish 内建的 RSS 模版只能输出文章的标题和摘要，我参考了 [在 Hugo 中使用全文 RSS | CSL 讲废话](https://blog.cubercsl.site/post/rssfullcontent-in-hugo/) 这篇文章，将 RSS 模版进行了修改，使其能够输出全文。

需要注意的是，Blowfish 目前如果对 rss 中的代码块渲染作以下的 [render hook](https://gohugo.io/templates/render-hooks/) 会导致代码高亮失效，不应使用：
```xml
<pre><code>{{ .Inner }}</code></pre>
```

不过目前没有充分的测试，只能算是能用，可能会有一些问题。

## 建立镜像
在迁移完成之后，我在 envs.net 上建立了一个镜像，主要是测试用途。

为了保持镜像的独立性，我利用了 Hugo 的 [environment](https://gohugo.io/getting-started/glossary/#environment) 特性，将镜像的配置文件放在了 `config/envs` 文件夹下，然后在其中进行配置。

在镜像的`config.toml`文件中，将 `baseURL` 修改为镜像地址，保证了部署时镜像的独立性。

envs 开放了 ssh 和 rsync 的访问，可以直接使用 rsync 将本地生成的静态文件上传到它指定的 `~/public_html` 上即可。

参考了[Deploy with Rsync | Hugo](https://gohugo.io/hosting-and-deployment/deployment-with-rsync/)，写了一个简单的脚本来实现一键部署：
```shell
#!/usr/bin/sh
hugo -e envs && rsync -avz --delete public/ [USERNAME]@envs.net:~/public_html/
echo 清空 public 目录...
rm -r public/*
echo done
printf "部署完成\n结果请查看 https://envs.net/~[USERNAME]"
```
由于先前的配置，`hugo -e envs` 会使用 `config/envs` 与 `config/_default` 合并之后的配置文件构建网站到`public`目录，然后 rsync 将生成的静态文件上传到 envs.net 上。

如果你想以类似的过程部署 Hugo ，你可能需要预先配置好 ssh 密钥，以便于无密码登录。至于怎么配置不再赘述。
## 备注
以上这些工作所涉及的代码已经全数开源在了 [Codeberg](https://codeberg.org/grassblock/blowfish-mod)，如有需要可以取用，也欢迎提出建议和贡献。

在这里对看到这里的你道一句新春快乐，希望你能喜欢这次的更新。未来我将更注重于内容创作，也希望你能继续关注。