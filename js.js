let country = document.getElementById("country");
let search = document.getElementById("search");
let content = document.getElementById("content");
let url = "https://api.covid19api.com/summary";
///////// Card /////////
let NewConfirmed = document.getElementById("NewConfirmed");
let NewDeaths = document.getElementById("NewDeaths");
let NewRecovered = document.getElementById("NewRecovered");
let TotalConfirmed = document.getElementById("TotalConfirmed");
let TotalDeaths = document.getElementById("TotalDeaths");
let TotalRecovered = document.getElementById("TotalRecovered");
// let Date = document.getElementById("Date");
// let report_for = document.getElementById("report_for");

//Comparison

let searchToShowComparediv = document.getElementById("searchToShowComparediv");
let comparison_div = document.getElementById("comparison_div");
let country2 = document.getElementById("country2");
let search2 = document.getElementById("search2");

let NewConfirmed2 = document.getElementById("NewConfirmed2");
let NewDeaths2 = document.getElementById("NewDeaths2");
let NewRecovered2 = document.getElementById("NewRecovered2");
let TotalConfirmed2 = document.getElementById("TotalConfirmed2");
let TotalDeaths2 = document.getElementById("TotalDeaths2");
let TotalRecovered2 = document.getElementById("TotalRecovered2");

//taking values  in variable to create a bar chart
let NewConfirmedForBarChart;
let NewDeathsForBarChart;
let NewRecoveredForBarChart;
let TotalConfirmedForBarChart;
let TotalDeathsForBarChart;
let TotalRecoveredForBarChart;

let NewConfirmedForBarChart2;
let NewDeathsForBarChart2;
let NewRecoveredForBarChart2;
let TotalConfirmedForBarChart2;
let TotalDeathsForBarChart2;
let TotalRecoveredForBarChart2;

let comparedCounty1;
let comparedCounty2;

// Comparison Values
let comparedCountry1TotalConfirmed;
let comparedCountry1TotalDeath;
let comparedCountry1TotalRecovered;

let comparedCountry2TotalConfirmed;
let comparedCountry2TotalDeath;
let comparedCountry2TotalRecovered;

let arrayOfCountries = [];
let arrayOfCountries2 = [];

// Creating variables to Compare in Graph 1
let newDeathRatio;
let totalDeathRatio;
let newRecoveredRatio;
let totalRecoveredRatio;

// Creating variables to Compare in Graph 2
let newDeathRatio2;
let totalDeathRatio2;
let newRecoveredRatio2;
let totalRecoveredRatio2;

// Creating variables to Compare in Graph 1 & 2
// let comparedNewDeathRatio;
// let comparedTotalDeathRatio;
// let comparedNewRecoveredRatio;
// let comparedTotalRecoveredRatio;

