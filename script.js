// ==================================================================
// DADOS DAS NOTÍCIAS
// (Aqui você adiciona/edita suas notícias)
// ==================================================================
const noticias = [
    {
        id: 1,
        titulo: "Em breve...",
        data: "xx de xxxxxx de 2025",
        previa: "Ainda em desenvolvimento",
        conteudoCompleto: '...'
    },
    // Adicione mais notícias aqui, copiando o bloco {} acima
];


// ==================================================================
// LÓGICA DO SITE (MENU E MODAL)
// ==================================================================
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO MENU LATERAL ---
    const menuBtn = document.getElementById('menu-btn');
    const navMenu = document.getElementById('main-nav');
    const submenuToggles = document.querySelectorAll('.submenu-toggle');

    if (menuBtn && navMenu) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('open');
            navMenu.classList.toggle('open');
            document.body.classList.toggle('no-scroll');
        });
    }

    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            const submenu = toggle.nextElementSibling;
            if (submenu) {
                submenu.classList.toggle('open');
            }
        });
    });

    // --- LÓGICA DAS NOTÍCIAS (ATUALIZADA) ---
    const newsContainer = document.getElementById('news-container');
    const modal = document.getElementById('news-modal');
    const newsWrapper = document.getElementById('news-wrapper'); // NOVO
    const newsOverlay = document.getElementById('news-overlay'); // NOVO
    const newsLoadMoreBtn = document.getElementById('news-load-more-btn'); // NOVO
    const LIMITE_NOTICIAS = 3; // O seu limite!
    
    // Verifica se estamos na página que tem TODOS os elementos de notícias
    if (newsContainer && modal && newsWrapper && newsLoadMoreBtn) {
        
        // 1. Renderiza os cards de notícia na página
        noticias.forEach(noticia => {
            const card = document.createElement('div');
            card.className = 'news-card';
            card.setAttribute('data-id', noticia.id); 
            
            card.innerHTML = `
                <h3>${noticia.titulo}</h3>
                <span class="news-card-date">${noticia.data}</span>
                <p class="news-card-preview">${noticia.previa} [...]</p>
            `;
            
            // Adiciona o "ouvinte" de clique em cada card
            card.addEventListener('click', () => {
                abrirModal(noticia.id);
            });
            
            newsContainer.appendChild(card);
        });
    
        // 2. Função para abrir o modal com o conteúdo certo
        function abrirModal(id) {
            const noticia = noticias.find(n => n.id === id);
            
            document.getElementById('modal-title').textContent = noticia.titulo;
            document.getElementById('modal-date').textContent = noticia.data;
            document.getElementById('modal-full-content').innerHTML = noticia.conteudoCompleto;
            
            modal.classList.add('open');
            document.body.classList.add('modal-open');
        }
    
        // 3. Lógica para fechar o modal
        const closeBtn = document.getElementById('modal-close-btn');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('open');
            document.body.classList.remove('modal-open');
        });
    
        // Fecha o modal se clicar fora da caixa de conteúdo
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('open');
                document.body.classList.remove('modal-open');
            }
        });
    
        // 4. LÓGICA "VER MAIS" (NOVA)
        // Verifica se a quantidade de notícias é maior que o limite
        if (noticias.length > LIMITE_NOTICIAS) {
            // 1. "Recolhe" o container (o CSS cuida da altura e do overlay)
            newsWrapper.classList.add('collapsed');
    
            // 2. Adiciona a função de clique ao botão "Ver Mais"
            newsLoadMoreBtn.addEventListener('click', () => {
                newsWrapper.classList.remove('collapsed'); // Expande o wrapper
                newsOverlay.style.display = 'none'; // Esconde o overlay e o botão
            });
    
        } else {
            // Se não tiver notícias suficientes, esconde permanentemente o overlay
            newsOverlay.style.display = 'none';
        }
    }
});