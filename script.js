const STEAM_API_KEY = '265D0EDCC24B50A5F9108B628C3C7EE3';
const PROXY_URL = 'https://api.allorigins.win/get?url=';

// Trocar de Abas
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.add('hidden'));
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.getElementById(tabId).classList.remove('hidden');
    
    // Se for biblioteca, o botão + aparece
    const fab = document.querySelector('.fab-add');
    if (tabId === 'biblioteca') fab.classList.remove('hidden');
    else fab.classList.add('hidden');

    if(event) event.currentTarget.classList.add('active');
}

// Funções do Modal Manual
function openModal() { document.getElementById('modal-manual').classList.remove('hidden'); }
function closeModal() { document.getElementById('modal-manual').classList.add('hidden'); }

// Importar da Steam REAL
async function importSteamData() {
    const steamId = document.getElementById('steam-id').value.trim();
    if(!steamId) return alert("Por favor, insira um SteamID64 válido!");

    const btn = document.querySelector('#importar button');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> CONECTANDO...';

    try {
        const steamUrl = `https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${STEAM_API_KEY}&steamid=${steamId}&format=json&include_appinfo=true`;
        const response = await fetch(`${PROXY_URL}${encodeURIComponent(steamUrl)}`);
        const wrapper = await response.json();
        const data = JSON.parse(wrapper.contents);

        if (!data.response || !data.response.games) {
            throw new Error("Perfil privado ou ID incorreto.");
        }

        renderData(data.response.games);
        alert("Sincronizado com sucesso!");
        showTab('central');

    } catch (error) {
        console.error(error);
        alert("Erro ao importar! Verifique se seu perfil Steam está PÚBLICO.");
    } finally {
        btn.innerHTML = "SINCRONIZAR AGORA";
    }
}

// Renderizar os dados na Central e Biblioteca
function renderData(games) {
    let totalMinutos = 0;
    const container = document.getElementById('game-list');
    container.innerHTML = '';

    games.sort((a, b) => b.playtime_forever - a.playtime_forever);

    games.forEach(g => {
        totalMinutos += g.playtime_forever;
        const horas = Math.round(g.playtime_forever / 60);
        const img = `https://cdn.akamai.steamstatic.com/steam/apps/${g.appid}/library_600x900.jpg`;
        
        container.innerHTML += `
            <div class="card" style="padding:0; overflow:hidden; border-radius:15px;">
                <img src="${img}" onerror="this.src='https://via.placeholder.com/600x900?text=${g.name}'" style="width:100%; height:240px; object-fit:cover;">
                <div style="padding:10px; font-size:0.8rem;">
                    <strong>${g.name}</strong><br>
                    <span style="color:var(--neon-purple)">${horas}h jogadas</span>
                </div>
            </div>`;
    });

    const totalHoras = Math.round(totalMinutos / 60);
    
    // Atualiza Números da Central
    document.getElementById('val-jogos').innerText = games.length;
    document.getElementById('val-horas').innerText = totalHoras + "h";
    document.getElementById('val-total').innerText = "R$ " + (games.length * 21.44).toLocaleString('pt-BR', {minimumFractionDigits: 2});
    document.getElementById('score-num').innerText = Math.min(100, Math.round((games.length * 0.5) + (totalHoras / 30)));
}

// Adicionar Jogo Manualmente (Exemplo simples)
function addGameManual() {
    const nome = document.getElementById('manual-name').value;
    const horas = document.getElementById('manual-hours').value;
    if(!nome) return alert("Digite o nome do jogo!");
    
    alert(`Jogo "${nome}" adicionado com sucesso!`);
    closeModal();
    showTab('biblioteca');
}