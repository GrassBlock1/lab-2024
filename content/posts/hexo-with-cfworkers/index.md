---
title: 使用 Cloudflare Workers 部署一个 Hexo
date: 2021-08-08 18:35:56
updated: 2023-09-04 18:34:53
tags:

- 垃圾技术
- Hexo
- Cloudflare
categories:
- tech
keywords: Hexo, Workers
description: 利用Cloudflare，加速你的Hexo站吧～（当然其它静态站点也是支持的）
top_img: /img/cf-hexo-cover.png
cover: /img/cf-hexo-cover.png
slug: hexo-with-cfworkers

---

{{< alert icon="circle-info" cardColor="#303952" iconColor="#fafafa" textColor="#f1faee" >}}
本文基于 Sukka's Blog 的 [《将 Hexo 部署到 Cloudflare Workers Site 上的趟坑记录》](https://blog.skk.moe/post/deploy-blog-to-cf-workers-site/) ，图片来源网络，如有侵权请联系。

本文在其基础上做了一些更新，~~使之能够适应3202年的情况~~（
{{< /alert >}}

# 更新日志

2021-08-08 18:35:56 ：初稿
2023-09-04 18:34:53 ：基于有人看以及wrangler的更新废弃了大量旧的东西，更新了一下内容
{{< alert icon="fire" cardColor="#e63946" iconColor="#1d3557" textColor="#f1faee" >}}
最新版本的wrangler已不再支持通过此办法部署纯静态站点，参见[Deprecations · Cloudflare Workers docs](https://developers.cloudflare.com/workers/wrangler/deprecations/#init)。如有类似需求，请移步[Cloudflare Pages](https://pages.cloudflare.com/)。

以下内容中部分已经失效，仅供参考。
{{< /alert >}}

Cloudflare Workers KV 的Pricing一变再变，现在终于开放免费使用辣！不过话说去年似乎KV仍需要5$/月的付费，#我火星了

![现在啥情况](/img/hexo-cf/pricing.png)

虽说只有1GB存储，每天只有100000次读取，不过对于一个静态站点来说，足矣。

所以借此机会就把部署的Hexo（本站）也部署到了Cloudflare Workers一份，打开速度嘛…~~由于咱挂着梯子所以感受不到差别~~

所以话不多说，我们开始吧。

# 准备

- 一台 **amd64 (x86_64)** 的机器
（其它架构的貌似不支持 Wrangler ，已知aarch64架构不行，~~所以用Termux不能弄（哭~~）
- 一个Cloudflare账号
- 一个GitHub账号（自动部署时需要）
- 基本的命令行&Git知识

# 开始

我们假设你已经有一个本地 Node 环境&一个站点项目了（如果没有，可以参看[官方文档](https://hexo.io)创建一个Hexo项目）

## 安装 Wrangler

```shell
npm i @cloudflare/wrangler --save-dev
```

（小声：也可以使用 yarn :  ` $ yarn add -dev @cloudflare/wrangler `）

## 创建 API token

在使用之前，先 [申请一个 API token](https://dash.cloudflare.com/profile/api-tokens)

![创建 Token](/img/hexo-cf/token.png)

选择“编辑 Cloudflare Workers”模板继续。

![去除不必要的权限](/img/hexo-cf/permisson.png)

将“**账户设置**”和“**用户详细信息**”权限删除，部署 Workers Sites 不需要这两个权限，其余配置按照偏好选择
（删除两个权限后后不要动权限！）

将生成的 Token 保留在一个安全的地方备用。

## 初始化项目

在站点项目（比如 Hexo）的根目录下执行：

```shell
wrangler init --site [your-site-name]
```

Wrangler CLI 会使用 Cloudflare Workers Site 的模板在项目里新生成一个 `workers-site` 目录和一个 `wrangler.toml` 文件

使用编辑器（比如 vim ）打开 `wrangler.toml` 文件。

将site一行的 bucket 项改为 ./public：

```toml
site = {bucket = "./public""}
```

在任意位置创建新行

```toml
account_id = '[your_id]'
```

其中[your_id]是你的 Cloudflare 账户id，可以在你域名页面的 “概述” 翻找到

### 域名的额外配置

如果你有域名，那么可以查阅[官方文档](https://support.cloudflare.com/hc/zh-cn/articles/201720164-%E5%88%9B%E5%BB%BA-Cloudflare-%E5%B8%90%E6%88%B7%E5%B9%B6%E6%B7%BB%E5%8A%A0%E7%BD%91%E7%AB%99)将其转移到 Cloudflare， 并且配置路由：

```
route = 'domain.com/*'
```

如不需要cf提供的 workers.dev 子域名，将 `workers_dev` 的值改为 `false` 即可。

以下是一个完整的`wrangler.toml`示例供参考：
{% hideToggle Toml示例 %}

```toml
name = "grassblog"
main = "workers-site/index.js"
compatibility_date = "2023-09-04"
#填写一个就近的日期即可                                                                   
route = 'lab.imgb.space/*'
account_id = 'b45fa9889b43a142f63e2b4ca1509588'
usage_model = ''
compatibility_flags = []
workers_dev = false
site = {bucket = "./public"}
```

部分涉及隐私的部分已经进行替换。
{% endhideToggle %}

配置保存后，运行 ` wrangler login ` ，然后按指引登录你的 Cloudflare 账户。
{{< alert >}}
如果你在一台拥有GUI和浏览器的机器上进行连接时，会自动打开一个浏览器窗口进行登录。

如果你在一台没有GUI的机器（如SSH等）进行连接时，那么需要在本地打开这个链接。
{{< /alert >}}

## 预览和发布

运行下述命令可对 Workers Site 在本地预览：

```shell
wrangler dev
```

选择是否将统计信息发送给Cloudflare（默认为是）

之后会将本地public中的内容构建，浏览器会自动打开一个窗口进行预览（如果没有…手动打开提供的链接吧）。

若预览正常工作，运行下述命令即可将它发布到 Workers Site：

```shell
wrangler publish
```

{{< alert icon="circle-info" cardColor="#303952" iconColor="#fafafa" textColor="#f1faee" >}}
使用自定义子域名时，还需要为上述的route添加一条值为 `100::` 的 AAAA 记录。
[参见：Cloudflare Workers Docs](https://developers.cloudflare.com/workers/platform/routes#subdomains-must-have-a-dns-record)
{{< /alert >}}

## 使用 GitHub Actions

嗯…听起来既繁琐又简单，配置完成后之后再部署时 只需要 ` hexo g ` 之后再 ` wrangler publish ` 即可。但是像我一样的大鸽子（？）不愿每次更改后都要执行这两个命令（突然麻烦了QAQ）

不过 GitHub Actions 就可以简化这一流程，一次编写配置文件，之后只需要将博客源码推送到GitHub，就可以自动构建了，方便了许多～

（据说隔壁 Bitbucket 也有一个类似的自动化 “pipelines”， 有时间试试，咕）

### 尝试自动构建静态文件

既然 Hexo 是一个依赖 Node 的程序…那我们就可以按照一个普通Node.js程序的逻辑来写配置文件。

在站点目录 新建 ` .github/workflows ` 文件夹，并创建一个任意名字的YAML文件（.yml/.yaml），填写以下内容：

```yaml
name: My Hexo Blog # 名字随意
on:
  push:
    branches:
      - master
jobs:
  build:
    runs-on: ubuntu-latest
    strategy:
      matrix:
        node-version:
          - 12.x
    steps:
    - name: Checkout
      uses: actions/checkout@v2
      with:
        # 令 GitHub 在 git clone 和 git checkout 后「忘记」使用的 credentials。
        # 如果之后需要以另外的身份（如你的 GitHub Bot）执行 git push 操作时（如部署到 GitHub Pages），必须设置为 false。
        persist-credentials: false
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v1
      with:
        node-version: ${{ matrix.node-version }}
    # 缓存 node_modules，缓存机制参见 GitHub 文档：https://help.github.com/en/actions/configuring-and-managing-workflows/caching-dependencies-to-speed-up-workflows
    - name: Cache node_modules
      uses: actions/cache@v1 # 使用 GitHub 官方的缓存 Action。
      env:
        cache-name: hexo-node-modules
      with:
        path: node_modules
        key: ${{ runner.os }}-${{ env.cache-name }}-${{ hashFiles('package-lock.json') }} # 使用 package-lock.json 的 Hash 作为缓存的 key。也可以使用 package.json 代替
    # Wrangler 在构建时会在 workers-site 目录下执行 npm i，因此也要缓存这里的 node_modules
    - name: Cache workers-site/node_modules
      uses: actions/cache@v1
      env:
        cache-name: workers-site-node-modules
      with:
        path: workers-site/node_modules
        key: ${{ runner.os }}-${{ env.cache-name }}-${{ hashFiles('workers-site/package-lock.json') }}
    - run: npm i # 执行 Hexo 的依赖安装
    # 完成 npm i 后，hexo 已经被链接到 node_modules 下的 bin 目录、并被注册在 Node.js 的 $PATH 中
    # Hexo 博客的 package.json 中默认注册了这些 script：clean/build/deploy/server
    # 因此，在目录下执行 npm run build 等同于执行 hexo g，但是不需要全局安装 hexo-cli
    - run: npm run build
 ```

 将配置文件推到 GitHub 上，如果自动触发开始构建，且没有错误，那么再添加 部署到 Workers Site 的 Actions。

### Publish 到 Workers Site

利用 Cloudflare 推出的 [Wrangler 的 GitHub Action](https://github.com/cloudflare/wrangler-action) 通过引入 `wrangler-action` 可以直接执行 `wrangler publish`。

先在 GitHub 仓库的 Secret 设置（ Settings > Secrets ）添加一个`CF_WORKERS_TOKEN`的变量，内容为刚刚获取到的Token。

然后再在Actions的配置文件的末尾添加以下内容：

```yaml
- name: Deploy to Cloudflare Workers
  uses: cloudflare/wrangler-action@1.1.0
  with:
    apiToken: ${{ secrets.CF_WORKERS_TOKEN }} # 前一步设置的 Secrets 的名称
    # Wrangler Action 也支持使用传统的 Global API Token + Email 的鉴权方式，但不推荐
```

# 总结

好了，恭喜你，你成功在 Workers Site 部署了一个 Hexo 博客！

使用 Workers 后，节省了网站回源的时间，应该会让网站加载更快吧，嗯？

不过也有点小问题，比如对 Pretty Urls 的支持不好，对中文路径的不适配，等等。

这个嘛…中文路径已经有了解决方案，可以搜索…但是"Pretty Urls”至今无解…

~~所以至今这个网站还是在 Vercel 上部署~~
