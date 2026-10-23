const buttonAjouterRepas = document.getElementById('ajouter');
const popupform = document.getElementById('popupform');
const annuler = document.getElementById('annuler');
const main = document.querySelector('#main');
const enregistrer = document.getElementById('enregistrer'); 

buttonAjouterRepas.addEventListener('click', function () {
    popupform.classList.remove('hidden');
    popupform.style.position = "fixed";
    popupform.style.top = "10%";
    main.classList.add('blur-xs');
    popupform.style.zIndex = '10';
});

annuler.addEventListener('click', function () {
    popupform.classList.add('hidden');
    main.classList.remove('blur-xs');
});



const inputName = document.querySelector('#nom');
const inputPrice = document.querySelector('#prix');

const categ = document.querySelector('#categ');


const tableRepas = [];

function ajouterRepas() {

    const badgeCoche = document.querySelector('input[name="badge"]:checked');

    const valeurBadge = badgeCoche ? badgeCoche.value : "Aucun";

    const nouveauRepas = {
        nomRepas: inputName.value,
        priceRepas: inputPrice.value,
        categRepas: categ.value,
        badgeRepas: valeurBadge 
    };

    tableRepas.push(nouveauRepas);
    console.log(tableRepas);
    popupform.classList.add('hidden');
    main.classList.remove('blur-xs');
}

enregistrer.addEventListener('click', function (e) {
    e.preventDefault();
    ajouterRepas();
});
