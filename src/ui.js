import { repasEnModification , articleEnModification } from "./app.js";
// ======= Les Constantes appellés de l'HTML ================
export const buttonAjouterRepas = document.getElementById('ajouter');
export const popupform = document.getElementById('popupform');
export const annuler = document.getElementById('annuler');
export const main = document.querySelector('#main');
export const enregistrer = document.getElementById('enregistrer');
export const sectionPlat = document.querySelector('#plat');           
export const inputName = document.querySelector('#nom');
export const inputPrice = document.querySelector('#prix');
export const categ = document.querySelector('#categ');
export const tousLesSelects = document.querySelectorAll('.selectPlat');
export const btnReserver = document.querySelectorAll('.reserverBtn');
export const tableRepas = [];
/*
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
    { nomRepas: "Sellou",              priceRepas: "12", categRepas: "Dessert", badgeRepas: "Bio" , reserve : false} */
export const nomInc = document.getElementById('nomInc');
export const prixInc = document.getElementById('prixInc');
export const regex = /^.{2,}$/; 

//========== Le popup =====================
export function ouvrirPopup() {
    popupform.classList.remove('hidden');
    popupform.style.position = "fixed";
    popupform.style.top = "10%";
    popupform.style.zIndex = '10';
    main.classList.add('blur-xs');
}

export function fermerPopup() {
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

