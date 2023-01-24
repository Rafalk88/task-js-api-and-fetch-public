import Excursions from "./components/Excursion";

import "./../css/client.css";

const init = () => {
  const orderEl = document.querySelector(".panel__form");
  setOrderPrice(orderEl);

  const excursions = new Excursions();
  excursions.loadExcursions();
};

const setOrderPrice = (sectionEl, value = 0) => {
  const summPrice = sectionEl.querySelector(".order__total-price-value");

  summPrice.innerText = `${value} PLN`;
};

document.addEventListener("DOMContentLoaded", init);
