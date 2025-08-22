// pick elemen 
const todoForm = document.querySelector('.todo-form');
const todoInput = document.querySelector('.todo-input');
const todoDate = document.querySelector('.todo-date');
const todoList = document.querySelector('.todo-list');
const deleteAllbtn = document.querySelector('.delete-all-button');


//eventlistener untuk menjalankan fungsi addtodo taip kali form di submit
todoForm.addEventListener('submit',addTodo);
todoList.addEventListener('click', handleTaskActions)
deleteAllbtn.addEventListener('click',deleteAllTasks);

//function, bagian yang menjlankan 
function addTodo(event) {
    //Mencegah form dari aksi default-nya (refresh halamann event.preventDefault();
    //mengambil nilai dari inputan user
    const todoText = todoInput.value;
    const dateValue = todoDate.value;
}
//membuat html to do task
const todoTaskHTML = `
    <li class="todo-task">
        <span class="todo-text">${todoText}</span>
        <span class="due-date">${dateValue}</span>
        <div class="-actions">
            <button class="complete-button">Selesai</button>
        </div>
    </li>

`;
todoList.insertAdjacentHTML('beforeend', todoTaskHTML);
todoInput.value ='';
todoDate.value='';

function handleTaskActions(e){
const clickedElement = e.target;
if (clickedElement.classList.contains('delete-button')){
    const todoTask = clickedElement.closest('.todo-task');
    todoTask.remove();
} else if (clickedElement.classList.contains('complete-button')){
    const todoTask = clickedElement.closest('.todo-task');
    todoTask.classList.toggle('completed');
    const completeButton = todoTask.querySelector('.complete-button');
    completeButton.textContent = todoTask.classList.contains('completed') ? 'Belum Selesai' : 'Selesai';
}
}
function deleteAllTasks() {
    todoList.innerHTML = '';
}



