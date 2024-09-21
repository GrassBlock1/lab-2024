---
title: '给 Hugo 站点添加文章加密功能'
date: 2024-08-15 12:38:35
updated: 2024-08-15 21:30
slug: hugo-encrypt
draft: true
description: 将文章/页面秘密的部分加密。又是一个可能没太大实用性的折腾。
---
只是看到群友给自己的博客手搓了加密功能，于是尝试了一下。
# 效果演示
下面是一段以`世界是个回音谷，念念不忘必有回响`为开头的内容，密码为`fooooox`，并且这部分会在 rss 以及搜索的索引中显示为一段英文：
```markdown
This part has encrypted content and could not be displayed without the correct key, check the original site for details.
```

{{% encrypt "fooooox" %}}
> 世界是个回音谷，念念不忘必有回响，你大声喊唱，山谷雷鸣，音传千里，一叠一叠，一浪一浪，彼岸世界都收到了。凡事念念不忘，必有回响。只要你天天想着狐狐——洗手的时候，水盆里映着狐狐；吃饭的时候，饭碗里是狐狐的味道；默默时，狐狐便从凝然的双眼前过去；那么世间万物都是狐狐。
{{% /encrypt %}}

源代码：
```markdown
{{%/* encrypt "fooooox" */%}}
> 世界是个回音谷，念念不忘必有回响，你大声喊唱，山谷雷鸣，音传千里，一叠一叠，一浪一浪，彼岸世界都收到了。凡事念念不忘，必有回响。只要你天天想着狐狐——洗手的时候，水盆里映着狐狐；吃饭的时候，饭碗里是狐狐的味道；默默时，狐狐便从凝然的双眼前过去；那么世间万物都是狐狐。
{{%/* /encrypt */%}}
```
（感谢群友提供的文案）

# 方案选择
最开始的时候看到的方案是 [Encrypt Module - Content - Docs - HugoMods](https://hugomods.com/docs/content/encrypt/)，看起来很省心省事，但是要把整个博客的语言从原有的 zh-CN 换成 zh-hans，否则会导致预置的文案什么都显示不出来...这样做的后果是文章的日期显示全炸了，如图所示：

![日期炸了](https://0x0.imgb.space/images/encrypt-broken-dates.webp)

而且这种引入 modules 的方式不太便于修改，只好另寻方案。

随后看了几个像 [hugoArticleEncryptor](https://github.com/hotjuicew/hugoArticleEncryptor) 这样的方案都不太满意，最后在最初看到的页面看到了它的上游来源于 [hugo-encrypt](https://github.com/Izumiko/hugo-encrypt)，试用了一下发现还不错，于是稍加修改后就用上了。

# 着手使用
首先按照项目的 README.md 的说明，把项目 clone 到一个目录，然后将其中的 `shortcodes` 和 `i18n` 文件夹复制到博客相应位置：
```shell
git clone https://github.com/Izumiko/hugo-encrypt.git /tmp/hugo-encrypt && cp -r /tmp/hugo-encrypt/shortcodes /path/to/your/blog/layouts/shortcodes && cp -r /tmp/hugo-encrypt/i18n /path/to/your/blog/i18n
```
之后在博客的 `config.toml` 中添加如下配置来设置一个全局的密码以及密码保存的机制：
```toml
[params.HugoEncrypt]
    Password = "yourpassword"
    Storage = "session" # 对应 sessionStorage 保存密码直到浏览器被关闭，或者使用 localstorage 对应 "local" 保存密码直到浏览器的缓存被清除
```

然后在文章或者页面中使用 `{{%/* hugo-encrypt */%}}` 这样的短代码来包裹需要加密的内容，如下所示：
```markdown
{{%/* hugo-encrypt "postspecificpassword" /*%}}

加密内容，密码为 postspecificpassword，如果不设置，则为 config.toml 中设定的密码。 

{{%/* /hugo-encrypt */%}}
```
# 稍加改进
实际上手会发现，这个方案在代码层面存在一些问题，下面先着手修改它们：

首先是可能在一些主题遇到的：
```
Uncaught ReferenceError: ciphers is not defined
```

这是因为在 `layouts/shortcodes/hugo-encrypt.html` 中的代码中引用了一个 `ciphers` 变量，但 ciphers 在 [window.onload](https://developer.mozilla.org/en-US/docs/Web/API/Window/load_event) 里定义，只有在页面被完全加载出来之后才被执行，但是调用 ciphers 那个地方是在点击时立即执行的，所以会报错。解决方法是把两段 script 里面的脚本合并，也就是将：
```html
<script>
    //...looooooong script
    const storageKey = "......";
</script>
<script>
    //... short script
    window.onload = function() {
        // script
    }
</script>
```
变为
```html
<script>
    window.onload = function() {
        // script
    }
    //...looooooong script
    const storageKey = "......";
</script>
```