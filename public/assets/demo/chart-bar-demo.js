// Set new default font family and font color to mimic Bootstrap's default styling

let BOUSSKOURA = document.querySelector("#BOUSSKOURA").innerHTML.match(/\d+/);
let MARRAKECH = document.querySelector("#MARRAKECH").innerHTML.match(/\d+/);
let TANGER = document.querySelector("#TANGER").innerHTML.match(/\d+/);
let AGADIR = document.querySelector("#AGADIR").innerHTML.match(/\d+/);
let ZARKTOUNI = document.querySelector("#ZARKTOUNI").innerHTML.match(/\d+/);
let DARBOUAZA = document.querySelector("#DARBOUAZA").innerHTML.match(/\d+/);
let TEMARA = document.querySelector("#TEMARA").innerHTML.match(/\d+/);
let SOUKRATE = document.querySelector("#SOUKRATE").innerHTML.match(/\d+/);
let MEKNES = document.querySelector("#MEKNES").innerHTML.match(/\d+/);

let NumMax = 0;

if (Number(BOUSSKOURA) > 0) {
    NumMax = Number(BOUSSKOURA) + 20000;
} else {
    Number(BOUSSKOURA);
}

Chart.defaults.global.defaultFontFamily =
    '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = "#292b2c";

// Bar Chart Example
var ctx = document.getElementById("myBarChart");
var myLineChart = new Chart(ctx, {
    type: "bar",
    data: {
        labels: [
            "BOUSSKOURA",
            "MARRAKECH",
            "TANGER",
            "AGADIR",
            "ZARKTOUNI",
            "DARBOUAZA",
            "TEMARA",
            "MEKNES",
            "SOUKRATE"
        ],
        datasets: [
            {
                label: "CHIFFRE TTC",
                backgroundColor: "rgba(138,43,226)",
                borderColor: "rgba(2,117,216,1)",
                data: [
                    Number(BOUSSKOURA),
                    Number(MARRAKECH),
                    Number(TANGER),
                    Number(AGADIR),
                    Number(ZARKTOUNI),
                    Number(DARBOUAZA),
                    Number(TEMARA),
                    Number(MEKNES),
                    Number(SOUKRATE)
                ]
            }
        ]
    },
    options: {
        scales: {
            xAxes: [
                {
                    time: {
                        unit: "month"
                    },
                    gridLines: {
                        display: true
                    },
                    ticks: {
                        maxTicksLimit: 12
                    }
                }
            ],
            yAxes: [
                {
                    ticks: {
                        min: 0,
                        max: NumMax,
                        maxTicksLimit: 5
                    },
                    gridLines: {
                        display: true
                    }
                }
            ]
        },
        legend: {
            display: true
        }
    }
});
