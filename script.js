const inputHour = document.getElementById("input-hour");
const inputTime = document.getElementById("input-time");
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

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
    saveData();
}

// Écoute si l'utilisateur click sur la liste de tâches
listContainer.addEventListener("click", function(e){
    if(e.target.className === "remove"){
        e.target.parentElement.remove();
    }
    saveData()
});

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}

// Écoute si l'utilisateur appuie sur une touche pendant qu'il est dans la Input box
inputBox.addEventListener("keydown", function(press){
    if(press.key === "Enter"){
        addTask();
    }
});

showTask();

// Urgenece seulement
// localStorage.clear();