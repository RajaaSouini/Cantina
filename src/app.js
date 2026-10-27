import { buttonAjouterRepas,popupform,annuler,main,enregistrer,sectionPlat,inputName,
    inputPrice,categ,tousLesSelects,btnReserver,tableRepas,nomInc,prixInc,regex,
    
 } from "./ui.js"; 
import { sauvegarder , charger } from "./utils.js";
import { ouvrirPopup , fermerPopup } from "./ui.js";
//=========== appel de cherger localstorage ===============
charger();


export let repasEnModification = null;
export let articleEnModification = null;
//================== Le popup ===========================
buttonAjouterRepas.addEventListener('click', function () {
    repasEnModification = null;
    articleEnModification = null;
    ouvrirPopup();
});

annuler.addEventListener('click', fermerPopup);

//============Afficher les cartes ======================
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

export function afficherDernierRepas(repas) {
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
            badgeRepas: valeurBadge,
            reserve : false
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
export function remplirSelectPlat(){
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
let dejaClick = false;
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

            tableRepas.forEach(function (repas){
                if(repas.nomRepas === platChoisi){
                    repas.reserve = true;
                }
            })
        });
        sauvegarder();
        statistique();
        
        alert('Réserve avec success prix moins que 50');
        dejaClick = true;
    });
}


tousLesSelects.forEach(function(select){
    select.addEventListener('change', function(){
        totalPrix(select.closest('article'));
    });
});


//================ Statistiques =================
const recet = document.querySelector('#rec');
const recNbr = document.querySelector('.recNbr');
const equ = document.querySelector('.equ');
const jourPret = document.querySelector('.jourPret');
function statistique (){
    let nbrRecette = tableRepas.length;
    recet.textContent = nbrRecette;
    // repas en reserve
    let count = 0;
    tableRepas.forEach(function (repas){
        if(repas.reverse === true){
            count += 1 ;
        }
    });
    recNbr.textContent = count + " plat";

    //menu équilibré
    tableRepas.forEach(function (repas){
        if(repas.reserve === true && repas.badgeRepas === 'Bio'){
            equ.textContent = "Equilibré";
        }else{
            equ.textContent = "Non équilibré";
        }
    });

    //Jour pret 
    let conteur = 0 ;
    for(let i = 0 ; i < btnReserver.length ; i++){
        if(btnReserver[i].dejaClick === true){
            conteur += 1 ;
        }
    }
    jourPret.textContent = conteur ;



}

statistique();




