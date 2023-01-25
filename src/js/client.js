import Excursions from "./components/Excursion";
import Order from "./components/Order";

import "./../css/client.css";

const init = () => {
  const excursions = new Excursions();
  excursions.loadExcursions();

  const orderEl = document.querySelector(".panel__form");
  const order = new Order(orderEl);
};

document.addEventListener("DOMContentLoaded", init);
