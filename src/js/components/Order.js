import { findEl, duplicateEl, numberFromString, validate } from "./helper";
import {
  VALIDATE_INPUT_AS_NUMBER,
  VALIDATE_NAME,
  VALIDATE_EMAIL,
} from "./../constants";
import { ONLY_NUMBER_REG, NAME_REG, EMAIL_REG } from "./../regexs";
import ExcursionsAPI from "./../ExcursionsAPI";

class Order {
  constructor(orderEl) {
    this.orderEl = orderEl;
    this.formEl = findEl(".panel__order", { searchArea: orderEl });
    this.summEl = findEl(".panel__summary", { searchArea: orderEl });
    this.cart = [];
    this.errors = [];
    this.api = new ExcursionsAPI();
  }

  init() {
    this.setOrderPrice("reset");
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

    excursionsInputs.forEach((input, i) => {
      if (i > 0) {
        input.addEventListener("click", (e) => {
          e.preventDefault();
          this.excursionEvent(e);
        });
      }
    });

    orderInput.addEventListener("click", (e) => {
      e.preventDefault();
      this.orderEvent();
    });
  }

  excursionEvent(e) {
    this.errors = [];
    this.validateExcursionInputs(e);

    if (this.errors.length === 0) {
      const orderData = this.prepareOrderData(e);
      const order = this.createAnOrder(orderData);

      this.cart.push(orderData);
      this.setOrderPrice(orderData.totalPrice, "inc");
      this.summEl.appendChild(order);
    }
  }

  orderEvent() {
    this.errors = [];
    this.validateOrderInputs(e);
    if (this.errors.length === 0) this.sendOrder();
  }

  setOrderPrice(value = 0, operator) {
    const summPrice = findEl(".order__total-price-value", {
      searchArea: this.orderEl,
    });
    const elValue = summPrice.innerText;
    const elValueNum = numberFromString(elValue);
    let endValue;

    if (operator === "inc") endValue = elValueNum + value;
    if (operator === "dec") endValue = elValueNum - value;
    if (value === "reset") endValue = 0;

    summPrice.innerText = `${endValue} PLN`;
  }

  validateExcursionInputs(e) {
    const actualSearchArea = e.target.parentElement.parentElement.parentElement;

    const inputs = findEl(".excursions__field-input", {
      searchArea: actualSearchArea,
      items: true,
    });

    inputs.forEach((input) => {
      if (input.getAttribute("type") !== "submit") {
        validate(input, {
          errorsStorage: this.errors,
          message: VALIDATE_INPUT_AS_NUMBER,
          pattern: ONLY_NUMBER_REG,
        });
      }
    });
  }

  validateOrderInputs() {
    const inputs = findEl(".order__field-input", {
      searchArea: this.formEl,
      items: true,
    });

    inputs.forEach((input) => {
      if (input.getAttribute("type") !== "submit") {
        const inputAttr = input.getAttribute("name");
        let message;
        let pattern;

        if (inputAttr === "name") {
          message = VALIDATE_NAME;
          pattern = NAME_REG;
        }
        if (inputAttr === "email") {
          message = VALIDATE_EMAIL;
          pattern = EMAIL_REG;
        }

        validate(input, {
          type: "string",
          errorsStorage: this.errors,
          message: message,
          pattern: pattern,
        });
      }
    });
  }

  prepareOrderData(e) {
    const actualSearchArea = e.target.parentElement.parentElement.parentElement;

    const title = findEl(".excursions__title", {
      searchArea: actualSearchArea,
    });

    const [adult, child] = findEl(".excursions__field-input", {
      searchArea: actualSearchArea,
      items: true,
    });

    const [adultPrice, childPrice] = findEl(".excursions__field-name", {
      searchArea: actualSearchArea,
      items: true,
    });

    const adultQuantity = adult.value;
    const childQuantity = child.value;

    const adultPriceValue = adultPrice.textContent;
    const adultPriceNum = numberFromString(adultPriceValue);

    const childPriceValue = childPrice.textContent;
    const childPriceNum = numberFromString(childPriceValue);

    const totalPrice =
      adultQuantity * adultPriceNum + childQuantity * childPriceNum;

    adult.value = "";
    child.value = "";

    return {
      title: title.textContent,
      adultPrice: adultPriceNum,
      childPrice: childPriceNum,
      adultQuantity: adultQuantity,
      childQuantity: childQuantity,
      totalPrice: totalPrice,
    };
  }

  createAnOrder(data = {}) {
    const protoEl = "summary__item--prototype";
    const orderEl = duplicateEl(`.${protoEl}`, true);
    orderEl.classList.remove(`${protoEl}`);

    const title = findEl(".summary__name", {
      searchArea: orderEl,
    });
    const totalPrice = findEl(".summary__total-price", {
      searchArea: orderEl,
    });
    const summaryPrices = findEl(".summary__prices", {
      searchArea: orderEl,
    });
    const deleteBtn = findEl(".summary__btn-remove", {
      searchArea: orderEl,
    });

    title.innerText = data.title;
    totalPrice.innerText = `${data.totalPrice} PLN`;
    summaryPrices.innerText = `dorośli: ${data.adultQuantity} x ${data.adultPrice} PLN, dzieci: ${data.childQuantity} x ${data.childPrice} PLN`;

    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      this.deleteOrder(e);
    });

    return orderEl;
  }

  deleteOrder(e) {
    const parent = e.target.parentElement.parentElement;
    const price = findEl(".summary__total-price", {
      searchArea: parent,
    });

    const priceValue = price.innerText;
    const priceValueNum = Number(priceValue.match(/\d+/g));
    this.setOrderPrice(priceValueNum, "dec");
    // TODO
    // on this line pop date from this.cart
    parent.remove();
  }

  sendOrder() {
    const inputs = findEl(".order__field-input", {
      searchArea: this.formEl,
      items: true,
    });
    const [inputName, inputEmail] = inputs;
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const name = inputName.value;
    const email = inputEmail.value;
    const totalPrice = findEl(".order__total-price-value", {
      searchArea: this.formEl,
    });
    const totalPriceValue = numberFromString(totalPrice.textContent);

    const order = {
      name: name,
      email: email,
      totalPrice: totalPriceValue,
      date: date,
      time: time,
      cart: this.cart,
    };

    const proto = duplicateEl(".summary__item--prototype", true);
    this.clearOrderData(inputs, proto);

    this.api.addOrder(order);
  }

  clearOrderData(inputs, proto) {
    inputs.forEach((input) => {
      if (input.getAttribute("type") !== "submit") {
        input.value = "";
      }
    });
    this.cart = [];
    this.setOrderPrice("reset");
    this.clearOrderList(proto);
  }

  clearOrderList(proto) {
    this.summEl.innerText = "";
    this.summEl.appendChild(proto);
  }
}

export default Order;
