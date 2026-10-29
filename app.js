const copyButton = document.querySelector('#copy');
const status = document.querySelector('#status');
let statusTimer;
function notify(text) {
  status.textContent = text;
  status.classList.add('visible');
  clearTimeout(statusTimer);
  statusTimer = setTimeout(() => status.classList.remove('visible'), 2800);
}
copyButton.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText('Pachakutiq');
    notify('微信号已复制，去微信添加朋友');
  } catch {
    const input = document.createElement('textarea');
    input.value = 'Pachakutiq';
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.append(input);
    input.select();
    input.setSelectionRange(0, input.value.length);
    const copied = document.execCommand('copy');
    input.remove();
    if (copied) notify('微信号已复制，去微信添加朋友');
    else window.prompt('请长按复制微信号', 'Pachakutiq');
  }
});

const effectsButton = document.querySelector('#effects');
const fxState = document.querySelector('#fx-state');
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
function setEffects(on) {
  document.body.classList.toggle('fx-off', !on);
  effectsButton.setAttribute('aria-pressed', String(on));
  fxState.textContent = on ? 'ON' : 'OFF';
}
setEffects(!motionPreference.matches);
effectsButton.addEventListener('click', () => {
  setEffects(effectsButton.getAttribute('aria-pressed') !== 'true');
});

const sandyButton = document.querySelector('#sandevistan');
let sandyTimer;
function activateSandy() {
  if (sandyButton.disabled) return;
  sandyButton.disabled = true;
  const visual = effectsButton.getAttribute('aria-pressed') === 'true';
  document.body.classList.toggle('sandevistan-active', visual);
  document.querySelector('#sync-state').textContent = 'ACTIVE';
  document.querySelector('#implant-note').textContent = visual ? '神经加速中 / 5 秒后自动恢复' : '神经连接成功 / 动效已关闭';
  sandyTimer = setTimeout(() => {
    document.body.classList.remove('sandevistan-active');
    document.querySelector('#sync-state').textContent = 'READY';
    document.querySelector('#implant-note').textContent = '冷却完成 / 随时可以再次启动';
    sandyButton.disabled = false;
  }, 5000);
}
sandyButton.addEventListener('click', activateSandy);
effectsButton.addEventListener('click', () => {
  if (effectsButton.getAttribute('aria-pressed') === 'false') document.body.classList.remove('sandevistan-active');
});
document.addEventListener('keydown', event => {
  if (event.key.toLowerCase() === 'e' && !event.repeat && !event.metaKey && !event.ctrlKey && !event.altKey && !/INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) activateSandy();
});
