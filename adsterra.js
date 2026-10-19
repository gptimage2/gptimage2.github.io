(() => {
  // This is a static multi-page site: initialize once per document, including
  // when the shared loader is accidentally included more than once.
  if (window.__gptImage2AdsInitialized) return;
  window.__gptImage2AdsInitialized = true;

  const banner = document.querySelector('[data-adsterra-banner]');
  if (banner) {
    // Choose once per visit. Resizing must not request a second impression.
    const mobile = window.matchMedia('(max-width: 767px)').matches;
    const frame = document.createElement('iframe');
    frame.title = 'Advertisement';
    frame.width = mobile ? '320' : '728';
    frame.height = mobile ? '50' : '90';
    // A separate document preserves the supplied parser-executed GET CODE,
    // including document.write support and its own atOptions global.
    frame.src = mobile ? '/ads/banner-320.html' : '/ads/banner-728.html';
    frame.scrolling = 'no';
    frame.setAttribute('frameborder', '0');
    banner.querySelector('.adsterra-banner-content').appendChild(frame);
  }

  const native = document.getElementById('container-30a2de37d2873e9bc46b4399a8d4a78f');
  if (native) {
    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://bauval.org/21/30a2de37d2873e9bc46b4399a8d4a78f';
    native.before(script);
  }

  const socialBar = document.createElement('script');
  socialBar.setAttribute('data-cfasync', 'false');
  socialBar.src = 'https://bauval.org/14/b59c3976f6c533e060557868a2af570b';
  document.body.appendChild(socialBar);
})();
