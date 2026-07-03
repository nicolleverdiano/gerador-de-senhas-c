// Mapeamento dos elementos da interface
const passwordOutput = document.getElementById('password-output');
const btnGenerate = document.getElementById('btn-generate');
const strengthIndicator = document.getElementById('strength-indicator');
const statusText = document.getElementById('status-text');

// Banco de dados de caracteres (Pool)
const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

// 1. Função de geração matemática de caracteres aleatórios
function gerarSenhaAleatoria(comprimento = 15) {
    let senha = "";
    for (let i = 0; i < comprimento; i++) {
        const indiceAleatorio = Math.floor(Math.random() * charset.length);
        senha += charset.charAt(indiceAleatorio);
    }
    return senha;
}

// 2. Função de análise crítica de segurança
function analisarComplexidade(senha) {
    let complexidade = 0;

    // Critério 1: Comprimento da Senha (Fator L na Entropia)
    if (senha.length >= 8) complexidade += 1;
    if (senha.length >= 14) complexidade += 1;

    // Critério 2: Diversidade do Conjunto (Fator R na Entropia)
    if (/[A-Z]/.test(senha)) complexidade += 1; // Contém Letras Maiúsculas
    if (/[0-9]/.test(senha)) complexidade += 1; // Contém Números
    if (/[^A-Za-z0-9]/.test(senha)) complexidade += 1; // Contém Símbolos Especiais

    atualizarInterface(complexidade);
}

// 3. Modificação visual em tempo real (Mudança do DOM)
function atualizarInterface(pontos) {
    let larguraBarra = "0%";
    let corBarra = "#ef4444";
    let texto = "Muito Fraca";

    if (pontos === 2 || pontos === 3) {
        larguraBarra = "50%";
        corBarra = "#f59e0b";
        texto = "Moderada";
    } else if (pontos >= 4) {
        larguraBarra = "100%";
        corBarra = "#10b981";
        texto = "Altamente Segura!";
    }

    strengthIndicator.style.width = larguraBarra;
    strengthIndicator.style.backgroundColor = corBarra;
    statusText.innerText = texto;
    statusText.style.color = corBarra;
}

// Evento disparado pela ação do usuário
btnGenerate.addEventListener('click', () => {
    const novaSenha = gerarSenhaAleatoria(15); // Gerando uma senha de 15 dígitos
    passwordOutput.value = novaSenha;
    analisarComplexidade(novaSenha);
});