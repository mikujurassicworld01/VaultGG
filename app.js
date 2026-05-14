// ============================================================
// VaultGG — app.js  (vanilla JS, sem build tools)
//
// CONFIGURAÇÃO:
//   No index.html, antes de carregar este script, defina:
//     <script>window.API_BASE = 'http://localhost:8080/api';</script>
//
// Para rodar localmente no VSCode:
//   1. Abra esta pasta no VSCode
//   2. Instale a extensão "Live Server" (ritwickdey.liveserver)
//   3. Suba o backend Express: cd ../artifacts/api-server && node dist/index.mjs
//   4. Clique em "Go Live" no Live Server
//   5. O app abrirá em http://127.0.0.1:5500
// ============================================================

const API = (window.API_BASE || 'http://localhost:8080/api');

// ============================================================
// I18N
// ============================================================
const LANGS = {
  'pt-BR': {
    dashboard: 'Central', library: 'Biblioteca', addGame: 'Adicionar Jogo',
    steamImport: 'Importar Steam', friends: 'Amigos',
    totalGames: 'Total de Jogos', totalHours: 'Horas Totais',
    totalAchievements: 'Conquistas', accountValue: 'Valor da Conta',
    gamerScore: 'Gamer Score', insights: 'Análises',
    gameLibrary: 'Biblioteca de Jogos', gameLibraryDesc: 'Gerencie toda a sua coleção.',
    searchGames: 'Buscar jogos...', allPlatforms: 'Todas Plataformas',
    allTypes: 'Todos os Tipos', noGames: 'Nenhum jogo encontrado',
    noGamesDesc: 'Adicione jogos manualmente ou importe do Steam.',
    progress: 'Progresso', achievements: 'Conquistas', hours: 'Horas',
    purchased: 'Comprado', free: 'Grátis', pirated: 'Pirata', emulator: 'Emulador',
    noValue: 'Sem valor', deleteGame: 'Excluir jogo',
    confirmDelete: 'Tem certeza que deseja excluir este jogo?',
    deleted: 'Jogo excluído', failedDelete: 'Erro ao excluir jogo',
    addGameTitle: 'Adicionar Jogo', addGameDesc: 'Adicione um jogo manualmente à sua coleção.',
    gameName: 'Nome do Jogo', platform: 'Plataforma', type: 'Tipo',
    progressPct: 'Progresso (%)', hoursPlayed: 'Horas Jogadas',
    estimatedValue: 'Valor Estimado (USD)', achievementsTotal: 'Total de Conquistas',
    achievementsUnlocked: 'Conquistas Desbloqueadas', emulatorName: 'Nome do Emulador',
    saving: 'Salvando...', save: 'Salvar Jogo', gameAdded: 'Jogo adicionado!',
    steamTitle: 'Importar do Steam', steamDesc: 'Cole a URL do seu perfil Steam para importar todos os seus jogos.',
    steamUrlLabel: 'URL do Perfil Steam', steamUrlPlaceholder: 'https://steamcommunity.com/id/seuperfil',
    importing: 'Importando...', import: 'Importar Jogos',
    importSuccess: 'Importação concluída!', imported: 'Importados', skipped: 'Ignorados',
    friendsList: 'Lista de Amigos', friendsDesc: 'Seus amigos da Steam importados automaticamente.',
    noFriends: 'Nenhum amigo encontrado. Importe seu perfil Steam primeiro.',
    friendsImported: 'amigos importados', viewProfile: 'Ver perfil',
    backFriends: 'Voltar para Amigos', mostPlayed: 'Jogos Mais Jogados',
    privateLib: 'Biblioteca Privada', privateLibDesc: 'Este jogador mantém a biblioteca como privada no Steam.',
    viewOnSteam: 'Ver no Steam', byHours: 'por horas jogadas',
    online: 'Online', offline: 'Offline',
    gamesByPlatform: 'Jogos por Plataforma', completedGames: 'Jogos Completos',
    avgProgress: 'Progresso Médio', tier: 'Nível',
    errorLoading: 'Erro ao carregar dados. Tente novamente.',
  },
  'en': {
    dashboard: 'Dashboard', library: 'Library', addGame: 'Add Game',
    steamImport: 'Steam Import', friends: 'Friends',
    totalGames: 'Total Games', totalHours: 'Total Hours',
    totalAchievements: 'Achievements', accountValue: 'Account Value',
    gamerScore: 'Gamer Score', insights: 'Insights',
    gameLibrary: 'Game Library', gameLibraryDesc: 'Manage your entire collection.',
    searchGames: 'Search games...', allPlatforms: 'All Platforms',
    allTypes: 'All Types', noGames: 'No games found',
    noGamesDesc: 'Add games manually or import from Steam.',
    progress: 'Progress', achievements: 'Achievements', hours: 'Hours',
    purchased: 'Purchased', free: 'Free', pirated: 'Pirated', emulator: 'Emulator',
    noValue: 'No value', deleteGame: 'Delete game',
    confirmDelete: 'Are you sure you want to delete this game?',
    deleted: 'Game deleted', failedDelete: 'Failed to delete game',
    addGameTitle: 'Add Game', addGameDesc: 'Manually add a game to your collection.',
    gameName: 'Game Name', platform: 'Platform', type: 'Type',
    progressPct: 'Progress (%)', hoursPlayed: 'Hours Played',
    estimatedValue: 'Estimated Value (USD)', achievementsTotal: 'Total Achievements',
    achievementsUnlocked: 'Unlocked Achievements', emulatorName: 'Emulator Name',
    saving: 'Saving...', save: 'Save Game', gameAdded: 'Game added!',
    steamTitle: 'Import from Steam', steamDesc: 'Paste your Steam profile URL to import all your games.',
    steamUrlLabel: 'Steam Profile URL', steamUrlPlaceholder: 'https://steamcommunity.com/id/yourprofile',
    importing: 'Importing...', import: 'Import Games',
    importSuccess: 'Import complete!', imported: 'Imported', skipped: 'Skipped',
    friendsList: 'Friends List', friendsDesc: 'Your Steam friends imported automatically.',
    noFriends: 'No friends found. Import your Steam profile first.',
    friendsImported: 'friends imported', viewProfile: 'View profile',
    backFriends: 'Back to Friends', mostPlayed: 'Most Played Games',
    privateLib: 'Private Library', privateLibDesc: 'This player has set their library to private on Steam.',
    viewOnSteam: 'View on Steam', byHours: 'by hours played',
    online: 'Online', offline: 'Offline',
    gamesByPlatform: 'Games by Platform', completedGames: 'Completed Games',
    avgProgress: 'Average Progress', tier: 'Tier',
    errorLoading: 'Error loading data. Please try again.',
  }
};

