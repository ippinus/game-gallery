const galeria = document.getElementById("galeria");
const busca = document.getElementById("busca");
const filtroPlataforma = document.getElementById("filtro-plataforma");
const filtroAno = document.getElementById("filtro-ano");

let todosJogos = [];

function renderizar(lista) {
    if (lista.length === 0) {
        galeria.textContent = "Nenhum jogo encontrado.";
        return;
    }

    galeria.innerHTML = lista
        .map(
            (jogo) => `
        <article class="card">
          <img src="${jogo.capa}" alt="${jogo.nome}">
          <h2>${jogo.nome}</h2>
          <p>${jogo.plataforma} · ${jogo.ano} · Nota ${jogo.nota}/10</p>
        </article>`
        )
        .join("");
}

function filtrar() {
    const texto = busca.value.toLowerCase();
    const plataforma = filtroPlataforma.value;
    const ano = filtroAno.value;

    const filtrados = todosJogos.filter((jogo) => {
        const bateNome = jogo.nome.toLowerCase().includes(texto);
        const batePlataforma = plataforma === "" || jogo.plataforma === plataforma;
        const bateAno = ano === "" || String(jogo.ano) === ano;
        return bateNome && batePlataforma && bateAno;
    });

    renderizar(filtrados);
}

function preencherSelect(select, valores) {
    valores.forEach((v) => {
        select.innerHTML += `<option value="${v}">${v}</option>`;
    });
}

fetch("jogos.json")
    .then((resposta) => resposta.json())
    .then((jogos) => {
        todosJogos = jogos;

        const plataformas = [...new Set(jogos.map((j) => j.plataforma))];
        const anos = [...new Set(jogos.map((j) => j.ano))].sort((a, b) => b - a);

        preencherSelect(filtroPlataforma, plataformas);
        preencherSelect(filtroAno, anos);
        renderizar(todosJogos);
    })
    .catch((erro) => {
        console.error(erro);
        galeria.textContent = "Não consegui carregar os jogos. Confira o jogos.json.";
    });

busca.addEventListener("input", filtrar);
filtroPlataforma.addEventListener("change", filtrar);
filtroAno.addEventListener("change", filtrar);