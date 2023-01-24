import ExcursionsAPI from "./../ExcursionsAPI";

class Excursions {
  constructor() {
    this.offersEl = document.querySelector(".panel__excursions");
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
    return this.offersEl
      .querySelector(".excursions__item--prototype")
      .cloneNode(true);
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

    const title = excursion.querySelector(".excursions__title");
    const description = excursion.querySelector(".excursions__description");
    const [adultPrice, childrenPrice] = excursion.querySelectorAll(
      ".excursions__field-name"
    );

    title.innerText = data.title;
    description.innerText = data.description;
    adultPrice.firstChild.data = `Dorosły: ${data.adultPrice} PLN x`;
    childrenPrice.firstChild.data = `Dziecko: ${data.childrenPrice} PLN x`;

    return excursion;
  }
}

export default Excursions;
