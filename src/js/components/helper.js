export const findEl = (selector, options = {}) => {
  const defaults = {
    searchArea: document, // querySelector search area
    items: false, // querySelector or querySelectorAll
    kinship: {
      element: null, // 'parent' or 'children'
      nthEl: 1, // which n-th element want to find
    },
  };

  const actual = Object.assign({}, defaults, options);

  let searchEl;

  if (!actual.items)
    return (searchEl = actual.searchArea.querySelector(selector));
  if (actual.items)
    return (searchEl = actual.searchArea.querySelectorAll(selector));
  if (!actual.items && actual.kinship) {
    for (let i = 0; i < actual.kinship.nthEl; i++) {
      if (!searchEl) return null;
      if (actual.kinship.element === "parent")
        searchEl = searchEl.parentElement;
      if (actual.kinship.element === "children")
        searchEl = searchEl.firstElementChild;
    }
    return searchEl;
  }

  return searchEl;
};

export const duplicateEl = (selector, isDeep = false) => {
  const protoEl = findEl(selector);
  const duplicatedEl = protoEl.cloneNode(isDeep);

  return duplicatedEl;
};

export const numberFromString = (string) => {
  const number = Number(string.match(/\d+/g));

  return number;
};

export const validate = (input, options = {}) => {
  const defaults = {
    toValidate: "quantity", // 'quantity', 'name', 'email'
    error: {
      message: [""],
      storage: null,
    },
  };
  const actual = Object.assign({}, defaults, options);

  const value = input.value;

  switch (actual.toValidate) {
    case "quantity":
      if (Number(value) !== NaN && value !== "" && value !== null) {
        return;
      } else {
        const textEl = document.createElement("div");

        textEl.innerText = actual.error.message;
        textEl.classList.add("input_error");
        input.classList.add("input_error");
        if (actual.error.storage)
          actual.error.storage.push(actual.error.message[0]);

        input.parentElement.appendChild(textEl);
      }
      break;

    case "name":
      break;

    case "email":
      break;

    default:
      break;
  }
};