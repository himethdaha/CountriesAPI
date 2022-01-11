"use strict";

const containerForCountries = document.querySelector(".container");
const countryDiv = document.querySelector(".country");
const checkCountrySubmit = document.querySelector(".btn");
let countryValue;
const countryForm = document.querySelector(".country-form");
const coordsSubmit = document.querySelector(".btn-coords");
const alertbox = document.querySelector(".alert");
const message = document.querySelector(".alert-message");
const alertclose = document.querySelector(".close-btn");
const searchbyName = document.querySelector(".name-search");
const searchbyCoords = document.querySelector(".coords-search");
const checkCountryForm = document.querySelector(".country-form");
const getCoordsForm = document.querySelector(".coords-search");
const getCoords = document.querySelector(".coordinates-form");
const drop = document.querySelector(".drop-btn");
const mydrop = document.querySelector(".my-dropdown");
let lng;
let lat;
let link = [];
let countries = [];

//Show all the options when clicking the dropdown
drop.addEventListener("click", function () {
  mydrop.style.display = "block";
});

//Show the search by name form when clicking the button in the dropdown
searchbyName.addEventListener("click", function () {
  checkCountryForm.style.display = "block";
  getCoordsForm.style.display = "none";
  mydrop.style.display = "none";
});

//Show the search by coords form when clicking the button in the dropdown
getCoordsForm.addEventListener("click", function () {
  getCoords.style.display = "block";
  checkCountryForm.style.display = "none";
  mydrop.style.display = "none";
});

//On form submit
checkCountrySubmit.addEventListener("click", function () {
  //Get the value inside the input form
  countryValue = document.getElementById("country-txts").value;

  getCountry(countryValue);
});

//On coords form submit
coordsSubmit.addEventListener("click", function () {
  //Get the coords on form submit
  lat = document.getElementById("latitude-txts").value;
  lng = document.getElementById("longitude-txts").value;

  getCountrybyCoords(lat, lng);
});

//Function to display the main country
const renderCountry = function (data) {
  //Destructing the data obj
  const [destdata] = data;
  //Values from the request
  const languages = Object.values(destdata.languages);
  const currencies = Object.values(destdata.currencies).map(
    (curr) => curr.name
  );

  //     //Adding the html for the country
  const html = `
              <div class="country">
              <div class="flag-div">
                  <img
                  src="${destdata.flags.svg}"
                  alt=""
                  class="flag"
                  />
              </div>
              <div class="country-info">
                  <span class="country-name">${destdata.name.common}</span>
                  <span class="continent">${destdata.continents}</span>
                  <p><span class="emoji">🧑🏼‍🤝‍🧑🏽</span><span class="population fax">${(
                    destdata.population / 1000000
                  ).toFixed(2)}M</span></p>
                  <p><span class="emoji">🚩</span><span class="capital fax">${
                    destdata.capital
                  }</span></p>
                  <p><span class="emoji">🗣️</span><span class="language fax">${languages}</span></p>
                  <p><span class="emoji">💰</span><span class="currency fax">${currencies}</span></p>
              </div>
              </div>`;

  //Insert html into the container
  containerForCountries.insertAdjacentHTML("beforeend", html);
};

//   //Function to display the neighboring country
const renderNeighbor = function (data) {
  console.log(data); //Destructing the data obj
  const [destdata] = data;

  //Values from the request
  const languages = Object.values(destdata.languages);
  const currencies = Object.values(destdata.currencies).map(
    (curr) => curr.name
  );

  //Adding the html for the country
  const html = `
              <div class="country-neighbor">
              <div class="flag-div-neighbor">
                  <img
                  src="${destdata.flags.svg}"
                  alt=""
                  class="flag"
                  />
              </div>
              <div class="country-info-neighbor">
                  <span class="country-name-neighbor">${
                    destdata.name.common
                  }</span>
                  <span class="continent">${destdata.continents}</span>
                  <p><span class="emoji">🧑🏼‍🤝‍🧑🏽</span><span class="population fax">${(
                    destdata.population / 1000000
                  ).toFixed(2)}M</span></p>
                  <p><span class="emoji">🚩</span><span class="capital fax">${
                    destdata.capital
                  }</span></p>
                  <p><span class="emoji">🗣️</span><span class="language fax">${languages}</span></p>
                  <p><span class="emoji">💰</span><span class="currency fax">${currencies}</span></p>
              </div>
              </div>`;

  //Insert html into the container
  containerForCountries.insertAdjacentHTML("beforeend", html);
};

//Function to display the main country
const renderCountrybyCoords = function (data) {
  //Destructing the data obj
  const [destdata] = data;
  console.log(destdata);
  //Values from the request
  const languages = Object.values(destdata.languages);
  const currencies = Object.values(destdata.currencies).map(
    (curr) => curr.name
  );

  //     //Adding the html for the country
  const html = `
                <div class="country">
                <div class="flag-div">
                    <img
                    src="${destdata.flags.svg}"
                    alt=""
                    class="flag"
                    />
                </div>
                <div class="country-info">
                    <span class="country-name">${destdata.name.common}</span>
                    <span class="continent">${destdata.continents}</span>
                    <p><span class="emoji">🧑🏼‍🤝‍🧑🏽</span><span class="population fax">${(
                      destdata.population / 1000000
                    ).toFixed(2)}M</span></p>
                    <p><span class="emoji">🚩</span><span class="capital fax">${
                      destdata.capital
                    }</span></p>
                    <p><span class="emoji">🗣️</span><span class="language fax">${languages}</span></p>
                    <p><span class="emoji">💰</span><span class="currency fax">${currencies}</span></p>
                </div>
                </div>`;

  //Insert html into the container
  containerForCountries.insertAdjacentHTML("beforeend", html);
};

