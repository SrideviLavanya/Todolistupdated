document.getElementById('add-task').addEventListener('click', function() {
    const taskInput = document.getElementById('task-input');
    const reminderInput = document.getElementById('reminder-input');
    const taskText = taskInput.value;
    const reminderTime = reminderInput.value;

    if (taskText) {
        const taskList = document.getElementById('task-list');
        const li = document.createElement('li');
        li.textContent = taskText;

      
      //
       if (reminderTime) {
        const reminderText = document.createElement('span');
        reminderText.textContent = ` (Reminder: ${new Date(reminderTime).toLocaleString()})`;
        reminderText.classList.add('reminder');
        li.appendChild(reminderText);
    }
      
      //
      
      
  
  const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete';
        deleteButton.onclick = function() {
            taskList.removeChild(li);
        };

        li.appendChild(deleteButton);
        taskList.appendChild(li);

        // Set reminder notification
        if (reminderTime) {
            const reminderDate = new Date(reminderTime);
            const now = new Date();
            const timeDifference = reminderDate.getTime() - now.getTime();

            if (timeDifference > 0) {
                setTimeout(() => {
                    alert(`Reminder: ${taskText}`);
                }, timeDifference);
            }
        }

        // Clear inputs
        taskInput.value = '';
        reminderInput.value = '';
    }
});

//

function scheduleReminder(reminderTime, task) {
    const reminderDate = new Date(reminderTime);
    const now = new Date();

    if (reminderDate > now) {
        const timeout = reminderDate - now;

        setTimeout(() => {
            notify(task);
        }, timeout);
    } else {
        alert('Reminder time must be in the future.');
    }
}

function notify(task) {
    if (Notification.permission === 'granted') {
        new Notification('Reminder', {
            body: `Reminder: ${task}`
        });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification('Reminder', {
                    body: `Reminder: ${task}`
                });
            }
        });
    }
}