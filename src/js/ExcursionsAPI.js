import { fetch as fetchPolyfill } from "whatwg-fetch";

class ExcursionsAPI {
  constructor() {
    this.URL = "http://localhost:3000";
    this.urlExcursions = `${this.URL}/excursions`;
    this.urlOrders = `${this.URL}/orders`;
  }

  loadExcursions() {
    return this._fetch();
  }

  _fetch(additionalPath = "", options = {}) {
    const url = this.urlExcursions + additionalPath;
    return fetchPolyfill(url, options).then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      return Promise.reject(resp);
    });
  }

  addExcurion(data) {
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };

    return fetchPolyfill(this.urlExcursions, options).then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      return Promise.reject(resp);
    });
  }

  updateExcursion() {}

  removeExcursion(id) {
    const options = { method: "DELETE" };
    return this._fetch(`/${id}`, options);
  }

  addOrder(data) {
    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    };

    return fetchPolyfill(this.urlOrders, options).then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      return Promise.reject(resp);
    });
  }
}

export default ExcursionsAPI;
