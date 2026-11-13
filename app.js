const list = document.getElementById('list');
const form = document.getElementById('form');
const input = document.getElementById('text');
const message = document.getElementById('message');

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem('practice-tasks') || '[]');
    return Array.isArray(saved) ? saved.filter(task => typeof task === 'string') : [];
  } catch {
    return [];
  }
}

let tasks = load();

function save() {
  localStorage.setItem('practice-tasks', JSON.stringify(tasks));
}

function render() {
  list.replaceChildren();

  if (tasks.length === 0) {
    const emptyState = document.createElement('li');
    emptyState.className = 'empty-state';
    emptyState.textContent = 'No tasks yet. Add one above to get started.';
    list.append(emptyState);
    return;
  }

  tasks.forEach((text, index) => {
    const row = document.createElement('li');
    row.className = 'task-item';

    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = text;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.type = 'button';
    deleteButton.textContent = 'Delete';
    deleteButton.setAttribute('aria-label', `Delete ${text}`);
    deleteButton.addEventListener('click', () => {
      tasks.splice(index, 1);
      save();
      render();
      message.textContent = 'Task deleted.';
    });

    row.append(taskText, deleteButton);
    list.append(row);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) {
    message.textContent = 'Please enter a task before adding it.';
    input.focus();
    return;
  }

  tasks.push(text);
  save();
  render();
  input.value = '';
  message.textContent = 'Task added.';
  input.focus();
});

render();