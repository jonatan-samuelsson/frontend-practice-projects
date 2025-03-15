document.addEventListener('DOMContentLoaded', () => {

    const dimensionsToast = document.querySelector('.dimensions-toast');
    const responsiveContainer = document.querySelector('.responsive-container');

   



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