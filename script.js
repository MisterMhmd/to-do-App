function Delete_pending(delete_button){
    const element = delete_button.closest('.pending-tasks');
    if (element) {
        element.remove();
    }
}

function Delete_completed(delete_button){
    const element = delete_button.closest('.completed-tasks');
    if (element) {
        element.remove();
    }
}

function Only_pending() {
    const completed = document.querySelectorAll(".completed-tasks");
    completed.forEach(element => {
        element.classList.replace("active", "inactive");
    });

    const pending = document.querySelectorAll(".pending-tasks")
    pending.forEach(element => {
        element.classList.replace("inactive", "active");
    });
};

function Only_completed() {
    const completed = document.querySelectorAll(".completed-tasks");
    completed.forEach(element => {
        element.classList.replace("inactive", "active");
    });

    const pending = document.querySelectorAll(".pending-tasks")
    pending.forEach(element => {
        element.classList.replace("active", "inactive");
    });
};

function All() {
    const completed = document.querySelectorAll(".completed-tasks");
    completed.forEach(element => {
        element.classList.replace("inactive", "active");
    });

    const pending = document.querySelectorAll(".pending-tasks")
    pending.forEach(element => {
        element.classList.replace("inactive", "active");
    });
};

function Completed(checkmark) {
    const element = checkmark.closest('.pending-tasks');
    const text = element.querySelector(".pending-text").textContent;
    if (element) {
        element.remove();
    }

    const completed_task = document.createElement("div");
    completed_task.classList.add("completed-tasks", "active");
    completed_task.innerHTML = `
        <button class="check-icon" aria-label="checked"> <img src="images/checkmark.svg" />
        </button>
        <p class="text"> ${text} </p>
        <div class="function-buttons">
            <button class="delete" aria-label="delete" onclick="Delete_completed(this)"> <img src="images/delete-button.svg" />
            </button>
        </div>
    `;

    document.querySelector('.task-input').appendChild(completed_task);
}



window.addEventListener('load', () =>{
    const task_adding = document.getElementById('task');



    document.getElementById("form").addEventListener("submit", (e) => {
        e.preventDefault();
        const value = task_adding.value.trim();
        if (!value) return alert("Task cannot be empty!");
    
        const taskItem = document.createElement("div");
        taskItem.classList.add("pending-tasks", "active");
        taskItem.innerHTML = `
            <button class="checkmark" onclick="Completed(this)"></button>
            <p class="pending-text">${value}</p>
            <div class="function-buttons">
                <button class="edit" aria-label="edit"> <img src="images/edit-button.svg" />
                </button>
                <button class="delete" aria-label="delete" onClick="Delete_pending(this)"> <img src="images/delete-button.svg" />
                </button>
            </div>
        `;

        
    
        document.querySelector('.task-input').appendChild(taskItem);
        task_adding.value = "";
    });

})




