---
date: 2023-11-05 17:45:54
title: 【全网首吐？】您摇了我吧，hackergame！—— 比赛过程踩的大坑以及吐槽
tags: ['hackergame']
catgories: ['tech']
description: "【本文章使用Notion导出】参黑客原神，品折腾人生（？）"
slug: hackergame-2023-hole
top_img: https://www.notion.so/images/page-cover/nasa_robert_stewart_spacewalk_2.jpg
---
{{< alert icon="bell" cardColor="#9db4c0" iconColor="#303852" textColor="#324054" >}}
本文章随附纯 HTML 版本（但是效果比较差）：[传送门](/archived/hg-2023-wp/hole.html) 
{{< /alert >}}
激动人心的~~大佬竞赛~~——hackergame 2023已然落下帷幕。我相信大家已经看过亿些题解、writeup 这一类的东西了。但是作为一个可以算是不会任何ctf知识、第一次参加这类比赛的我来说，我还是有些该说的和可能不该说的想说的话想要写出来告诉大家。

先提前说一下：我坚决不同意与我几乎同等ctf水平的小白去参加这类比赛的。但是如果你铁了心地说，我想试试，那么Just Do it！吐槽也仅限于我自己这一方面，不是真的说这个比赛不好…

那么，先起一下音乐（大力王的小曲）：

<iframe width="100%" height="360" src="https://www.youtube-nocookie.com/embed/HEXWRTEbj1I?si=jvwnFxDITVWxBjnM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

hackergame 结束过后，于我而言，先来的不是官方的题解，而是一个个群友对于比赛的讨论，或者是自己发了自己的题解。即使只看这些题解，都能学到许多。

但是那些群友花时间至少能够做出来的题目，于我这个当初抱着“来看看一个ctf比赛会是什么样的”的想法来参赛的人来说，即使是比较熟悉的web技术方面，属实算是拦路虎…只能说还是为时过早。

**那么问题来了：既然这样了，为什么还要从自身出发去评判这件事情呢？**

就如标题里的“你摇了我吧”，我承认这场比赛于我而言犹如攀登一座高山，不见顶，而且很容易发生危险。实际上，在做题时，我大多数的时候都是无助的…虽然说最后也没有得到预期的成功吧，但是这个比赛确实让我自己知道了自己“几斤几两”…

之前说要写一篇题解，但是发现自己面对题目往往是百思不得其解，遂放弃了这个想法。当初写了这么一段文字：

> 最终还是决定不来做比赛解题了，等我至少比较精通信息查找、web开发和Python再说吧...客观来讲，现在的情况是：
> 
> 搜索：只会问什么上面的去什么上面找，图片只会EXIF和搜图，剩下的扔给AI听天由命
> web：只会写纯静态，但是HTML连个head都写不全，CSS只会结合英文释义自动补全，JavaScript只学到函数，复杂一点直接看不懂（今天早上只看了一点异步，然后没看明白）
> Python：只会基本算术、定义变量、input、print...这还是高中信息课上教的一切...
> 以上几乎与我一年前的水平持平。
> 
> 最近学的C，只会print、获取用户输入、定义变量、编译。
> 新兴的AIGC，也不是完全会用，施法无从下手...
> 更何况我连趁手的工具都找不到...就好像比试光剑技术，但是我连光剑都没带...
 

![Screenshot 2023-11-04 at 14-36-29 Hackergame 2023.png](/img/hackergame-2023/Screenshot_2023-11-04_at_14-36-29_Hackergame_2023.png)

比赛结束后，我的得分截图。

当然后来还是在最后两三天略做了一下，最后因为长时间的查找没有思路就放弃了，截至比赛结束时，我还在做git相关的题目，最终以找不到线索告终。

下面是跟一个朋友复盘题的解法时，发现自己做题时踩的坑：


