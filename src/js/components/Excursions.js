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
        this.dbExcursions = this.dbExcursions.concat(data);
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

  clearExcursionsList() {
    this.offersEl.innerText = "";
    this.offersEl.appendChild(
      duplicateEl(".excursions__item--prototype", true)
    );
  }

  createExcursion(data) {
    const excursion = duplicateEl(".excursions__item--prototype", true);
    excursion.classList.remove("excursions__item--prototype");

    const title = findEl(".excursions__title", { searchArea: excursion });
    const description = findEl(".excursions__description", {
      searchArea: excursion,
    });
    const [adultPrice, childrenPrice] = findEl(".excursions__field-name", {
      searchArea: excursion,
      items: true,
    });
    console.dir(adultPrice.firstChild.data);
    //adultPrice.innerText = "";
    //childrenPrice.innerText = "";

    title.innerText = data.title;
    description.innerText = data.description;
    adultPrice.firstChild.data = `Dorosły: ${data.adultPrice} PLN x`;
    childrenPrice.firstChild.data = `Dziecko: ${data.childrenPrice} PLN x`;

    return excursion;
  }
}

export default Excursions;
