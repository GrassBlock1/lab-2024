---
title: "调试页面"
layout: 'simple'
---

{{< heatmap >}}

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

加密测试，密码：`foobar2000`

{{% encrypt "foobar2000" %}}
**Hello World!**
{{% /encrypt %}}