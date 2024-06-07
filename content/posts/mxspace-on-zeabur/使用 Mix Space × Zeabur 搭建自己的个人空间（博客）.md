---
categories: tech
tags:
  - 垃圾技术
  - blog
  - 今天开服务不用钱
summary: 托管个人空间的新选择。如果你已经有在使用 zeabur 并跑了一些服务在上面，无需另外购买，这种办法可能会更为超值。
description: 喜大普奔，现在终于能在 Zeabur 上运行 Mix Space 了，无服务器选择喜+1。
slug: mxspace-on-zeabur
title: 使用 Mix Space × Zeabur 搭建自己的个人空间（博客）
cover: 'https://www.notion.so/images/page-cover/nasa_buzz_aldrin_on_the_moon.jpg'
date: '2024-05-15 22:45:00'
updated: '2024-06-07 18:58:00'
---

> 🚧 此教程仍在活跃维护中。由于写作时间跨度较大，某些部分可能不适用/不工作，但教程总体没有问题。  
> ~~其实很早就可以了，但草师傅咕了很长时间，又熬夜才咕出来~~（悲


大概在半年之前，看到一位朋友把博客换成了 Mix Space，简单浏览一下发现功能还挺丰富的，而且正好符合我的需求（甚至前端都可以自己手搓），想要部署又苦于自己没有服务器，只好暂时作罢。


后来接触到了 Zeabur 这个 Serverless 服务平台，能够将常见的服务和框架快速部署到云端，而且按用量计费，对于日常的小规模使用来说，基本不会超过开发者计划的每月的5$（35¥）额度，算是一个比较合适的选择。


又因为其支持容器部署，我产生了将 Mix Space 部署在上面的想法。但很不幸的是，在此期间，我尝试许多次，均因为各种原因（几乎都能归因于脚本写错以及数据库连接不上）失败。


