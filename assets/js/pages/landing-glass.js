(() => {
  const root = document.querySelector('.liquid-landing');
  if (!root) return;
  root.querySelectorAll('.glass-enter').forEach(element => {
    element.addEventListener('animationend', event => {
      if (event.target === element && event.animationName === 'glass-arrive') {
        element.classList.remove('glass-enter');
      }
    });
  });
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const surfaces = [...root.querySelectorAll('.glass-surface')];
  let pending = 0;
  let latest = null;

  surfaces.forEach(surface => {
    surface.addEventListener('pointermove', event => {
      if (motion.matches || !finePointer.matches) return;
      latest = { surface, x: event.clientX, y: event.clientY };
      if (pending) return;
      pending = requestAnimationFrame(() => {
        pending = 0;
        if (!latest || motion.matches || !finePointer.matches) return;
        const {surface, x, y} = latest;
        const bounds = surface.getBoundingClientRect();
        surface.style.setProperty('--pointer-x', `${(x - bounds.left) / bounds.width * 100}%`);
        surface.style.setProperty('--pointer-y', `${(y - bounds.top) / bounds.height * 100}%`);
      });
    });
    surface.addEventListener('pointerleave', () => {
      if (latest?.surface === surface) latest = null;
      surface.style.removeProperty('--pointer-x');
      surface.style.removeProperty('--pointer-y');
    });
  });

  const springs = new Map();
  root.querySelectorAll('.glass-button, header nav a').forEach(button => {
    button.addEventListener('pointerdown', event => {
      if (motion.matches || event.button !== 0) return;
      const bounds = button.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'glass-ripple';
      ripple.setAttribute('aria-hidden', 'true');
      ripple.style.left = `${event.clientX - bounds.left}px`;
      ripple.style.top = `${event.clientY - bounds.top}px`;
      button.append(ripple);
      ripple.addEventListener('animationend', () => ripple.remove(), {once: true});
      setTimeout(() => ripple.remove(), 800);
      if (typeof button.animate !== 'function') return;
      springs.get(button)?.cancel();
      const spring = button.animate([
        {transform: 'scale(1)', offset: 0},
        {transform: 'scale(.94)', offset: .18},
        {transform: 'scale(1.035)', offset: .54},
        {transform: 'scale(.99)', offset: .78},
        {transform: 'scale(1)', offset: 1}
      ], {duration: 540, easing: 'ease-out'});
      springs.set(button, spring);
      spring.onfinish = () => springs.delete(button);
    });
  });
  motion.addEventListener('change', () => {
    if (!motion.matches) return;
    springs.forEach(spring => spring.cancel());
    springs.clear();
    root.querySelectorAll('.glass-ripple').forEach(ripple => ripple.remove());
    surfaces.forEach(surface => {
      surface.style.removeProperty('--pointer-x');
      surface.style.removeProperty('--pointer-y');
    });
  });
})();