let lang = localStorage.getItem('vgg_lang') || 'pt-BR';
const t = (k) => LANGS[lang][k] ?? k;

window.setLang = function(l) {
  lang = l;
  localStorage.setItem('vgg_lang', l);
  document.getElementById('btn-pt').classList.toggle('active', l === 'pt-BR');
  document.getElementById('btn-en').classList.toggle('active', l === 'en');
  router();
};

// ============================================================
// ICONS (SVG inline)
// ============================================================
const icon = {
  dashboard: `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>`,
  games:    `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 12h4m-2-2v4m6.5-2h.01M17 10h.01M5 7h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"/></svg>`,
  add:      `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v8m-4-4h8"/></svg>`,
  steam:    `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12l7 4 4-7 4 7 3-4"/></svg>`,
  friends:  `<svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87m-4-12a4 4 0 0 1 0 7.75"/></svg>`,
  clock:    `<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`,
  trophy:   `<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M6 9H2V3h4m12 0h4v6h-4M6 3h12v7a6 6 0 0 1-12 0V3z"/><path d="M12 19v-3m0 0a3 3 0 0 1-3-3h6a3 3 0 0 1-3 3z"/></svg>`,
  coin:     `<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 8v8m-2-6h4a1 1 0 1 1 0 2h-4a1 1 0 1 1 0 2h4"/></svg>`,
  trash:    `<svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 6h18m-2 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,
  search:   `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>`,
  arrow:    `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>`,
  arrowL:   `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>`,
  lock:     `<svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>`,
  ext:      `<svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6m4-3h6v6m-11 5L21 3"/></svg>`,
  gamepad:  `<svg width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24"><path d="M6 12h4m-2-2v4m6.5-2h.01M17 10h.01M5 7h14a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2z"/></svg>`,
  wifi:     `<svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/></svg>`,
};

// ============================================================
// API CLIENT
// ============================================================
async function apiFetch(path, opts) {
  opts = opts || {};
  var res;
  try {
    res = await fetch(API + path, Object.assign({ headers: { 'Content-Type': 'application/json' } }, opts));
  } catch (networkErr) {
    throw { error: 'Sem conexão com o backend', message: 'Não foi possível conectar em ' + API + '. Verifique se o servidor está rodando e se a URL está correta no index.html.' };
  }
  if (res.status === 204) return null;
  var json = await res.json();
  if (!res.ok) throw json;
  return json;
}

// ============================================================
// STATE
// ============================================================
var ownerProfile = null;

async function loadOwnerProfile() {
  try {
    ownerProfile = await apiFetch('/profiles/owner');
    renderSidebarProfile();
  } catch (e) { ownerProfile = null; }
}

async function checkHealth() {
  var ok = false;
  try {
    var h = await apiFetch('/healthz');
    ok = h && h.status === 'ok';
  } catch (e) { ok = false; }
  var dot = document.getElementById('status-dot');
  var lbl = document.getElementById('status-label');
  if (dot) { dot.className = 'status-dot ' + (ok ? 'online' : 'offline'); }
  if (lbl) { lbl.textContent = ok ? t('online') : t('offline'); lbl.style.color = ok ? 'var(--green)' : 'var(--red)'; }
}

// ============================================================
// ROUTER
// ============================================================
var NAV = [
  { path: '/', getLabel: function() { return t('dashboard'); }, ico: icon.dashboard },
  { path: '/games', getLabel: function() { return t('library'); }, ico: icon.games },
  { path: '/add', getLabel: function() { return t('addGame'); }, ico: icon.add },
  { path: '/steam', getLabel: function() { return t('steamImport'); }, ico: icon.steam },
  { path: '/friends', getLabel: function() { return t('friends'); }, ico: icon.friends },
];

function navigate(path) { window.location.hash = '#' + path; }
window.navigate = navigate;

function currentPath() { return window.location.hash.slice(1) || '/'; }

function router() {
  var path = currentPath();
  renderNav(path);
  var mc = document.getElementById('main-content');
  mc.style.opacity = '0';
  mc.style.transition = 'opacity 0.15s';
  setTimeout(function() {
    if (path === '/') renderDashboard();
    else if (path === '/games') renderGames();
    else if (path === '/add') renderAddGame();
    else if (path === '/steam') renderSteam();
    else if (path === '/friends') renderFriends();
    else if (path.indexOf('/friends/') === 0) renderFriendProfile(path.split('/friends/')[1]);
    else renderDashboard();
    mc.style.opacity = '1';
  }, 80);
}

window.addEventListener('hashchange', router);

// ============================================================
// SIDEBAR & NAV
// ============================================================
function renderNav(activePath) {
  var nav = document.getElementById('sidebar-nav');
  var mob = document.getElementById('mobile-nav');
  if (!nav) return;

  nav.innerHTML = NAV.map(function(item) {
    var isActive = activePath === item.path || (item.path !== '/' && activePath.indexOf(item.path) === 0);
    return '<button class="nav-item' + (isActive ? ' active' : '') + '" onclick="navigate(\'' + item.path + '\')">' +
      item.ico + '<span>' + item.getLabel() + '</span></button>';
  }).join('');

  if (mob) {
    mob.innerHTML = NAV.map(function(item) {
      var isActive = activePath === item.path || (item.path !== '/' && activePath.indexOf(item.path) === 0);
      return '<button class="mobile-nav-item' + (isActive ? ' active' : '') + '" onclick="navigate(\'' + item.path + '\')">' +
        item.ico + '<span class="mobile-nav-label">' + item.getLabel() + '</span></button>';
    }).join('');
  }
}

