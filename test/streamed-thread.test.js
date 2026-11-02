// Regression test for 0.99.1: the script must not start on a half-parsed thread.
// Serves a FoolFuuka-shaped /b/ thread in slow chunks (split mid-post), opens it with a
// #post jump in headless Chromium, and checks every post got its MD5 button, backlink and
// threading, and that the jump target is on screen.
//   node test/streamed-thread.test.js   (needs the `playwright` package and a Chromium)
const http = require('http');
const fs = require('fs');
const path = require('path');
const { chromium } = require(process.env.PLAYWRIGHT_PATH || 'playwright');

const N = 300, OP = 1000, TARGET = 1200;
const SCRIPT = fs.readFileSync(path.join(__dirname, '..', '4ArchivesEnhancer.user.js'), 'utf8');
const GIF = 'data:image/gif;base64,R0lGODlhAQABAAAAACw=';

function post(i) {
  const n = OP + i, q = i > 1 ? n - 1 : OP;
  const h = Buffer.from('img' + i + 'xx').toString('base64').replace(/=+$/, '') + (i % 3 ? '' : '/+');
  const enc = h.replace(/\+/g, '-').replace(/\//g, '_');
  return `<article class="post has_image" id="${n}" data-board="b" data-thread-num="${OP}"><div class="post_wrapper">
<div class="post_file"><span class="post_file_controls"><a href="/b/search/image/${enc}/">View Same</a></span>
<a href="https://thebarchive.com/b/full_image/${n}.jpg" class="post_file_filename">f${n}.jpg</a></div>
<div class="thread_image_box"><a href="https://thebarchive.com/b/full_image/${n}.jpg" class="thread_image_link"><img src="${GIF}" class="post_image" data-md5="${h}=="></a></div>
<header><div class="post_data"><a href="/b/thread/${OP}/#${n}" data-post="${n}">No.</a>${n}</div></header>
<div class="text"><a href="/b/thread/${OP}/#${q}" class="backlink" data-backlink="true" data-post="${q}">&gt;&gt;${q}</a><br>reply ${i}</div></div></article>\n`;
}

const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  res.write(`<!doctype html><html><head><title>/b/</title></head><body><div class="letters"><a href="/b/">b</a></div><div id="main">
<article id="${OP}" class="clearfix thread" data-thread-num="${OP}"><div class="post_file"><span class="post_file_controls"><a href="/b/search/image/opHASH/">View Same</a></span><a class="post_file_filename">op.jpg</a></div>
<div class="thread_image_box"><a href="https://thebarchive.com/b/full_image/op.jpg" class="thread_image_link"><img src="${GIF}" class="thread_image" data-md5="opHASH=="></a></div>
<header><div class="post_data"><h2 class="post_title">OP title</h2></div></header><div class="text">op</div><aside class="posts">\n`);
  for (let i = 1; i <= N; i++) {
    const h = post(i), cut = h.indexOf('<div class="post_file">') + 5;
    res.write(h.slice(0, cut));
    if (i % 10 === 0) await new Promise(r => setTimeout(r, 15));
    res.write(h.slice(cut));
  }
  res.end('</aside></article></div></body></html>');
});

const SHIM = `(() => { const s = {}; window.GM_getValue=(k,d)=>k in s?s[k]:d; window.GM_setValue=(k,v)=>{s[k]=v};
  window.GM_addStyle=(c)=>{const st=document.createElement('style');st.textContent=c;const put=()=>{const t=document.head||document.documentElement;if(t)t.appendChild(st);else setTimeout(put,0)};put();return st};
  window.GM_setClipboard=()=>{}; window.GM_download=()=>{}; window.GM_xmlhttpRequest=(o)=>{o.onerror&&o.onerror()}; })();`;

server.listen(0, async () => {
  const port = server.address().port;
  const browser = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  let failed = 0;
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.addInitScript({ content: SHIM + '\n' + SCRIPT });
    await page.goto(`http://localhost:${port}/b/thread/${OP}/#${TARGET}`, { waitUntil: 'load' });
    await page.waitForTimeout(300);
    const r = await page.evaluate((t) => ({
      posts: document.querySelectorAll('article.post').length,
      menus: document.querySelectorAll('article.post .ffe-md5-menu-btn').length,
      backlinks: document.querySelectorAll('.ffe-backlink').length,
      threaded: document.querySelectorAll('.ffe-thread-container article.post').length,
      targetTop: Math.round(document.getElementById(String(t)).getBoundingClientRect().top),
    }), TARGET);
    const check = (ok, msg) => { console.log((ok ? 'ok   ' : 'FAIL ') + msg); if (!ok) failed++; };
    check(r.menus === N, `MD5 menu on every reply (${r.menus}/${N})`);
    check(r.backlinks === N, `backlinks for every reply (${r.backlinks}/${N})`);
    check(r.threaded === N, `every reply threaded (${r.threaded}/${N})`);
    check(r.targetTop >= 0 && r.targetTop < 200, `jump target #${TARGET} on screen (top=${r.targetTop}px)`);
    check(errors.length === 0, `no page errors${errors.length ? ': ' + errors.join(' | ') : ''}`);
  } finally {
    await browser.close(); server.close();
  }
  process.exit(failed ? 1 : 0);
});
