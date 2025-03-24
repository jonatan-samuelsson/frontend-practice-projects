const togglerButtons = document.querySelectorAll('.toggler-category-button');
const togglerMarker = document.getElementById('toggler-marker');
const togglerElement = document.getElementById('toggler');

for (const button of Object.values(togglerButtons)) {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        togglerElement.dataset.selected = e.currentTarget.dataset.buttonNumber;
        
    })
}