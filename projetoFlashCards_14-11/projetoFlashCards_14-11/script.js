// array de dados dos flashcards
const flashcards = [
    { termo: "HTML5", definicao: "Linguagem de Marcação de Hipertexto, usada para estruturar o conteúdo de uma página web." },
    { termo: "CSS3", definicao: "Cascading Style Sheets, usado para estilizar e controlar a apresentação visual do conteúdo de uma página web." },
    { termo: "JavaScript", definicao: "Linguagem de programação que permite adicionar interatividade, lógica e comportamento dinâmico às páginas web." },
    { termo: "DOM", definicao: "Document Object Model. Interface de programação para documentos HTML e XML. Representa a página para que os programas possam alterar sua estrutura, estilo e conteúdo." },
    { termo: "Viewport", definicao: "A área visível de uma página web para o usuário. Seu tamanho varia com o dispositivo. Essencial para responsividade." },
    { termo: "Flexbox", definicao: "Módulo CSS que oferece uma forma eficiente de organizar, alinhar e distribuir espaço entre itens em um container." },
    { termo: "Hoisting", definicao: "Comportamento do JavaScript onde as declarações de variáveis (var) e funções são movidas para o topo de seu escopo antes da execução do código." },
    { termo: "Local Storage", definicao: "Mecanismo que permite que programas e dados sejam armazenados no navegador do usuário de forma persistente (sem expirar)." }
];

// começar no primeiro flashcard
let currentIndex = 0; 
let isFlipped = false;

// referências aos elementos do DOM
const cardElement = document.getElementById('flashcard');
const termoTextoElement = document.getElementById('termo-texto');
const definicaoTextoElement = document.getElementById('definicao-texto');
const progressoElement = document.getElementById('progresso');
const btnAnterior = document.getElementById('btn-anterior');
const btnProximo = document.getElementById('btn-proximo');

// função que atualiza o conteúdo do cartão
function updateCardContent() {
    if (currentIndex >= 0 && currentIndex < flashcards.length) {
        termoTextoElement.textContent = flashcards[currentIndex].termo;
        definicaoTextoElement.textContent = flashcards[currentIndex].definicao;
    } else {
         // caso o array esteja vazio ou o índice seja inválido
         termoTextoElement.textContent = "Nenhum flashcard disponível.";
         definicaoTextoElement.textContent = "Verifique o array 'flashcards'.";
    }

    // atualiza a indicação de progresso
    // a contagem é sempre baseada em 1 (índice 0 é 1/8)
    const progressoAtual = currentIndex + 1;
    const total = flashcards.length;
    progressoElement.textContent = `${Math.max(0, progressoAtual)}/${total}`;

    // controla o estado dos botões
    btnAnterior.disabled = currentIndex <= 0;
    btnProximo.disabled = currentIndex >= flashcards.length - 1;

    // garante que o cartão esteja na frente ao mudar de índice
    if (isFlipped) {
        cardElement.classList.remove('flipped');
        isFlipped = false;
    }
}

// função para virar o cartão
function flipCard() {
     if (currentIndex >= 0 && currentIndex < flashcards.length) {
        cardElement.classList.toggle('flipped');
        isFlipped = !isFlipped;
    }
}

// função de navegação para o próximo cartão
function nextCard() {
    if (currentIndex < flashcards.length - 1) {
        currentIndex++;
        updateCardContent();
    }
}

// função de navegação para o cartão anterior
function prevCard() {
    if (currentIndex > 0) {
        currentIndex--;
        updateCardContent();
    }
}

// implementação dos Event Listeners

// flip ao clique no card
cardElement.addEventListener('click', flipCard);

// navegação
btnProximo.addEventListener('click', nextCard);
btnAnterior.addEventListener('click', prevCard);

// inicialização
document.addEventListener('DOMContentLoaded', () => {
    // se houver dados, o currentIndex já está em 0.
    if (flashcards.length > 0) {
         currentIndex = 0;
    } else {
         currentIndex = -1;
    }
    updateCardContent(); // exibe o primeiro cartão e progresso 1/8
});