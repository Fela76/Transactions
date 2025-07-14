// GESTION de l'inscription

const form = document.querySelector("#form");

const nom = document.querySelector(".nom");
const prenom = document.querySelector(".prenom");
const email = document.querySelector(".email");
const motPass = document.querySelector(".motPass");
const messge = document.querySelector(".messge");

// les erreurs
const errorNom = document.querySelector(".errorNom")
const errorPrenom = document.querySelector(".errorPrenom")
const errorEmail = document.querySelector(".errorEmail")
const errorMotPass = document.querySelector(".errorMotPass")


// Recuperation des donnees dans le localStorage
const utilisateurs = JSON.parse(localStorage.getItem('utilisateurs')) || [];
let siErreur = false

// foncton d'affichage des erreurs
function gestionErreur(elm, text) {
    elm.textContent = text;
    siErreur = true;
}

// Vider les champs
function viderChamp() {
    nom.value = "";
    prenom.value = "";
    email.value = "";
    motPass.value = "";
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    // vider les erreurs
    errorNom.textContent = '';
    errorPrenom.textContent = '';
    errorEmail.textContent = '';
    errorMotPass.textContent = '';
    siErreur = false;

    // Validation simple
    if (!nom.value.trim()) {
        gestionErreur(errorNom, "Le Nom est requis");
    }
    if (!prenom.value.trim()) {
        gestionErreur(errorPrenom, "Le Prénom est requis");
    }
    if (!email.value.trim()) {
        gestionErreur(errorEmail, "L'Email est requis");
    }
    if (!motPass.value.trim()) {
        gestionErreur(errorMotPass, "Le mot de passe est requis");
    }

    if (utilisateurs.some(u => u.email === email.value.trim())) {
        gestionErreur(errorEmail, "L'Email est déjà utilisé !");
    }

    if (!siErreur) {
        const user = {
            nom: nom.value.trim(),
            prenom: prenom.value.trim(),
            email: email.value.trim(),
            motPass: motPass.value.trim(),
        };
        utilisateurs.push(user);
        localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));
        messge.textContent = "Inscription réussie avec succès !";
        viderChamp();
        setTimeout(() => {
            window.location.href = "index.html";
        }, 1500);
    }
});






