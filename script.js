const inputHour = document.getElementById("input-hour");
const inputTime = document.getElementById("input-time");
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

let taches = [];

function validHour(){
    let valid = true;
    let [h, m] = inputHour.value.split(":").map(Number);
    let heureDebutNouvTache = h * 60 + m;
    let heureFinNouvTache = heureDebutNouvTache + Number(inputTime.value) * 60;
    if(taches.length > 0){
        for(let i = 0; i < taches.length; i++){
            let heureDebut = taskHour(i);
            let heureFin = taskHour(i) + taskTime(i);
            if(heureDebutNouvTache <= heureDebut && heureFinNouvTache > heureDebut){
                valid = false;
                alert(`Tu ne pourras pas terminer ta tâche! As-tu oublier ${taches[i].querySelector(".name").innerHTML}?`)
                break;
            } else if (heureDebutNouvTache >= heureDebut && heureFinNouvTache <= heureFin){
                valid = false;
                alert(`Oops! Tu as déjà prévu ${taches[i].querySelector(".name").innerHTML}.`)
                break;
            } else if (heureDebutNouvTache < heureFin && heureFinNouvTache >= heureFin){
                valid = false;
                alert(`Aïe! Tu n'as pas fini ${taches[i].querySelector(".name").innerHTML} à cette heure là.`)
                break;
            }
            }
    }
    return valid;
}

function validTime(){
    let valid = true;
    if(inputTime.value < 0.5 || inputTime.value > 23){
        alert("Durée de la tâche invalide");
        valid = false
    }
    return valid;
}

function validTask(){
    let valid = true;
    if(inputBox.value.trim() === ""){
        alert("Tâche invalide");
        valid = false
    }
    return valid;
}

function addTask(){
    if(validHour() && validTime() && validTask()){
        // Ajouter une tâche
        let li = document.createElement("li");
        listContainer.appendChild(li);
        // Ajouter le composantes d'une tâche
        // Heure
        let spanHour = document.createElement("span");
        spanHour.className = "heure";
        spanHour.innerHTML = inputHour.value;
        li.appendChild(spanHour);
        // Temps (invisible à l'utilisateur)
        let spanTime = document.createElement("span");
        spanTime.className = "duration"
        spanTime.innerHTML = inputTime.value;
        li.appendChild(spanTime);
        // Nom
        let spanTask = document.createElement("span");
        spanTask.className = "name"
        spanTask.innerHTML = inputBox.value;
        li.appendChild(spanTask);
        // Bouton X
        let spanX = document.createElement("span");
        spanX.className = "remove";
        spanX.innerHTML = "\u00d7";
        li.appendChild(spanX);
        // Reset l'input
        inputHour.value = '';
        inputTime.value = '';
        inputBox.value = '';
    }
    trierTachesParHeure();
    saveData();
}

function trierTachesParHeure() {
    taches = Array.from(listContainer.querySelectorAll("li"));
    // Boucle pour trier les activités en ordre chronologique dans la journée
    for(let i = 0; i < taches.length; i++){
        let min = i;
        for(let j = i+1; j < taches.length; j++){
            if(taskHour(j) < taskHour(min)){
                min = j;
            }
        }
        let temp = taches[i];
        taches[i] = taches[min];
        taches[min] = temp;
    }
    listContainer.innerHTML = "";
    taches.forEach(tache => listContainer.appendChild(tache));
}


// Fonction qui retourne l'heure d'une tâche depuis minuit en minutes
function taskHour(taskIndex){
    return taches[taskIndex].querySelector(".heure").innerHTML.split(":").map(Number)[0] * 60 + taches[taskIndex].querySelector(".heure").innerHTML.split(":").map(Number)[1];
}

// Fonction qui retourne la durée d'une tâche en minutes
function taskTime(taskIndex){
    return Number(taches[taskIndex].querySelector(".duration").innerHTML) * 60;
}

// Écoute si l'utilisateur click sur la liste de tâches
listContainer.addEventListener("click", function(e){
    if(e.target.className === "remove"){
        e.target.parentElement.remove();
    }
    saveData()
});

// Écoute si l'utilisateur appuie sur une touche pendant qu'il est dans la Input box
inputBox.addEventListener("keydown", function(press){
    if(press.key === "Enter"){
        addTask();
    }
});

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}


showTask();