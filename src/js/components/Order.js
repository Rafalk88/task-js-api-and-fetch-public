class Order {
  constructor() {
    this.orderEl = document.querySelector(".panel__form");
  }

  setOrderPrice(value = 0) {
    const summPrice = this.orderEl.querySelector(".order__total-price-value");
    summPrice.innerText = `${value} PLN`;
  }
}

export default Order;
