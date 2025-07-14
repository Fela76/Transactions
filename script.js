// GESTION Ouverture et fermentur du modal

function openModal() {
    document.getElementById('modal-transaction').classList.remove('hidden');
}
function closeModal() {
    document.getElementById('modal-transaction').classList.add('hidden');
}




// GESTION des onglets
document.querySelectorAll('.tab-btn').forEach((btn, index) => {
    btn.addEventListener('click', () => {
        showTab(index + 1);
    });
});





// GESTION de l'affichage des tableaux

function showTab(tabIndex) {
    // Onglet actif
    document.querySelectorAll('.tab-btn').forEach((btn, idx) => {
        if (idx === tabIndex - 1) {
            btn.classList.add('text-blue-500', 'border-b-2', 'border-blue-400');
            btn.classList.remove('text-gray-500');
        } else {
            btn.classList.remove('text-blue-500', 'border-b-2', 'border-pink-500');
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






// GESTION des transactions



// les Montant totals
const totalTransactions = document.querySelector(".totalTransactions");
const totalDepense = document.querySelector(".totalDepense");
const totalRevenus = document.querySelector(".totalRevenus");


//  les tableaux
const tnody1 = document.querySelector(".tnody1");
const tnody2 = document.querySelector(".tnody2");
const tnody3 = document.querySelector(".tnody3");

// les chaps
const messge = document.querySelector(".messge");
const form = document.getElementById("form");
const types = document.getElementById("types")
const description = document.querySelector(".description")
const montant = document.querySelector(".montant")

// les erreurs
const errorTypes = document.querySelector(".errorTypes")
const errorDescription = document.querySelector(".errorDescription")
const errorMontant = document.querySelector(".errorMontant")

// boutton
const boutonAjout = document.getElementById("errorMontant")

// Recuperation des transactions stockees dans le localStorage ou vide
let donnees = JSON.parse(localStorage.getItem('transactions')) || [];
let siErreur = false

// foncton d'affichage des erreurs
function gestionErreur(elm, text) {
    elm.textContent = text;
    siErreur = true;
}

// Vider les champs
function viderChamp(){
    types.value= "";
    description.value = "";
    montant.value = ""
}



// GESTION d'ajout de donnees


// Evenement d'ajout et controle de donnees
form.addEventListener('submit', function (e) {
    e.preventDefault()

    errorTypes.innerHTML = '';
    errorDescription.innerHTML = '';
    errorMontant.innerHTML = '';
    messge.innerHTML='';

    if (!types.value.trim()) {
        gestionErreur(errorTypes, "Le type de transaction est requis");
    }

    if (!description.value.trim()) {
        gestionErreur(errorDescription, "La description de la transaction est requis");
    }

    if (!montant.value.trim() || isNaN(montant.value) || Number(montant.value) <= 0) {
        gestionErreur(errorMontant, "Le montant de la transaction est requis");
    }

    // Si tout vas bien
    if (!siErreur) {

        const transactions = {
            types: types.value.trim(),
            description: description.value.trim(),
            montant: montant.value.trim(),
            datee: new Date().toLocaleDateString()
        }

        // Ajout de la transaction au tableau
        donnees.push(transactions);
        localStorage.setItem('transactions', JSON.stringify(donnees));
        messge.innerHTML="Transaction ajoutée avec succès !";
        viderChamp();

        // closeModal();
        afficherTransactions();
        afficherRevenu();
        afficherDepense();
        afficherTotaux();
    }
});

    //   Fonctions applée au chargement de la pages
        afficherTransactions();
        afficherRevenu();
        afficherDepense();
        afficherTotaux();



// Formatage du montant avec des espaces pour les milliers
function formatMontant(montant) {
    return Number(montant).toLocaleString('fr-FR') + ' GNF';
}




// GESTION d'affichages

// Affichages des transaction
function afficherTransactions() {
    tnody1.innerHTML = '';
    donnees.forEach((data, idx) => {
        const tr = document.createElement("tr");
        tr.classList.add("border-b");
        tr.innerHTML = ` 
           <td class="py-2 px-3">${data.types}</td>
                <td class="py-2 px-3">${data.description}</td>
                <td class="py-2 px-3 font-bold">${formatMontant(data.montant)}</td>
                <td class="py-2 px-3">${data.datee}</td>
                <td class="flex items-center gap-4 py-2 px-3 font-bold">
                <button class="text-pink-500 font-bold hover:underline" onclick="Suppression(${idx})">✖ Delete</button>
                </td>
        `;
        tnody1.appendChild(tr);
    })
}

// Affichage des Revenus
function afficherRevenu() {
    tnody2.innerHTML = '';
    const filterRevenu = donnees.filter(donne => donne.types === "revenue");
    filterRevenu.forEach((data, idx) => {
        const tr = document.createElement("tr");
        tr.classList.add("border-b");
        tr.innerHTML = ` 
           <td class="py-2 px-3">${data.types}</td>
                <td class="py-2 px-3">${data.description}</td>
                <td class="py-2 px-3 font-bold">${formatMontant(data.montant)}</td>
                <td class="py-2 px-3">${data.datee}</td>
                <td class="flex items-center gap-4 py-2 px-3 font-bold">
                <button class="text-pink-500 font-bold hover:underline" onclick="SuppressionRevenu(${idx})">✖ Delete</button>
                </td>
        `;
        tnody2.appendChild(tr);
    })
}

// Affichage des Depense

function afficherDepense() {
    tnody3.innerHTML = '';
    const filterDepense = donnees.filter(donnee => donnee.types === "depense");
    filterDepense.forEach((data, idx) => {
        const tr = document.createElement("tr");
        tr.classList.add("border-b");
        tr.innerHTML = ` 
           <td class="py-2 px-3">${data.types}</td>
                <td class="py-2 px-3">${data.description}</td>
                <td class="py-2 px-3 font-bold">${formatMontant(data.montant)}</td>
                <td class="py-2 px-3">${data.datee}</td>
                <td class="flex items-center gap-4 py-2 px-3 font-bold">
                <button class="text-pink-500 font-bold hover:underline" onclick="SuppressionDepense(${idx})">✖ Delete</button>
                </td>
            `;
        tnody3.appendChild(tr);
    })
}


// GESTION du solde

function afficherTotaux() {
    // Total Transactions
    const transaction = donnees.reduce((acc, curr) => acc + Number(curr.montant), 0);
    totalTransactions.textContent = formatMontant(transaction);

    // Total Revenus
    const revenu = donnees.filter(d => d.types === 'revenue').reduce((acc, curr) => acc + Number(curr.montant), 0);
    totalRevenus.textContent = formatMontant(revenu);

    // Total Dépenses
    const depens = donnees.filter(d => d.types === 'depense').reduce((acc, curr) => acc + Number(curr.montant), 0);
    totalDepense.textContent = formatMontant(depens);
}


// GESTION des la rechercher  

function rechercherTransactions() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    // Détecter l'onglet actif
    const tabAll = document.getElementById('table-all');
    const tabRevenue = document.getElementById('table-revenue');
    const tabExpenses = document.getElementById('table-expenses');

    if (!tabAll.classList.contains('hidden')) {
        // Recherche sur toutes les transactions
        tnody1.innerHTML = '';
        const filteredData = donnees.filter(data =>
            data.description.toLowerCase().includes(searchInput) ||
            data.types.toLowerCase().includes(searchInput) ||
            String(data.montant).toLowerCase().includes(searchInput) ||
            String(data.datee).toLowerCase().includes(searchInput)
        );
        filteredData.forEach((data, idx) => {
            const tr = document.createElement("tr");
            tr.classList.add("border-b");
            tr.innerHTML = ` 
               <td class="py-2 px-3">${data.types}</td>
                <td class="py-2 px-3">${data.description}</td>
                <td class="py-2 px-3 font-bold">${formatMontant(data.montant)}</td>
                <td class="py-2 px-3">${data.datee}</td>
                <td class="flex items-center gap-4 py-2 px-3 font-bold">
                <button class="text-pink-500 font-bold hover:underline" onclick="Suppression(${idx})">✖ Delete</button>
                </td>
            `;
            tnody1.appendChild(tr);
        });
    } else if (!tabRevenue.classList.contains('hidden')) {
        // Recherche sur les revenus
        tnody2.innerHTML = '';
        const filteredData = donnees.filter(data =>
            data.types === 'revenue' && (
                data.description.toLowerCase().includes(searchInput) ||
                String(data.montant).toLowerCase().includes(searchInput) ||
                String(data.datee).toLowerCase().includes(searchInput)
            )
        );
        filteredData.forEach((data, idx) => {
            const tr = document.createElement("tr");
            tr.classList.add("border-b");
            tr.innerHTML = ` 
               <td class="py-2 px-3">${data.types}</td>
                <td class="py-2 px-3">${data.description}</td>
                <td class="py-2 px-3 font-bold">${formatMontant(data.montant)}</td>
                <td class="py-2 px-3">${data.datee}</td>
                <td class="flex items-center gap-4 py-2 px-3 font-bold">
                <button class="text-pink-500 font-bold hover:underline"  onclick="SuppressionRevenu(${idx})">✖ Delete</button>
                </td>
            `;
            tnody2.appendChild(tr);
        });
    } else if (!tabExpenses.classList.contains('hidden')) {
        // Recherche sur les dépenses
        tnody3.innerHTML = '';
        const filteredData = donnees.filter(data =>
            data.types === 'depense' && (
                data.description.toLowerCase().includes(searchInput) ||
                String(data.montant).toLowerCase().includes(searchInput) ||
                String(data.datee).toLowerCase().includes(searchInput)
            )
        );
        filteredData.forEach((data, idx) => {
            const tr = document.createElement("tr");
            tr.classList.add("border-b");
            tr.innerHTML = ` 
               <td class="py-2 px-3">${data.types}</td>
                <td class="py-2 px-3">${data.description}</td>
                <td class="py-2 px-3 font-bold">${formatMontant(data.montant)}</td>
                <td class="py-2 px-3">${data.datee}</td>
                <td class="flex items-center gap-4 py-2 px-3 font-bold">
                <button class="text-pink-500 font-bold hover:underline" onclick="SuppressionDepense(${idx})">✖ Delete</button>
                </td>
            `;
            tnody3.appendChild(tr);
        });
    }
}



//GESTION de Suppression des donnees

// Sur les transaction
function Suppression(index){
    donnees.splice(index, 1);
    localStorage.setItem('transactions', JSON.stringify(donnees));
    afficherTransactions();
    afficherRevenu();
    afficherDepense();
    afficherTotaux();
}

// Suppression d'un revenu par index dans le tableau filtré
function SuppressionRevenu(index){
    const filterRevenu = donnees.filter(donne => donne.types === "revenue");
    const donneeFilert = filterRevenu[index];
    donnees = donnees.filter(donne => donne !== donneeFilert);
    localStorage.setItem('transactions', JSON.stringify(donnees));
    afficherTransactions();
    afficherRevenu();
    afficherDepense();
    afficherTotaux();
}

// Suppression d'une dépense par index dans le tableau filtré
function SuppressionDepense(index){
    const filterDepense = donnees.filter(donnee => donnee.types === "depense");
    const donneeFilert = filterDepense[index];
    donnees = donnees.filter(donnee => donnee !== donneeFilert);
    localStorage.setItem('transactions', JSON.stringify(donnees));
    afficherTransactions();
    afficherRevenu();
    afficherDepense();
    afficherTotaux();
}




































