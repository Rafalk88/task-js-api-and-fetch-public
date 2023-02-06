import ExcursionsAdmin from "./components/ExcursionsAdmin";
import { findEl } from "./components/helper";
import "./../css/admin.css";

const init = () => {
  const excursionsEl = findEl(".panel__excursions");
  const excursions = new ExcursionsAdmin(excursionsEl);

  excursions.loadExcursions().then(() => excursions.init());
};

document.addEventListener("DOMContentLoaded", init);