function renderSidebarProfile() {
  var el = document.getElementById('sidebar-profile');
  if (!el || !ownerProfile) return;
  var avatar = ownerProfile.avatarUrl
    ? '<img src="' + esc(ownerProfile.avatarUrl) + '" class="profile-avatar" onerror="this.style.display=\'none\'" alt="">' +
      '<div class="profile-avatar-placeholder" style="display:none">' + (ownerProfile.name[0] || '?').toUpperCase() + '</div>'
    : '<div class="profile-avatar-placeholder">' + (ownerProfile.name[0] || '?').toUpperCase() + '</div>';
  el.innerHTML = avatar + '<div class="profile-info"><div class="profile-name">' + esc(ownerProfile.name) + '</div><div class="profile-sub">Steam</div></div>';
  el.style.display = 'flex';
}

// ============================================================
// TOAST
// ============================================================
function toast(msg, type) {
  type = type || 'success';
  var c = document.getElementById('toast-container');
  var el = document.createElement('div');
  el.className = 'toast ' + type;
  el.textContent = msg;
  c.appendChild(el);
  setTimeout(function() { el.remove(); }, 3500);
}

// ============================================================
// HELPERS
// ============================================================
function esc(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function fmtPrice(usd, brl) {
  if (lang === 'pt-BR' && brl) return 'R$ ' + Number(brl).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (usd) return '$' + Number(usd).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return '—';
}

function fmtDate(d) {
  return new Date(d).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit' });
}

function progressBar(pct, cls) {
  var w = Math.max(0, Math.min(100, pct));
  return '<div class="progress-track"><div class="progress-fill ' + (cls || '') + '" style="width:' + w + '%"></div></div>';
}

function gameImageSrc(g) {
  if (g.imageUrl) return g.imageUrl;
  if (g.steamAppId) return 'https://cdn.cloudflare.steamstatic.com/steam/apps/' + g.steamAppId + '/header.jpg';
  return null;
}

function platformBadge(p) {
  var map = { steam: 'badge-steam', epic: 'badge-epic', gog: 'badge-gog', xbox: 'badge-xbox', playstation: 'badge-playstation', emulator: 'badge-emulator', other: 'badge-other' };
  var labels = { steam: 'Steam', epic: 'Epic', gog: 'GOG', xbox: 'Xbox', playstation: 'PS', emulator: 'Emu', other: 'Other' };
  return '<span class="badge ' + (map[p] || 'badge-other') + '">' + (labels[p] || p) + '</span>';
}

function typeBadge(type) {
  var map = { purchased: ['badge-purchased', function() { return t('purchased'); }], free: ['badge-free', function() { return t('free'); }], pirated: ['badge-pirated', function() { return t('pirated'); }], emulator: ['badge-emulator', function() { return t('emulator'); }] };
  var entry = map[type] || ['badge-other', function() { return type; }];
  return '<span class="badge ' + entry[0] + '">' + entry[1]() + '</span>';
}

function skeletonCards(n) {
  n = n || 6;
  var cards = '';
  for (var i = 0; i < n; i++) {
    cards += '<div class="game-card"><div class="skeleton" style="height:108px"></div><div class="game-body"><div class="skeleton" style="height:18px;width:70%;margin-bottom:10px"></div><div class="skeleton" style="height:10px"></div><div class="skeleton" style="height:10px;margin-top:6px"></div></div></div>';
  }
  return '<div class="grid-games">' + cards + '</div>';
}

function renderContent(html) {
  document.getElementById('main-content').innerHTML = html;
}

function statusColor(s) {
  if (s === 'Online') return 'var(--green)';
  if (s === 'Busy' || s === 'Away') return 'var(--gold)';
  return 'var(--muted)';
}

// ============================================================
// DASHBOARD
// ============================================================
async function renderDashboard() {
  renderContent('<div style="margin-bottom:24px"><h1 class="section-title gradient-text">' + t('dashboard') + '</h1></div>' +
    '<div id="dash-body"><div class="grid-4" style="gap:14px">' +
    '<div class="stat-card"><div class="skeleton" style="height:50px"></div></div>'.repeat(4) + '</div></div>');

  try {
    var results = await Promise.all([apiFetch('/stats/dashboard'), apiFetch('/stats/score'), apiFetch('/stats/insights')]);
    var stats = results[0], score = results[1], insights = results[2];

    var val = lang === 'pt-BR' && stats.accountValueBrl
      ? 'R$ ' + Number(stats.accountValueBrl).toLocaleString('pt-BR', { minimumFractionDigits: 2 })
      : '$' + Number(stats.accountValue || 0).toLocaleString('en-US', { minimumFractionDigits: 2 });

    var tierColors = { Bronze: '#CD7F32', Silver: '#A1A1AA', Gold: '#FACC15', Platinum: '#7DD3FC', Diamond: '#A855F7', Legendary: '#F97316' };
    var tierColor = tierColors[score.tier] || 'var(--accent)';

    var r = 50, circ = 2 * Math.PI * r;
    var pct = Math.max(0, Math.min(100, score.score));
    var dash = circ - (pct / 100) * circ;

    var platformEntries = Object.entries(stats.gamesByPlatform || {}).sort(function(a,b) { return b[1] - a[1]; });
    var maxPlatform = Math.max.apply(null, platformEntries.map(function(e) { return e[1]; }).concat([1]));

    var breakdownHtml = Object.entries(score.breakdown || {}).map(function(entry) {
      return '<div style="font-size:11px;display:flex;justify-content:space-between;gap:12px">' +
        '<span style="color:var(--muted)">' + entry[0].replace(/([A-Z])/g,' $1').trim() + '</span>' +
        '<span style="font-weight:900;color:var(--accent)">+' + entry[1] + '</span></div>';
    }).join('');

    var platformsHtml = platformEntries.map(function(e) {
      return '<div class="platform-bar">' +
        '<span class="platform-bar-label">' + e[0] + '</span>' +
        '<div class="platform-bar-track"><div class="platform-bar-fill" style="width:' + Math.round((e[1]/maxPlatform)*100) + '%"></div></div>' +
        '<span class="platform-bar-count">' + e[1] + '</span></div>';
    }).join('') || '<div style="color:var(--muted);font-size:12px">Sem dados</div>';

    var insightsHtml = (insights && insights.length)
      ? '<div class="card" style="margin-top:16px"><div class="card-header"><div class="card-title">' + t('insights') + '</div></div>' +
        '<div style="display:flex;flex-direction:column;gap:10px">' +
        insights.map(function(msg) { return '<div class="insight-card"><span class="insight-icon">★</span>' + esc(msg) + '</div>'; }).join('') +
        '</div></div>' : '';

    document.getElementById('dash-body').innerHTML =
      '<div class="grid-4" style="gap:14px;margin-bottom:20px">' +
        statCard(t('totalGames'), stats.totalGames, 'var(--primary)') +
        statCard(t('totalHours'), Number(stats.totalHoursPlayed || 0).toLocaleString() + 'h', 'var(--accent)') +
        statCard(t('totalAchievements'), (stats.unlockedAchievements || 0) + ' / ' + (stats.totalAchievements || 0), 'var(--gold)') +
        statCard(t('accountValue'), val, 'var(--green)') +
      '</div>' +
      '<div class="grid-2" style="gap:16px;margin-bottom:20px">' +
        '<div class="card"><div class="card-header"><div class="card-title">' + t('gamerScore') + '</div></div>' +
          '<div style="display:flex;align-items:center;gap:24px;flex-wrap:wrap">' +
            '<svg class="score-ring-svg" width="130" height="130" viewBox="0 0 120 120">' +
              '<defs><linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stop-color="#7C3AED"/><stop offset="100%" stop-color="#A855F7"/></linearGradient></defs>' +
              '<circle class="score-ring-bg" cx="60" cy="60" r="' + r + '" stroke-width="10"/>' +
              '<circle class="score-ring-fill" cx="60" cy="60" r="' + r + '" stroke-width="10" stroke-dasharray="' + circ + '" stroke-dashoffset="' + dash + '"/>' +
              '<text class="score-value" x="60" y="56">' + score.score + '</text>' +
              '<text class="score-label-svg" x="60" y="74">/ 100</text>' +
            '</svg>' +
            '<div><div style="font-size:22px;font-weight:900;color:' + tierColor + '">' + score.tier + '</div>' +
              '<div style="font-size:12px;color:var(--muted);margin-top:4px">' + t('tier') + '</div>' +
              '<div style="margin-top:14px;display:flex;flex-direction:column;gap:6px">' + breakdownHtml + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
        '<div class="card"><div class="card-header"><div class="card-title">' + t('gamesByPlatform') + '</div></div>' +
          platformsHtml +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px">' +
            '<div style="text-align:center;padding:10px;border-radius:8px;background:rgba(124,58,237,0.08);border:1px solid var(--border)">' +
              '<div style="font-size:20px;font-weight:900;color:var(--accent)">' + (stats.completedGames || 0) + '</div>' +
              '<div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em;margin-top:2px">' + t('completedGames') + '</div>' +
            '</div>' +
            '<div style="text-align:center;padding:10px;border-radius:8px;background:rgba(124,58,237,0.08);border:1px solid var(--border)">' +
              '<div style="font-size:20px;font-weight:900;color:var(--primary)">' + Math.round(stats.averageProgress || 0) + '%</div>' +
              '<div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em;margin-top:2px">' + t('avgProgress') + '</div>' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>' + insightsHtml;
  } catch (e) {
    document.getElementById('dash-body').innerHTML = '<div class="empty-state"><div class="empty-state-title" style="color:var(--red)">' + t('errorLoading') + '</div></div>';
  }
}

function statCard(label, value, color) {
  return '<div class="stat-card"><div class="stat-card-label">' + label + '</div>' +
    '<div class="stat-card-value" style="color:' + color + '">' + esc(String(value)) + '</div></div>';
}

// ============================================================
// GAMES
// ============================================================
var allGames = [], gSearch = '', gPlatform = 'all', gType = 'all';

async function renderGames() {
  renderContent(
    '<div style="margin-bottom:24px"><h1 class="section-title gradient-text">' + t('gameLibrary') + '</h1>' +
    '<p class="section-sub">' + t('gameLibraryDesc') + '</p></div>' +
    '<div class="filters">' +
      '<div class="filter-search" style="flex:1;position:relative">' +
        '<span class="filter-search-icon" style="position:absolute;left:10px;top:50%;transform:translateY(-50%);opacity:0.4">' + icon.search + '</span>' +
        '<input type="text" class="form-input" id="g-search" placeholder="' + t('searchGames') + '" value="' + esc(gSearch) + '" style="padding-left:34px"/>' +
      '</div>' +
      '<select class="form-select" id="g-platform" style="width:160px">' +
        '<option value="all">' + t('allPlatforms') + '</option>' +
        '<option value="steam">Steam</option><option value="epic">Epic Games</option>' +
        '<option value="gog">GOG</option><option value="xbox">Xbox</option>' +
        '<option value="playstation">PlayStation</option><option value="emulator">Emulator</option>' +
        '<option value="other">Other</option>' +
      '</select>' +
      '<select class="form-select" id="g-type" style="width:140px">' +
        '<option value="all">' + t('allTypes') + '</option>' +
        '<option value="purchased">' + t('purchased') + '</option>' +
        '<option value="free">' + t('free') + '</option>' +
        '<option value="pirated">' + t('pirated') + '</option>' +
        '<option value="emulator">' + t('emulator') + '</option>' +
      '</select>' +
    '</div>' +
    '<div id="games-grid">' + skeletonCards() + '</div>'
  );

  document.getElementById('g-platform').value = gPlatform;
  document.getElementById('g-type').value = gType;
  document.getElementById('g-search').addEventListener('input', function(e) { gSearch = e.target.value; renderGamesGrid(); });
  document.getElementById('g-platform').addEventListener('change', function(e) { gPlatform = e.target.value; renderGamesGrid(); });
  document.getElementById('g-type').addEventListener('change', function(e) { gType = e.target.value; renderGamesGrid(); });

  try {
    allGames = await apiFetch('/games');
    renderGamesGrid();
  } catch (e) {
    document.getElementById('games-grid').innerHTML = '<div class="empty-state"><div class="empty-state-title" style="color:var(--red)">' + t('errorLoading') + '</div></div>';
  }
}

function renderGamesGrid() {
  var filtered = allGames.filter(function(g) {
    if (gSearch && g.name.toLowerCase().indexOf(gSearch.toLowerCase()) === -1) return false;
    if (gPlatform !== 'all' && g.platform !== gPlatform) return false;
    if (gType !== 'all' && g.gameType !== gType) return false;
    return true;
  });
  var grid = document.getElementById('games-grid');
  if (!grid) return;
  if (!filtered.length) {
    grid.innerHTML = '<div class="empty-state">' +
      '<div style="opacity:0.15;margin:0 auto 16px;display:block;text-align:center">' + icon.gamepad + '</div>' +
      '<div class="empty-state-title">' + t('noGames') + '</div>' +
      '<div class="empty-state-desc">' + t('noGamesDesc') + '</div></div>';
    return;
  }
  grid.innerHTML = '<div class="grid-games">' + filtered.map(function(g) { return gameCard(g); }).join('') + '</div>';
  grid.querySelectorAll('.delete-btn').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (confirm(t('confirmDelete'))) deleteGame(btn.dataset.id);
    });
  });
}

