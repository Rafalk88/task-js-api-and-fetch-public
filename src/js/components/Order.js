import { findEl, duplicateEl } from "./helper";

class Order {
  constructor(orderEl) {
    this.orderEl = orderEl;
    this.formEl = findEl(".panel__order", { searchArea: orderEl });
    this.summEl = findEl(".panel__summary", { searchArea: orderEl });
    this.cart = [];
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

    excursionsInputs.forEach((input, i) => {
      if (i > 0) {
        input.addEventListener("click", (e) => {
          e.preventDefault();
          //const orderData = this.prepareOrderData(e);
          //this.cart.push(orderData);
          //const order = this.createAnOrder(orderData);
          //this.summEl.appendChild(order);
        });
      }
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

  prepareOrderData(e) {
    const actualSearchArea = e.target.parentElement.parentElement.parentElement;

    const title = findEl(".excursions__title", {
      searchArea: actualSearchArea,
    });

    const [adult, child] = findEl(".excursions__field-name", {
      searchArea: actualSearchArea,
      items: true,
    });

    const adultQuantity = adult.lastElementChild.value;
    const childQuantity = child.lastElementChild.value;

    const adultPrice = adult.firstChild.textContent;
    const adultPriceNum = adultPrice.match(/\d+/g);

    const childPrice = child.firstChild.textContent;
    const childPriceNum = childPrice.match(/\d+/g);

    const totalPrice =
      adultQuantity * adultPriceNum + childQuantity * childPriceNum;

    return {
      title: title.textContent,
      adultPrice: Number(adultPriceNum[0]),
      childPrice: Number(childPriceNum[0]),
      adultQuantity: adultQuantity,
      childQuantity: childQuantity,
      totalPrice: totalPrice,
    };
  }

  createAnOrder(data = {}) {
    const orderEl = duplicateEl("summary__item--prototype", true);
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

    title.innerText = data.title;
    totalPrice.innerText = `${data.totalPrice} PLN`;
    summaryPrices.innerText = `dorośli: ${data.adultQuantity} x ${data.adultPrice} PLN, dzieci: ${data.childQuantity} x ${data.childPrice} PLN`;

    return orderEl;
  }
}

export default Order;
