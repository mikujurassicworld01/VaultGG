function showTab(tabId) {
    // Esconder tudo
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.add('hidden');
    });
    // Mostrar a selecionada
    document.getElementById(tabId).classList.remove('hidden');
    
    // Atualizar botões
    document.querySelectorAll('.nav-link').forEach(btn => {
        btn.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
}

function addManualGame() {
    const name = document.getElementById('m-name').value;
    const platform = document.getElementById('m-platform').value;
    const price = document.getElementById('m-price').value;
    
    if(!name) return alert("Digite o nome do jogo");
    
    // Lógica de valor: Se pirata, valor é 0 no cálculo
    const valorReal = platform === 'pirata' ? 0 : parseFloat(price);
    
    alert(`Jogo ${name} adicionado! Valor para o score: R$ ${valorReal}`);
}