function gameCard(g) {
  var imgSrc = gameImageSrc(g);
  var cover = imgSrc
    ? '<div class="game-cover-wrap"><img src="' + esc(imgSrc) + '" class="game-cover" alt="' + esc(g.name) + '" onerror="this.parentElement.style.display=\'none\'"/>' +
      '<div class="game-cover-gradient"></div>' + (g.progressPercent >= 100 ? '<div class="game-completed-badge">100%</div>' : '') + '</div>'
    : '';
  var achPct = g.achievementsTotal > 0 ? Math.round((g.achievementsUnlocked / g.achievementsTotal) * 100) : 0;
  return '<div class="game-card' + (g.progressPercent >= 100 ? ' completed' : '') + '">' + cover +
    '<div class="game-body">' +
      '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px">' +
        '<div class="game-title">' + esc(g.name) + '</div>' +
        '<button class="delete-btn" data-id="' + g.id + '" title="' + t('deleteGame') + '" style="background:none;border:none;cursor:pointer;color:var(--muted);padding:2px;opacity:0.6;flex-shrink:0" onmouseenter="this.style.color=\'var(--red)\'" onmouseleave="this.style.color=\'var(--muted)\'">' + icon.trash + '</button>' +
      '</div>' +
      '<div class="badges">' + platformBadge(g.platform) + ' ' + typeBadge(g.gameType) + (g.emulatorName ? ' <span class="badge badge-other">' + esc(g.emulatorName) + '</span>' : '') + '</div>' +
      '<div class="progress-wrap">' +
        '<div class="progress-header"><span>' + t('progress') + '</span><span style="color:' + (g.progressPercent >= 100 ? 'var(--accent)' : 'var(--text-sub)') + '">' + g.progressPercent + '%</span></div>' +
        progressBar(g.progressPercent) +
      '</div>' +
      (g.achievementsTotal > 0
        ? '<div class="progress-wrap"><div class="progress-header"><span style="display:flex;align-items:center;gap:4px">' + icon.trophy + ' ' + t('achievements') + '</span><span style="color:var(--gold)">' + (g.achievementsUnlocked || 0) + ' / ' + g.achievementsTotal + '</span></div>' + progressBar(achPct, 'gold') + '</div>'
        : '') +
      '<div class="game-hours">' + icon.clock + ' ' + (g.hoursPlayed || 0) + 'h</div>' +
    '</div>' +
    '<div class="game-footer">' +
      (g.gameType === 'purchased'
        ? '<span style="display:flex;align-items:center;gap:5px"><span style="color:var(--accent)">' + icon.coin + '</span><span class="game-price">' + fmtPrice(g.estimatedValue, g.estimatedValueBrl) + '</span></span>'
        : '<span style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:0.06em">' + t('noValue') + '</span>') +
      '<div class="game-date">' + fmtDate(g.createdAt) + '</div>' +
    '</div>' +
  '</div>';
}

