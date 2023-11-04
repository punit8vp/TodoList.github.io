document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('new-task');
    const addTaskButton = document.getElementById('add-task');
    const todoList = document.getElementById('todo-list');
    const clearCompletedButton = document.getElementById('clear-completed');
    const completeAllButton = document.getElementById('complete-all');
    const todoCount = document.getElementById('todo-count');
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Function to update the tasks left counter
    function updateTaskCount() {
        const tasks = todoList.querySelectorAll('li');
        const tasksLeft = Array.from(tasks).filter(task => !task.classList.contains('completed')).length;
        todoCount.textContent = `${tasksLeft} tasks left`;
    }

    // Function to add a new task
    function addTask() {
        const taskValue = newTaskInput.value.trim();
        if (taskValue) {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <input type="radio" class="toggle">
                <label>${taskValue}</label>
                <button class="destroy">X</button>
            `;
            todoList.appendChild(listItem);
            newTaskInput.value = '';
            updateTaskCount();
        }
    }

    // Event listeners
    addTaskButton.addEventListener('click', addTask);
    newTaskInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Complete all tasks
    completeAllButton.addEventListener('click', function() {
        todoList.querySelectorAll('li').forEach(task => {
            task.classList.add('completed');
            task.querySelector('.toggle').checked = true;
        });
        updateTaskCount();
    });

    // Clear completed tasks
    clearCompletedButton.addEventListener('click', function() {
        todoList.querySelectorAll('.completed').forEach(task => {
            todoList.removeChild(task);
        });
        updateTaskCount();
    });

    // Task completion toggle
    todoList.addEventListener('change', function (e) {
        if (e.target.classList.contains('toggle')) {
            const listItem = e.target.parentElement;
            listItem.classList.toggle('completed');
            updateTaskCount();
        }
    });

    // Delete task
    todoList.addEventListener('click', function (e) {
        if (e.target.classList.contains('destroy')) {
            const listItem = e.target.parentElement;
            todoList.removeChild(listItem);
            updateTaskCount();
        }
    });

    // Filtering tasks
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filter = button.textContent.toLowerCase();
            filterTasks(filter);
        });
    });

    function filterTasks(filter) {
        const tasks = todoList.querySelectorAll('li');
        tasks.forEach(task => {
            switch (filter) {
                case 'all':
                    task.style.display = '';
                    break;
                case 'uncomplete':
                    if (!task.classList.contains('completed')) {
                        task.style.display = '';
                    } else {
                        task.style.display = 'none';
                    }
                    break;
                case 'completed':
                    if (task.classList.contains('completed')) {
                        task.style.display = '';
                    } else {
                        task.style.display = 'none';
                    }
                    break;
            }
        });
    }

    // Initial tasks count
    updateTaskCount();
});
