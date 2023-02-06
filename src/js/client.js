import Excursions from "./components/Excursions";
import Order from "./components/Order";
import { findEl } from "./components/helper";

import "./../css/client.css";

const init = () => {
  const offersEl = findEl(".panel__excursions");
  const excursions = new Excursions(offersEl);

  const orderEl = findEl(".panel__form");
  const order = new Order(orderEl);

  excursions.loadExcursions().then(() => order.init());
};

document.addEventListener("DOMContentLoaded", init);
