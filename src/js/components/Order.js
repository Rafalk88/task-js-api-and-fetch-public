import { findEl } from "./helper";

class Order {
  constructor(orderEl) {
    this.orderEl = orderEl;
    this.formEl = findEl(".panel__order", { searchArea: orderEl });
    this.summEl = findEl(".panel__summary", { searchArea: orderEl });
    this.cart = [];

    this.init();
  }

  init() {
    this.setOrderPrice();
    this.initEvents();
  }

  initEvents() {
    const excursionsForm = findEl(".panel__excursions");
    const excursionsInputs = findEl(".excursions__field-input--submit", {
      searchArea: excursionsForm,
      items: true,
    });

    const orderInput = findEl(".order__field-submit", {
      searchArea: this.formEl,
    });

    excursionsInputs.forEach((input) => {
      input.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("excursion działa");
      });
    });

    orderInput.addEventListener("click", (e) => {
      e.preventDefault();
      console.log("order działa");
    });
  }

  setOrderPrice(value = 0) {
    const summPrice = findEl(".order__total-price-value", {
      searchArea: this.orderEl,
    });
    summPrice.innerText = `${value} PLN`;
  }

  createProtoEl() {
    const proto = findEl(".summary__item--prototype", {
      searchArea: this.summEl,
    });
    proto.cloneNode(true);
    return proto;
  }

  createAnOrder(data) {
    const orderEl = this.createProtoEl();
    orderEl.classList.remove("summary__item--prototype");

    const title = orderEl.querySelector(".summary__name");
    const totalPrice = orderEl.querySelector(".summay__total-price");
    const summaryPrices = orderEl.querySelector(".summary__prices");
    const [adultQuantity, childrenQuantity] = orderEl.querySelectorAll(
      ".excursions__field-input"
    );

    console.log(adultQuantity.value);

    let totalPriceValue = 1 * data.adultPrice + 1 * data.childrenPrice;

    title.innerText = data.title;
    totalPrice.innerText = `${totalPriceValue} PLN`;
    summaryPrices.innerText = `dorośli: ${0} x ${
      data.adultPrice
    } PLN, dzieci: ${0} x ${data.childrenPrice} PLN`;

    return orderEl;
  }
}

export default Order;
