const userMenuButtons = Array.from(document.getElementsByClassName('user-menu-item'));

console.log(userMenuButtons);

function toggleView (e) {
    e.preventDefault();

    

    userMenuButtons.forEach(function(button) {
        button.classList.remove('active');
    })

    this.classList.add('active');

    const reportCard = document.getElementById('report-card');

    reportCard.setAttribute('data-current-view', this.innerText);


}

userMenuButtons.forEach(function(button) {
    button.addEventListener('click', toggleView);
})


function populateReportCard(data) {
    data.forEach(function(category) {
        
        const card = document.getElementsByClassName(category.title.toLowerCase());
        
        const timeReport = card[0].getElementsByClassName('time-report')[0];
        

        for (const [timeframe, values] of Object.entries(category.timeframes)) {
            const currentSpan = document.createElement('span');
            const previousSpan = document.createElement('span');
            
            currentSpan.classList.add('time', 'text-preset-4', timeframe);
            previousSpan.classList.add('previous', 'text-preset-2', timeframe);

            let hrSuffixCurrent = 'hrs';

            if (values.current == 1) hrSuffixCurrent = 'hr';

            currentSpan.innerText = `${values.current}${hrSuffixCurrent}`;
            
            
            let previousPrefix = `Last ${timeframe}`;
            if (timeframe == 'day') previousPrefix = 'Yesterday';

            let hrSuffixPrevious = 'hrs';

            if (values.previous == 1) hrSuffixPrevious = 'hr';

            previousSpan.innerText = `${previousPrefix}: ${values.previous}${hrSuffixPrevious}`;

            timeReport.appendChild(currentSpan);
            
            timeReport.appendChild(previousSpan);


        }
    })
}


  
fetch("data.json").then((response) => {
    if(!response.ok) return console.log('Error');

    return response.json();

}).then((data) => {
    populateReportCard(data);
}) 



