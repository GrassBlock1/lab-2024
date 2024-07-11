+++
title = '暂停 Windows 功能更新'
date = 2024-06-15T23:54:10+08:00
draft = false
tags = ['Windows', '更新', '注册表']
categories = ['tech']
description = '暂停 Windows 功能更新的注册表文件，让你的 Windows 更新更加可控。'
summary = '暂停 Windows 功能更新的注册表文件，让你的 Windows 更新更加可控。'
+++

原发布帖： https://nya.one/notes/9ujuuwmniawx1yjx

你是否因为微软最近的更新塞入了微软电脑管家、任务栏置入 Copilot 而烦恼？担心后续收到更不需要的功能？试试暂停功能更新吧。

根据 [Microsoft 有关 Windows 更新的文档](https://https://learn.microsoft.com/en-us/windows/deployment/update/waas-configure-wufb#pause-feature-updates)，收到功能更新的时间其实是可以通过几个组策略（或者其对应的注册表值）来暂停的，有利于企业对更新的调控。

而 `功能更新` 正对应着这些功能性的更新（~~似乎有点废话~~），微软大部分的功能添加都是通过这类更新推送。

暂停这些更新，至少会在更新层面上更加与 LTSC 的体验类似，所以现今能找到的 “类 LTSC” 镜像几乎都是通过这种办法实现的。（比如我正在使用的 windsys 封装的镜像，目前项目似乎暂停了大型更新）

所以我根据系统镜像里已有的内容以及自己对文档的理解简单制作了一个小的注册表文件，能够暂停功能更新 1000 天（为了保险，我将结束时间写到了 2042 年），导入后会立即生效。

效果应该是：打开 Windows 更新之后显示：你的组织为你暂停了一些更新，打开高级选项 > 配置的更新策略 多出两条关于功能更新的策略（如图）

这样微软后面喂的不管是什么东西就应该吃不到了，但是安全更新和补丁可以继续接收，因为这些内容几乎都是在质量更新。

但是就目前来说不像一般的暂停更新，**功能更新一旦暂停很难手动恢复**，所以请慎重选择。

**操作注册表有风险，注意备份**

另外可参考：
https://gal.vin/posts/2021/better-windows-updates-for-everyone/


（转载请标明来源）

[下载注册表（右键此处 > 另存为）](https://gist.githubusercontent.com/GrassBlock1/c002d1a96d739d694b421063fb8dd5e3/raw/e4344c6fdd9103f539c74ab14d93859ed0a1185b/pause-feature-updates.reg)
