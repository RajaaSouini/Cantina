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


function afficherDernierRepas(repas) {
    let article = document.createElement('article');
    article.classList = "bg-[#FEF3E2] flex flex-col gap-8 border-4 border-[#FEF3E2] rounded-xl";
    article.innerHTML = `
        <div class="p-4 flex flex-col gap-8">
            <div class="flex justify-between items-center">
                <p class="font-mono text-[#D4621A]">${repas.categRepas}</p>
                <div class="flex gap-4">
                    <button><img src="./assets/icons/editer.png" alt="" class="size-8"></button>
                    <button><img src="./assets/icons/poubelle-de-recyclage.png" class="size-8" alt=""></button>
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
    sectionPlat.appendChild(article);
}

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
    
   
    afficherDernierRepas(nouveauRepas);
    inputName.value = "";
    inputPrice.value = "";
    
    popupform.classList.add('hidden');
    main.classList.remove('blur-xs');
}

enregistrer.addEventListener('click', function (e) {
    e.preventDefault();
    ajouterRepas();
});
