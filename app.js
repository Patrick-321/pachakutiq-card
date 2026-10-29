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
    await navigator.clipboard.writeText('SmaragdineTablet');
    notify('微信号已复制，去微信添加朋友');
  } catch {
    const input = document.createElement('textarea');
    input.value = 'SmaragdineTablet';
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.append(input);
    input.select();
    input.setSelectionRange(0, input.value.length);
    const copied = document.execCommand('copy');
    input.remove();
    if (copied) notify('微信号已复制，去微信添加朋友');
    else window.prompt('请长按复制微信号', 'SmaragdineTablet');
  }
});

const sandyButton = document.querySelector('#sandevistan');
const sandyScreen = document.querySelector('#sandy-screen');
const sandyClose = document.querySelector('#sandy-close');
const card = document.querySelector('.card');
let sandyTimer;
let originalOverflow;
function stopSandy() {
  if (sandyScreen.hidden) return;
  clearTimeout(sandyTimer);
  sandyScreen.hidden = true;
  card.inert = false;
  document.body.style.overflow = originalOverflow;
  document.body.classList.remove('sandevistan-active');
  document.querySelector('#sync-state').textContent = 'READY';
  sandyButton.disabled = false;
  sandyButton.focus({preventScroll:true});
}
sandyButton.addEventListener('click', () => {
  if (sandyButton.disabled) return;
  sandyButton.disabled = true;
  originalOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  document.body.classList.add('sandevistan-active');
  document.querySelector('#sync-state').textContent = 'ACTIVE';
  sandyScreen.hidden = false;
  card.inert = true;
  sandyClose.focus({preventScroll:true});
  sandyTimer = setTimeout(stopSandy, 4600);
});
sandyClose.addEventListener('click', stopSandy);
document.addEventListener('keydown', event => {
  if (sandyScreen.hidden) return;
  if (event.key === 'Escape') stopSandy();
  if (event.key === 'Tab') { event.preventDefault(); sandyClose.focus(); }
});
document.addEventListener('visibilitychange', () => { if (document.hidden) stopSandy(); });
