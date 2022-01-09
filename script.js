"use strict";

const containerForCountries = document.querySelector(".container");
const countryDiv = document.querySelector(".country");
const checkCountry = document.querySelector(".btn");
let countryValue;
const countryForm = document.querySelector(".country-form");

//On form submit
checkCountry.addEventListener("click", function () {
  console.log(typeof countryValue);
  //Get the value inside the input form
  countryValue = document.getElementById("country-txts").value;
  if (countryValue.length === 0 || !isNaN(+countryValue)) {
    alert("Enter a country dummy 🥺");
  }
  //Make the container visible
  containerForCountries.style.opacity = 1;

  const getCountry = function (country) {
    //Creating the http request
    const request = new XMLHttpRequest();
    //Opening the request to an API
    request.open("GET", `https://restcountries.com/v3.1/name/${country}`);
    //Sending the request to the API
    request.send();

    //Adding an eventlistener to the 'load' event from the request
    request.addEventListener("load", function () {
      //this -> request
      //Getting the response as a JS object
      const [data] = JSON.parse(this.responseText);
      //   console.log(data);

      //Values from the request
      const languages = Object.values(data.languages);
      const currencies = Object.values(data.currencies);

      //Adding the html for the country
      const html = `
            <div class="country">
            <div class="flag-div">
                <img
                src="${data.flags.svg}"
                alt=""
                class="flag"
                />
            </div>
            <div class="country-info">
                <span class="country-name">${data.name.common}</span>
                <span class="continent">${data.continents}</span>
                <p><span class="emoji">🧑🏼‍🤝‍🧑🏽</span><span class="population fax">${(
                  data.population / 1000000
                ).toFixed(2)}M</span></p>
                <p><span class="emoji">🗣️</span><span class="language fax">${
                  languages[0]
                }</span></p>
                <p><span class="emoji">💰</span><span class="currency fax">${
                  currencies[0].name
                }</span></p>
            </div>
            </div>`;

      //Insert html into the container
      containerForCountries.insertAdjacentHTML("beforeend", html);
    });
  };
  getCountry(countryValue);
});