好在事情在最近产生了转机：最近的这个 [pull request](https://github.com/mx-space/core/pull/1692) 带来了 docker 镜像的极大改进，通过环境变量指定配置更加容易，不需要劳心费神地修改启动脚本了。


于是趁摸鱼的时候尝试部署，果然一次成功（效果如下）。我高兴地将成果分享给了那个朋友，~~结果被催更了这么一篇教程，于是这只鸽子又双开始了写作，就有了这篇文章。~~


![给那位发的效果图](/img/mxspace-on-zeabur/0c118abbfd9b9707c5559ec6c3337eb9.png)


话不多说，教程开始！


> 💡 本教程图片较多（已经过优化），可能会消耗大量流量，请多加注意。


## 事前准备

- 一个拥有开发者订阅或者团队订阅的 [Zeabur](https://zeabur.com/?referralCode=GrassBlock1) 账号，你可以直接使用 GitHub 登录并绑定支付方式使用
- [Mix Space 文档](https://mx-space.js.org/)，用于查阅以及获取环境变量信息
- 一个能够管理/添加 dns 记录的域名（如果没有的话，你可以使用 Zeabur 提供的域名）

## 部署后端


打开 Zeabur 的 dashboard (dash.zeabur.com)，点击创建项目：


![Untitled.png](/img/mxspace-on-zeabur/b1373a8acf5512b705bf01e0d8baa242.png)


选择一个合适的地区（本文以香港为例）（如果要选择上海，请提前将域名做好备案）：


![Untitled.png](/img/mxspace-on-zeabur/ba25fc9e2ddc698c94a1a84d6e97d756.png)


### 部署数据库


在接下来的页面中选择“数据库”，然后在列表中选择 MongoDB：


![Untitled.png](/img/mxspace-on-zeabur/c7d417fa48c86faf60438e2d69b9094d.png)


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/154c8cde-d9ed-4739-b2db-0407122f1c06/db006155-9e5a-4593-9cbc-cba09942e150/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240607%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240607T154906Z&X-Amz-Expires=3600&X-Amz-Signature=7cf5007fe8defa646e990207b70a54f01745636fd12f1b48a43d800748c06b5b&X-Amz-SignedHeaders=host&x-id=GetObject)


> 💡 或者，你也可以选择暂时跳过，并在”添加服务“时再部署 MongoDB 和 Redis，且二者的先后顺序可以调换。


完成之后，你应该看到和下图相似的界面：


![Untitled.png](/img/mxspace-on-zeabur/0146c56b29c9c7861305efc5ffadc2fa.png)


点击新建服务，按照上一个步骤所示的操作部署 Redis 数据库，完成后应当如下图所示：


![Untitled.png](/img/mxspace-on-zeabur/b367f9f9d05d1ec340fbae6e94ad0294.png)


之后我们就可以正式开始部署了。


### 正式部署


再次点击“添加服务”，不过这次我们选择“预构建镜像”，然后点击对话框右上角的“自定义”，如图所示：


![Untitled.png](/img/mxspace-on-zeabur/935d5560be1553672c66d1b3a6d1caaf.png)


在弹出的对话框中点击左下角的`编辑 TOML 文件`，对以下内容进行适当修改并填入：


> 🚧 截至 2024/06/06 使用这份 TOML 文件会导致不能创建服务，原因未知。


```toml
name = "mx-backend"

[source]
image = "innei/mx-server"

[[ports]]
id = "web"
port = 2333
type = "HTTP"

[[volumes]]
id = "mx-space"
path = "/root/.mx-space"

[env]
TZ = { default = "Asia/Shanghai" , expose = true }

NODE_ENV = { default = "production" , expose = true }

ALLOWED_ORIGINS = { default = "localhost" , expose = true } # 更改为自己的博客（前端）所要使用的域名

JWT_SECRET = { default = "YOUR_SUPER_SECURED_JWT_SECRET_STRING" , expose = true } # 需要自己填写，请务必保存好

DB_HOST = { default = "${MONGO_HOST}" , expose = true } # （这条以及下方的不要修改！）这里是为了正确地使用到 Zeabur 所提供的环境变量，从而确保数据库连接信息正确

DB_USERNAME = { default = "${MONGO_USERNAME}" , expose = true }

DB_PASSWORD={ default = "${MONGO_PASSWORD}" , expose = true }

DB_PORT ={ default = "${MONGO_PORT}" , expose = true }
```


或者手动填写（和上面的效果相同）：


镜像：`innei/mx-server:latest` （输入完成后点击“OK”方可完成下面的步骤）


环境变量 ：点击展开按钮，之后点击”添加环境变量“，填写[环境变量](#环境变量) 一节中的内容（一行只填写一个，左为key，右为value，并**只**勾选上暴露，填写下一个时再点击一次”添加环境变量“）


> 💡 由于手动添加环境变量十分麻烦，所以如果使用这个办法，强烈建议先不填写环境变量，可以再参考后面的步骤填写。


端口：点击`添加端口`，端口名称：web （可自定义方便识别），端口号：2333，类型保持 HTTP 不变 （服务要使用的端口）


卷：点击添加卷，卷 ID：`mx-space`，路径：`/root/.mx-space` （可选，如果你需要备份则必须填写）


检查无误后，点击`部署`即可部署。


### 环境变量


打开创建好的后端（在本例中为 `mx-backend` ）服务，点击环境变量，随后点击“编辑原始环境变量”，将下面的内容做好修改后填入：


```shell
TZ=Asia/Shanghai
NODE_ENV=production
ALLOWED_ORIGINS=localhost # 更改为自己的博客（前端）所要使用的域名
JWT_SECRET=YOUR_SUPER_SECURED_JWT_SECRET_STRING # 需要自己填写，请务必保存好
DB_HOST=${MONGO_HOST} # （不要修改！）这里是为了正确地使用到 Zeabur 所提供的环境变量，从而确保数据库连接信息正确
DB_USERNAME=${MONGO_USERNAME}
DB_PASSWORD=${MONGO_PASSWORD}
DB_PORT=${MONGO_PORT}
```


填写完成后，点击保存，注意右下角弹出的提示，点击上面的“Redeploy”.


![Untitled.png](/img/mxspace-on-zeabur/073b861502ebdbfbf776661f9e637fc8.png)


如果错过了这个提示，你也可以点击“部署”一栏的“重启”手动重启：


![Untitled.png](/img/mxspace-on-zeabur/d6555ba9b6ba7fad998c505f22606ddd.png)


等待服务重启完成时，完成最后一步——绑定域名：


点击“网络”，找到“公开”一栏，如果你没有域名，可以点击“生成域名”产生一个 [zeabur.app](http://zeabur.app/) 域名，如果你愿意使用自己已有的域名，点击“自定域名”添加域名并配置对应记录即可，具体可参考[ Zeabur 有关域名绑定的文档](https://zeabur.com/docs/zh-CN/deploy/domain-binding) 。


![Untitled.png](/img/mxspace-on-zeabur/fab907e4dfefbce3cef2fd44fc36cc88.png)


> 💡 如果你想让前端和后端共用一个域名，那么请跳过此步，并在前后端部署完成后阅读 [扩展包：使用单个域名](#扩展包：使用单个域名) 一节的相关内容。


至此，后端的部署工作已经基本完成，如果不出意外，后端服务的状态应当是“运行中”了。


## 配置后端


> 💡 如果你想让前端和后端共用一个域名，那么请跳过此步，并在前后端部署完成后阅读 [扩展包：使用单个域名](#扩展包：使用单个域名) 一节的相关内容。


首先确保后端对应的服务在运行，新建一个浏览器标签页，打开 `绑定的域名/proxy/qaqdmin` ，不出意外的话，你应该会看到配置引导页面，按照提示设置即可。


完成后，你应该会被重定向到后台管理的仪表盘，如下图所示：


![Untitled.png](/img/mxspace-on-zeabur/e2dd24a0aae5bc09deaebe1369b3b156.png)


## 部署前端


由于 Mix Space 目前已知的还在维护的前端只有 Shiro，下面的教程将以其作为示例，如果你拥有自己的前端或者想要使用不再维护的前端，欢迎尝试。


有两种方法可供选择，但无论如何，**请务必先通过** [**Shiro 主题文档**](https://mx-space.js.org/themes/shiro#%E9%94%AE%E5%85%A5%E7%8E%AF%E5%A2%83%E5%8F%98%E9%87%8F--%E5%BC%80%E5%A7%8B%E9%83%A8%E7%BD%B2) **完成准备步骤，获取并设置到相应的配置和环境变量！否则前端将无法正常使用！**


比较推荐的方法是使用 Docker 容器创建自定义服务：


和部署后端基本一致，在原有的项目再次点击“新建服务”，选择预构建镜像，点击“自定义”，填入如下信息：


镜像：`innei/shiro:latest`


端口：点击`添加端口`，端口名称：web （可自定义方便识别），端口号：2323，类型保持 HTTP 不变 （服务要使用的端口）


环境变量：点击展开按钮，之后点击 ”添加环境变量“，key 填写 `NEXT_SHARP_PATH`，value填写`/usr/local/lib/node_modules/sharp`，并**只**勾选上 暴露。


其它保持留空即可。


或者使用 TOML 文件：


```toml
name = "Shiro"

[source]
image = "innei/shiro"

[[ports]]
id = "web"
port = 2323
type = "HTTP"

[env]
NEXT_SHARP_PATH = { default = "/usr/local/lib/node_modules/sharp" , expose = true  }


```


点击右下角部署即可。


随后来到项目页，点击环境变量，随后点击“编辑原始环境变量”，将从文档处获得的环境变量填入，如下图所示：


![Untitled.png](/img/mxspace-on-zeabur/90db3365a7c4dda871b85d8999c56502.png)


完成后点击保存，重启服务。


最后参考部署后端时绑定域名的步骤绑定域名，即可到访问博客。


> 🚧 请确保你在此处绑定的是你想展示给外界的域名（即你的博客域名），且不能和后端的域名重复。


> 💡 如果你想让前端和后端共用一个域名，那么请跳过绑定域名的步骤，并在部署完成后阅读 [扩展包：使用单个域名](#扩展包：使用单个域名) 一节的相关内容。


还有一种方法是通过 Git 方式部署（可能会失败，建议先行尝试）：


首先将 [Innei/Shiro](https://github.com/Innei/Shiro) 仓库 Fork 到你的 GitHub 账户（ 目前 Zeabur 通过此种方式仅支持 GitHub ）下，如果需要修改源码，请提前修改并推送到仓库：


然后回到 Zeabur 仪表盘相对应的项目，点击新建服务，选择 GitHub。


![Untitled.png](/img/mxspace-on-zeabur/5dac1ded0e3be676761bf0318510080d.png)


然后在弹出的对话框中点击“配置 GitHub”，授权访问 Fork 所在的账户中的仓库。


![Untitled.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/154c8cde-d9ed-4739-b2db-0407122f1c06/dc4ead1f-1571-47d8-bdf7-79999a7d8ebb/Untitled.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20240607%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20240607T154859Z&X-Amz-Expires=3600&X-Amz-Signature=13e1a76fbd9c148d3151b5bae73685ee5e1c27e9058b1fe623f9ee807635d47c&X-Amz-SignedHeaders=host&x-id=GetObject)


![Untitled.png](/img/mxspace-on-zeabur/7dfb2ec4c63a539c2cbc27f657c6b188.png)


完成授权后选择 Shiro 所在的仓库即可部署。


部署之后，参考上面的方法填入环境变量，绑定域名即可访问你的博客。


至此，整个部署过程就结束了，希望你能够享受写博客的乐趣！


## 扩展包：使用单个域名


如果你觉得前端和后端分别部署在两个域名比较麻烦，那么通过使用 Nginx 等 web 服务器配置反向代理来实现单域名访问是一个不错的方案，而在 Zeabur 中也比较容易实现这一点。


首先来到 Zeabur 仪表盘，打开部署的 Mix Space 项目，点击“添加服务”，选择“预构建镜像”：


![Untitled.png](/img/mxspace-on-zeabur/8e1a9db397da09605891369f2ecc41d5.png)


在列表中找到 Nginx，并点击部署：


![Untitled.png](/img/mxspace-on-zeabur/a6c1aa1f9eab1e5736cdd440f8ab5d26.png)


在 Services 区域中，点击 nginx 服务的 `设置` 栏目的下拉按钮，找到 `Configs` 部分点击 `Open Config Editor` 按钮，进入配置文件编辑器。


![Untitled.png](/img/mxspace-on-zeabur/4ef2419c800840a9235fca650538e32e.png)


在打开的编辑器中，清空默认打开的 `/etc/nginx/nginx.conf` ，并填入以下内容：


> 💡 在此例中，我们假设后端对应的服务的名称是 `mx-backend` ，前端对应的服务的名称是 `shiro` （如上图所示）。如果你的项目中的服务不使用这些名字，需要手动修改对应的配置。


```text
worker_processes  5;
error_log  stderr;
worker_rlimit_nofile 8192;

events {}

http {
    default_type application/octet-stream;
    log_format   main '$remote_addr - $remote_user [$time_local]  $status '
    '"$request" $body_bytes_sent "$http_referer" '
    '"$http_user_agent" "$http_x_forwarded_for"';
    access_log   /dev/stdout  main;
    sendfile     on;
    tcp_nopush   on;
    server_names_hash_bucket_size 128; # this seems to be required for some vhosts

    server {
        ## 反向代理开始
        ## WebSocket 地址
        location /socket.io {
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection "Upgrade";
            proxy_buffering off;
            proxy_set_header Host $host;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_pass http://mx-backend.zeabur.internal:2333/socket.io;
        }
        ## API 地址
        location /api/v2 {
            proxy_pass http://mx-backend.zeabur.internal:2333/api/v2;
        }
        ## 简读 render 地址
        location /render {
            proxy_pass http://mx-backend.zeabur.internal:2333/render;
        }
        ## Shiro 地址
        location / {
            proxy_pass http://shiro.zeabur.internal:2323;
        }
        ## 后台地址
        location /proxy {
            proxy_pass http://mx-backend.zeabur.internal:2333/proxy;
        }
        location /qaqdmin {
            proxy_pass http://mx-backend.zeabur.internal:2333/proxy/qaqdmin;
        }
        ## RSS 地址
        location ~* \/(feed|sitemap|atom.xml) {
            proxy_pass http://mx-backend.zeabur.internal:2333/$1;
        }
        ## 反向代理结束
    }
}
```


完成后滚到代码底部，点击下方的 Save 即可保存。


![Untitled.png](/img/mxspace-on-zeabur/41342fb21f3a56728ed34fa8fe963ff9.png)


返回到服务列表，找到 `部署` 区域，点击 `重启` 按钮以重启服务，以使配置文件生效。


我们来到最后的绑定域名环节。点击“网络”，找到“公开”一栏，如果你没有域名，可以点击“生成域名”产生一个 [zeabur.app](http://zeabur.app/) 域名，如果你愿意使用自己已有的域名，点击“自定域名”添加域名并配置对应记录即可，具体可参考[ Zeabur 有关域名绑定的文档](https://zeabur.com/docs/zh-CN/deploy/domain-binding) 。


> ⚠️ 注意：这里需要绑定的是你想展示给外界的域名（即你的博客域名）。


> 💡 如果您使用此部分示例配置 Nginx 反向代理，您的：  
> - API 地址为 `https://www.example.com/api/v2`  
>   
> - 前端（Kami/Shiro）地址为 `https://www.example.com`  
>   
> - GateWay 为 `https://www.example.com`  
>   
> - 本地后台为 `https://www.example.com/proxy/qaqdmin`  
>   
> （其中 [`www.example.com`](http://www.example.com/) 是你在这个步骤中绑定的域名）

	- API 地址为 `https://www.example.com/api/v2`
	- 前端（Kami/Shiro）地址为 `https://www.example.com`
	- GateWay 为 `https://www.example.com`
	- 本地后台为 `https://www.example.com/proxy/qaqdmin`

	（其中 [`www.example.com`](http://www.example.com/) 是你在这个步骤中绑定的域名）


按照上述设定配置好前端和后端后，新建一个浏览器标签页，打开 `绑定的域名/qaqdmin` ，不出意外的话，你应该会看到配置引导页面，按照提示设置即可，同时请务必检查默认给出的API等相关地址是否正确，如果不正确请尽快修改。


完成后，二者应当都正常工作，你应该可以顺利地开始写作之旅了！


## 可能存在的问题

1. 部署之后的 Mix Space 无法通过后台进行备份（表现为面板中显示备份文件不存在），推荐通过 Zeabur 自带的备份功能进行备份（一周手动操作一次）。
2. 如果需要更新版本，直接重启对应的服务即可更新，管理面板的更新可以直接通过面板自身完成，且数据不会丢失。

## 总结


总的来说思路是先部署数据库，再部署后端和前端，并尽可能通过环境变量进行配置，其中比较必要的是环境变量 DB=${MONGO} 的映射，其余部分会简单不少。


如果你觉得项目有用，欢迎去给 [mx-space/core](https://github.com/mx-space/core) 点个 ⭐，如果你觉得教程有用，也欢迎多多支持咱（


不出意外的话，最近会把主站搬迁到使用这个办法部署的 Mix Space，敬请期待。