async function deleteGame(id) {
  try {
    await apiFetch('/games/' + id, { method: 'DELETE' });
    allGames = allGames.filter(function(g) { return g.id !== Number(id); });
    renderGamesGrid();
    toast(t('deleted'));
  } catch (e) { toast(t('failedDelete'), 'error'); }
}

// ============================================================
// ADD GAME
// ============================================================
async function renderAddGame() {
  renderContent(
    '<div style="margin-bottom:24px"><h1 class="section-title gradient-text">' + t('addGameTitle') + '</h1><p class="section-sub">' + t('addGameDesc') + '</p></div>' +
    '<div style="max-width:560px">' +
      '<form id="add-form" class="card" style="display:flex;flex-direction:column;gap:0">' +
        '<div class="form-group"><label class="form-label">' + t('gameName') + ' *</label><input class="form-input" name="name" required placeholder="Ex: The Witcher 3"/></div>' +
        '<div class="form-row">' +
          '<div class="form-group"><label class="form-label">' + t('platform') + '</label><select class="form-select" name="platform">' +
            '<option value="steam">Steam</option><option value="epic">Epic Games</option><option value="gog">GOG</option>' +
            '<option value="xbox">Xbox</option><option value="playstation">PlayStation</option><option value="emulator">Emulator</option><option value="other">Other</option>' +
          '</select></div>' +
          '<div class="form-group"><label class="form-label">' + t('type') + '</label><select class="form-select" name="gameType" id="form-type">' +
            '<option value="purchased">' + t('purchased') + '</option><option value="free">' + t('free') + '</option>' +
            '<option value="pirated">' + t('pirated') + '</option><option value="emulator">' + t('emulator') + '</option>' +
          '</select></div>' +
        '</div>' +
        '<div class="form-row">' +
          '<div class="form-group"><label class="form-label">' + t('progressPct') + '</label><input class="form-input" name="progressPercent" type="number" min="0" max="100" value="0"/></div>' +
          '<div class="form-group"><label class="form-label">' + t('hoursPlayed') + '</label><input class="form-input" name="hoursPlayed" type="number" min="0" step="0.1" placeholder="0"/></div>' +
        '</div>' +
        '<div class="form-group" id="emulator-field" style="display:none"><label class="form-label">' + t('emulatorName') + '</label><input class="form-input" name="emulatorName" placeholder="Ex: RPCS3, Citra..."/></div>' +
        '<div class="form-group"><label class="form-label">' + t('estimatedValue') + '</label><input class="form-input" name="estimatedValue" type="number" min="0" step="0.01" placeholder="29.99"/></div>' +
        '<div class="form-row">' +
          '<div class="form-group"><label class="form-label">' + t('achievementsTotal') + '</label><input class="form-input" name="achievementsTotal" type="number" min="0" placeholder="0"/></div>' +
          '<div class="form-group"><label class="form-label">' + t('achievementsUnlocked') + '</label><input class="form-input" name="achievementsUnlocked" type="number" min="0" placeholder="0"/></div>' +
        '</div>' +
        '<button type="submit" class="btn btn-primary" id="add-btn">' + icon.add + ' ' + t('save') + '</button>' +
      '</form>' +
    '</div>'
  );

  document.getElementById('form-type').addEventListener('change', function(e) {
    document.getElementById('emulator-field').style.display = e.target.value === 'emulator' ? 'flex' : 'none';
  });

  document.getElementById('add-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    var btn = document.getElementById('add-btn');
    btn.disabled = true; btn.textContent = t('saving');
    var fd = new FormData(e.target);
    var body = {
      name: fd.get('name'), platform: fd.get('platform'), gameType: fd.get('gameType'),
      progressPercent: Number(fd.get('progressPercent') || 0),
      hoursPlayed: fd.get('hoursPlayed') ? Number(fd.get('hoursPlayed')) : null,
      estimatedValue: fd.get('estimatedValue') ? Number(fd.get('estimatedValue')) : null,
      achievementsTotal: fd.get('achievementsTotal') ? Number(fd.get('achievementsTotal')) : null,
      achievementsUnlocked: fd.get('achievementsUnlocked') ? Number(fd.get('achievementsUnlocked')) : null,
      emulatorName: fd.get('emulatorName') || null,
    };
    try {
      await apiFetch('/games', { method: 'POST', body: JSON.stringify(body) });
      toast(t('gameAdded'));
      navigate('/games');
    } catch (err) {
      toast((err && err.message) || 'Erro', 'error');
      btn.disabled = false;
      btn.innerHTML = icon.add + ' ' + t('save');
    }
  });
}

