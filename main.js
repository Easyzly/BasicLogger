const toggleLogMenuButton = document.getElementById('toggle-log-menu');
const logMenu = document.getElementById('log-menu');
const logNameInput = document.getElementById('log-name-input');
const logDescriptionInput = document.getElementById('log-description-input');
const logCostInput = document.getElementById('log-cost-input');
const submitLogButton = document.getElementById('submit-log-button');
const logContainer = document.getElementById('log-container');
const toggleCountryMenuButton = document.getElementById('toggle-country-menu');
const countryMenu = document.getElementById('country-menu');
const countryNameInput = document.getElementById('country-name-input');
const countryDescriptionInput = document.getElementById('country-description-input');
const countryCurrentMoneyInput = document.getElementById('country-current-money-input');
const countryStartingMoneyInput = document.getElementById('country-starting-money-input');
const saveCountryButton = document.getElementById('save-country-button');

class Country {
    constructor(name, description, currentMoney, startingMoney) {
        this.name = name;
        this.description = description;
        this.currentMoney = currentMoney;
        this.startingMoney = startingMoney;
    }
}

class Log {
    constructor(name, description, cost) {
        this.name = name;
        this.description = description;
        this.cost = cost;
    }
}

toggleLogMenuButton.addEventListener('click', () => {
    logMenu.classList.toggle('hidden');
    countryMenu.classList.add('hidden');
});

toggleCountryMenuButton.addEventListener('click', () => {
    countryMenu.classList.toggle('hidden');
    logMenu.classList.add('hidden');
});

submitLogButton.addEventListener('click', () => {
    const name = logNameInput.value;
    const description = logDescriptionInput.value;
    const cost = logCostInput.value;
    const newLog = new Log(name, description, cost);
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
        logNameInput.value = '';
        logDescriptionInput.value = '';
        logCostInput.value = '';
        logMenu.classList.toggle('hidden');
        console.log('submitted');
        fetchLogs();
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