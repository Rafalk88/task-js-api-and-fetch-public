class Order {
  constructor() {
    this.orderEl = document.querySelector(".panel__form");
    this.summEl = document.querySelector(".panel__summary");
    this.cart = [];
  }

  setOrderPrice(value = 0) {
    const summPrice = this.orderEl.querySelector(".order__total-price-value");
    summPrice.innerText = `${value} PLN`;
  }

  createProtoEl() {
    return this.summEl
      .querySelector(".summary__item--prototype")
      .cloneNode(true);
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