// ============================================================
// STEAM IMPORT
// ============================================================
async function renderSteam() {
  renderContent(
    '<div style="margin-bottom:24px"><h1 class="section-title gradient-text">' + t('steamTitle') + '</h1><p class="section-sub">' + t('steamDesc') + '</p></div>' +
    '<div style="max-width:560px">' +
      '<form id="steam-form" class="import-card">' +
        '<div class="form-group"><label class="form-label">' + t('steamUrlLabel') + '</label>' +
          '<input class="form-input" id="steam-url" name="steamProfileUrl" placeholder="' + t('steamUrlPlaceholder') + '" required/>' +
          '<div class="form-hint">Ex: https://steamcommunity.com/id/seuperfil</div>' +
        '</div>' +
        '<button type="submit" class="btn btn-primary btn-lg" id="steam-btn" style="width:100%">' + icon.steam + ' ' + t('import') + '</button>' +
      '</form>' +
      '<div id="import-result"></div>' +
    '</div>'
  );

  document.getElementById('steam-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    var btn = document.getElementById('steam-btn');
    btn.disabled = true; btn.textContent = t('importing');
    var url = document.getElementById('steam-url').value;
    try {
      var result = await apiFetch('/steam/import', { method: 'POST', body: JSON.stringify({ steamProfileUrl: url }) });
      toast(t('importSuccess'));
      await loadOwnerProfile();
      var profileRow = result.profileName
        ? '<div style="display:flex;align-items:center;gap:10px;margin-bottom:14px">' +
          (result.profileAvatar ? '<img src="' + esc(result.profileAvatar) + '" style="width:44px;height:44px;border-radius:50%;border:2px solid var(--primary)" onerror="this.style.display=\'none\'">' : '') +
          '<div><div style="font-weight:900;font-size:16px">' + esc(result.profileName) + '</div><div style="font-size:11px;color:var(--muted)">Steam</div></div></div>'
        : '';
      document.getElementById('import-result').innerHTML =
        '<div class="import-result">' + profileRow +
        '<div class="import-stat"><span class="import-stat-label">✅ ' + t('imported') + '</span><span class="import-stat-val">' + result.imported + '</span></div>' +
        '<div class="import-stat"><span class="import-stat-label">⏭ ' + t('skipped') + '</span><span class="import-stat-val">' + result.skipped + '</span></div>' +
        '<div style="margin-top:14px"><button class="btn btn-ghost btn-sm" onclick="navigate(\'/games\')">' + icon.games + ' Ver Biblioteca</button></div>' +
        '</div>';
    } catch (err) {
      var errTitle = (err && err.error) || 'Erro ao importar';
      var errMsg   = (err && err.message) || '';
      var hint = '';
      if (errTitle.indexOf('Sem conexão') !== -1 || errTitle.indexOf('conexão') !== -1) {
        hint = '<div style="margin-top:10px;padding:10px;border-radius:8px;background:rgba(250,204,21,0.08);border:1px solid rgba(250,204,21,0.25);color:var(--gold);font-size:12px;font-weight:400">' +
          '<b>💡 Como resolver:</b><br>1. Abra o <code>index.html</code> e altere <code>window.API_BASE</code> para a URL do seu servidor.<br>' +
          '2. Se usar o Replit, copie a URL pública do projeto (ex: <code>https://SEU-PROJETO.replit.app/api</code>).<br>' +
          '3. Se rodar local, inicie o backend Express com <code>STEAM_API_KEY</code> configurado.</div>';
      } else if (errTitle.indexOf('STEAM_API_KEY') !== -1) {
        hint = '<div style="margin-top:10px;padding:10px;border-radius:8px;background:rgba(250,204,21,0.08);border:1px solid rgba(250,204,21,0.25);color:var(--gold);font-size:12px;font-weight:400">' +
          '<b>💡 Como resolver:</b> Configure a variável de ambiente <code>STEAM_API_KEY</code> antes de iniciar o servidor backend.</div>';
      }
      document.getElementById('import-result').innerHTML =
        '<div style="margin-top:14px;padding:14px;border-radius:10px;border:1px solid rgba(239,68,68,0.3);background:rgba(239,68,68,0.06)">' +
        '<div style="color:var(--red);font-weight:900;font-size:14px;margin-bottom:4px">❌ ' + esc(errTitle) + '</div>' +
        (errMsg ? '<div style="color:var(--text-sub);font-size:12px;margin-top:4px">' + esc(errMsg) + '</div>' : '') +
        hint + '</div>';
    }
    btn.disabled = false;
    btn.innerHTML = icon.steam + ' ' + t('import');
  });
}

