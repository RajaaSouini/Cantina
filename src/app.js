const buttonAjouterRepas = document.getElementById('ajouter');
const popupform = document.getElementById('popupform');
const annuler = document.getElementById('annuler');
const main = document.querySelector('#main');
const enregistrer = document.getElementById('enregistrer');
const sectionPlat = document.querySelector('#plat');

const inputName = document.querySelector('#nom');
const inputPrice = document.querySelector('#prix');
const categ = document.querySelector('#categ');
const tableRepas = [];

function sauvegarder(){
    localStorage.setItem('repas' , JSON.stringify(tableRepas));
}



function ouvrirPopup() {
    popupform.classList.remove('hidden');
    popupform.style.position = "fixed";
    popupform.style.top = "10%";
    popupform.style.zIndex = '10';
    main.classList.add('blur-xs');
}

function fermerPopup() {
    popupform.classList.add('hidden');
    main.classList.remove('blur-xs');
    repasEnEdition = null;
    articleEnEdition = null;
    inputName.value = "";
    inputPrice.value = "";
    const badge = document.querySelector('input[name="badge"]:checked');
    if (badge) badge.checked = false;
}

buttonAjouterRepas.addEventListener('click', function () {
    repasEnEdition = null;
    articleEnEdition = null;
    ouvrirPopup();
});

annuler.addEventListener('click', fermerPopup);

function remplirArticle(article, repas) {
    article.innerHTML = `
        <div class="p-4 flex flex-col gap-8">
            <div class="flex justify-between items-center">
                <p class="font-mono text-[#D4621A]">${repas.categRepas}</p>
                <div class="flex gap-4">
                    <button><img src="./assets/icons/editer.png" alt="" class="size-8 edit"></button>
                    <button><img src="./assets/icons/poubelle-de-recyclage.png" class="size-8 poubelle" alt=""></button>
                </div>
            </div>
            <div>
                <p class="font-bold text-xl text-[#D4621A]">${repas.nomRepas}</p>
            </div>
            <div>
                <p class="text-[#2A1A0E]">${repas.priceRepas} Dh - ${repas.badgeRepas}</p>
            </div>
        </div>
    `;


    article.querySelector('.poubelle').addEventListener('click', function () {
        const index = tableRepas.indexOf(repas);
        if (index !== -1) tableRepas.splice(index, 1);
        article.remove();
        sauvegarder();
    });

    article.querySelector('.edit').addEventListener('click' , function(){
        modifierRepas(repas , article);
    });

}

function afficherDernierRepas(repas) {
    const article = document.createElement('article');
    article.classList = "bg-[#FEF3E2] flex flex-col gap-8 border-4 border-[#FEF3E2] rounded-xl";
    remplirArticle(article, repas);
    sectionPlat.appendChild(article);
}



function ajouterRepas() {

    const badgeCoche = document.querySelector('input[name="badge"]:checked');

    const valeurBadge = badgeCoche ? badgeCoche.value : "Aucun";

        if(repasEnModification){
            repasEnModification.nomRepas = inputName.value;
            repasEnModification.priceRepas = inputPrice.value;
            repasEnModification.categRepas = categ.value;
            repasEnModification.badgeRepas = valeurBadge;

            remplirArticle(articleEnModification , repasEnModification);
            sauvegarder();
        }else{
            const nouveauRepas = {
            nomRepas: inputName.value,
            priceRepas: inputPrice.value,
            categRepas: categ.value,
            badgeRepas: valeurBadge
        };
        tableRepas.push(nouveauRepas);
        afficherDernierRepas(nouveauRepas);
        sauvegarder();
        }

    fermerPopup();

}

enregistrer.addEventListener('click', function (e) {
    e.preventDefault();
    ajouterRepas();

});


let repasEnModification = null;
let articleEnModification = null;

function modifierRepas(repas , article){
    repasEnModification = repas;
    articleEnModification = article;

    inputName.value = repas.nomRepas ;
    inputPrice.value = repas.priceRepas ;
    categ.value = repas.categRepas ;

    const radio = document.querySelector(`input[name="badge"][value="${repas.badgeRepas}"]`);
    if (radio) radio.checked = true;

    ouvrirPopup();

}

function charger(){
    const donnees = localStorage.getItem('repas');
    if(donnees){
        const repasSauvgarder = JSON.parse(donnees);
        repasSauvgarder.forEach(function (repas){
            tableRepas.push(repas);
            afficherDernierRepas(repas);
        });
    }
}

charger();
