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
sandyButton.addEventListener('click', () => {
  if (sandyButton.disabled) return;
  sandyButton.disabled = true;
  if (!matchMedia('(prefers-reduced-motion: reduce)').matches) document.body.classList.add('sandevistan-active');
  document.querySelector('#sync-state').textContent = 'ACTIVE';
  setTimeout(() => {
    document.body.classList.remove('sandevistan-active');
    document.querySelector('#sync-state').textContent = 'READY';
    sandyButton.disabled = false;
  }, 3000);
});
