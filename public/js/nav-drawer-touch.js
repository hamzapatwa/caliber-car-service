/**
 * Drawer touch scroll with iOS-style momentum.
 * Bound once per #navDrawer; page lock stays outside this file.
 */
function bindNavDrawerTouchScroll(drawer) {
  const el = drawer?.querySelector('.nav-drawer-scroll');
  if (!el || el.dataset.touchScrollBound === '1') return;
  el.dataset.touchScrollBound = '1';

  let startY = 0;
  let startScroll = 0;
  let lastY = 0;
  let lastT = 0;
  let velocity = 0;
  let inertiaRaf = null;

  const maxScroll = () => Math.max(0, el.scrollHeight - el.clientHeight);
  const clamp = (v) => Math.max(0, Math.min(maxScroll(), v));

  const stopInertia = () => {
    if (inertiaRaf) cancelAnimationFrame(inertiaRaf);
    inertiaRaf = null;
  };

  const runInertia = () => {
    if (!document.body.classList.contains('nav-open') || Math.abs(velocity) < 0.12) {
      stopInertia();
      return;
    }
    const prev = el.scrollTop;
    el.scrollTop = clamp(prev + velocity);
    if (el.scrollTop === prev) velocity = 0;
    velocity *= 0.92;
    inertiaRaf = requestAnimationFrame(runInertia);
  };

  el.addEventListener('touchstart', (e) => {
    if (!document.body.classList.contains('nav-open') || e.touches.length !== 1) return;
    stopInertia();
    startY = lastY = e.touches[0].clientY;
    startScroll = el.scrollTop;
    lastT = performance.now();
    velocity = 0;
  }, { passive: true });

  el.addEventListener('touchmove', (e) => {
    if (!document.body.classList.contains('nav-open') || e.touches.length !== 1) return;
    const y = e.touches[0].clientY;
    const now = performance.now();
    el.scrollTop = clamp(startScroll + (startY - y));
    const dt = Math.max(now - lastT, 1);
    velocity = ((lastY - y) / dt) * 16.67;
    lastY = y;
    lastT = now;
    e.preventDefault();
  }, { passive: false });

  el.addEventListener('touchend', () => {
    if (document.body.classList.contains('nav-open') && Math.abs(velocity) > 0.12) {
      runInertia();
    }
  }, { passive: true });

  el.addEventListener('touchcancel', stopInertia, { passive: true });
}