// let Date = document.getElementById("Date");
// let report_for = document.getElementById("report_for");
// calculation

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    data.Countries.map((item, index) => {
      if (index <= 192) {
        arrayOfCountries.push(item.Country);
        // console.log(item);
      }
    });

    for (let i = 0; i < data.length; i++) {
      arrayOfCountries[i] = data.Countries[i].Country;
    }
    // console.log(x);

    search.addEventListener("click", (e) => {
      // e.preventDefault();
      // window.location.reload();
      let searched_value = country.value;
      // console.log(searched_value.length);
      arrayOfCountries.forEach((item, index) => {
        // console.log(arrayOfCountries[index]);
        if (
          searched_value.toLowerCase() == arrayOfCountries[index].toLowerCase()
        ) {
          searchToShowComparediv.style.display = "block";

          NewConfirmed.innerHTML = data.Countries[index].NewConfirmed;
          NewDeaths.innerHTML = data.Countries[index].NewDeaths;
          NewRecovered.innerHTML = data.Countries[index].NewRecovered;
          TotalConfirmed.innerHTML = data.Countries[index].TotalConfirmed;
          TotalDeaths.innerHTML = data.Countries[index].TotalDeaths;
          p1 = data.Countries[index].TotalDeaths;
          TotalRecovered.innerHTML = data.Countries[index].TotalRecovered;
          comparedCounty1 = data.Countries[index].Country;
          console.log(comparedCounty1);

          // Taking values for comparison
          comparedCountry1TotalConfirmed = data.Countries[index].TotalConfirmed;
          comparedCountry1TotalDeath = data.Countries[index].TotalDeaths;
          comparedCountry1TotalRecovered = data.Countries[index].TotalRecovered;
          //Taking values for bar chart

          NewConfirmedForBarChart = data.Countries[index].NewConfirmed;
          NewDeathsForBarChart = data.Countries[index].NewDeaths;
          NewRecoveredForBarChart = data.Countries[index].NewRecovered;
          TotalConfirmedForBarChart = data.Countries[index].TotalConfirmed;
          TotalDeathsForBarChart = data.Countries[index].TotalDeaths;
          TotalRecoveredForBarChart = data.Countries[index].TotalRecovered;

          // Calculating Ratios 1 starts

          newDeathRatio =
            (data.Countries[index].NewDeaths /
              data.Countries[index].NewConfirmed) *
            100;
          totalDeathRatio =
            (data.Countries[index].TotalDeaths /
              data.Countries[index].TotalConfirmed) *
            100;
          newRecoveredRatio =
            (data.Countries[index].NewRecovered /
              data.Countries[index].NewConfirmed) *
            100;
          totalRecoveredRatio =
            (data.Countries[index].TotalRecovered /
              data.Countries[index].TotalConfirmed) *
            100;

          // Calculating Ratios 2 ends
          // console.log("NaN" == newDeathRatio);
          // console.log(newDeathRatio, totalDeathRatio);

          let labels1 = ["new Deaths(%)", "Total Deaths(%)"];
          let deathVsConfirmed =
            (data.Countries[index].TotalDeaths /
              data.Countries[index].TotalConfirmed) *
            100;
          let confirmedButNotDead = 100 - deathVsConfirmed;

          //Starting 1st chart...

          let data1 = [newDeathRatio, totalDeathRatio];

          let colors1 = ["black", "red"];
          console.log(deathVsConfirmed, confirmedButNotDead);
          const dataObj1 = {
            labels: labels1,
            datasets: [
              {
                data: data1,
                backgroundColor: colors1,
              },
            ],
          };

          const config = {
            type: "doughnut",
            data: dataObj1,
            options: {
              title: {
                text: "Total Deaths",
                display: true,
              },
            },
          };
          let chart1 = new Chart(document.getElementById("deathRatio"), config);
          country.addEventListener("focusout", () => {
            chart1.destroy();
          });
          country.addEventListener("keydown", () => {
            comparison_div.style.display = "none";
          });
        }
      });
    });
  });

////////////////////////////////////////////////////////////
// ------------------------COMPERISON-----------------------------------

