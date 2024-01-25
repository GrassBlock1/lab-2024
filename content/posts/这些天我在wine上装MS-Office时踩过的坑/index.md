---
title: 这些天我在wine上装MS Office时踩过的坑
date: 2023-06-17 16:51:22
updated: 2023-06-17 19:37:22
tags:
  - Office
  - wine
categories: 'tech'
description: "（GitHub Copilot我可真谢谢你）最近在wine上尝试折腾M$ Office，把方法和过程都堆这里了，希望再也不要有人跟我一样踩这些坑了"
slug: ms-office-on-wine
top_img: https://obj.imgb.space/api/raw/?path=/img/2023/wine-office-exp.webp
cover: https://obj.imgb.space/api/raw/?path=/img/2023/wine-office-exp.webp
---
{{< alert >}}
本文有一小部分内容由 [GitHub Copilot](https://copilot.github.com/) 生成，但是我已经尽力修改了它生成的内容，以使其更加符合实际。如果你发现了一些还是奇怪的地方，那么请不要怀疑，那就是 Copilot 的锅。
{{< /alert >}}
最近突发奇想，看看能不能在Linux上用 M$ Office，然后折腾了几天，也没弄好，但是也算是有了一些经验，所以就把这些经验写在这里，希望能帮到有需要的人。
# 情况说明
以下的经历都是在参考了[这个教程](https://ruados.github.io/articles/2021-05/office365-wine)和WINE Appdb上的[页面](https://appdb.winehq.org/objectManager.php?iId=31&sClass=application)后进行的。
不过为了方便大家看，我还是整理了一下以上所述的办法，也是我在实际操作时严格执行的。
## 咱的办法
宿主机是 Arch Linux(on VMware），WINE版本为最近的8.9&8.10。

### 启用 [multilib](https://wiki.archlinux.org/title/Official_repositories#multilib) 仓库

修改 /etc/pacman.conf 文件，取消注释以下两行：
```
[multilib]
Include = /etc/pacman.d/mirrorlist
```

### 安装依赖
```bash
sudo pacman -S wine winetricks samba wine-mono wine-gecko
```

### 配置 WINE 环境
```bash
export WINEARCH=win32
```

(我这里测试时发现使用32位环境时成功启动安装程序概率更高，所以就一直用32位环境了）

{{< alert icon="circle-info" cardColor="#303952" iconColor="#fafafa" textColor="#f1faee" >}}
注意：这个环境变量在64位环境的wine启动后可能失效，所以需要在启动前提前设置，之后无需再设置。
{{< /alert >}}

{{< alert >}}
如果你已经`wineboot`启动和配置了默认的PREFIX，建议在新的PREFIX下执行下面的操作，以免出现意外，执行以下指令来切换到新的prefix：
```bash
export WINEARCH=win32
mkdir ~/.msoffice
export WINEPREFIX=~/.msoffice 
```
{{< /alert >}}

建议在运行前使用 `winecfg` 调整兼容性到 Windows 8/8.1，以便于获得更好的兼容性，但是不是必须的，Windows 10兼容性也可正常运行一部分Office版本。

### 准备Office安装包

这个不赘述。

只是要注意你需要下载**32位**的**离线**安装包，因为在线安装包极有可能因为网络连接问题导致无法安装。

推荐前往 Internet Archive / MSDN (非官方的 MSDN I tell you 也可) / VLSC 下载。

当然，你也可以使用Office Tool Plus部署Office，但是我这里一直无法启动，所以不保证能成功。

{{< alert icon="bell" cardColor="#9db4c0" iconColor="#303852" textColor="#324054" >}}
对于 Office Tool Plus 用户，建议使用生成ISO的方式，或者直接把它所在的**整个**目录复制到便于访问的地方。
{{< /alert >}}

### 安装一些 tricks
对于 Office 2019 以前的版本，使用以下指令安装：
```bash
winetricks cmd corefonts msxml6 riched20 gdiplus cjkfonts
```
{{< alert icon="bell" cardColor="#9db4c0" iconColor="#303852" textColor="#324054" >}}
对于自定义PREFIX的用户，需要在指令前加上`WINEPREFIX=~/.msoffice`，以便于wine能够找到PREFIX。
{{< /alert >}}

之后的版本，根据我的翻车经验，可能需要部分UWP组件。

wine：你是故意找茬是不是？

所以，不建议拿来试
### 开始安装
直接运行安装程序即可，但建议还是在终端上运行，以便于查看错误信息。
```bash
wine /path/to/setup.exe
```
{{< alert icon="circle-info" cardColor="#303952" iconColor="#fafafa" textColor="#f1faee" >}}
对于自定义PREFIX的用户，需要在指令前加上`WINEPREFIX=~/.msoffice`，以便于wine能够找到PREFIX。
{{< /alert >}}
## 注意事项
不要照搬命令！不要照搬命令！不要照搬命令！

不同的发行版对于`winbind`的提供方式是不一样的！
比如说，Arch Linux是通过samba来提供的，而Ubuntu是通过winbind来提供的。

Office 2019还需要补充一些文件和配置，但是我这里始终没安装成功过，如果你恰好安装成功了，可以参考[这个教程](https://ruados.github.io/articles/2021-05/office365-wine)去补全dll文件。
# 我的翻车经历
按照以上的办法执行后，以下就是咱的经历了：
## 6.9
MS Office 365 安装在wine上运行报告：

- (MS 365 同 2021)
- 2021 2019 强制要求 Windows 10/11 兼容性，且需要Wine没有的 uwp 库（ms烦内）
- 2016 可正常运行，就是密钥难找（网上的都失效了，而且无法跳过）
- 其它暂未测试
- Office Tool Plus GUI 无法正常启动（可能是获取不到账户头像等信息），但是用 Console 可以部署，参考一下官方文档即可

  (Wine版本为8.8 staging，一律使用官方的iso文件/exe安装器，在endeavour os进行测试)

## 6.10
今日进展：滚了一次更新不知道为啥今天2021安装包调完兼容性能打开了🌚，然后报错 0-2031 (17006)

365仍旧不行，OTP 似乎由于硬件渲染炸了无法启动

2016突然跑不了了，在下新的镜像（之前拿的白板预装

以及奇怪的是2019其实在Windows 8.1能原装的.... 但在wine上就跑不了

(wine更新到了8.9 staging，安装了samba包以支持winbind)

## 6.12
*在经历一天的虚拟机爆炸和重配虚拟机我又重装回了原版Arch*

安装基本的tricks后： 2019和2016都在显示splash后崩溃

~~在补了亿些组件后，无论如何我再也打不开安装程序了....~~

Update：安装包打开后显示splash后无响应，报错日志：
https://gist.github.com/GrassBlock1/199e3dd24cb4ed3728e54955ff9b37d9

这次OTP倒是有一个空窗口加载，似乎是拉不了更新导致的，终端报错：

`(The SSL connection could not be established, see inner exception.). Inner exception: The SSL connection could not be established, see inner exception.. Inner exception: The requested security package is not supported.`

`Office 2013-2021 C2R Install` （不是官方的那个）这个东西倒是能用，但我一直下载不了office，终端表示它一直在下东西

## 6.13
今日如故，但是由于
`service:scmdatabase_autostart_services Auto-start service L"ClickToRunSvc" failed to start: 2 `，服务炸了

于是试了下bottles，默认应用环境（Windows 10 兼容性）下，得补字体

大多直接显示完splash闪退，2016 安装得到 `30088-1015(0)` 报错。

[离线安装包似乎可以跑](https://forum.usebottles.com/t/microsoft-office-365/239) ，所以用部署工具构建了一份看看，然后发现这不和我用OTP部署的差不多嘛（（（

Office 2013-2021 C2R Install 和昨天差不多，OTP GUI跑不了...

## 6.14
~~经过群友的指点，今天只测试了2016，别的大抵差不多...~~

wine回退到稳定版(9.10)了，照着[appdb](https://appdb.winehq.org/objectManager.php?sClass=version&iId=34941)上说的改成了Windows 7兼容性，补充了组件

试着开了新的Bottles容器，调完32位和兼容性直接打不开了

我现在严重感觉我从“msdn，我告诉你”下的镜像下错了，原版wine直接跑不了，一直无响应，报错大抵是和前天的一样

_winetricks 的 .NET 2.0和4.0装不了（mono卸载了也不行）_
`warning: Note: command wine dotNetFx40_Full_x86_x64.exe returned status 1. Aborting.`

试了一下果核的绿色版，就不知道怎么回事 `mode` 命令都没有

OTP也打不开....无论是从原环境还是新的Bottles环境，想必是坏掉了....

# 总结
最后还是没成功...


各位如果有什么好办法的话，欢迎在评论中提出来，我会尽快测试的....

不过现在看来我还是得去找个Windows的镜像来装虚拟机了，或者等等看有没有人能把它成功的跑起来 ，又或者我去装WPS国际版吧（（（

（这是Copilot补的）


感觉运气成分会比较大，毕竟找到的资料大多都是比较顺利就安装的，尽管它们最后更新的时间都是在2021年以前，但是我还是想尝试一下，毕竟我也不想去装WPS国际版（（（

后续，如果有机会实体安装Linux的话，我会再来更新的，大家多多关注更新喵
