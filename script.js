
document.addEventListener("DOMContentLoaded", loadTasks);

class TaskButtons {

    TaskButtons() {
    }

    Edit(editing) {
        const task_name = editing.closest(".pending-tasks");
        let text = task_name.querySelector(".pending-text").textContent;
        if (task_name) {
            task_name.remove();
        }
    
    
        const taskItem = document.createElement("div");
        taskItem.classList.add("pending-tasks", "active");
        taskItem.innerHTML = `
            <button class="checkmark"></button>
            <input class="pending-text" placeholder="${text}" />
            <div class="function-buttons">
                <button class="edit" aria-label="edit"> <img src="images/edit-button.svg" />
                </button>
                <button class="delete-pending" aria-label="delete"> <img src="images/delete-button.svg" />
                </button>
            </div>
        `;


        document.querySelector('.task-input').prepend(taskItem);
    
    
        const task_adding = document.querySelector(".pending-text")
        document.querySelector(".pending-tasks").addEventListener("change", (e) => {
            e.preventDefault();
            
            
    
            const value = task_adding.value.trim();
            if (!value) return alert("Task cannot be empty!");
            
            const taskItem = document.createElement("div");
            taskItem.classList.add("pending-tasks", "active");
            Addpending(taskItem, value);
    
            const element = task_adding.closest('.pending-tasks');
            if (element) {
                element.remove();
            }   
    
            document.querySelector('.task-input').prepend(taskItem);
            task_adding.value = "";
    
            saveTasks();
        })
    }


    Completed(checkmark){
        const element = checkmark.closest('.pending-tasks');
        const text = element.querySelector(".pending-text").textContent;
        if (element) {
            element.remove();
        }
        
        const completed_task = document.createElement("div");
        completed_task.classList.add("completed-tasks", "active");
        AddCompleted(completed_task, text);
    
        document.querySelector('.task-input').appendChild(completed_task);
        
        saveTasks();
    }
}

function Addpending(pending, text) {
    pending.innerHTML = `
            <button class="checkmark"></button>
            <p class="pending-text">${text}</p>
            <div class="function-buttons">
                <button class="edit" aria-label="edit"> <img src="images/edit-button.svg" />
                </button>
                <button class="delete-pending" aria-label="delete"> <img src="images/delete-button.svg" />
                </button>
            </div>
        `;
}

function AddCompleted(completed, text) {
    completed.innerHTML = `
    <button class="check-icon" aria-label="checked"> <img src="images/checkmark.svg" /></button>
    <p class="text"> ${text} </p>
    <div class="function-buttons">
        <button class="delete-completed" aria-label="delete"> <img src="images/delete-button.svg" /></button>
    </div>
    `;
}

function saveTasks() {
    const pendingTasks = Array.from(document.querySelectorAll(".pending-tasks .pending-text"))
        .map(task => task.textContent);
    const completedTasks = Array.from(document.querySelectorAll(".completed-tasks .text"))
        .map(task => task.textContent);
    localStorage.setItem("pendingTasks", JSON.stringify(pendingTasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
}

function loadTasks() {
    try {
        const pendingTasks = JSON.parse(localStorage.getItem("pendingTasks")) || [];

        pendingTasks.forEach(task => {
            const taskItem = document.createElement("div");
            taskItem.classList.add("pending-tasks", "active");
            Addpending(taskItem, task);
    
    
        
            document.querySelector('.task-input').prepend(taskItem);
        });
    }
    catch(err) {
        console.error('Error in retreiving tasks! ', err);
    }

    try {
        const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];


        completedTasks.forEach(task => {
            const completed_task = document.createElement("div");
            completed_task.classList.add("completed-tasks", "active");
            AddCompleted(completed_task, task);
    
            document.querySelector('.task-input').appendChild(completed_task);
        });
    }
    catch(err) {
        console.error('Error in retreiving tasks! ', err);
    }
}


function Delete_pending(delete_button){
    const element = delete_button.closest('.pending-tasks');
    if (element) {
        element.remove();
        saveTasks();
    }
}

function Delete_completed(delete_button){
    const element = delete_button.closest('.completed-tasks');
    if (element) {
        element.remove();
        saveTasks();
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

    saveTasks();
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

    saveTasks();
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

    saveTasks();
};





window.addEventListener('load', () =>{
    const task_adding = document.getElementById("task")



    document.getElementById("form").addEventListener("submit", (e) => {
        e.preventDefault();
        const value = task_adding.value.trim();
        if (!value) return alert("Task cannot be empty!");
    
        const taskItem = document.createElement("div");
        taskItem.classList.add("pending-tasks", "active");
        Addpending(taskItem, value);


    
        document.querySelector('.task-input').prepend(taskItem);
        task_adding.value = "";

        saveTasks();
    });
})


const adding_tasks = new TaskButtons();


document.querySelector(".task-input").addEventListener('click', function(event) {

    let target = event.target.closest('.checkmark, .edit, .delete-pending, .delete-completed');


    if (target.classList.contains('checkmark')) {
        adding_tasks.Completed(event.target);
        console.log("Event completed");
    } else if (target.classList.contains('edit')) {
        adding_tasks.Edit(event.target);
        console.log("Event completed");
    } else if (target.classList.contains('delete-pending')) {
        Delete_pending(event.target);
        console.log("Event completed");
    }
    else if (target.classList.contains('delete-completed')){
        Delete_completed(event.target);
        console.log("Event completed");
    } 
});


