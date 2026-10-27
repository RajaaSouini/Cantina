
import { tableRepas } from "./ui.js";
import { afficherDernierRepas , remplirSelectPlat} from "./app.js";
//============== Local Storage ================
export function sauvegarder(){
    localStorage.setItem('repas' , JSON.stringify(tableRepas));
}
export function charger(){
    const donnees = localStorage.getItem('repas');
    if(donnees){
        const repasSauvgarder = JSON.parse(donnees);

        
        repasSauvgarder.forEach(function (repas){
            tableRepas.push(repas);              
        });
    }
    remplirSelectPlat();
}