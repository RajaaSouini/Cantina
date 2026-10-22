const buttonAjouterRepas = document.getElementById('ajouter');
const popupform = document.getElementById('popupform');
const annuler = document.getElementById('annuler');
const body = document.querySelector('.body');

buttonAjouterRepas.addEventListener('click', function () {
    popupform.classList.remove('hidden');
    popupform.style.position = "fixed";
    popupform.style.top = "10%";
    body.classList.add('grayscale-25');
});

annuler.addEventListener('click', function () {
    popupform.classList.add('hidden');
});


