document.addEventListener("DOMContentLoaded", () => {
  const TodoInput = document.getElementById("Todoinput");
  const addtaskbtn = document.getElementById("addtask");
  const todolist = document.getElementById("task-list");
  let task = JSON.parse(localStorage.getItem("task")) || [];//take localstorage string and convert into original objects(array)
  task.forEach((tasks) => renderTask(tasks));
  addtaskbtn.addEventListener("click", () => {
    const tasktext = TodoInput.value.trim();
    if (tasktext === "") return;
    const newTask = {
      Id: Date.now(),
      text: tasktext,
      completed: false,
    };
    task.push(newTask);
    renderTask(newTask)
    saveItems();
    TodoInput.value = "";
    console.log(task);
  });
  function renderTask(tasks) {
      const li = document.createElement("li");
      li.setAttribute("data-id", tasks.id);
    if (tasks.completed) li.classList.add("completed");
    li.innerHTML = `
    <span>${tasks.text}</span>
    <button class="delete-btn">Delete</button>
    `;
    li.addEventListener('click', (e) => {
        if (e.target.tagName === "BUTTON") return;
        tasks.completed = !tasks.completed;
        li.classList.toggle('completed');
        saveItems()
    });
    li.querySelector("button").addEventListener("click",(e)=>{
        e.stopPropagation()   //For eventlistener work on specific li not all li
        task=task.filter((t)=>t.id !== tasks.id)
        li.remove()
        saveItems()
    });
    todolist.appendChild(li);
}

function saveItems() {
    localStorage.setItem("task", JSON.stringify(task));
}
});