document.addEventListener('DOMContentLoaded', () => {

    const dimensionsToast = document.querySelector('.dimensions-toast');
    const responsiveContainer = document.querySelector('.responsive-container');

    const ratingForm = document.querySelector('#rating-form');
    
    
    
    const ratingComponent = document.querySelector('.rating-component');
    const scoreDisplay = document.getElementById('score-display');

    const closeBtn = document.querySelector('.close-btn');

   ratingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const ratingData = new FormData(ratingForm);

        scoreDisplay.textContent = ratingData.get('score');
        ratingComponent.dataset.view = 'thnx';

   });

   closeBtn.addEventListener('click', () => {
    ratingComponent.dataset.view = 'rating';
   })



    const resizeOberver = new ResizeObserver((entry) => {
        const resizedTarget = entry[0].target;
        dimensionsToast.textContent = `${resizedTarget.clientWidth} x ${resizedTarget.clientHeight}`;
        dimensionsToast.classList.remove('hidden');
        resizedTarget.classList.remove('no-border');
        setTimeout(() => {
            dimensionsToast.classList.add('hidden');
            resizedTarget.classList.add('no-border');
        }, 3000
        );
    }
    );

    resizeOberver.observe(responsiveContainer);


});