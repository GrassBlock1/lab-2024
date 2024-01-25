---
title: 隔岸观火 - 又一波从 Twitter 到 Mastodon 的移民潮
date: 2023-07-03 18:59:57
updated: 2023-07-04 21:20:30
tags: [Mastodon, Twitter]
categories: 'Thinking'
description: 马斯克几句话让 Mastodon 实例用户数涨了十八万。
cover: img/network-models.webp
top_img: false
slug: another-wave-of-migration-from-twitter-to-mastodon
---
> 马斯克对阅读推文数做出限制，有效地让各个推油们产生了一定的戒断情绪，从而一定程度上减少了Twitter的使用时间和负载，促进了他们向去中心化平台转移的趋势，促进了其发展，由此可见，他真是个带善人🤣
# 更新日志
2023-07-04 11:53:30 ：初稿
2023-07-14 21:15:55 ：
- 修改了部分措辞。
- 拆分了部分内容，将参考文章与声明分开。
- 补充了其他去中心化平台。
# 发生什么事了
虽然可能众所周知，我还是给大家整理了一下。
{% timeline 6月,blue %}
<!-- timeline 30日 -->
Twitter 开启登录墙，未登录的情况下无法查看推文内容。
数小时后， Nitter 等其他服务也无法使用
<!-- endtimeline -->
{% endtimeline %}

{% timeline 7月,blue %}
<!-- timeline 2日 -->
Twitter 开启阅读推文数限制，马斯克声称这是暂时的。

