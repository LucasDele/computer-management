(() => {
  const root = document.querySelector('.liquid-landing');
  if (!root) return;
  const filterId = 'watery-glass-refraction';
  if (window.CSS?.supports('backdrop-filter', `url("#${filterId}")`)) {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.classList.add('watery-filter-definitions');
    svg.setAttribute('aria-hidden', 'true');
    svg.setAttribute('focusable', 'false');
    const defs = document.createElementNS(ns, 'defs');
    const filter = document.createElementNS(ns, 'filter');
    const turbulence = document.createElementNS(ns, 'feTurbulence');
    const smooth = document.createElementNS(ns, 'feGaussianBlur');
    const displacement = document.createElementNS(ns, 'feDisplacementMap');
    filter.id = filterId;
    filter.setAttribute('x', '-10%');
    filter.setAttribute('y', '-10%');
    filter.setAttribute('width', '120%');
    filter.setAttribute('height', '120%');
    filter.setAttribute('color-interpolation-filters', 'sRGB');
    turbulence.setAttribute('type', 'fractalNoise');
    turbulence.setAttribute('baseFrequency', '0.009 0.013');
    turbulence.setAttribute('numOctaves', '2');
    turbulence.setAttribute('seed', '12');
    turbulence.setAttribute('result', 'water');
    smooth.setAttribute('in', 'water');
    smooth.setAttribute('stdDeviation', '2');
    smooth.setAttribute('result', 'flow');
    displacement.setAttribute('in', 'SourceGraphic');
    displacement.setAttribute('in2', 'flow');
    displacement.setAttribute('scale', '7');
    displacement.setAttribute('xChannelSelector', 'R');
    displacement.setAttribute('yChannelSelector', 'G');
    filter.append(turbulence, smooth, displacement);
    defs.append(filter);
    svg.append(defs);
    root.append(svg);
    root.style.setProperty('--water-refraction', `url("#${filterId}") saturate(115%) contrast(102%)`);
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const models = [...root.querySelectorAll('.glass-surface')].map(element => {
    const model = {
      element,
      tilt: element.matches('header') ? 0 : element.matches('.glass-info-card') ? 4 : 2.2,
      current: {x: 0, y: 0, lift: 0},
      target: {x: 0, y: 0, lift: 0},
      velocity: {x: 0, y: 0, lift: 0},
      bounds: null
    };
    if (model.tilt) element.classList.add('watery-interactive');
    return model;
  });
  const active = new Set();
  let frame = 0;
  let lastTime = 0;

  const allowed = () => !reducedMotion.matches && finePointer.matches && !document.hidden;
  const clamp = (n, min, max) => Math.min(max, Math.max(min, n));

  function paint(model) {
    const {element, current: p, tilt} = model;
    const style = element.style;
    const focused = element.matches(':focus-within');
    style.setProperty('--water-x', `${50 + p.x * 45}%`);
    style.setProperty('--water-y', `${50 + p.y * 45}%`);
    style.setProperty('--water-angle', `${140 + p.x * 28 + p.y * 18}deg`);
    if (!tilt) return;
    const amount = focused ? 0 : 1;
    style.setProperty('--water-shift-x', `${p.x * 4 * amount}px`);
    style.setProperty('--water-shift-y', `${(p.y * 3 - p.lift * 3) * amount}px`);
    style.setProperty('--water-tilt-x', `${-p.y * tilt * amount}deg`);
    style.setProperty('--water-tilt-y', `${p.x * tilt * amount}deg`);
    style.setProperty('--water-scale', `${1 + p.lift * .007 * amount}`);
  }

  function tick(time) {
    frame = 0;
    if (!allowed()) { reset(); return; }
    const dt = Math.min((time - (lastTime || time - 16.67)) / 1000, .05);
    lastTime = time;
    const steps = Math.max(1, Math.ceil(dt / .008));
    const step = dt / steps;
    active.forEach(model => {
      let moving = false;
      for (const key of ['x', 'y', 'lift']) {
        for (let i = 0; i < steps; i++) {
          const force = (model.target[key] - model.current[key]) * 150;
          model.velocity[key] += (force - model.velocity[key] * 18) * step;
          model.current[key] += model.velocity[key] * step;
        }
        if (Math.abs(model.target[key] - model.current[key]) > .0008 || Math.abs(model.velocity[key]) > .008) {
          moving = true;
        } else {
          model.current[key] = model.target[key];
          model.velocity[key] = 0;
        }
      }
      paint(model);
      if (!moving) {
        active.delete(model);
        model.element.classList.remove('watery-tracking');
      }
    });
    if (active.size) frame = requestAnimationFrame(tick);
    else lastTime = 0;
  }

  function wake(model) {
    active.add(model);
    if (model.tilt) model.element.classList.add('watery-tracking');
    if (!frame) frame = requestAnimationFrame(tick);
  }

  function release(model) {
    model.bounds = null;
    model.target.x = 0;
    model.target.y = 0;
    model.target.lift = 0;
    if (allowed()) wake(model);
  }

  models.forEach(model => {
    const update = event => {
      if (!allowed() || event.pointerType === 'touch') return;
      const bounds = model.bounds || (model.bounds = model.element.getBoundingClientRect());
      if (!bounds.width || !bounds.height) return;
      model.target.x = clamp((event.clientX - bounds.left) / bounds.width * 2 - 1, -1, 1);
      model.target.y = clamp((event.clientY - bounds.top) / bounds.height * 2 - 1, -1, 1);
      model.target.lift = 1;
      wake(model);
    };
    model.element.addEventListener('pointerenter', update, {passive: true});
    model.element.addEventListener('pointermove', update, {passive: true});
    model.element.addEventListener('pointerleave', () => release(model), {passive: true});
    model.element.addEventListener('pointercancel', () => release(model), {passive: true});
    model.element.addEventListener('focusin', () => { paint(model); });
  });

  function reset() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    lastTime = 0;
    active.clear();
    models.forEach(model => {
      model.bounds = null;
      for (const key of ['x', 'y', 'lift']) {
        model.current[key] = model.target[key] = model.velocity[key] = 0;
      }
      model.element.classList.remove('watery-tracking');
      ['--water-x', '--water-y', '--water-angle', '--water-shift-x', '--water-shift-y',
        '--water-tilt-x', '--water-tilt-y', '--water-scale'].forEach(key => model.element.style.removeProperty(key));
    });
  }

  reducedMotion.addEventListener('change', reset);
  finePointer.addEventListener('change', reset);
  document.addEventListener('visibilitychange', () => { if (document.hidden) reset(); });
  window.addEventListener('resize', reset, {passive: true});
  window.addEventListener('blur', reset);
  window.addEventListener('scroll', () => {
    models.forEach(model => { model.bounds = null; });
  }, {passive: true});
  const form = root.querySelector('#loginForm');
  const password = form?.querySelector('#password');
  if (password) {
    let toggle = form.querySelector('#showPassword, #show-password, input[data-show-password]');
    if (!toggle) {
      const row = document.createElement('div');
      const label = document.createElement('label');
      toggle = document.createElement('input');
      row.className = 'watery-password-toggle';
      toggle.type = 'checkbox';
      toggle.id = 'showPassword';
      toggle.setAttribute('aria-controls', password.id);
      label.htmlFor = toggle.id;
      label.textContent = 'Show Password';
      row.append(toggle, label);
      password.insertAdjacentElement('afterend', row);
    }
    const syncPassword = () => { password.type = toggle.checked ? 'text' : 'password'; };
    toggle.addEventListener('change', syncPassword);
    form.addEventListener('reset', () => { requestAnimationFrame(syncPassword); });
    window.addEventListener('pageshow', () => {
      toggle.checked = false;
      syncPassword();
    });
    syncPassword();
  }
})();
