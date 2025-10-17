// ==================================================================
// LISTA 1: Produções Acadêmicas da Liga
// Para adicionar novos posts, copie um bloco {} e preencha os dados.
// ==================================================================
const producoesDaLiga = [
    {
        titulo: 'Em desenvolvimento...',
        descricao: 'Nossa primeira pesquisa está tomando forma! Em breve, compartilharemos com vocês os caminhos, as ideias e os objetivos que estão guiando esse projeto.',
        autores: ['Diretoria de Pesquisa LAPC'], // Use lista mesmo para um autor
        ano: '2025',
        arquivo: 'arquivos/-.pdf'
    },
];

// ==================================================================
// LISTA 2: Artigos e Matérias para estudos
// ==================================================================
const artigosParaEstudo = [
    {
        titulo: 'SAÚDE MENTAL NA UNIVERSIDADE: AÇÕES E INTERVENÇÕES VOLTADAS PARA OS ESTUDANTES',
        descricao: 'Pesquisas realizadas pelo Fonaprace apontam índices elevados de adoecimento da comunidade estudantil, resultando no debate e no investimento em programas e ações voltadas para a saúde mental do estudante universitário. Somado a isso, em 2020, o Brasil se deparou com a conjuntura imposta pela pandemia da Covid-19, ocasionando impacto negativo na saúde mental.',
        autores: [
            'LUCÉLIA MARIA',
            'HELIANE DE ALMEIDA',
            'KYSSIA MARCELLE',
            'SUSANE VASCONCELOS'
        ],
        ano: '2023',
        arquivo: 'arquivos/SAÚDE MENTAL NA UNIVERSIDADE - 2023 UFAL.pdf'
    },








,
];

/**
 * Função final que desenha os posts na tela, com todas as funcionalidades.
 */
function renderizarPosts(lista, elementoId, tituloSecao) {
    const container = document.getElementById(elementoId);
    
    const LIMITE_INICIAL = 3;
    const INCREMENTO_POSTS = 3;
    const LIMITE_LINHAS_DESC = 4;

    container.innerHTML = ''; // Limpa a seção para evitar duplicatas

    // Cria e adiciona o título da seção
    const tituloH2 = document.createElement('h2');
    tituloH2.textContent = tituloSecao;
    container.appendChild(tituloH2);

    if (lista.length === 0) {
        const noPostsMessage = document.createElement('p');
        noPostsMessage.textContent = 'Nenhuma publicação nesta seção ainda.';
        container.appendChild(noPostsMessage);
        return;
    }

    lista.forEach((item, index) => {
        const postDiv = document.createElement('div');
        postDiv.className = 'post';

        if (index >= LIMITE_INICIAL) {
            postDiv.classList.add('hidden');
        }

        const descId = `desc-${elementoId}-${index}`;
        const descBtnId = `desc-btn-${elementoId}-${index}`;
        let descricaoHtml = '';
        if (item.descricao) {
            descricaoHtml = `
                <div class="description-wrapper">
                    <div class="post-description" id="${descId}">${item.descricao}</div>
                </div>
                <button id="${descBtnId}" class="read-more-btn" style="display: none;">Ler mais</button>
            `;
        }

        const autoresListId = `autores-${elementoId}-${index}`;
        const autoresBtnId = `autores-btn-${elementoId}-${index}`;
        let autoresHtml = '';
        if (Array.isArray(item.autores) && item.autores.length > 1) {
            const autoresItems = item.autores.map(autor => `<li><strong>Autor (a):</strong> ${autor}</li>`).join('');
            autoresHtml = `
                <ul class="autores-list collapsed" id="${autoresListId}">${autoresItems}</ul>
                <button id="${autoresBtnId}" class="read-more-btn">Ver equipe</button>
            `;
        } else {
            const autorUnico = (item.autores && item.autores[0]) || 'Não informado';
            autoresHtml = `<p class="post-meta"><strong>Autor (a):</strong> ${autorUnico}</p>`;
        }
        
        postDiv.innerHTML = `
            <a href="${item.arquivo}" class="post-title" download>${item.titulo}</a>
            ${descricaoHtml}
            ${autoresHtml}
            <p class="post-meta"><strong>Publicação:</strong> ${item.ano}</p>
        `;
        
        container.appendChild(postDiv);

        if (item.descricao) {
            const descElemento = document.getElementById(descId);
            const descBotao = document.getElementById(descBtnId);
            if (descElemento.scrollHeight > (21 * LIMITE_LINHAS_DESC)) {
                descBotao.style.display = 'block';
                descElemento.classList.add('collapsed');
                descBotao.addEventListener('click', () => {
                    descElemento.classList.toggle('collapsed');
                    descBotao.textContent = descElemento.classList.contains('collapsed') ? 'Ler mais' : 'Ler menos';
                });
            }
        }

        if (Array.isArray(item.autores) && item.autores.length > 1) {
            const autoresElemento = document.getElementById(autoresListId);
            const autoresBotao = document.getElementById(autoresBtnId);
            autoresBotao.addEventListener('click', () => {
                autoresElemento.classList.toggle('collapsed');
                autoresBotao.textContent = autoresElemento.classList.contains('collapsed') ? 'Ver equipe' : 'Ocultar equipe';
            });
        }
    });

    if (lista.length > LIMITE_INICIAL) {
        const botaoVerMais = document.createElement('button');
        botaoVerMais.textContent = 'Ver mais publicações';
        botaoVerMais.className = 'load-more-btn';

        botaoVerMais.addEventListener('click', () => {
            const postsEscondidos = container.querySelectorAll('.post.hidden');
            for (let i = 0; i < INCREMENTO_POSTS; i++) {
                if (postsEscondidos[i]) {
                    postsEscondidos[i].classList.remove('hidden');
                }
            }
            if (container.querySelectorAll('.post.hidden').length === 0) {
                botaoVerMais.style.display = 'none';
            }
        });
        container.appendChild(botaoVerMais);
    }
}

// "Chama" a função para renderizar as duas listas quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    renderizarPosts(producoesDaLiga, 'producoes-academicas', 'PRODUÇÕES DA LAPC');
    renderizarPosts(artigosParaEstudo, 'artigos-estudo', 'MATERIAIS PARA ESTUDOS');
});