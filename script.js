    function togglePassword() {
      const passwordInput = document.getElementById('password');
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
    }


const compo = JSON.parse(localStorage.getItem("compo-officielle"));
const joueurConnecté = "King";

const card = document.getElementById("matchCard");

if (!compo) {
  card.innerHTML = "<p> Aucune compo disponible. </p>";
} else {
  const joueurInfo = compo.joueurs.find(j => j.nom === joueurConnecté);

  if (joueurInfo) {
    card.innerHTML = `
      <p><strong>Date : </strong> ${compo.date}</p>
      <p><strong>Adversaire : </strong> ${compo.adversaire}</p>
      <p><strong>Ton agent : </strong> ${compo.agent}</p>
      <p style="color #0f0">✅ Tu es titulaire pour ce match !</p>
    `;
  } else {
    card.innerHTML = `
      <p><strong>Date : </strong> ${compo.date}</p>
      <p><strong>Adversaire : </strong> ${compo.adversaire}</p>
      <p style="color #f33">❌ Tu n'es pas titulaire pour ce match !</p>
    `;
  }
}