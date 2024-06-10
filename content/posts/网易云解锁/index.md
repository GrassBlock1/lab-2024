---

title: 在 Android 上优雅的使用 UnblockNeteaseMusic
categories: tech
tags: ['UnblockNeteaseMusic']
description: 无需root&*posed，在Android设备上享受本地解锁音乐的乐趣。
keywords: UnblockNeteaseMusic,Termux
date: 2021-03-25 21:30:00
updated: 2021-11-12 15:54:58
top_img: <https://i.loli.net/2021/03/25/mfAZ2cgd4x6PL9D.png>
cover: <https://i.loli.net/2021/03/25/mfAZ2cgd4x6PL9D.png>
slug: unblock-ncm
---


{{< alert icon="bell" cardColor="#9db4c0" iconColor="#303852" textColor="#324054" >}}
本文最后更新于 2021/11/12，方法可能于一段时间内可用，若不可用请评论告知。
{{< /alert >}}

先来看效果：

![对比图（左图为未使用，右图为使用后）](https://cdn.jsdelivr.net/gh/Grassblock1/jsdelivr/624282_origin_Collage_20210321_191754.jpg "对比图")

![运行样例](/img/unblock_ncm/Screenshot_20211112085506.webp)

可以看到，"VIP"的歌曲变为“免费”了，说明 UnblockNeteaseMusic 已经生效。

# 那么，什么是 UnblockNeteaseMusic 呢？

[![](https://github-readme-stats.vercel.app/api/pin/?username=UnblockNeteaseMusic&repo=server&show_owner=true)](https://github.com/UnblockNeteaseMusic/server)

UnblockNeteaseMusic是一个利用HTTP代理来解锁网易云音乐客户端“变灰”歌曲的一个小工具，支持从多家平台获取音频。

上面是项目卡片，你可以点击它了解更多信息。

下面，我们将逐步地在Termux上搭建并使用它。

# 一些准备工作

你需要：

- 一台运行Android7.0+、WiFi正常的手机（模拟设备也可以，主要用于安装Termux）
- 一个网易云客户端/网页端（用于测试）
- ~~眼睛、正常思考的大脑、手（（~~

{{< alert >}}
推荐配合较低版本的官方客户端进行使用，以下办法仅在6.5.2上测试通过。
{{< /alert >}}

首先要说的是，官方readme并不完全适用于咱的Termux，会出现一些奇怪的问题，我在经历了一番折腾和查找后才最终成功。

（这其中也感谢 一位朋友 [Pan93412](https://github.com/pan93412) 的帮助）

闲话少说，我们正式开始吧。

# 安装Termux

推荐前往 [F-droid](https://f-droid.org/packages/com.termux/) 下载

其它下载方式： [酷安（太旧，不推荐）](https://www.coolapk.com/apk/com.termux) [OneDrive （较旧，也不太推荐）](http://od.imgb.pp.ua/Apps/Termux_0.104.apk) [GitHub Releases](https://github.com/termux/termux-app/releases)

# Method 1：一键脚本 ［Recommended］

在 [项目 Releases 页面](https://github.com/UnblockNeteaseMusic/server/releases) 下载最新版本的 unblockneteasemusic-linux-arm64 脚本复制到 Termux 主目录

一般地，你可以执行以下命令来复制：
`cp ./storage/shared/Download/unblockneteasemusic-linux-arm64 ~/unblockneteasemusic-linux-arm64`

或者，直接在Termux执行
`wget https://github.com/UnblockNeteaseMusic/server/releases/download/v0.27.0-beta.9/unblockneteasemusic-linux-arm64`

（获取最新release版本然后复制文件即可）

赋予执行权限
`chmod +x unblockneteasemusic-linux-arm64`

执行脚本
`./unblockneteasemusic-linux-arm64`

如果出现 `no such file or directory: ./unblockneteasemusic-linux-arm64` ，那么先安装一个proot容器（比如使用 [tmoe-linux](https://github.com/2moe/tmoe-linux) 安装容器）后在容器内再尝试以上步骤。

## 更新

得手动去Releases更新（

不过更新需要先将原有的删除再进行以上步骤：
`rm -r unblockneteasemusic-linux-arm64`

# Method 2 ： Clone 存储库

## 安装相关软件包

注：下面的过程可能对国内网络不太友好（指速度慢），请尝试科学上网，或者更换Termux的软件源（这个请自行Google）。

在Termux的命令行输入

`pkg install nodejs-lts git`

这将会把 NodeJS 长期支持版、git 安装到 Termux 。

## clone 存储库并运行

在上述过程完成后，于任意目录（建议在根目录）执行

`git clone https://github.com/UnblockNeteaseMusic/server`

这将会克隆官方存储库。

之后执行

`cd server`

`node app.js`

如果出现类似于以下的消息，那么恭喜你已经成功了一半！

![success](https://i.loli.net/2021/03/25/y1MYvGRatrhpWe8.jpg "success")

## 更新

直接在此目录下执行
`git pull origin master`

# 更改为 UnblockNeteaseMusic HTTP 代理

配置好后，其他设备也能用哦（

## Android

前往 设置 > WLAN ， 找到当前连接的WLAN，并找到“修改网络”

注：各大系统的修改方式不同，请尝试点击/长按当前WLAN，看其是否显示修改选项。

在修改网络页找到 代理 并改为自动，填写以下内容：

`http://0.0.0.0:8080/proxy.pac`

然后保存即可。

## 其它设备

可以查看[官方 readme](https://github.com/UnblockNeteaseMusic/server/blob/enhanced/README.md)。

# 最后一步

在已配置好代理的设备上启动网易云，享受解锁的乐趣吧～

# 已知问题

1. 使用后会导致部分使用网易云api等的应用、网页及其插件等都会间歇失效（表现为无限加载），这个暂时无解。
2. 在开启 歪球尔派尔沃特奈特沃克（VPN） 等情况下会出现间歇性失效（即未解锁状态），可重启VPN和服务解决。实在不行，建议添加以下内容到绕行列表：

```
0.0.0.0,*.163.com,p1.music.126.net,p2.music.126.net,p3.music.126.net,p4.music.126.net,p5.music.126.net,p6.music.126.net,p7.music.126.net,p8.music.126.net,p9.music.126.net,p10.music.126.net,163yun.com,music.163.com,music.126.net,api.iplay.163.com ,apm.music.163.com,apm3.music.163.com,interface.music.163.com,interface3.music.163.com,mam.netease.com,hz.netease.com
```

（或者导入一个现成的规则/对网易云应用本体进行绕过）

# 题外话

那么教程应该到这里就结束了，还有诸多不完善的地方，欢迎在评论区讨论反馈。  

在 Android 上，还有一些方案，详情可以看[这条消息的评论](https://t.me/realGrassblock/1414)  以及 [此部分 Readme](https://github.com/nining377/dolby_beta#%E4%B8%8B%E8%BD%BD%E6%96%B9%E5%BC%8F)

另外，官方readme提供的方法也可以一试（尽管这在部分设备上不起作用）  

{{< alert icon="fire" cardColor="#e63946" iconColor="#1d3557" textColor="#f1faee" >}}
不建议使用别人搭建的UnblockNeteaseMusic代理，可能会造成隐私泄露等问题。（前两天有群友在传这种方法，所以顺便说一嘴）
{{< /alert >}}