// ============================================================
// FRIENDS
// ============================================================
async function renderFriends() {
  renderContent(
    '<div style="margin-bottom:24px"><h1 class="section-title gradient-text" style="display:flex;align-items:center;gap:10px">' + icon.friends + ' ' + t('friendsList') + '</h1><p class="section-sub">' + t('friendsDesc') + '</p></div>' +
    '<div id="friends-body"><div class="grid-3" style="gap:12px">' + '<div class="skeleton" style="height:66px;border-radius:12px"></div>'.repeat(6) + '</div></div>'
  );

  try {
    if (!ownerProfile) {
      document.getElementById('friends-body').innerHTML = '<div class="empty-state">' +
        '<div class="empty-state-title">' + t('noFriends') + '</div>' +
        '<div style="margin-top:12px"><button class="btn btn-ghost btn-sm" onclick="navigate(\'/steam\')">Importar Steam</button></div></div>';
      return;
    }
    var friends = await apiFetch('/profiles/' + ownerProfile.id + '/friends');
    var body = '<div style="margin-bottom:20px">' +
      '<div style="padding:16px;border-radius:12px;border:1px solid var(--border-strong);background:linear-gradient(135deg,rgba(124,58,237,0.1),rgba(168,85,247,0.05));display:flex;align-items:center;gap:12px">' +
        (ownerProfile.avatarUrl
          ? '<img src="' + esc(ownerProfile.avatarUrl) + '" class="friend-avatar" style="width:48px;height:48px" onerror="this.style.display=\'none\'">'
          : '<div class="friend-avatar-ph" style="width:48px;height:48px;font-size:18px">' + (ownerProfile.name[0] || '?').toUpperCase() + '</div>') +
        '<div><div style="font-weight:900;font-size:16px">' + esc(ownerProfile.name) + '</div><div style="font-size:11px;font-weight:700;color:var(--accent);text-transform:uppercase;letter-spacing:0.08em">Seu perfil Steam</div></div>' +
      '</div></div>';

    if (!friends || !friends.length) {
      body += '<div class="empty-state"><div class="empty-state-desc">' + t('noFriends') + '</div></div>';
    } else {
      body += '<div style="font-size:11px;font-weight:700;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:12px">' + friends.length + ' ' + t('friendsImported') + '</div>';
      body += '<div class="grid-3" style="gap:10px">' + friends.map(function(f) { return friendCard(f); }).join('') + '</div>';
    }
    document.getElementById('friends-body').innerHTML = body;
    document.querySelectorAll('.friend-card[data-sid]').forEach(function(el) {
      el.addEventListener('click', function() { navigate('/friends/' + el.dataset.sid); });
    });
  } catch (e) {
    document.getElementById('friends-body').innerHTML = '<div class="empty-state"><div class="empty-state-title" style="color:var(--red)">' + t('errorLoading') + '</div></div>';
  }
}

function friendCard(f) {
  var initials = ((f.friendName || '?')[0] || '?').toUpperCase();
  var avatar = f.friendAvatarUrl
    ? '<img src="' + esc(f.friendAvatarUrl) + '" class="friend-avatar" onerror="this.style.display=\'none\';this.nextElementSibling.style.display=\'flex\'" alt=""><div class="friend-avatar-ph" style="display:none">' + initials + '</div>'
    : '<div class="friend-avatar-ph">' + initials + '</div>';
  return '<div class="friend-card" data-sid="' + esc(f.friendSteamId64) + '">' + avatar +
    '<div style="flex:1;min-width:0"><div class="friend-name truncate">' + esc(f.friendName || 'Steam User') + '</div>' +
    '<div class="friend-id truncate">' + esc(f.friendSteamId64) + '</div></div>' +
    '<span class="friend-arrow">' + icon.arrow + '</span></div>';
}

