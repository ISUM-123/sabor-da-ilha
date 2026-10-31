// Cole aqui a URL do seu Web App do Google Apps Script (ver README.md)
const SHEET_ENDPOINT = '';

document.querySelectorAll('form[data-sheet]').forEach(form => {
  const status = form.querySelector('.form-status');
  const btn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', async ev => {
    ev.preventDefault();
    if (!form.checkValidity()) { form.reportValidity(); return; }
    btn.disabled = true;
    const label = btn.textContent;
    btn.textContent = 'Enviando...';
    const body = new URLSearchParams(new FormData(form));
    body.append('origem', form.dataset.sheet);

    try {
      if (!SHEET_ENDPOINT) {
        // Sem endpoint configurado: guarda localmente para não perder o pedido
        const saved = JSON.parse(localStorage.getItem('pedidos') || '[]');
        saved.push(Object.fromEntries(body));
        localStorage.setItem('pedidos', JSON.stringify(saved));
        await new Promise(r => setTimeout(r, 600));
        show(form.dataset.ok + ' (modo demonstração: planilha ainda não conectada)', 'ok');
      } else {
        // no-cors: o Apps Script não devolve CORS em POST simples; tratamos o envio como sucesso
        await fetch(SHEET_ENDPOINT, { method: 'POST', mode: 'no-cors', body });
        show(form.dataset.ok, 'ok');
      }
      form.reset();
    } catch (err) {
      show('Não conseguimos enviar agora. Tente pelo WhatsApp, por favor.', 'erro');
    } finally {
      btn.disabled = false;
      btn.textContent = label;
    }
  });

  function show(msg, type) {
    status.textContent = msg;
    status.className = 'form-status ' + type;
    status.focus();
  }
});

// menu mobile
const toggle = document.querySelector('.nav-toggle');
if (toggle) toggle.addEventListener('click', () => {
  const open = document.body.classList.toggle('nav-open');
  toggle.setAttribute('aria-expanded', open);
});
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('nav-open')));
document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());
