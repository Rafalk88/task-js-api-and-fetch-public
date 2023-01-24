import Excursions from "./components/Excursion";
import Order from "./components/Order";

import "./../css/client.css";

const init = () => {
  const excursions = new Excursions();
  excursions.loadExcursions();

  const order = new Order();
  order.setOrderPrice();
};

document.addEventListener("DOMContentLoaded", init);
