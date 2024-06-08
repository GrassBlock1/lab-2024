+++
title = '2024年，想移除Microsoft Edge，完美使用自己喜欢的浏览器？两种方法解决！'
date = 2024-02-16T17:26:38+08:00
draft = true
slug = "remove-ms-edge-2024"
+++
{{< alert >}}
本文随[同名视频]()发布，具有一定时效性，可能会随着时间的推移而失效。
{{< /alert >}}

## 视频

## 引入部分

众所周知，Microsoft Edge 已经成为较新版本中Windows 10/11的默认浏览器，而且与系统内许多功能强绑定，无法卸载。这对于一些用户来说是好消息，但对于另外一些用户来说，使用这样一个日益臃肿的浏览器是一个灾难。

本期视频，将用两种方法来彻底移除 Edge，并尝试用 Firefox 替代它。

## 事出有因

这是一个几乎全新安装的 Windows 11 虚拟机，可以看到，为了保证用户能够更快地开始使用，Edge 已经被固定在你所能触及的每一个地方————任务栏、桌面和开始菜单固定项。

进行测试的版本为 Windows 11 build 22631.3155，但理论上也适用于已经“预装”了 Chromium 版 Edge（即所谓的“新版edge”） 的 Windows 10/11。

当我们尝试启动这个新的 Edge，迎接我们的是一个“微软式中文”的引导页面。（细说“学习”）

完成引导之后，那个熟悉的充斥着特供内容的新标签页就出现了。至于如何调整不是我们今天的主题。

打开搜索和~~饱受诟病的~~小部件，随意点击一个链接，Edge 就会再次启动。这是因为 Edge 已经被设置为默认浏览器，这对于仅有一个浏览器的系统来说并不奇怪。

我们尝试安装提前准备好的 Firefox，并将它设置为默认浏览器，然后重复以上的操作，发现 Edge 依然会启动以用于打开所需要的链接。（对的，甚至设置中指向帮助的链接都在 Edge 中打开）

是时候除掉它了。

## 方法一：使用 ChrEdgeFkOff.cmd 和 Edge_Removal.bat

打开从简介里（这里）下载的文件，双击运行 ChrEdgeFkOff.cmd，同意管理员权限后，它会将所有使用 `microsoft-edge:` 协议的链接重定向到系统设置默认浏览器。

等待出现 `OpenWebSearch 2023 Installed` 之后，按任意键关闭。此时我们再次尝试使用搜索和小部件，发现链接已经在成为默认浏览器的 Firefox 中打开了。

不过因为设置中的链接是直接指向 edge 的程序本体的，所以它依然会启动。

如果你只是需要尽量避免使用 Edge 本体，这个方法已经足够了。如果你觉得仍然不够，可以使用 Edge_Removal.bat 直接卸载 Edge。

{{< alert >}}
在进行下一步之前，请确保你已经安装了另外一个浏览器。
{{< /alert >}}

双击运行 Edge_Removal.bat，同意管理员权限后，它会尝试强制停止相关进程并卸载 Edge 及 Edge Webview。 等待出现 `Edge removed` 之后，直接关闭窗口即可。

完成之后，我们发现烦人的小部件也已经消失了。

不过为了避免删除webview带来的应用工作不正常的问题，我们需要安装回 Edge Webview。打开[这个链接](https://developer.microsoft.com/en-us/microsoft-edge/webview2/) 或者直接搜索 “edge webview” 下载并安装 Edge Webview。

## 方法二： 使用 MSEdgeRedirect 和 Remove Edge GUI

如果你不喜欢使用命令行，可以使用 MSEdgeRedirect 和 Remove Edge GUI。