searchToShowComparediv.addEventListener("click", () => {
  comparison_div.style.display = "block";
  search2.addEventListener("click", () => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        data.Countries.map((item, index) => {
          if (index <= 192) {
            arrayOfCountries2.push(item.Country);
            // console.log(item);
          }
        });

        for (let i = 0; i < data.length; i++) {
          arrayOfCountries2[i] = data.Countries[i].Country;
        }
<<<<<<< HEAD
        // search2.addEventListener("click", () => {
        let searched_value2 = country2.value;
        arrayOfCountries2.forEach((item, index) => {
=======
        // console.log(x);

        // search2.addEventListener("click", () => {
        // window.location.reload();
        let searched_value2 = country2.value;
        arrayOfCountries2.forEach((item, index) => {
          // console.log(arrayOfCountries2[index]);
>>>>>>> ee2f1527ec2824b0b4b9ffb7a204c3215b56d7f2
          if (
            searched_value2.toLowerCase() ==
            arrayOfCountries2[index].toLowerCase()
          ) {
<<<<<<< HEAD
=======
            // content.innerHTML = data.Countries[index].TotalConfirmed;
>>>>>>> ee2f1527ec2824b0b4b9ffb7a204c3215b56d7f2
            console.log(data.Countries[index].NewConfirmed);
            console.log(data.Countries[index].NewDeaths);
            console.log(data.Countries[index].NewRecovered);
            console.log(data.Countries[index].TotalConfirmed);
            console.log(data.Countries[index].TotalDeaths);
            console.log(data.Countries[index].TotalRecovered);
<<<<<<< HEAD
=======
            // console.log(data.Countries[index].Date.slice(0, 10));
            // console.log(data.Countries[index].Country2);
>>>>>>> ee2f1527ec2824b0b4b9ffb7a204c3215b56d7f2

            NewConfirmed2.innerHTML = data.Countries[index].NewConfirmed;
            NewDeaths2.innerHTML = data.Countries[index].NewDeaths;
            NewRecovered2.innerHTML = data.Countries[index].NewRecovered;
            TotalConfirmed2.innerHTML = data.Countries[index].TotalConfirmed;
            TotalDeaths2.innerHTML = data.Countries[index].TotalDeaths;
<<<<<<< HEAD
=======
            p2 = data.Countries[index].TotalDeaths;
            console.log(p2, p1);
>>>>>>> ee2f1527ec2824b0b4b9ffb7a204c3215b56d7f2
            TotalRecovered2.innerHTML = data.Countries[index].TotalRecovered;
            comparedCounty2 = data.Countries[index].Country;
            console.log(comparedCounty2);
            // Taking values for comparison
            comparedCountry2TotalConfirmed =
              data.Countries[index].TotalConfirmed;
            comparedCountry2TotalDeath = data.Countries[index].TotalDeaths;
            comparedCountry2TotalRecovered =
              data.Countries[index].TotalRecovered;

            //Taking values for bar chart

            NewConfirmedForBarChart2 = data.Countries[index].NewConfirmed;
            NewDeathsForBarChart2 = data.Countries[index].NewDeaths;
            NewRecoveredForBarChart2 = data.Countries[index].NewRecovered;
            TotalConfirmedForBarChart2 = data.Countries[index].TotalConfirmed;
            TotalDeathsForBarChart2 = data.Countries[index].TotalDeaths;
            TotalRecoveredForBarChart2 = data.Countries[index].TotalRecovered;
<<<<<<< HEAD
            //Taking values for bar chart
=======
            //Taking values for bar chart : Take - 2
>>>>>>> ee2f1527ec2824b0b4b9ffb7a204c3215b56d7f2
            // Calculating 2nd Ratios starts

            newDeathRatio2 =
              (data.Countries[index].NewDeaths /
                data.Countries[index].NewConfirmed) *
              100;
            totalDeathRatio2 =
              (data.Countries[index].TotalDeaths /
                data.Countries[index].TotalConfirmed) *
              100;
            newRecoveredRatio2 =
              (data.Countries[index].NewRecovered /
                data.Countries[index].NewConfirmed) *
              100;
            totalRecoveredRatio2 =
              (data.Countries[index].TotalRecovered /
                data.Countries[index].TotalConfirmed) *
              100;

            // Calculating 2nd  Ratios ends
<<<<<<< HEAD
            //BAR CHART
=======

            // comparedNewDeathRatio = ();
            // comparedTotalDeathRatio;
            // comparedNewRecoveredRatio;
            // comparedTotalRecoveredRatio;

            //////////////////////////////
            // LATEST BAR CHART
>>>>>>> ee2f1527ec2824b0b4b9ffb7a204c3215b56d7f2

            let dataObj2 = {
              labels: [
                "New Death Ratio(%)",
                "Total Death Ratio(%)",
                "New Recovered Ratio(%)",
                "Total Recovered Ratio(%)",
              ],
              datasets: [
                {
                  label: comparedCounty1,
                  data: [
                    newDeathRatio,
                    totalDeathRatio,
                    newRecoveredRatio,
                    totalRecoveredRatio,
                  ],
                  backgroundColor: "#ffea00b4",
                },
                {
                  label: comparedCounty2,
                  data: [
                    newDeathRatio2,
                    totalDeathRatio2,
                    newRecoveredRatio2,
                    totalRecoveredRatio2,
                  ],
                  backgroundColor: "#ff3c009f",
                },
              ],
            };
            let config = {
              type: "bar",
              data: dataObj2,
            };
            let chart2 = new Chart(
              document.getElementById("deathRatio2"),
              config
            );
            country2.addEventListener("keydown", () => {
              chart2.destroy();
            });
          }
        });
        // });
      });
  });
});
// death_percentage;
