window.addEventListener('load', () =>{
    const task_form = document.getElementById("form");
    const task_adding = document.getElementById('task');
    const pending = document.getElementById('pending');
    const compelted = document.getElementById('completed');


    document.getElementById("form").addEventListener("submit", (e) => {
        e.preventDefault();
        const value = task_adding.value.trim();
        if (!value) return alert("Task cannot be empty!");
    
        const taskItem = document.createElement("div");
        taskItem.classList.add("pending-tasks");
        taskItem.innerHTML = `
            <button class="checkmark"></button>
            <p class="pending-text">${value}</p>
            <div class="function-buttons">
                <button class="edit" aria-label="edit"> <img src="images/edit-button.svg" />
                </button>
                <button class="delete" aria-label="delete"> <img src="images/delete-button.svg" />
                </button>
            </div>
        `;
    
        document.querySelector('.task-input').appendChild(taskItem);
        task_adding.value = "";
    });
})