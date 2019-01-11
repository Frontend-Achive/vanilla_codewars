var ctx = document.getElementById('myChart').getContext('2d');
var doggeabiScore = document.querySelector('.doggeabiScore');
var ukuleleScore = document.querySelector('.ukuleleScore');
var chart = new Chart(ctx, {
    type: 'bar',

    data: {
        labels: ["doggeabi", "ukulele"],
        datasets: [{
            label: "Vanilla Codewars",
            backgroundColor: ['green', 'brown'],
            data: [Number(doggeabiScore.innerText), Number(ukuleleScore.innerText)],
        }]
    },

    options: {
        "responsive": true,
        "maintainAspectRatio": false,
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }],
            xAxes: [{
                barThickness : 50
            }],
        }
    }
});
