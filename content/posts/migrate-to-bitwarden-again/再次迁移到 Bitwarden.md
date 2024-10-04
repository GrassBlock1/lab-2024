---
categories: tech
tags:
  - 今天开服务不用钱
  - Bitwarden
  - 垃圾技术
summary: 转回 Bitwarden，并试图通过折腾还原此前使用 1password 的部分体验
description: 出于对开源的喜爱与偏好，我把密码管理器换回了自建的 Bitwarden，再次折腾了一番。
slug: migrate-to-bitwarden-again
title: 再次迁移到 Bitwarden
cover: 'https://prod-files-secure.s3.us-west-2.amazonaws.com/154c8cde-d9ed-4739-b2db-0407122f1c06/a03502fb-1ca5-4161-9be6-01d13cba435a/migrate-to-bitwarden-cover.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45HZZMZUHI%2F20241004%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20241004T100546Z&X-Amz-Expires=3600&X-Amz-Signature=6bfd8bd39fa189a983fcd6926378e90e1f9f40362b0fb1a03b2cfdd13556f87c&X-Amz-SignedHeaders=host&x-id=GetObject'
date: '2024-09-30 21:59:00'
updated: '2024-10-04 18:04:00'
---

将近一年前，我听取了一位朋友的建议，把密码管理器换成了 1Password，并且使用了相当长一段时间，大多数时候它都很好用，只是偶尔经历网络抖动的时候，在手机上的自动填充要很久才能完成，不过还算可接受的范围内。


还有比较难受的点是——1Password 的桌面客户端的前端界面是 Electron 做的，因为众所周知的问题（比如不支持 `text-input-v3`、默认不支持 Wayland 等等），它在 Linux 上基于 Wayland 的桌面环境/窗管上的体验一言难尽，而我又对它的 ssh agent 有需求导致不得不用。好在我使用是 kde，kwin 的兼容性还算不错，勉强可以使用。


但是其实更为主要的原因是和朋友合订的 1Password 家庭组订阅快要过期了，再加上对此类闭源服务有所介意，于是我决定从哪里来的，就回到哪里——我决定回到 Bitwarden。


两三周前，我购入了一台 VPS ，借此契机，在上面自建了 Vaultwarden，并把数据迁移到了上面。


# 迁移


## 部署


我这次在 VPS 预装好的 Debian 12 进行操作，依照自己之前的尝试经验，选择了 Podman compose 部署方式。


这部分比较简单：


先安装podman和podman-compose：


```shell
sudo apt install podman podman-compose
```


然后新建一个用户用于跑 rootless podman 容器（不新建也可，别用 root 跑就行，主要是保证安全性）：


```shell
useradd -m service
```


