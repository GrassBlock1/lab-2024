---
title: "调试页面"
layout: 'simple'
---

<script type="module">
    import { hatsu } from 'https://esm.sh/@kkna/preset-hatsu'
    import { openheart } from 'https://esm.sh/@kkna/preset-openheart'
    import { defineConfig } from 'https://esm.sh/@kkna/context'

    defineConfig({
        presets: [
            openheart({ endpoint: 'https://lab.imgb.space/api/openheart/' }),
            hatsu({ instance: 'https://hatsu-nightly-debug.hyp3r.link' }),
        ],
    })
</script>
<script type="module" src="https://esm.sh/@kkna/component-material"></script>
<kkna-material></kkna-material>

{{% spoiler %}}
哇，你居然在看这行字欸，那我祝你每天开心~
{{% /spoiler %}}

{{% spoiler %}}
_我恭喜你发财，我恭喜你精彩_
{{% /spoiler %}}

{{% spoiler %}} 
> 希望这有用吧
{{% /spoiler %}}

加密测试，密码：`foobar2000`

{{% encrypt "foobar2000" %}}
**Hello World!**
{{% /encrypt %}}

![logo](/img/logo@square.png)