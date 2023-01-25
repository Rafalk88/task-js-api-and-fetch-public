import ExcursionsAPI from "./../ExcursionsAPI";
import { findEl } from "./helper";

class Excursions {
  constructor(offersEl) {
    this.offersEl = offersEl;
    this.api = new ExcursionsAPI();
    this.dbExcursions = [];
  }

  render() {
    this.clearExcursionsList();
    this.createExcursionsList();
  }

  loadExcursions() {
    this.api
      .loadExcursions()
      .then((data) => {
        this.dbExcursions = this.dbExcursions.concat(data);
        this.createExcursionsList();
      })
      .catch((err) => new Error(err));
  }

  createProtoEl() {
    const proto = findEl(".excursions__item--prototype", {
      searchArea: this.offersEl,
    });
    proto.cloneNode(true);
    return proto;
  }

  createExcursionsList() {
    this.dbExcursions.forEach((item) => {
      const excursionEl = this.createExcursion(item);
      this.offersEl.appendChild(excursionEl);
    });
  }

  clearExcursionsList() {
    this.offersEl.innerText = "";
    this.offersEl.appendChild(this.createProtoEl());
  }

  createExcursion(data) {
    const excursion = this.createProtoEl();
    excursion.classList.remove("excursions__item--prototype");

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
