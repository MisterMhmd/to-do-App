
window.addEventListener('load', () =>{
    const task_form = document.getElementById("form");
    const task_adding = document.getElementById('task');
    const pending = document.getElementById('pending');
    const compelted = document.getElementById('completed');


    if (task_form) {
        task_form.addEventListener("submit", (e) => {
            e.preventDefault();
            
            const value = task_adding.value;

            if (!value){
                alert("Empty field! Try again");
                return;
            }
            else {
                console.log('success');
            }

            const pending_content_element = document.createElement("div");
            pending_content_element.classList.add("pending-tasks");
            pending_content_element.innerText = value;


            const pending_element = document.createElement("div");
            pending_element.classList.add("task-input");
            


            const function_buttons = document.createElement("div")
            function_buttons.classList.add("function-buttons");

            pending.appendChild(function_buttons);

            pending.appendChild(pending_content_element);
            
            pending.appendChild(pending_element);

            console.log('list printed');
        })
    }
    else {
        console.log('no form found');
    }
})


function Add() {

}