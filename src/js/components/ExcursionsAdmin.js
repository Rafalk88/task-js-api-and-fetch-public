import Excursions from "./Excursions";
import { findEl, duplicateEl } from "./helper";

export class ExcursionsAdmin extends Excursions {
  constructor(offersEl) {
    super(offersEl);
    this.panelEl = findEl(".panel__form");
    this.excursion = {
      title: "",
      description: "",
      adultPrice: 0,
      childrenPrice: 0,
    };
  }

  initEvents() {
    const excursionsForm = this.panelEl.firstElementChild;
    excursionsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addExcursion();
    });

    const deleteBtns = findEl(".excursions__field-input--remove", {
      searchArea: this.offersEl,
      items: true,
    });
    console.log(deleteBtns);
  }

  removeEvents(tableOfEvents = []) {
    tableOfEvents.forEach((myEvent) => {
      myEvent.removeEventListener();
    });
  }

  addExcursion() {
    const inputs = findEl(".form__field", {
      searchArea: this.panelEl,
      items: true,
    });
    inputs.forEach((input) => {
      if (input.name === "name") this.excursion.title = input.value;
      if (input.name === "description")
        this.excursion.description = input.value;
      if (input.name === "adult")
        this.excursion.adultPrice = Number(input.value);
      if (input.name === "child")
        this.excursion.childrenPrice = Number(input.value);
    });

    this.api
      .addExcurion(this.excursion)
      .then(() => this.clearData())
      .then(() => this.clearInputData(inputs))
      .then(() => this.clearExcursionsList())
      .then(() => this.loadExcursions());
  }

  editExcursion() {}

  deleteExcursion(id) {}

  clearData() {
    return (this.excursion = {
      title: "",
      description: "",
      adultPrice: 0,
      childrenPrice: 0,
    });
  }

  clearInputData(inputs) {
    inputs.forEach((input) => {
      input.value = "";
    });
  }

  clearExcursionsList() {
    const proto = duplicateEl(".excursions__item--prototype", true);
    this.offersEl.innerText = "";
    this.offersEl.appendChild(proto);
  }
}

export default ExcursionsAdmin;
