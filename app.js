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
