const inputHour = document.getElementById("input-hour");
const inputTime = document.getElementById("input-time");
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

let taches;

function validHour(){
    let valid = true;
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
        // Ajouter le texte d'une tâche
        let li = document.createElement("li");
        listContainer.appendChild(li);
        // Ajouter le X d'une tâche
        let spanHour = document.createElement("span");
        let spanTask = document.createElement("span");
        let spanX = document.createElement("span");
        spanHour.className = "heure";
        spanX.className = "remove";
        spanHour.innerHTML = inputHour.value;
        spanTask.innerHTML = inputBox.value;
        spanX.innerHTML = "\u00d7";
        li.appendChild(spanHour);
        li.appendChild(spanTask);
        li.appendChild(spanX);
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
        console.log(taskHour(i));
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
    return taches[taskIndex].querySelector(".heure").innerHTML.split(":").map(Number)[0] * 60 + taches[taskIndex].querySelector(".heure").innerHTML.split(":").map(Number)[1]
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

// Urgenece seulement
// localStorage.clear();