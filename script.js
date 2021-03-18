let taskList = document.querySelector('.task-list')
let form = document.querySelector('.add-form')
let taskDescription = document.querySelector('.task-description')
let taskPriority = document.querySelector('.task-priority')
let taskAssign = document.querySelector('.task-assign')
let taskForm = document.querySelector('.task-form')
form.addEventListener('submit', (e) => saveTasks(e))

function getTasks() {
    return JSON.parse(localStorage.getItem('tasks')) || []
}

function saveTasks(event) {
    event.preventDefault()
    let tasks = getTasks()
    let newTask = {
        id: +new Date(),
        description: taskDescription.value,
        isOpen: true,
        assignPerson: taskAssign.value,
        status: taskPriority.value
    }
    localStorage.setItem('tasks', JSON.stringify([...tasks, newTask]))
    taskForm.reset()
    view()
}


function view() {
    taskList.innerHTML = ''
    let tasks = getTasks()
    tasks.forEach(task => {
        taskList.innerHTML += `<div class="task-cards p-3 mb-3">
                    <h6>Номер задачи: ${task.id}</h6>
                    <span class="badge ${task.isOpen ? 'bg-primary' : 'bg-secondary'}">${task.isOpen ? 'Open' : 'Close'}</span>
                    <h3 class="my-4">${task.description}</h3>
                    <div class="status">
                        <i class="fas fa-clock"></i>
                        <span class="text-danger">${task.status}</span>
                    </div>
                    <div class="assign mb-3">
                        <i class="far fa-user-circle"></i>
                        <span>${task.assignPerson}</span>
                    </div>
                    <button type="button" class="btn btn-success">${task.isOpen ? 'Закрыть' : 'Открыть'}</button>
                    <button type="button" class="btn btn-danger btn-delete">Удалить</button>
                </div>`
        status()
        deleteList ()
    })
}
view()
function status() {
    document.querySelectorAll('.btn-success').forEach((btn, btnIdx) => {
        let tasks = getTasks()
        btn.addEventListener('click', () => {
            tasks.map((task, taskIdx) => {
                if(taskIdx === btnIdx){
                    task.isOpen = !task.isOpen

                    localStorage.setItem('tasks', JSON.stringify(tasks))
                    view()
                }
            })
        })
    })
}


function deleteList () {
    document.querySelectorAll('.btn-danger').forEach((button, idx) => {
        let tasks = getTasks()
        button.addEventListener('click', () => {
            tasks.splice(idx, 1)
            localStorage.setItem('tasks', JSON.stringify(tasks))
            view()
        })
    })
}