////////////////// USING PROMISES///////////////
//For the coords
const getCountrybyCoords = function (lat, lng) {
  //using fetch api
  //Using a promise to to get the country
  fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=894954341150912812594x2174`
  )
    .then(function (response) {
      //Validating the response returned
      //check if the field is blank or is a string
      if (lat.length === 0 || lng.length === 0 || isNaN(lat) || isNaN(lng)) {
        throw new Error("Enter two numeric values please!!! 🙃");
      }

      //If status message isn't ok
      if (!response.ok) {
        throw new Error(`Country not found ${response.status}`);
      }
      //return the response
      return response.json();
    })
    //data is the response returned by the before then method
    .then(function (data) {
      console.log(data);
      //destruct the array of objs
      const newdata = [data];
      console.log(newdata);
      //Get the country name
      const countryname = newdata[0].country;
      console.log(countryname);

      //Return the countryname into a fetch url to use the restcountries API
      return fetch(`https://restcountries.com/v3.1/name/${countryname}`);
    })
    //Get the response from the before then method
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    //Display  the country info
    .then(function (data) {
      renderCountry(data);

      //Time to get the neighboring country
      //Check for borders
      if (!("borders" in data[0] === true)) {
        throw new Error("No neighboring countries but that's okay 🙂");
      }
      //Save the neighbors in an array
      const neighbors = data[0].borders;
      console.log(neighbors);
      //Fetch all the neighboring country links
      for (let i = 0; i < neighbors.length; i++) {
        countries.push(
          fetch(`https://restcountries.com/v3.1/alpha/${[neighbors[i]]}`)
        );
      }
      //Return the responses as a promise
      return Promise.all(countries);
    })
    .then(function (response) {
      console.log(response);
      //Convert the entire promise into json
      return Promise.all(response.map((link) => link.json()));
    })
    .then(function (data) {
      console.log(data);
      //Loop through the array getting individual arrays and give them to the renderNeighbor method
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        renderNeighbor(data[i]);
      }
    })
    //Error handling
    .catch(function (err) {
      alertbox.style.display = "block";
      message.textContent = `${err.message}.`;
      alertclose.addEventListener("click", function () {
        alertbox.style.display = "none";
      });
    })

    //Making the container for the information visibile
    .finally(function () {
      containerForCountries.style.opacity = 1;
    });
};

////////////////// USING PROMISES///////////////
//using fetch api
//Using a promise to get the country
const getCountry = function (country) {
  //This returns a promise
  fetch(`https://restcountries.com/v3.1/name/${country}`)
    .then(function (response) {
      //Check if the field is blank or is a number
      if (countryValue.length === 0 || !isNaN(+countryValue)) {
        throw new Error(`Enter a country dummy 🥺🥺`);
      }
      //Check the status code
      if (!response.ok) {
        throw new Error(`Country Not Found (${response.status})`);
      }
      //To read the response use JSON. which also returns a promise
      return response.json();
    })
    //Since the json methodreturns a promise I can use 'then' on the entire callback function
    .then(function (data) {
      renderCountry(data);

      //For countries without neighbors
      if (!("borders" in data[0] === true)) {
        throw new Error("No neighboring countries but that's okay 🙂");
      }

      //Get the neighboring country from the array of objs
      const neighbor = data[0].borders;
      console.log(neighbor);
      //Return the neighboring country
      //
      for (let i = 0; i < neighbor.length; i++) {
        countries.push(
          fetch(`https://restcountries.com/v3.1/alpha/${[neighbor[i]]}`)
        );
      }
      //Return the responses as a promise
      return Promise.all(countries);
    })
    //This returns a promise
    .then(function (response) {
      console.log(response);
      //   return response.json();
      //Convert the entire promise into json
      return Promise.all(response.map((link) => link.json()));
    })
    .then(function (data) {
      console.log(data);
      //   renderNeighbor(data);
      for (let i = 0; i < data.length; i++) {
        console.log(data[i]);
        renderNeighbor(data[i]);
      }
    })
    //Catch an error
    .catch(function (err) {
      alertbox.style.display = "block";
      message.textContent = `${err.message}.`;
      alertclose.addEventListener("click", function () {
        alertbox.style.display = "none";
      });
    })
    //Since catch it self returns a promise. I can use this here
    .finally(function () {
      //Make the container visible
      containerForCountries.style.opacity = 1;
    });
};

//   const getCountry = function (country) {
//     //Creating the http request
//     const request = new XMLHttpRequest();
//     //Opening the request to an API
//     request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
//     //Sending the request to the API
//     request.send();

//     //Adding an eventlistener to the 'load' event from the request
//     request.addEventListener("load", function () {
//       //this -> request
//       //Getting the response as a JS object
//       const [data] = JSON.parse(this.responseText);
//       console.log(data);
//       //For the main country
//       renderCountry(data);

//       //Get the neighbor array and destruct it to get the code
//       const [neighbor] = data.borders;
//       if (!neighbor) return;
//       //AJAX call for the neighboring country
//       const request2 = new XMLHttpRequest();
//       //Opening the request to an API
//       //Since neighbor returns a code, use the code in the URL
//       request2.open("GET", `https://restcountries.com/v3.1/alpha/${neighbor}`);
//       //Sending the request to the API
//       request2.send();

//       //Adding an eventlistener to the neighboring country
//       request2.addEventListener("load", function () {
//         //get the data
//         const [data2] = JSON.parse(this.responseText);
//         renderNeighbor(data2);
//       });
//     });
//   };
//   getCountry(countryValue);
//
