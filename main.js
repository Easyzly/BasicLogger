const toggleButton = document.getElementById('toggle-create-menu');
const createMenu = document.getElementById('create-menu');
const nameInput = document.getElementById('name-input');
const descriptionInput = document.getElementById('description-input');
const costInput = document.getElementById('cost-input');
const submitButton = document.getElementById('submit-button');
const logContainer = document.getElementById('log-container');


class log {
    constructor(name, description, cost) {
        this.name = name;
        this.description = description;
        this.cost = cost;
    }
}

toggleButton.addEventListener('click', () => {
    createMenu.classList.toggle('hidden');
    console.log('clicked');
});

submitButton.addEventListener('click', () => {
    const name = nameInput.value;
    const description = descriptionInput.value;
    const cost = costInput.value;
    const newLog = new log(name, description, cost);
    console.log(newLog);

    fetch('http://localhost:3000/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLog),
    })
    .then(response => response.text())
    .then(data => {
        console.log(data);
        nameInput.value = '';
        descriptionInput.value = '';
        costInput.value = '';
        createMenu.classList.toggle('hidden');
        console.log('submitted');
    })
    .catch(error => console.error('Error:', error));
});

const fetchLogs = () => {
    fetch('http://localhost:3000/logs')
        .then(response => response.json())
        .then(logs => {
            logContainer.innerHTML = '';
            logs.forEach(log => {
                const logElement = document.createElement('div');
                logElement.classList.add('log-entry');
                logElement.innerHTML = `
                    <h3>${log.name}</h3>
                    <p>${log.description}</p>
                    <p>Cost: ${log.cost}</p>
                `;
                logContainer.appendChild(logElement);
            });
        })
        .catch(error => console.error('Error:', error));
};

document.addEventListener('DOMContentLoaded', fetchLogs);