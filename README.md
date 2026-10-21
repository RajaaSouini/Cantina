# Cantina
L’objectif de ce projet est de concevoir et développer une application web interactive de gestion du menu de la cantine de YouCode, permettant au responsable de planifier les repas hebdomadaires à partir d'une réserve de recettes tout en respectant un plafond budgétaire de 50 DH par jour. 

# tailwind installation du package

npm init -y
npm install tailwindcss @tailwindcss/cli

# le fichier css source

mkdir src
echo '@import "tailwindcss";' > src/input.css

# lancer la compilation

npx @tailwindcss/cli -i ./src/input.css -o ./dist/output.css --watch

# lien vers le fichier 

<link href="./dist/output.css" rel="stylesheet">


# Lien

**github**
https://github.com/RajaaSouini/Cantina.git


**deployement vercel**
https://cantina-ycode.vercel.app/


**planification github**
https://github.com/RajaaSouini/Cantina.git



## Header 
logo du projet , avec boutton ajouter repas qui va afficher un popup 
formulaire dans lequel on peut ajouter un repas .

## Section 1 

les jours de la semaine , chaque jour contient trois plat de types différents :
les jours de Lundi à Vendredi contenant(plat principal , entrée et dessert)
on peut réserver un jour ainsi que changer un repas choisi 

## section2

Des cartes qui affiches les repas qui existent 
qui doivent etre ajouter en js , par une fenetre flotante ,
chaque repas contient un nom un prix , une image , catégorie , et 
à quel jour elle est assigné .

## Structure du projet 

_cantina
|_______assets__
|                ________________images 
|               ________________icons
|          
|_______index.html
|_______README.md



# Documentation 



## C'est quoi Tailwind ?

Un framework CSS où l'on stylise directement dans le HTML avec de petites classes, au lieu d'écrire du CSS séparé.

```html
<button class="bg-blue-600 text-white px-4 py-2 rounded">Valider</button>
```

---

## Margin

m-4 : marge sur les 4 côtés
mx-4 : gauche et droite
my-4 : haut et bas
mt-4, mr-4, mb-4, ml-4 : haut, droite, bas, gauche




---

## Padding


**Quelles classes ?** Les mêmes que margin, avec p

p-4 , p-5 , pr-4 , px-4 , py-4 ..

```html
<button class="px-6 py-3">Bouton avec de l'air autour du texte</button>
```

## Border 

border-2 
bordure d 'epaisseur 2 , 
border-color : couleur de bordure

 rounded-lg , rounded-xl : equivalent de border-raduis

**Comment arrondir les coins ?**


```html
<div class="border-2 border-blue-500 rounded-lg p-4">Carte avec bordure</div>
```


## Color et text 

text-color : couleur de texte

text-sm , text-xl ... la taille du texte

**Comment changer la font?**

font-bold , font-light .. 

**Comment aligner le texte ?**

text-center , text-right , text-left

## Bg (arrière-plan)

bg-color : changer la couleur d arrière plan
bg-[#couleur] pour personnalisé la couleur



```html
<button class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2">Survolez-moi</button>
```



## Flex 

flex , flex-row , flex-col
justify-(center , around , between )axe princippal
items-center , axe horizontale


## Grid

grid : activer
grid-cols-2 : 2 colonne 











