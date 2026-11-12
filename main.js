const galeria = document.getElementById("galeria");

fetch("jogos.json")
    .then((resposta) => resposta.json())
    .then((jogos) => {
        galeria.innerHTML = jogos
            .map(
                (jogo) => `
        <article class="card">
          <img src="${jogo.capa}" alt="${jogo.nome}">
          <h2>${jogo.nome}</h2>
          <p>${jogo.plataforma} · ${jogo.ano} · Nota ${jogo.nota}/10</p>
        </article>`
            )
            .join("");
    })
    .catch(() => {
        galeria.textContent = "Não consegui carregar os jogos. Confira o jogos.json.";
    });