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
    errorsStorage: [],
    message: "",
    pattern: /^[a-zA-Z0-9]*$/,
  };
  const actual = Object.assign({}, defaults, options);

  const value = input.value;
  const storage = actual.errorsStorage;
  const message = actual.message;
  const emptyMessage = "To pole jest wymagane";

  const createErrorField = (input, text) => {
    const textEl = document.createElement("div");

    textEl.innerText = text;
    textEl.classList.add("input_error");
    input.classList.add("input_error");

    input.parentElement.appendChild(textEl);
  };

  const deleteErrorField = (input) => {
    const errorEl = input.nextElementSibling;

    if (errorEl) {
      input.classList.remove("input_error");
      errorEl.remove();
    }
  };

  deleteErrorField(input);

  if (value === "") {
    createErrorField(input, emptyMessage);
    storage.push(emptyMessage);
    return;
  } else {
    if (!actual.pattern.test(Number(value))) {
      createErrorField(input, message);
      storage.push(message);
      return;
    } else {
      if (storage.length > 0) deleteErrorField(input);
    }
  }
};