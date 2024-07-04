


const script = document.createElement('script');
script.src = 'code.js';
document.head.appendChild(script);

const API_KEY = "b45172635720a130dffc7259";
const BASE_URL = `https://open.er-api.com/v6/latest/${API_KEY}`;

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
    updateExchangeRate();
  });
}

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
  const URL = `${BASE_URL}`;
  try {
    let response = await fetch(URL);
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    let data = await response.json();
    let rate = data.rates[toCurr.value];

    let finalAmount = amtVal * rate;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    console.error('Error fetching exchange rate:', error.message);
    msg.innerText = "Error fetching exchange rate. Please try again later.";
  }
};

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode]; // Using countryList from code.js
  // You can use countryCode to update the flag or implement any other logic as needed
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () => {
  updateExchangeRate();
});