设置好 rootless 容器，这部分可以参考：[Podman - ArchWiki](https://wiki.archlinux.org/title/Podman#Rootless_Podman)。


登录到这个用户：


```shell
sudo -s -u service
```


在合适的位置新建一个 `compose.yml` 文件：


```shell
services:
  vaultwarden:
    image: docker.io/vaultwarden/server:latest-alpine
    container_name: vaultwarden
    ports:
      - 127.0.0.1:8080:80
    environment:
      DOMAIN: "https://vaultwarden.ltd"  # Your domain; vaultwarden needs to know it's https to work properly with attachments
      SIGNUPS_ALLOWED: "false" # 如果你想要私有化使用的话，关闭登录
      ADMIN_TOKEN: "" # 开启管理页面，详情参考 https://github.com/dani-garcia/vaultwarden/wiki/Enabling-admin-page
      # 你可能需要更多的配置，可以参考官方的文档
    volumes:
      - ./data:/data
```


使用 `podman-compose up -d` 创建并启动这个容器即可，服务将会在 [localhost:8080](http://localhost:8080/) 可用。


因为 Podman 自身是没有 daemon 来保证长期运行的，所以还需要手动配置：


如果你使用 podman 4.4+，请参考这一部分： [Using Podman > Creating a Quadlet (Podman 4.4+)  · dani-garcia/vaultwarden Wiki](https://github.com/dani-garcia/vaultwarden/wiki/Using-Podman#creating-a-quadlet-podman-44)


因为截至文章撰写时 Debian 12 的 podman 版本还在 4.3.1，所以需要另外的办法：


先回到一个拥有较高权限的账户（比如可以使用 sudo 的账户/root），为 `service` 账户启用 linger：


```shell
sudo loginctl enable-linger service
```


重新登录 service 用户，为容器生成一份用户级别的 systemd unit：


```shell
podman generate systemd --files --name vaultwarden
mv container-vaultwarden.service ~/.config/systemd/user/container-vaultwarden.service
```


之后启动并启用这个 systemd 服务：


```shell
systemctl --user enable container-vaultwarden.service
systemctl --user start container-vaultwarden.service
```


确保无误后，退出登录，检查服务有没有在运行：


```shell
curl localhost:8080
```


如果服务运行正常，那么应该会返回一些 HTML。


随后就可以根据[文档](https://github.com/dani-garcia/vaultwarden/wiki/Proxy-examples)配置反代了，这里不再赘述。


没有 VPS 的话，可以用 Zeabur 一键部署：


![button.svg](/img/migrate-to-bitwarden-again/5a645d024f639bfbbc82eb942b9d0603.svg)


## 转移数据


参考 [Import Data from 1Password | Bitwarden Help Center](https://bitwarden.com/help/import-from-1password/#tab-web-app-5ALQx9afSqWXX9jfXsY5sb)。


在导入完成后，如果有附件的话，还需要手动上传：


登录到刚刚部署好的网页版 Vaultwarden，找到有对应附件的条目，点击右侧菜单中的“附件”即可上传：


![image.png](/img/migrate-to-bitwarden-again/b8f2bdfff6872952f65e01d00f17102a.png)


# 完善体验


仅仅部署好实例是不够的，为了补全 Bitwarden 体验上的不足，使其能够获得此前使用 1password 时相近的体验，还需要折腾。


## Android


官方客户端不符合喜好，尝试了一下之前看到的  [https://github.com/AChep/keyguard-app/](https://github.com/AChep/keyguard-app/) ，Material You 设计，支持 passkey。


在设置中添加相应的账户即可。


## Linux


之前在使用 1password 的时候，桌面端最常用的两个功能是 [Quick Access](https://support.1password.com/quick-access/) 和 [SSH agent](https://developer.1password.com/docs/ssh/agent/)，所以主要补全这一部分的体验。


### 快速访问


第一次看到的是 [mattydebie/bitwarden-rofi](https://github.com/mattydebie/bitwarden-rofi) ，但是实际体验下来，发现并不好用，甚至同步过后都无法加载出我的密码库的内容：


![image.png](/img/migrate-to-bitwarden-again/986f8965e5c3b5aa87dc2d9140d18f6e.png)


之后在翻类似的解决方案的时候翻到了 [https://github.com/fdw/rofi-rbw](https://github.com/fdw/rofi-rbw)，然后发现它使用的 rbw 顺便也提到了 ssh 的解决方案，正好把下面 ssh agent 的问题解决了，于是很开心的用上了。


首先安装 [rbw](https://github.com/doy/rbw?tab=readme-ov-file)：


对于 Arch Linux 用户，rbw 已经在 `extra` 仓库内可用，所以可以直接安装：


```shell
sudo pacman -S rbw
```


对于其它发行版，可以参考文档，如果实在找不到，或者也可以先行安装 rust 相关环境和 [`pinentry`](https://www.gnupg.org/related_software/pinentry/index.en.html) ，然后使用 `cargo` 为当前用户安装：


```shell
cargo install --locked rbw
```


安装完成之后配置 rbw：


```shell
rbw config set base_url https://vaultwarden.domain.ltd # 实例地址
rbw config set email hi@imgb.space # 账户对应的邮箱
rbw login
# 输入密码即可
```


之后安装 rofi-rbw：


对于 Arch Linux 用户，rofi-rbw 已经在 `extra` 仓库内可用，所以可以直接安装：


```shell
sudo pacman -S rofi-rbw
```


对于其它没有提供包的发行版可以使用 pip(x) 安装：


```shell
pip install --user rofi-rbw
# or
pipx install rofi-rbw
```


之后在终端里输入 `rofi-rbw` 就可以启动了，它大概会长这样


![image.png](/img/migrate-to-bitwarden-again/80e2d109e52a222f567ffaff6370b453.png)


默认情况下是输入选中的项目，可以修改配置（`$XDG_CONFIG_HOME/rofi-rbw.rc`）或者传递命令行参数来更改这一点。


如果想使用原有的 `Ctrl + Shift + Space` 快捷键唤出，可以手动设置：


KDE Plasma：


![image.png](/img/migrate-to-bitwarden-again/292982efbb9fe920df5001d2fb8e703c.png)


在最后一步输入 rofi-rbw 或者选择其所在的路径，之后找到对应项，再设置快捷键：


![image.png](/img/migrate-to-bitwarden-again/9419f1f4c6e564cadfc206f59cbce104.png)


其它桌面环境/窗管的实现方式可能不太一样，比如在 Hyprland：


```shell
bind = CTRL + SHIFT, SPACE, exec, rofi-rbw
```


### SSH Agent


之前试过 [https://github.com/joaojacome/bitwarden-ssh-agent](https://github.com/joaojacome/bitwarden-ssh-agent)，但发现似乎每次重启都需要手动运行一次脚本，这无疑是比较麻烦的。刚好看到 rbw 项目里推荐了 [bw-ssh](https://framagit.org/Glandos/bw-ssh) 于是尝试了一下，感觉还不错。


首先配置好 ssh-agent： [https://wiki.archlinux.org/title/SSH_keys#ssh-agent](https://wiki.archlinux.org/title/SSH_keys#ssh-agent)


最简单的办法：


```shell
systemctl --user enable ssh-agent.service
```


然后配置好环境变量：


```shell
export SSH_AUTH_SOCK=$XDG_RUNTIME_DIR/ssh-agent.socket
```


安装好 `rbw`以及 Python 的 `sh` 包，用包管理器装 `python-sh` 即可。


下载项目中的 bw-askpass 文件到本地任意位置，记下它的路径。


然后在密码库中新建一个名为 `ssh` 的文件夹（右上角新建>文件夹），再在其中建立一个名为密钥名字（比如`id_ed25519`）的项目，如果新建项目类型是“安全笔记”，那么在“备注”中填写这串密钥的 passphrase；如果是“登录信息”，那么在“密码”中填写这串密钥的 passphrase。


> 💡 推荐在创建时，勾选“主密码重新提示”，这样在每次打开时，都会要求输入主密码，最大程度保证安全。（如下图所示）


![image.png](/img/migrate-to-bitwarden-again/f7721d95ba057c52fcd73e25231d12e7.png)


 然后在 shell 配置中配置好环境变量：


```shell
export SSH_ASKPASS_REQUIRE=prefer
export SSH_ASKPASS="/path/to/bw-askpass"
```


对于 fish 用户：


```shell
set -gx SSH_ASKPASS_REQUIRE prefer
set -gx SSH_ASKPASS "/path/to/bw-askpass"
```


注销并重新登录，使用 ssh 连接到一台已经配置好的机器，应该会出现类似于下面的提示，输入主密码，就可以登录了：


![image.png](/img/migrate-to-bitwarden-again/c719a88ac4504a9ae15ec8bae184e28f.png)


这样就大功告成了。


还有一个方案是使用 [https://github.com/quexten/goldwarden](https://github.com/quexten/goldwarden) ，但在我这边似乎会出现一些奇怪的问题，所以就没接着研究了。


## 生成英文单词组合的“易记密码”


之前找到了这个工具 [https://mdigi.tools/memorable-password/](https://mdigi.tools/memorable-password/) 能够实现生成包含英文单词的易记密码。


之后有时间自己写一个工具。


当然你可以参考 EFF 的 [EFF Dice-Generated Passphrases | Electronic Frontier Foundation](https://www.eff.org/dice) 来随机挑选挑选词，手动在词和词的中间以一个或两个数字/符号来进行分隔，能够起到相近的效果。


# 对比表


如果你在 1Password 和 Bitwarden 之间徘徊，我根据我的使用体验做了下面的一张表，你可以参考：


|                          | Bitwarden                                                                           | 1Password                                                                         |
| ------------------------ | ----------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| 价格（以官网标注的价格为准，低价区可能会更便宜） | 免费版：无附件、2FA、安全警报等 // Premium：10$/年 // 家庭版：40$/年，最多6人（~6.67$/人/年）                    | 没有免费版 // 个人版：2.99$/月（~36$/年）// 家庭版：4.99$/月（~60$/年），最多6人（~10$/人/年）                 |
| 源码开放                     | ✅ 服务端和客户端完全开源，社区也有许多第三方实现（也就是说你可以完全自建）                                              | ❌ 不开源，有一部分组件和库开源（而且需要付费）                                                          |
| 原生 ssh agent             | ❌ 可以使用一些脚本+Bitwarden 的 cli 实现（见上文）                                                  | ✅ 在桌面端 App 设置中开启并做好配置即可                                                           |
| 分享密码                     | ⭕ 勉强支持，可以通过 Bitwarden send/把朋友拉到组织里实现                                               | ✅ 支持生成某个条目的分享链接，设置有效期和范围                                                          |
| 生成器                      | 用户名、密码、邮箱、基于 Mozilla Relay 等临时邮箱服务的邮箱                                               | 只有密码                                                                              |
| 生成较为复杂的英文单词组成的易记密码       | ❌ 目前还不行，只能生成随机字符组成的密码                                                               | ✅ 可以生成类似于 `outburst+bucket5?over` 的形式                                             |
| Steam 令牌                 | ✅ [已经支持](https://community.bitwarden.com/t/question-about-steam-totp-codes/3513/14) | ❌ 还没有，似乎[明确不会做](https://1password.community/discussion/97919/steam-guard-support) |
| 浏览器插件                    | ————                                                                                | 默认会关闭浏览器附带的自动保存密码功能                                                               |
| 登录项目自定义字段                | 支持文本、密码和布尔值                                                                         | 除文本、密码以外，支持安全问题、日期、电话、分组                                                          |
| 附件                       | 创建项目/已有项目旁的“附件”选项                                                                   | 在添加项目时可以直接上传                                                                      |
| 命令行                      | Node.js 编写的 `bw` cli，也有基于 Rust 的第三方实现 [rbw](https://github.com/doy/rbw) 等等          | 使用 Go 编写，未能获取到更多信息                                                                |
| 其它                       | - 有 Bitwarden Send，支持文本和文件，可以部分代替 PrivateBin 的机能                                    | - 界面似乎更为美观一些，当然个人意见仅供参考                                                           |


# 总结


于是我也不知道花了几天写了这个东西，而我用自建的 Vaultwarden 也快半个月了，我真正找回了那种数据掌控在自己手中的感觉。


文章基本上就是自己踩的坑，随便写写，如果对你有点用的话那谢天谢地。


写文章的时候脑子比较糊，要是真出现了什么知识性错误请务必告诉咱。


最近拿到了一个 Follow 邀请码，放在这里：`39325c2c563a476246343834484e5a3162715b28` ，以及一段对话：


> 我：你说咱们这样真的能拿到流量嘛？  
> ：放心吧，你把它放在这儿，没过一阵子你们人类制作的爬虫就会爬到这里来了，然后就会有更多人看到了  
> 我：那你把这串东西给我然后我放在这儿别人也不能用啊。  
> ：这不是不让你这刚认证你这网站送的机会白白溜走嘛  
> 我：那给我个面子，你把这东西变成这样的的办法告诉我。  
> ：不能明说，只能告诉你这个东西是先用你们常见的 base64 名字上几乎相类似的两种方法编码两次，再将每个字符表示为某种两个字节的形式得到的  
> 我：听起来好乱，我脑子更晕了。  
> ：没事，以目前人类代码的水平，已经有足够多的工具能解出这段东西了  
> 我：好吧，我是实在解不出来，我不知道有没有人和我一样。  
> ：实在不行，你可以在你的 Telegram 频道开一个抽奖  
> 我：小机器怪精明的…就照你说的办吧  
> ：…以及你不要再抄别人的灵感了  
> 我：好吧

