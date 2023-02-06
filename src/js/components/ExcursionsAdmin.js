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

  init() {
    const excursionsForm = this.panelEl.firstElementChild;
    excursionsForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.addExcursion();
    });
  }

  initEvents() {
    const deleteBtns = findEl(".excursions__field-input--remove", {
      searchArea: this.offersEl,
      items: true,
    });
    deleteBtns.forEach((btn, i) => {
      if (i > 0) {
        const elementId = Number(
          btn.parentElement.parentElement.parentElement.dataset.id
        );
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          this.deleteExcursion(elementId);
        });
      }
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
      .then(() => {
        this.clearData();
        this.clearInputData(inputs);
        this.loadExcursions();
      })
      .then(() => this.initEvents());
  }

  editExcursion() {}

  deleteExcursion(id) {
    this.api.removeExcursion(id).then(() => this.loadExcursions());
  }

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
}

export default ExcursionsAdmin;
