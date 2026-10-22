const buttonAjouterRepas = document.getElementById('ajouter');
const popupform = document.getElementById('popupform');
const annuler = document.getElementById('annuler');
const main = document.querySelector('#main');
const ajouter = document.getElementById('enregistrer');
const plat = document.getElementById('enregistrer');
const maDiv = document.createElement('article');

buttonAjouterRepas.addEventListener('click', function () {
    popupform.classList.remove('hidden');
    popupform.style.position = "fixed";
    popupform.style.top = "10%";
    main.classList.add('blur-xs');
    popupform.style.zIndex = '10'
});

annuler.addEventListener('click', function () {
    popupform.classList.add('hidden');
    main.classList.remove('blur-xs');
});



const inputName = document.querySelector('#nom');
const inputPrice = document.querySelector('#prix');
const inputImg = document.querySelector('#img');
const categ = document.querySelector('#categ');
const badge = document.querySelector('input[name="badge"]:checked');



