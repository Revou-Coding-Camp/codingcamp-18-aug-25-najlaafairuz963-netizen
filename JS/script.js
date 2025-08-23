// pick elemen 
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoDate = document.querySelector('.todo-date');
const todoList = document.querySelector('.todo-list');
const deleteAllbutton = document.querySelector('.deleteall-button');
const noTaskMessage = document.querySelector('.no-task-message');

//eventlistener untuk menjalankan fungsi addtodo taip kali form di submit
todoForm.addEventListener('submit',addTodo);
todoList.addEventListener('click', handleTaskActions)
deleteAllbutton.addEventListener('click',deleteAllTasks);
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
//membuat html to do task


function handleTaskActions(e){
const clickedElement = e.target;
if (clickedElement.classList.contains('delete-button')){
    const todoTask = clickedElement.closest('.todo-task');
    todoTask.remove();
} else if (clickedElement.classList.contains('complete-button')){
    const todoTask = clickedElement.closest('.todo-task');
    todoTask.classList.toggle('completed');
}
}
function deleteAllTasks() {
    todoList.innerHTML = '';
    updateUI();
}
function updateUI() {

    if (todoList.children.length > 0) {
        noTaskMessage.style.display = 'none';
    } else {
        noTaskMessage.style.display = 'block';
    }
}