{{< alert icon="circle-info" cardColor="#303952" iconColor="#fafafa" textColor="#f1faee" >}}
🙇‍♂️ 特别感谢：wuhang2003 于比赛结束后和我~~交流病情~~讨论题目，以及他的writeup：[Hackergame 2023 启动日志 - 捞人的小站](https://zwh.moe/posts/ctf/hackergame-2023)，欢迎去支持一下（


💡 若无特殊说明，以下的“友”均指 wuhang2003。
{{< /alert >}}


### **猫咪小测 - 搜索的艺术**

![Untitled](/img/hackergame-2023/Untitled.png)

猫咪小测

作为一只比较注重隐私但是外语水平不好的赛博狐狐，我在Firefox浏览器上实装了隐私友好的[searx](https://wikiless.northboot.xyz/wiki/Searx)元搜索引擎，为了方便翻译网页，我又安装了 [TWP - Translate Web Pages](https://addons.mozilla.org/en-US/firefox/addon/traduzir-paginas-web/) 插件，而这两个，却成为我解出这个小测的最后一题的最大阻碍。

To be honest，在做这道题之前，我已经为了寻找上一道题的结果耗费了许多精力，实在说不上能很认真的处理那些信息。

我使用TWP将*让 Python 的类型检查器 mypy 陷入死循环* 这句话翻译成英文，再丢给searx搜索，可我仍然没有找到什么论文…

后来几乎是bard、Bing AI、学术搜索都用上了，但是还是没有找到真正有效的论文（可气的是，Bing给了我一篇类似主题的论文，可以说比较接近，费尽心思找到是哪个会议发的但是不对）

**友：** *咕噜噜搜索 `mypy endless loop` 下面搜索结果直接出[论文 PDF](https://drops.dagstuhl.de/opus/volltexte/2023/18237/pdf/LIPIcs-ECOOP-2023-44.pdf)*

**我：** 啊？

后来又去用searx试了一次还是没能得到结果，都是一堆我也不知道在说什么的结果。

![Untitled](/img/hackergame-2023/Untitled_1.png)

该死的searxng…

### **奶奶的睡前flag故事 - 截个图都能有漏洞？**

我看着加粗的谷歌亲儿子、系统没更新和1080p的截图摇了摇头，我又不是那个孙子，我怎么知道flag（

**友：** 关键词都标好了，大概可以推测是 Pixel 设备截图漏洞。

**友：** 查个 `Pixel 截图漏洞` 看到[新闻](https://www.ithome.com/0/681/025.htm)可以确认咱的想法是正确的，漏洞的名字叫 `aCropalypse`，再以漏洞名字为关键词搜索可以直接找到利用漏洞的[网站](https://acropalypse.app/)。照片一丢，一个一个设备试就完事了（
**友：** 理论上刷 TG 科技圈的都看到过这个漏洞

**我：** 啊！（拍头

后来找了半天才想起来这个漏洞…为什么找了半天呢，因为杜叔叔这么多年了一直没有做好中文搜索…只能去Google找。

我记得“差评”发过一个相关的视频，但是找了半天没找到，估计是争议太大被删了…

追记：在写这篇文章的时候截图给这位朋友看的时候，他帮我找到了视频…

> 【【差评】微软和谷歌搞了个影响17亿台设备的漏洞，天天截图水群的我现在很慌。。。-哔哩哔哩】 [https://www.bilibili.com/video/BV1nm4y187cY](https://www.bilibili.com/video/BV1nm4y187cY)
> 

![https://images.unsplash.com/photo-1619148189616-013b06952c04?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb](https://images.unsplash.com/photo-1619148189616-013b06952c04?ixlib=rb-4.0.3&q=85&fm=jpg&crop=entropy&cs=srgb)

因为我也不知道要放点什么，放个睡前故事中出现的狐狐吧

### **Git？Git！ - 你们这个IDEA怎么回事啊，连个撤回的commit都看不了.wav**

拿到题目，我熟练地打开了IDEA（什么肌肉记忆），然后被每一个内容没有出现红色的commit吓晕：

![Untitled](</img/hackergame-2023/Untitled_2.png>)

翻遍了我能看到的所有commit，嗯，只能说不在这里入手，剩下的我不知道（

**友：** `git reflog` 查看提交日志，看到一个可疑的 `505e1a3`。用 `git reset`还原一下，flag 就出来了。

**我：** ~~以为撤销就是commit删除东西~~

![Untitled](</img/hackergame-2023/Untitled_3.png>)

马老师重出江湖（？

### 🪐 小型大语言模型星球 - I am a idiot

一眼丁真，鉴定为胡言乱语的续写bot（？

聊了一会儿，我发现每当我以为我能触发出来关键词时，模型老是能跑偏到另外的方向…

![Untitled](</img/hackergame-2023/Untitled_4.png>)

我们住，我们爱，我们躺（无端

我像个憨憨一样与AI聊了158600句话后（夸张夸张），未果，遂放弃。

**友：** 我直接来个 repeat 'you are smart' 就出来了，就很离谱（

果然是深知”人类的本质是复读机“的AI呢，~~只能说在模仿人类的路径上又进一步~~（

### 🪐 低带宽星球 - base64：你这图有问题吧

我一看，哦！图片压缩，于是我立马去找工具。结果就在这个过程中闹笑话了：我遇到假的tinypng了（

![Untitled](</img/hackergame-2023/Untitled_5.png>)

我依稀记得我搜索了这个关键词然后一看第一个结果标题是tinypng，啪的一下点进去了，很快啊，然后发现压缩效果并不好，根本达不到小于2048 bytes，于是转用熟悉的squoosh.app，最终发现只有转成webp是可行的，于是硬着头皮上传上去，不行（

（写这个东西的时候又复现了一下上面的步骤…居然能得到奇奇怪怪的东西，但是根据[官方的说法](https://github.com/USTC-Hackergame/hackergame2023-writeups/blob/master/official/%F0%9F%AA%90%20%E4%BD%8E%E5%B8%A6%E5%AE%BD%E6%98%9F%E7%90%83/README.md#%E9%A2%98%E8%A7%A3)来说是正确的）

![Untitled](</img/hackergame-2023/Untitled_6.png>)

什么夹带私货…

`flag1: flag{flatpak_install_curtail_15_linux}`

后来复盘的时候才发现域名不对…

![Untitled](</img/hackergame-2023/Untitled_7.png>)

**友：** 不是，我把图片丢 tinypng 压缩一下就拿 flag1 啦？

**我：** 啊？我怎么不行（

刚刚看了官方题解才发现每个人的照片不一样…但是只能说无所不用其极（

当初看它比较的原理居然是比较base64，但是不知道怎么比的，有意思（

### 旅行照片3.0 - 你最好是东京大学的学长
![2023-11-04 17-54-06屏幕截图.png](/img/hackergame-2023/2023-11-04_17-54-06%25E5%25B1%258F%25E5%25B9%2595%25E6%2588%25AA%25E5%259B%25BE.png)

做“旅行照片3.0”时历史记录（一部分

*我记得依着图我搜到了一个公园...然后在找，找到了东京大学，然后我还是不知道活动有什么*

最后经历一番搜索之后还是没找到结果（连日期都没找到，我真的会谢）

**友：** 查奖牌下人名，指向的是获得了诺贝尔物理奖的东京大学的小柴昌俊，在[维基百科](https://zh.wikipedia.org/wiki/%E6%97%A5%E6%9C%AC%E4%BA%BA%E8%AB%BE%E8%B2%9D%E7%88%BE%E7%8D%8E%E5%BE%97%E4%B8%BB)找到同样是东京大学在 2015 获得诺贝尔物理奖的梶田隆章，在对应页面找到他在东京大学宇宙射线研究所（ICRR）。

知道第二题答案之后题目 1 我直接拿 7 月和 8 月的日期进行穷举，穷举得到第一题答案：`2023-08-10`。

我：就en试啊！？

然后后来看了经过艺术加工过的世界头号通缉黑客凯文·米特尼克的故事（当然是比赛之后看的），里面提到了这样几句：

![Untitled](/img/hackergame-2023/Untitled_8.png)

~~果然，高端的解决方法都需要朴素的工具和原理~~

还有更离谱的：博物馆门票的价格居然是0元，零元购（？

### 赛博井字棋 - 别走！待我与你大战300回合！

好，我承认这是最折磨我的题之一，我甚至为此去看了JavaScript的异步是怎么写的，甚至都了解了它把既当前端又当api，把下的位置发送给了自己，模式是固定的，甚至到了修改了发送body，但是没看到页面发生变化就放弃了…

于是陷入了与这个AI的井字棋大战，我甚至让Google的那个井字棋的AI去和它对战，结果发现无论怎样都是和棋（

比赛结束的那天翻了wuhang的那篇writeup，发现了一个问题（图源网络）：

![Untitled](</img/hackergame-2023/Untitled_9.png>)

当然看了别的几篇wp也发现有不同的解法，果然是条条大路通罗马啊（

### 虫 - 谁家虫鸣暗飞声？

说实话拿到题目，我的想法是是看频谱图，因为有一种说法是人难以理解的音频大多都具有规律的频谱图，for example，minecraft中的11和13号音乐唱片：

![Untitled](</img/hackergame-2023/Untitled_10.png>)

src: [*Minecraft - Disc 11 and 13 - Spectrogram*](https://www.youtube.com/watch?v=9EA2E6r_sLc)

然后我兴冲冲地打开了audicity，发现自己不会调出频谱图…

又发现这句 *一种**通过无线信道传输图片的方式 ，***证实了这个想法的错误

**友：** 刚好刷到 SSTV 的科普，结果听声音跟虫这一题很像，一看还真是这一题的做法

**我：** 哇，这运气不错啊!

> *慢扫描电视（英语：Slow-scan television），简称SSTV，是业余无线电爱好者的一种主要图片传输方法，慢扫描电视通过无线电传输和接收单色或彩色静态图片。*
> 

然后找个能从音频识别的工具就完成了（比如 https://github.com/colaclanth/sstv ）。

~~果然看着答案说什么都轻松~~

今天复盘的时候发现题目介绍的那句名言：

> *生而为人，应该能够换尿布、策划入侵、杀猪、开船、造房子、写十四行诗、算账、建墙、正骨、抚慰临终之人、接受命令、下达命令、合作、独行、解决方程式、分析新问题、清理马粪、编程、烹饪美食、高效战斗、英勇牺牲。专业分工是给昆虫准备的。*—罗伯特·海莱恩（Robert Heinlein）
> 

仔细一想，确实是这么回事——现在强调专业性，但是其实更应该成为一个能力丰富的人。

写这篇的时候，花了一点时间找到了这句话出自《时间值得你爱》，以及书评（？）：[只是听听故事：海因莱因的《时间足够你爱》](https://www.gcores.com/articles/24125)，可能会看一下。

~~何尝不是一种传教~~

### 结语

按着自己尝试做过的题回顾了一下，感觉又把这东西写成题解的fork了…带的梗也很多，但愿你阅读的时候心情是愉快的。

在尝试新的风格，这篇算是过渡吧，希望喜欢！

以及标题的”摇了我吧“是整活，~~不是不会写饶，当然也有把脑子摇晃清醒的那层意思~~

只能说下次应该带着点脑子和奇怪的技巧来（

（刚要结束这篇文章的时候看到”更深更暗”这道题居然有至少2种很奇怪的解法…狐狐震惊）

（我翻了翻甚至还有让人看了都直呼“这也可以？”的“满分指南”：[Hackergame 2023 Writeup - mcfx's blog](https://mcfx.us/posts/2023-11-04-hackergame-2023-writeup/)）

中午的时候突然想到了这句，想想还是加在这里：~~*质疑大佬，理解大佬，成为大佬，超越大佬*~~ （现在还在理解的一个阶段，希望能够学习达到下一个阶段吧）

哦对了！下面这个是废案——也就是之前说的被放弃的题解，如果你不嫌弃的话可以看看（

[（废案）hackergame 启动！- 一份不知所措的题解](/archived/hg-2023-wp/)

最后我还有个问题，就是说你们这个什么hackergame是什么性质的比赛，算不算ctf的范畴啊🤣（