> 为了解决极端水平的数据搜刮和系统操纵，我们已经应用了以下临时限制：
>   - 经过验证（指订阅 Twitter Blue）的账户，每天只能阅读6000个帖子
>   - 未验证的账户每天只能阅读600个帖子
>   - 新的未经验证的账户每天不得超过300个
（使用Deepl翻译，[原推文](https://twitter.com/elonmusk/status/1675187969420828672?s=20)）
<!-- endtimeline -->
<!-- timeline 2日 -->
用户抱怨限制，并开始寻求转出Twitter的方法。

迫于压力，该限制逐步扩大到 相应的 10k，1k以及500条。
<!-- endtimeline -->
<!-- timeline 2日 -->
有些人发现自己在 Twitter 的数据难以导出。
Musk 转发了粉丝的一条推特，提醒大家不要成为过度沉迷 Twitter 的人:
>我设置 "浏览限制 "的原因是，我们都是Twitter上瘾者，需要到外面去。
> 我为世界做了一件好事。
> 另外，这是你刚刚使用的另一个阅读数。
[原推文](https://twitter.com/ElonMuskAOC/status/1675268446089773056?s=20)
<!-- endtimeline -->
<!-- timeline 2日 -->
Mastodon 官方实例因涌入人数过多已发生多次故障。

有用户发现此次政策更新与Twitter 前端更新，导致用户疯狂访问自己的API（[现象图](https://sfba.social/@sysop408/110639435788921057)）有关[^lidang]，
<!-- endtimeline -->
<!-- timeline 2日 -->
Twitter 大部分用户达到阅读限制，导致大规模的 #TwitterDown
> 大致意思是： 硅谷天才不肯付google cloud的账单—>合同到期google开始限流—> 推特数据迁移没做完—> 昨天刚ban了外部服务—>大量请求失败导致DDOS—>天才灵机一动撒谎说是有意限流来拖时间顺便哄人购买付费服务……
[此信息暂时存疑，详见原文](https://mastodon.world/@dreamplan2501/110642217976968083)
<!-- endtimeline -->
{% endtimeline %}

# 一个人的作死
实际上，马斯克在收购 Twitter 后整的幺蛾子可不止这些。

像什么花 8$ 能获得认证标志，搅得一团糟的社交环境，对言论作出不必要的限制，在这里并不打算太展开说，感兴趣的可以看看这篇文章，说的比较详细：[传送门](https://moe23333.vercel.app/posts/twitter-to-mastodon#2-%E4%B8%BA%E4%BB%80%E4%B9%88%E8%A6%81%E7%A6%BB%E5%BC%80-twitter)

我请教了一下Bing，大概来说是这几点：
- 他威胁要起诉微软，因为他指责这家技术巨头未经许可使用他的社交媒体公司的数据。[^sue]
- 他还认为 "cis"和 "cisgender"这两个词是对推特的侮辱，并警告说，任何在推特上骚扰他人的人会被暂时封禁账号。（cisgender 是指性别认同与出生时生理性别一致的人）[^cis]
- 在马斯克接管推特后的短时间内出现了一系列争议和混乱的空气。马斯克因计划对推特进行改变而引来反弹，而极右翼阴谋论者和反犹太主义分子则把马斯克的到来作为传播仇恨言论的机会。
- 他接管后，似乎限制了与其政治观点不合的 Alexandria Ocasio-Cortez 的推特账号。[^moe]
- ...

# Mastodon 大浪潮
Mastodon 是一个开源的去中心化的社交网络，它的运作方式类似于电子邮件，你可以在不同的服务器上注册账号，然后与其他服务器上的用户进行交流。

Mastodon 在马斯克收购前后作为一个去中心化社交网络，已然拥有了较高的声誉，在那期间已经有许多人转到了 Mastodon 上。

在这波浪潮逐渐消退时，马斯克用上述行为重新点燃了这场战火，让更多人了解并迁移到了 Mastodon，7月2日仅官方实例便新增大约8万用户（数据来源 [FediDB](https://fedidb.org/network/instance/mastodon.social)）。

# 给新朋友的一些建议
你好，联邦宇宙的新朋友！初来乍到，我觉得以下这些内容可能对你有帮助。
## 1. Mastodon与 Twitter 的明显区别
可能你对 Mastodon 的了解，仅限于官网的那句 *不会出售的社交网络*，或者只是那句“Mastodon 是一个免费、开源、联邦式的去中心化社交媒体平台”。

但我想说，Mastodon 与 Twitter 的区别，远不止这些。

Mastodon 没有所谓‘大数据’，不会主动向你投喂内容，你需要自己去关注感兴趣的人，或者在搜索栏中搜索你感兴趣的、而且在已知范围内的话题。

Mastodon 不一定会有所有你想要关注的内容和话题，也不一定能在一个实例中就能找到所有的人，这一切都取决于互通性。

Mastodon 的目标不是取代 Twitter，而是为用户提供一个更加自由的社交环境，让用户能够自由地表达自己的想法，而不是被 Twitter 的算法所束缚。

Mastodon 仅仅是广阔的 [Fediverse](https://en.wikipedia.org/wiki/Fediverse) （联邦宇宙）的一部分，它使用标准化、开放式的 ActivityPub 技术，这意味着跨平台互联成为可能。

也就是说，即使你与好友不在一个实例，甚至好友不在 Mastodon 上，你也可以与其进行互动。 

这并不仅是一种对未来的设想，而已经成为现实：例如同样采用 ActivityPub 技术的另一些开源项目：社交媒体 [Misskey](https://join.misskey.page/zh-CN/)、视频平台 [Peertube](https://joinpeertube.org/zh_Hans)、图片分享平台 [Pixelfed](https://pixelfed.org/)，以及 [Pleroma](https://pleroma.social/)、Friendica、GNU Social、Hubzilla 等平台均与 Mastodon 互通，这些不同平台间的用户可以互动。你不是必须要在 Mastodon 实例上注册：只要在任意基于 ActivityPub 的网站注册之后，皆可访问整个联邦宇宙！

有关 Mastodon 和 Twitter 功能上的差别，详见[此处](https://moe23333.vercel.app/posts/twitter-to-mastodon#对比表格)。

## 2. 找到一个合适的家
你决定要加入 Mastodon 了。 你想要创建一个账户，但你发现，官方网站把你导向了一个实例列表，有许多不同的实例，这让你有些不知所措。

不过，不用担心，这些实例除了在主要主题以及规则外，并没有很大的区别。

你可以通过筛选条件来找到一个合适的实例，例如你可以通过语言、主题、注册是否需要申请等条件来筛选。筛选过后，应当会存有几个实例，你可以通过访问它们的主页来了解更多信息，最后根据自己的喜好来注册。

你不一定只开设一个账号，你可以在不同的实例开设不同的账号，这样你就可以在不同的实例上体验不同的氛围，关注发布不同的内容。

如果你实在选择困难，你可以考虑一下这些实例（排名不分先后）：
- [mastodon.social](https://mastodon.social/)：官方实例，但是最近由于用户过多已经发生多次故障。
- [长毛象中文站（草莓县）](https://m.cmx.im/)
- [O3O](https://o3o.ca)
- [alive.bar](https://alive.bar)
- [BGME](https://bgme.me)
- [mastodon.world](https://mastodon.world)
- [mas.to](https://mas.to)
- ...
但是需要说明的是，Mastodon实例大多数已经被GFW所限制，只有一小部分提供了国内可访问的镜像。

除了官方提供的实例列表外，你还可以通过 [instances.social](https://instances.social/) 、[Fediverse Observer](https://fediverse.observer/)来以更细分的条件查找实例。

总之，适合自己的才是最好的。
## 3. 长期驻留
你在 Mastodon 上注册了账号，经过了一些探索，你决定留在这里。

但你可能会发现，Mastodon 与 Twitter 的使用方式有比较大的不同，你可能会觉得有些不适应。

你可以参考以下文章，帮助你更好地使用、熟悉 Mastodon。
- [杂谈：从 Twitter 迁移至 Mastodon#5.Mastodon使用技巧](https://moe23333.vercel.app/posts/twitter-to-mastodon#5-mastodon-%E4%BD%BF%E7%94%A8%E6%8A%80%E5%B7%A7)
- [Mastodon 官方文档](https://docs.joinmastodon.org/zh-cn/)

如果你想找回你在 Twitter 上且已经完成转移的好友，你可以使用 [FediFinder](https://fedifinder.glitch.me/) 来查找。
# 马斯克的锁
*还记得几个月前马斯克收购了Twitter，然后大家都骂骂咧咧地跑到了Fediverse，但是没过多久依旧活跃在Twitter。*

*为什么？Twitter手中拿着一张王牌，那就是Twitter经过这十几年的积累，已经拥有了一个庞大的用户群体。虽然你可以说走就走，但你关注的画师，主播等公众人物并不会轻易地放弃这一个社交平台（因为他们有能力应对Twitter发生的变化），于是这些用户就会为Twitter带来一种非常强大的用户粘性。Fediverse分布式社交的理念再先进，但是它上面的内容资源相比推特是匮乏的。*

*然后这就导致用户根本没办法转移，跑到Fediverse之后依旧想方设法去从Twitter搬运推文，然后现在马斯克直接把api禁了登录墙开了，直接从链接meta数据都抓不到推文信息。可以说马斯克现在用了一把锁把用户跟Twitter牢牢锁在了一起。*
[from @mikan_chn](https://twitter.com/mikan_chn/status/1675328756754550785)

借此，我想说，移民潮过去以后，又会有无数的账号变为沉寂，因为马斯克现在的举措，已经降低了Twitter上的信息通过外部访问的便捷性，即使你一时在 Mastodon 等平台驻留下来，但你也会因为没有你关注的公众人物的信息而再次回到 Twitter。

你可能已经被锁在 Twitter 了，这是冷酷的事实。
# 可能的远景与展望
基于目前 Musk 整的各种幺蛾子，我想会有更多而且范围更大的的移民潮发生。

但是，我想说，这些移民潮只是一时的，因为这些人并没有真正理解 Fediverse 的理念，他们只是在追逐一个所谓的“自由”而已。

事实上，去中心化的背后，只是一个个“中心”的实例互相连接的相对“自由”而已。

Twitter 只会应了那句 “可能会变质，但绝不会倒闭”。它会一直存在，而且会一直有人使用。

未来是不确定的，以上只是猜测而已。

*So, what will happen if he continues messing up Twitter? That depends on your perspective. Some might say he is ruining the platform and driving away users and advertisers. Others might say he is improving the platform and attracting new users and investors. The future of Twitter is uncertain, but one thing is clear: Elon Musk is not afraid to stir up controversy.  --Bing*

# 结语
这篇文章只是我个人的一些看法，可能有些地方不太准确，欢迎指正。

不过既然来了，不要对 Mastodon ，或者在 Fediverse 的任何一处抱有与 Twitter 相同的期待，这里是一个不同的世界。

如果有缺漏或错误的地方，欢迎在评论区和 Mastodon 上的文章发布帖与我交流，我会尽快做出修改。

# 声明
- 文章部分使用了 New Bing 所产生的结果，但对于其提供的信息也有所查证。 
- 文章部分使用了 GitHub Copilot 生成的内容，但仅在议论性内容上有所使用，不影响事实。
- 文章封面使用了 Mastodon 官方文档的图片，[原链接](https://docs.joinmastodon.org/#federation), [许可证](https://creativecommons.org/licenses/by-sa/4.0/)
# 注解
这篇文章因为‘站在巨人的肩膀上’，才得以完成。以下是部分参考资料：
[^lidang]:此处说法来自立党的推文：[原文](https://twitter.com/lidangzzz/status/1675423624977690624?s=20)
[^sue]:Elon Musk threatens to sue Microsoft over Twitter data - BBC：https://www.bbc.com/news/business-65332207
[^cis]:Elon Musk Deems ‘Cis’ A Twitter Slur–Here’s Why It’s Is So Polarizing：https://www.forbes.com/sites/kimelsesser/2023/07/02/elon-musk-deems-cis-a-twitter-slurheres-why-its-is-so-polarizing/
[^moe]:[来源](https://moe23333.vercel.app/posts/twitter-to-mastodon#对言论自由的侵犯)，可能需要往下翻翻
