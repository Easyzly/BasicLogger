const toggleButton = document.getElementById('toggle-button');
const createMenu = document.getElementById('create-menu');
const nameInput = document.getElementById('name-input');
const descriptionInput = document.getElementById('description-input');
const costInput = document.getElementById('cost-input');
const submitButton = document.getElementById('submit-button');

toggleButton.addEventListener('click', () => {
   createMenu.classList.toggle('hidden');
   console.log('clicked');
});