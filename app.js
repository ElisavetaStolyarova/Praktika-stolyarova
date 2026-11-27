const grid   = document.getElementById('grid');
const status = document.getElementById('status');
const input  = document.getElementById('file');

async function load() {
  const images = await (await fetch('/api/images')).json();
  grid.innerHTML = images.map(img =>
    `<a href="${img.url}" target="_blank">
       <img src="${img.url}" alt="${img.name}">
     </a>`
  ).join('');
}

input.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  status.textContent = 'Загрузка…';
  status.className = 'busy';

  const fd = new FormData();
  fd.append('file', file);
  const res = await fetch('/api/images', { method: 'POST', body: fd });

  if (res.ok) {
    status.textContent = '';
    await load();
  } else {
    status.textContent = await res.text();
    status.className = 'err';
  }
  input.value = '';
});

load();
