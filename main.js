const toggleButton = document.getElementById('toggle-button');
const createMenu = document.getElementById('create-menu');
const nameInput = document.getElementById('name-input');
const descriptionInput = document.getElementById('description-input');
const costInput = document.getElementById('cost-input');
const submitButton = document.getElementById('submit-button');

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