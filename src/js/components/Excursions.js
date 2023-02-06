import ExcursionsAPI from "../ExcursionsAPI";
import { findEl, duplicateEl } from "./helper";

class Excursions {
  constructor(offersEl) {
    this.offersEl = offersEl;
    this.api = new ExcursionsAPI();
    this.dbExcursions = [];
  }

  async loadExcursions() {
    return this.api
      .loadExcursions()
      .then((data) => {
        this.dbExcursions = data;
        this.createExcursionsList();
      })
      .catch((err) => new Error(err));
  }

  createExcursionsList() {
    this.dbExcursions.forEach((item) => {
      const excursionEl = this.createExcursion(item);
      this.offersEl.appendChild(excursionEl);
    });
  }

  createExcursion(data) {
    const excursion = duplicateEl(".excursions__item--prototype", true);
    excursion.classList.remove("excursions__item--prototype");
    excursion.dataset.id = data.id

    const title = findEl(".excursions__title", { searchArea: excursion });
    const description = findEl(".excursions__description", {
      searchArea: excursion,
    });
    const [adultPrice, childrenPrice] = findEl(".excursions__field-name", {
      searchArea: excursion,
      items: true,
    });

    title.innerText = data.title;
    description.innerText = data.description;
    adultPrice.firstChild.data = `Dorosły: ${data.adultPrice} PLN x`;
    childrenPrice.firstChild.data = `Dziecko: ${data.childrenPrice} PLN x`;

    return excursion;
  }
}

export default Excursions;
