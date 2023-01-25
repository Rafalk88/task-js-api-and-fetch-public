import Excursions from "./components/Excursion";
import Order from "./components/Order";
import { findEl } from "./components/helper";

import "./../css/client.css";

const init = () => {
  const excursions = new Excursions();
  excursions.loadExcursions();

  const orderEl = findEl(".panel__form");
  const order = new Order(orderEl);
};

document.addEventListener("DOMContentLoaded", init);
