---
layout: simple
permalink: gpg-key.html
title: GrassBlock's GPG Key
---
<noscript>
    如果你看到这个提示，可能是你没有允许JavaScript加载，将无法使用参数进行跳转。
</noscript>
<img src="https://file.nya.one/misskey/09a243e2-7cea-4431-8c46-93f60aff5b41.jpg" alt="header" />

<p>FingerPrint: <code>D3422C31CFB8F958132FAB15979DAF130A97C057</code></p>
<section>
<h2>支持的参数</h2>
<p>可以通过在url后传入参数（如<code>?param</code>）来快速到达下面的站点。</p>
<ul>
<li>raw - 跳转到Github Gist，直接输出GPG key的raw</li>
<li>file - 下载包含key的文件</li>
<li>gist - 跳转到Github Gist页面</li>
<li>openpgp - 在<a href="https://keys.openpgp.org/" target="_blank">keys.openpgp.org</a>上的相关信息 </li>
</ul>
</section>
<script>
let getParam;
getParam = new URLSearchParams(window.location.search);
if (getParam.has('raw') === true) {
    window.open("https://gist.githubusercontent.com/GrassBlock1/b93521a8c7d018725d021ba32f2324cb/raw/b1cc0b859c5b0cdbb281bd6d9c8e9ce37e3c7e23/Grassblock_0x0A97C057_public.gpg", '_self');
}
else if (getParam.has('file') === true) {
    window.open("./Grassblock_0x0A97C057_public.gpg", '_self')
}
else if (getParam.has('gist') === true) {
    window.open("https://gist.github.com/GrassBlock1/b93521a8c7d018725d021ba32f2324cb", '_self')
}
else if (getParam.has('openpgp') === true) {
    window.open("https://keys.openpgp.org/search?q=D3422C31CFB8F958132FAB15979DAF130A97C057", '_self');
}
else if (window.location.search === '') {
}
else if (getParam.keys() !== null) {
    alert("传参无效。");
}
</script>
</body>
</html>
