import Excursions from "./Excursions";
import { findEl } from "./helper";

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
    this.addExcursion();
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
    this.api.addExcurion(this.excursion);
    this.clearData();
  }

  editExcursion() {}

  deleteExcursion() {}

  clearData() {
    return (this.excursion = {
      title: "",
      description: "",
      adultPrice: 0,
      childrenPrice: 0,
    });
  }
}

export default ExcursionsAdmin;
