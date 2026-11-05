// Ajuste aqui os canais de contato do site.
const CONFIG = {
  email: 'contato@casasiqueiracardozo.com.br',
  // Só dígitos, com 55 e DDD (ex.: 5561900000000). Vazio esconde o botão de WhatsApp.
  whatsapp: '',
};

/* Parede de azulejos: desenhos originais, sorteados com semente fixa
   para que a composição seja sempre a mesma. */
const COLORS = { c: '#3A1A9E', o: '#D6146F', l: '#FFFFFF', a: '#FFC400', m: '#19C9A7' };
const TILES = [
  (bg, fg) => `<rect width="100" height="100" fill="${bg}"/><path d="M0 0h100a100 100 0 0 1-100 100z" fill="${fg}"/>`,
  (bg, fg) => `<rect width="100" height="100" fill="${bg}"/><path d="M15 100V50a35 35 0 0 1 70 0v50z" fill="${fg}"/>`,
  (bg, fg) => `<rect width="100" height="100" fill="${bg}"/><path d="M0 0h100L0 100z" fill="${fg}"/>`,
  (bg, fg) => `<rect width="100" height="100" fill="${bg}"/><circle cx="50" cy="50" r="30" fill="${fg}"/>`,
  (bg, fg) => `<rect width="100" height="100" fill="${bg}"/><path d="M0 50a50 50 0 0 1 100 0z" fill="${fg}"/><path d="M0 100a50 50 0 0 1 100 0z" fill="${fg}"/>`,
];
const PAIRS = [['c', 'l'], ['l', 'c'], ['o', 'l'], ['a', 'c'], ['c', 'o'], ['m', 'c'], ['c', 'a'], ['l', 'o'], ['o', 'a'], ['c', 'm']];

function buildWall() {
  const wall = document.getElementById('wall');
  if (!wall) return;
  let seed = 47049031; // o CNPJ da casa como semente
  const rand = (n) => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return Math.floor((seed / 4294967296) * n);
  };
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 70; i++) {
    const [bg, fg] = PAIRS[rand(PAIRS.length)];
    const shape = TILES[rand(TILES.length)];
    const tile = document.createElement('span');
    tile.className = 'tile';
    let turns = rand(4);
    tile.style.transform = `rotate(${turns * 90}deg)`;
    tile.innerHTML = `<svg viewBox="0 0 100 100">${shape(COLORS[bg], COLORS[fg])}</svg>`;
    if (!reduce) {
      tile.addEventListener('pointerenter', () => {
        turns += 1;
        tile.style.transform = `rotate(${turns * 90}deg)`;
      });
    }
    frag.append(tile);
  }
  wall.append(frag);
}

/* Formulário de contato. */
function initForm() {
  const form = document.getElementById('form');
  const error = document.getElementById('form-error');
  const direct = document.getElementById('direct-mail');
  direct.href = `mailto:${CONFIG.email}`;
  direct.textContent = CONFIG.email;

  const wa = document.getElementById('btn-whatsapp');
  wa.hidden = !CONFIG.whatsapp;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const missing = [...form.querySelectorAll('[required]')].filter((f) => !f.value.trim());
    form.querySelectorAll('[required]').forEach((f) => {
      if (missing.includes(f)) f.setAttribute('aria-invalid', 'true');
      else f.removeAttribute('aria-invalid');
    });
    if (missing.length) {
      error.textContent = 'Preencha os campos que faltam para a gente conseguir responder.';
      error.hidden = false;
      missing[0].focus();
      return;
    }
    error.hidden = true;

    const data = new FormData(form);
    const body = [
      data.get('mensagem').trim(),
      '',
      `Nome: ${data.get('nome').trim()}`,
      `Retorno: ${data.get('retorno').trim()}`,
    ].join('\n');
    const subject = 'Contato pelo site';

    if (event.submitter && event.submitter.value === 'whatsapp') {
      window.open(`https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(`${subject}\n\n${body}`)}`, '_blank', 'noopener');
    } else {
      window.location.href = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }
  });
}

buildWall();
initForm();
