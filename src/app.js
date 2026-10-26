// ======= Les Constantes appellés de l'HTML ================
const buttonAjouterRepas = document.getElementById('ajouter');
const popupform = document.getElementById('popupform');
const annuler = document.getElementById('annuler');
const main = document.querySelector('#main');
const enregistrer = document.getElementById('enregistrer');
const sectionPlat = document.querySelector('#plat');           
const inputName = document.querySelector('#nom');
const inputPrice = document.querySelector('#prix');
const categ = document.querySelector('#categ');
const tousLesSelects = document.querySelectorAll('.selectPlat');
const btnReserver = document.querySelectorAll('.reserverBtn');
const tableRepas = [
    { nomRepas: "Harira",              priceRepas: "10", categRepas: "Entrée", badgeRepas: "Bio" , reserve : false },
    { nomRepas: "Zaalouk",             priceRepas: "9",  categRepas: "Entrée", badgeRepas: "Vegetarien" , reserve : false},
    { nomRepas: "Taktouka",            priceRepas: "11", categRepas: "Entrée", badgeRepas: "Vegetarien" , reserve : false},
    { nomRepas: "Salade de lentilles", priceRepas: "13", categRepas: "Entrée", badgeRepas: "Bio", reserve : false },
    { nomRepas: "Pastilla au poulet",  priceRepas: "38", categRepas: "Plat principal", badgeRepas: "Classique", reserve : false },
    { nomRepas: "Tajine d'agneau",     priceRepas: "42", categRepas: "Plat principal", badgeRepas: "Classique", reserve : false },
    { nomRepas: "Rfissa",              priceRepas: "35", categRepas: "Plat principal", badgeRepas: "Bio", reserve : false },
    { nomRepas: "Tanjia",              priceRepas: "40", categRepas: "Plat principal", badgeRepas: "Classique" , reserve : false},
    { nomRepas: "Pâtes aux légumes",   priceRepas: "22", categRepas: "Plat principal", badgeRepas: "Vegetarien" , reserve : false},
    { nomRepas: "Pastilla au lait",    priceRepas: "14", categRepas: "Dessert", badgeRepas: "Classique", reserve : false },
    { nomRepas: "Crème caramel",       priceRepas: "9",  categRepas: "Dessert", badgeRepas: "Classique" , reserve : false},
    { nomRepas: "Orange à la cannelle", priceRepas: "8", categRepas: "Dessert", badgeRepas: "Bio" , reserve : false},
    { nomRepas: "Sellou",              priceRepas: "12", categRepas: "Dessert", badgeRepas: "Bio" , reserve : false}
];
const nomInc = document.getElementById('nomInc');
const prixInc = document.getElementById('prixInc');
const regex = /^.{2,}$/;  

//=============== Sauvegarde et chargement localStorage ============
function sauvegarder(){
    localStorage.setItem('repas' , JSON.stringify(tableRepas));
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
    remplirSelectPlat();
}

charger();




//========== Le popup =====================
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
    repasEnModification = null;
    articleEnModification = null;
    inputName.value = "";
    inputPrice.value = "";
    nomInc.textContent = "";
    prixInc.textContent = "";
    const badge = document.querySelector('input[name="badge"]:checked');
    if (badge) badge.checked = false;
}

buttonAjouterRepas.addEventListener('click', function () {
    repasEnModification = null;
    articleEnModification = null;
    ouvrirPopup();
});

annuler.addEventListener('click', fermerPopup);

