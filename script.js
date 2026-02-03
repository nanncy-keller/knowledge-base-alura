let cardContainer = document.querySelector(".card-container");
let campoBusca = document.querySelector("input");
let botaoBusca = document.querySelector("#botao-busca");
let dados = []; 

// Carrega os dados assim que o site abre
async function carregarDadosIniciais() {
    try {
        let resposta = await fetch("data.json");
        dados = await resposta.json();
        
        // Renderiza tudo na primeira carga!
        renderizarCards(dados);
    } catch (erro) {
        console.error("Houve um errinho ao carregar os dados! 🎀", erro);
    }
}

// Desenha os cards na tela
function renderizarCards(listaDeDados) {
    cardContainer.innerHTML = ""; 

    for (let dado of listaDeDados) {
        let article = document.createElement("article");
        article.classList.add("card");
        article.innerHTML = `
            <h2>${dado.nome}</h2>
            <p><strong>Ano de lançamento:</strong> ${dado.ano}</p>
            <p>${dado.descricao}</p>
            <p><a href="${dado.link}" target="_blank">Saiba mais</a></p>
        `;
        cardContainer.appendChild(article);
    }
}

// Busca focada apenas no NOME da linguagem
botaoBusca.addEventListener("click", () => {
    let termoBusca = campoBusca.value.toLowerCase().trim();
    
    if (termoBusca === "") {
        renderizarCards(dados);
        return;
    }

    // Filtramos apenas pelo nome 
    // Ignorando as palavras dentro da descrição!
    let dadosFiltrados = dados.filter(dado => 
        dado.nome.toLowerCase().includes(termoBusca)
    );
    
    renderizarCards(dadosFiltrados);
});

carregarDadosIniciais();