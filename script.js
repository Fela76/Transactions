const h1 = document.querySelector("h1");
h1.addEventListener("mouseover", () => {
    h1.style.color = "red";
    h1.style.fontSize = "2rem";
});
h1.addEventListener("mouseout", () => {
    h1.style.color = "";
    h1.style.fontSize = "";
});





function openModal() {
    document.getElementById('modal-transaction').classList.remove('hidden');
}
function closeModal() {
    document.getElementById('modal-transaction').classList.add('hidden');
}
// Gestion des onglets
document.querySelectorAll('.tab-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        showTab(index + 1);
    });
});





// Gestion de l'affichage des tableaux

function showTab(tabIndex) {
    // Onglet actif
    document.querySelectorAll('.tab-btn').forEach((btn, idx) => {
        if (idx === tabIndex - 1) {
            btn.classList.add('text-pink-500', 'border-b-2', 'border-pink-500');
            btn.classList.remove('text-gray-500');
        } else {
            btn.classList.remove('text-pink-500', 'border-b-2', 'border-pink-500');
            btn.classList.add('text-gray-500');
        }
    });
    // Affichage des tableaux
    document.getElementById('table-all').classList.add('hidden');
    document.getElementById('table-revenue').classList.add('hidden');
    document.getElementById('table-expenses').classList.add('hidden');
    if (tabIndex === 1) {
        document.getElementById('table-all').classList.remove('hidden');
    } else if (tabIndex === 2) {
        document.getElementById('table-revenue').classList.remove('hidden');
    } else if (tabIndex === 3) {
        document.getElementById('table-expenses').classList.remove('hidden');
    }
}






// Gestion des transactions





































