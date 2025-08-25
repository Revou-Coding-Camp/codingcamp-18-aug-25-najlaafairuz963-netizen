// pick elemen 
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoDate = document.querySelector('.todo-date');
const todoList = document.querySelector('.todo-list');
const deleteAllbutton = document.querySelector('.deleteall-button');
const noTaskMessage = document.querySelector('.no-task-message');
const filterButton = document.querySelector('.filter-button');

let currentFilter = 'all';
//eventlistener untuk menjalankan fungsi addtodo taip kali form di submit
todoForm.addEventListener('submit',addTodo);
todoList.addEventListener('click', handleTaskActions)
deleteAllbutton.addEventListener('click',deleteAllTasks);
filterButton.addEventListener('click', cycleFilters);
document.addEventListener('DOMContentLoaded', updateUI);
//function, bagian yang menjlankan 
function addTodo(event) {
    event.preventDefault();

    //Mencegah form dari aksi default-nya (refresh halamann event.preventDefault();
    //mengambil nilai dari inputan user
    const todoText = todoInput.value;
    const dateValue = todoDate.value;
    const todoTaskHTML = `
    <li class="todo-task">
        <span class="todo-text">${todoText}</span>
        <span class="due-date">${dateValue}</span>
        <span class="status">Pending</span>
        <div class="task-actions"> 
            <button class="complete-button">Selesai</button>
            <button class="delete-button">Hapus</button> 
        </div>
    </li>
`;
todoList.insertAdjacentHTML('beforeend', todoTaskHTML);
todoInput.value ='';
todoDate.value='';
updateUI()
}



function handleTaskActions(e) {
    const clickedElement = e.target.closest('button');
    if (!clickedElement) return;

    if (clickedElement.classList.contains('delete-button')) {
        const todoTask = clickedElement.closest('.todo-task');
        todoTask.remove();
        updateUI();
    } else if (clickedElement.classList.contains('complete-button')) {
        const todoTask = clickedElement.closest('.todo-task');
        todoTask.classList.toggle('completed');
        const status = todoTask.querySelector('.status');
        const icon = clickedElement.querySelector('i');
        if (todoTask.classList.contains('completed')) {
            status.textContent = 'Completed';
            icon.className = 'fas fa-times';
        } else {
            status.textContent = 'Pending';
            icon.className = 'fas fa-check';
        }
        filterTasks(); 
    }
}

function deleteAllTasks() {
    todoList.innerHTML = '';
    updateUI();

}

function cycleFilters() {
    if (currentFilter === 'all') {
        currentFilter = 'pending';
        filterButton.textContent = 'Pending';
    } else if (currentFilter === 'pending') {
        currentFilter = 'completed';
        filterButton.textContent = 'Completed';
    } else {
        currentFilter = 'all';
        filterButton.textContent = 'All';
    }
    filterTasks();
}

function filterTasks() {
    const tasks = todoList.querySelectorAll('.todo-task');
    tasks.forEach(task => {
        switch (currentFilter) {
            case 'all':
                task.style.display = 'flex'; // Tampilkan semua
                break;
            case 'pending':
                if (task.classList.contains('completed')) {
                    task.style.display = 'none'; // Sembunyikan yang selesai
                } else {
                    task.style.display = 'flex'; // Tampilkan yang belum
                }
                break;
            case 'completed':
                if (task.classList.contains('completed')) {
                    task.style.display = 'flex'; // Tampilkan yang selesai
                } else {
                    task.style.display = 'none'; // Sembunyikan yang belum
                }
                break;
        }
    });
}

function updateUI() {

    if (todoList.children.length > 0) {
        noTaskMessage.style.display = 'none';
    } else {
        noTaskMessage.style.display = 'block';
    }
    filterTasks();
}
