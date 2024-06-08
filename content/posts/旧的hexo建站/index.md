---

title: 利用 Termux × GitHub × Hexo 创建免费博客
tags: []
date: 2021-02-25 05:55:00
cover: <https://hazyman.com/img/content/Hexo-Cover.png>
slug: hexo-blogging-old
---

利用GitHub × Termux逐步帮你搭建一个hexo的免费博客（白嫖一个博客岂不妙哉
<!-- more -->
炒冷饭（确信  
又是一篇新的教程力（

应该是比较详尽的安装教程辣（

这篇文章主要是利用GitHub × Termux逐步帮你搭建一个hexo的免费博客（

> 白嫖一个博客岂不妙哉

原文作于 2020/6/13 下午4:09 ，又加以了完善和更新

# 准备工作

- 一个装有 Termux 的手机

> 如果没有，请到 [f-droid](https://f-droid.org/packages/com.termux/) 下载（推荐）

- 一个动手能力强，聪明可爱的你（

# 着手安装

话不多说 我们直接开始吧（  
在进行以下步骤前，请确保给予了存储权限！

1. 安装 git

`pkg install git`

1. 安装 npm & node-js （注意是长期支持版本，其它版本是安装不上的现在可以）

`pkg install nodejs-lts`

（这也会将npm安装到termux）

1. 安装 hexo

`npm install hexo-cli -g`

如果你觉得速度慢 可以在安装之前更换为国内镜像：

`npm config set registry http://registry.npm.taobao.org`

1. 创建一个博客目录

`hexo init blog（此处名字随意）`

> 据说必须是termux自己的目录才可以，否则会报错（故不能输入外部文件夹路径）

1. 更方便的访问博客目录&编辑配置

可以开启sftp服务器进行管理。  
首先输入 `sshd && whoami` 以获取身份信息（  
然后输入 passwd 以设置一个密码（记得要输两次相同的密码！ _建议设置易记的密码_ ）

> 其实此处就是为了开启sftp服务，方便管理文件（

打开你的文件管理器（比如 solid explorer） 添加一个sftp服务器

> 服务器地址： 127.0.0.1 端口：8022

使用刚刚的信息登录即可。

> 已知：mixplorer无法正常使用

（当然如果你习惯于vim 编辑器，可以直接进行以下步骤（

1. 设置 git 部署

首先安装 hexo-deployer-git 。  
在博客目录运行：  
`npm install hexo-deployer-git --save`

安装完成后  
在博客目录的\_config.yml的最后面deploy部分输入以下内容：

```
deploy:
  type: git
  repo: https://github.com/username/reponame
  # example, https://github.com/hexojs/hexojs.github.io
  branch: gh-pages
```

然后保存即可

> 如果你没有 GitHub 账号，也可以使用码云账号（兼容性未知），或者注册一个（
>
> 如果使用码云账号 需要把 repo 链接处改为码云 （ gitee.com ）repo链接
>
> 建议新建一个repo以确保无问题

同时，你还需要更改网站（#url）处为 你 GitHub Pages 的地址（

> 如果使用自己的域名，也请同步更改，否则会出现问题

1. 开始部署

1> 进入博客目录  
`cd blog（也即上面你创建的目录）`

2> 输入以下命令  
`hexo clean && hexo g && hexo d`  
（不过要保证你的配置文件正确）  
之后输入你的 GitHub 账号和密码 即可

1. 在 GitHub 方面的设置

打开你部署好的repo,进入它的settings（别问我在哪里，顶上那么多东西自己看看  
找到 Github pages 并启用它（记得使用 gh-pages 的分支）

> 如果你想设置自己的域名，可以在启用后设置，注意和hexo的配置保持一致！，也可以打开强制https，获得更好体验（

# 开始写作

使用 `hexo new <文章标题>` 来创建文章，或者在 /source/\_post 新建一个 .md （Markdown）文件

# 换个样子？

Hexo 和许多开发者们提供了大量的主题，你可以前往 [https://hexo.io/themes/](https://hexo.io/themes/) 获取它们。

# 配置 RSS

这里参考了[为hexo博客添加RSS订阅功能 - SegmentFault 思否](https://segmentfault.com/a/1190000012647294)。  
需要用到 hexo-generator-feed 。  
在博客目录运行  
`npm install hexo-generator-feed`

完成后再修改 \_config.yml，在一块空的风水宝地添加以下内容（确信：

```
feed:
    type: atom
    path: atom.xml
    limit: 20
    hub:
    content:
    content_limit:
    content_limit_delim: ' '
```

然后保存即可。  
若想立即看到结果，可以运行  
`hexo clean & hexo g & hexo s`  
并在浏览器打开 localhost:4000 来查看。

# 总结

嗯 教程大概到这里就结束了，希望能对你有一些帮助，Happy Writing!

更详尽的hexo教程烦请看这里辣👇👇  
[https://github.com/blinkfox/hexo-theme-matery/blob/develop/README\_CN.md](https://github.com/blinkfox/hexo-theme-matery/blob/develop/README_CN.md)

[https://hexo.io/zh-cn/docs/](https://hexo.io/zh-cn/docs/)  
我们下个教程见！
