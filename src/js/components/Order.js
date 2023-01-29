import { findEl, duplicateEl, numberFromString } from "./helper";

class Order {
  constructor(orderEl) {
    this.orderEl = orderEl;
    this.formEl = findEl(".panel__order", { searchArea: orderEl });
    this.summEl = findEl(".panel__summary", { searchArea: orderEl });
    this.cart = [];
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
          const orderData = this.prepareOrderData(e);
          this.cart.push(orderData);
          const order = this.createAnOrder(orderData);
          this.setOrderPrice(orderData.totalPrice, "inc");
          this.summEl.appendChild(order);
        });
      }
    });

    orderInput.addEventListener("click", (e) => {
      e.preventDefault();
      this.sendOrder(e);
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

  prepareOrderData(e) {
    const actualSearchArea = e.target.parentElement.parentElement.parentElement;

    const title = findEl(".excursions__title", {
      searchArea: actualSearchArea,
    });

    const [adult, child] = findEl(".excursions__field-name", {
      searchArea: actualSearchArea,
      items: true,
    });

    // TODO
    // input validator here

    const adultQuantity = adult.lastElementChild.value;
    const childQuantity = child.lastElementChild.value;

    const adultPrice = adult.firstChild.textContent;
    const adultPriceNum = numberFromString(adultPrice);

    const childPrice = child.firstChild.textContent;
    const childPriceNum = numberFromString(childPrice);

    const totalPrice =
      adultQuantity * adultPriceNum + childQuantity * childPriceNum;

    adult.lastElementChild.value = "";
    child.lastElementChild.value = "";

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

  sendOrder(e) {
    const name = findEl();
    const email = findEl();
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();

    // TODO
    // input validator here

    // create object with consts and car

    // push object to /orders using API
  }
}

export default Order;
