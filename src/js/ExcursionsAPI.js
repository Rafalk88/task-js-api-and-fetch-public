import { fetch as fetchPolyfill } from "whatwg-fetch";

class ExcursionsAPI {
  constructor() {
    this.URL = "http://localhost:3000";
    this.urlExcursions = `${this.URL}/excursions`;
    this.urlOrders = `${this.URL}/orders`;
  }

  _fetch(additionalPath = "") {
    const url = this.urlExcursions + additionalPath;
    return fetchPolyfill(url).then((resp) => {
      if (resp.ok) {
        return resp.json();
      }
      return Promise.reject(resp);
    });
  }

  loadExcursions() {
    return this._fetch();
  }
}

export default ExcursionsAPI;
