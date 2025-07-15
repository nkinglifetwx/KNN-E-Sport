// Gestion du mot de passe
function togglePassword() {
  const passwordInput = document.getElementById('password');
  if (passwordInput) {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
  }
}

// Compo match
const compo = JSON.parse(localStorage.getItem("compo-officielle"));
const joueurConnecté = "King";
const card = document.getElementById("matchCard");

if (card) {
  if (!compo) {
    card.innerHTML = `<p>Aucune compo disponible.</p>`;
  } else {
    const joueurInfo = compo.joueurs.find(j => j.nom === joueurConnecté);

    if (joueurInfo) {
      card.innerHTML = `
          <p><strong>Date :</strong> ${compo.date}</p>
          <p><strong>Adversaire :</strong> ${compo.adversaire}</p>
          <p><strong>Ton agent :</strong> ${compo.agent}</p>
          <p style="color: #0f0">✅ Tu es titulaire pour ce match !</p>
        `;
    } else {
      card.innerHTML = `
          <p><strong>Date :</strong> ${compo.date}</p>
          <p><strong>Adversaire :</strong> ${compo.adversaire}</p>
          <p style="color: #f33">❌ Tu n'es pas titulaire pour ce match !</p>
        `;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const articlesContainer = document.querySelector('.articles-container');
  const modal = document.getElementById('article-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalContent = document.getElementById('modal-content');
  const closeModalBtn = document.getElementById('close-modal');

  if (!articlesContainer) return;

  fetch('/data/articles.json')
    .then(res => res.json())
    .then(articles => {
      // Trier les articles par date décroissante (les plus récents en premier)
      articles.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Déterminer si on est sur index.html ou articles.html via URL
      const isIndex = window.location.pathname.includes('index.html') || window.location.pathname === '/' || window.location.pathname === '/index.html';

      // Nombre d'articles à afficher (3 pour index, tous pour articles)
      const limit = isIndex ? 3 : null;
      const displayedArticles = limit ? articles.slice(0, limit) : articles;

      // Vider le container
      articlesContainer.innerHTML = '';

      // Générer les cartes d'article
      displayedArticles.forEach(article => {
        const card = document.createElement('div');
        card.classList.add('article-card');

        card.innerHTML = `
          <h3>${article.title}</h3>
          <p class="article-date">${formatDate(article.date)}</p>
          <p>${article.summary}</p>
          <button class="btn read-article" data-id="${article.id}">Lire l'article</button>
        `;

        articlesContainer.appendChild(card);
      });

      // Ajouter les événements click pour ouvrir la modale
      document.querySelectorAll('.read-article').forEach(button => {
        button.addEventListener('click', () => {
          const articleId = parseInt(button.getAttribute('data-id'));
          const article = articles.find(a => a.id === articleId);
          if (article) {
            modalTitle.textContent = `${article.title} — ${formatDate(article.date)}`;
            modalContent.innerHTML = article.content;
            modal.style.display = 'flex';
          }
        });
      });
    })
    .catch(err => {
      articlesContainer.innerHTML = '<p>Impossible de charger les articles.</p>';
      console.error('Erreur chargement articles JSON:', err);
    });

  // Fermer la modale
  closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Fermer si clic en dehors du contenu modal
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});

function formatDate(dateString) {
  if (!dateString) return '';
  const options = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', options);
}