// ============================================================
// FRIEND PROFILE
// ============================================================
async function renderFriendProfile(steamId64) {
  renderContent(
    '<button class="back-btn" onclick="navigate(\'/friends\')">' + icon.arrowL + ' ' + t('backFriends') + '</button>' +
    '<div id="fp-body">' +
      '<div class="skeleton" style="height:120px;border-radius:12px;margin-bottom:16px"></div>' +
      '<div class="skeleton" style="height:96px;width:96px;border-radius:12px;margin-bottom:16px"></div>' +
      '<div class="grid-3" style="gap:12px">' + '<div class="skeleton" style="height:70px;border-radius:12px"></div>'.repeat(3) + '</div>' +
    '</div>'
  );

  try {
    var p = await apiFetch('/profiles/steam/' + steamId64);
    var sc = statusColor(p.status);
    var banner = p.mostPlayed && p.mostPlayed[0] && p.mostPlayed[0].imageUrl ? p.mostPlayed[0].imageUrl : null;
    var maxH = (p.mostPlayed && p.mostPlayed[0] && p.mostPlayed[0].hoursPlayed) || 1;

    var html =
      '<div class="fp-hero">' +
        (banner
          ? '<div class="fp-banner"><img src="' + esc(banner) + '" onerror="this.style.display=\'none\'"><div class="fp-banner-grad"></div></div>'
          : '<div class="fp-banner-placeholder"></div>') +
        '<div class="fp-body">' +
          '<div class="fp-avatar-row">' +
            (p.avatarUrl
              ? '<img src="' + esc(p.avatarUrl) + '" class="fp-avatar" onerror="this.className=\'fp-avatar-ph\';this.insertAdjacentText(\'afterbegin\',\'' + (p.name[0]||'?').toUpperCase() + '\')">'
              : '<div class="fp-avatar-ph">' + (p.name[0]||'?').toUpperCase() + '</div>') +
            '<div class="fp-info">' +
              '<div class="fp-name">' + esc(p.name) + '</div>' +
              '<div class="fp-status" style="color:' + sc + '">' + icon.wifi + ' ' + esc(p.status) + '</div>' +
              '<div class="fp-steamid">' + esc(p.steamId64) + '</div>' +
              (p.profileUrl ? '<a href="' + esc(p.profileUrl) + '" target="_blank" rel="noopener noreferrer" class="fp-link">' + icon.ext + ' ' + t('viewOnSteam') + '</a>' : '') +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';

    if (p.isPrivate) {
      html += '<div class="private-notice">' + icon.lock + ' <div><div>' + t('privateLib') + '</div><div style="font-weight:400;font-size:12px;margin-top:2px">' + t('privateLibDesc') + '</div></div></div>';
    } else {
      html += '<div class="grid-3" style="gap:12px;margin-bottom:20px">' +
        fpStat(icon.games, p.gameCount.toLocaleString(), 'Jogos', 'var(--primary)') +
        fpStat(icon.clock, p.totalHours.toLocaleString() + 'h', 'Horas', 'var(--accent)') +
        fpStat(icon.wifi, p.status, 'Status', sc) +
      '</div>';
    }

    if (p.mostPlayed && p.mostPlayed.length) {
      html += '<div><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">' +
        '<div style="font-size:11px;font-weight:900;text-transform:uppercase;letter-spacing:0.12em;color:var(--accent)">' + t('mostPlayed') + '</div>' +
        '<div style="font-size:10px;color:var(--muted);font-weight:700;text-transform:uppercase;letter-spacing:0.06em">' + t('byHours') + '</div></div>' +
        '<div class="fp-game-grid">' +
        p.mostPlayed.map(function(g, i) {
          var rankBg = i===0?'rgba(250,204,21,0.9)':i===1?'rgba(161,161,170,0.9)':i===2?'rgba(180,83,9,0.9)':'rgba(124,58,237,0.7)';
          var barW = Math.round((g.hoursPlayed / maxH) * 100);
          return '<div class="fp-game-card">' +
            (g.imageUrl ? '<img src="' + esc(g.imageUrl) + '" class="fp-game-cover" onerror="this.style.display=\'none\'">' : '<div class="fp-game-cover-ph">' + icon.gamepad + '</div>') +
            '<div class="fp-rank-badge" style="background:' + rankBg + '">' + (i+1) + '</div>' +
            '<div class="fp-game-info"><div class="fp-game-name">' + esc(g.name) + '</div>' +
            '<div class="fp-game-hours">' + icon.clock + ' ' + g.hoursPlayed + 'h</div>' +
            '<div class="progress-track" style="margin-top:6px"><div class="progress-fill" style="width:' + barW + '%"></div></div>' +
            '</div></div>';
        }).join('') + '</div></div>';
    }

    document.getElementById('fp-body').innerHTML = html;
  } catch (err) {
    document.getElementById('fp-body').innerHTML = '<div class="empty-state">' +
      '<div class="empty-state-title" style="color:var(--red)">' + esc((err && (err.error || err.message)) || t('errorLoading')) + '</div>' +
      '<div class="empty-state-desc" style="margin-top:8px">O perfil pode estar privado ou o Steam ID pode ser inválido.</div></div>';
  }
}

function fpStat(ico, val, label, color) {
  return '<div style="background:var(--card);border:1px solid var(--border);border-radius:12px;padding:16px;text-align:center">' +
    '<div style="color:' + color + ';margin-bottom:6px">' + ico + '</div>' +
    '<div style="font-size:20px;font-weight:900;color:' + color + ';font-variant-numeric:tabular-nums">' + esc(String(val)) + '</div>' +
    '<div style="font-size:10px;color:var(--muted);text-transform:uppercase;letter-spacing:0.08em;margin-top:3px;font-weight:700">' + label + '</div>' +
    '</div>';
}

// ============================================================
// INIT
// ============================================================
document.getElementById('btn-pt').classList.toggle('active', lang === 'pt-BR');
document.getElementById('btn-en').classList.toggle('active', lang === 'en');

Promise.allSettled([loadOwnerProfile(), checkHealth()]).then(function() {
  setInterval(checkHealth, 30000);
  router();
});