//============Afficher les cartes ==================  
function remplirArticle(article, repas) {
    article.dataset.nom = repas.nomRepas;

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
        const res = prompt('si vous voulez vraiment supprimer entrer oui ');
        if(res === 'oui'){
            const index = tableRepas.indexOf(repas);
            if (index !== -1) tableRepas.splice(index, 1);
            article.remove();

            sauvegarder();
            remplirSelectPlat();
            alert('repas supprimé');
        }   
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

tableRepas.forEach(function (repas) {
    afficherDernierRepas(repas);
});


//=============== ajouter repas ================
function ajouterRepas() {
    if (!regex.test(inputName.value.trim())) {
        nomInc.textContent = 'Le nom doit contenir au moins 2 caractères';
        return;
    }
    nomInc.textContent = '';

    const prix = Number(inputPrice.value);
    if (inputPrice.value.trim() === '' || isNaN(prix) || prix < 0) {
        prixInc.textContent = 'Le prix doit être un nombre positif';
        return;
    }
    prixInc.textContent = '';
    const badgeCoche = document.querySelector('input[name="badge"]:checked');            
    const valeurBadge = badgeCoche ? badgeCoche.value : "Aucun";

    if (repasEnModification) {
        repasEnModification.nomRepas = inputName.value.trim();
        repasEnModification.priceRepas = inputPrice.value;
        repasEnModification.categRepas = categ.value;
        repasEnModification.badgeRepas = valeurBadge;

        remplirArticle(articleEnModification, repasEnModification);
        sauvegarder();
        remplirSelectPlat();
    } else {
        const nouveauRepas = {
            nomRepas: inputName.value.trim(),
            priceRepas: inputPrice.value,
            categRepas: categ.value,
            badgeRepas: valeurBadge
        };
        tableRepas.push(nouveauRepas);
        afficherDernierRepas(nouveauRepas);
        sauvegarder();
        remplirSelectPlat();
    }           
    fermerPopup();
    alert('Repas ajouté avec succes');

}

enregistrer.addEventListener('click', function (e) {
    e.preventDefault();
    ajouterRepas();

});          

let repasEnModification = null;
let articleEnModification = null;
//===============Modifier repas =================
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




//============remplissage des selects ================
function remplirSelectPlat(){
    tousLesSelects.forEach(function (select){
        const valeurChoisie = select.value;

        select.innerHTML = '<option value="">Choisir un plat</option>';
        const repasFiltres = tableRepas.filter(function (repas){
            return repas.categRepas === select.dataset.categ;
        });
        repasFiltres.forEach(function (repas) {
            const option = document.createElement('option');
            option.dataset.prix = repas.priceRepas; 
            option.value = repas.nomRepas;
            option.textContent = repas.nomRepas + ' . ' + repas.priceRepas + ' dh';
            select.appendChild(option);
        });
        select.value = valeurChoisie;
    });

    document.querySelectorAll('.total').forEach(function(p){
            totalPrix(p.closest('article'));
        });
}

//============ calcul du total prix ==================
function totalPrix(article){
    let total = 0;

    article.querySelectorAll('.selectPlat').forEach(function(select){
        total += Number(select.selectedOptions[0].dataset.prix) || 0;
    });

    article.querySelector('.total').textContent = total + ' / 50 DH';
    article.dataset.totalActuel = total;
}

//===============check Réserver un jour=================

for(let i = 0 ; i< btnReserver.length ; i++){
    btnReserver[i].addEventListener('click' , function(){
        const article = btnReserver[i].closest('article');
        const total = Number(article.dataset.totalActuel) || 0 ;

         if(total >= 50){
            alert('prix sup à 50 veuillez rechoisir');
            return;
        }

        const selectJours = article.querySelectorAll(".selectPlat");
        const toutLesPlats = sectionPlat.querySelectorAll('article');

        selectJours.forEach(function(select){
            const platChoisi = select.value;

            toutLesPlats.forEach(function (carte){
                if(carte.dataset.nom === platChoisi){
                    carte.style.opacity = '0.4';
                    carte.style.filter ='grayscale(1)';
                }
            });
        });
        
        alert('Réserve avec success prix moins que 50');
    });
}


tousLesSelects.forEach(function(select){
    select.addEventListener('change', function(){
        totalPrix(select.closest('article'));
    });
});




