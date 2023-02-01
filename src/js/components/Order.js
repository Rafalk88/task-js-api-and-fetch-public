import { findEl, duplicateEl, numberFromString, validate } from "./helper";

class Order {
  constructor(orderEl) {
    this.orderEl = orderEl;
    this.formEl = findEl(".panel__order", { searchArea: orderEl });
    this.summEl = findEl(".panel__summary", { searchArea: orderEl });
    this.cart = [];
    this.errors = [];
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
          this.errors = [];
          this.validateExcursionInputs(e);

          if (this.errors.length === 0) {
            const orderData = this.prepareOrderData(e);
            const order = this.createAnOrder(orderData);

            this.cart.push(orderData);
            this.setOrderPrice(orderData.totalPrice, "inc");
            this.summEl.appendChild(order);
          }
        });
      }
    });

    orderInput.addEventListener("click", (e) => {
      e.preventDefault();
      this.errors = [];
      this.validateOrderInputs(e);
      if (this.errors.length === 0) this.sendOrder();
    });
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
          message: "Invalid number.",
          pattern: /^[0-9]*$/,
        });
      }
    });
  }

  validateOrderInputs(e) {
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
          message = "Invalid format. Only letters and space.";
          pattern = /^[A-Za-z\s]*$/;
        }
        if (inputAttr === "email") {
          message = "Invalid format [email_name]@[domain].[enlargement]";
          pattern =
            /(?:[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
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
    const orderEl = duplicateEl(".summary__item--prototype", true);
    orderEl.classList.remove("summary__item--prototype");

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
    const [inputName, inputEmail] = findEl(".order__field-input", {
      searchArea: this.formEl,
      items: true,
    });
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const name = inputName.value;
    const email = inputEmail.value;
    const totalPrice = findEl(".order__total-price-value", {
      searchArea: this.formEl,
    });
    const totalPriceValue = numberFromString(totalPrice.textContent);

    // TODO
    // push object to /orders using API

    const order = {
      name: name,
      email: email,
      totalPrice: totalPriceValue,
      date: date,
      time: time,
      cart: this.cart,
    };
  }
}

export default Order;
