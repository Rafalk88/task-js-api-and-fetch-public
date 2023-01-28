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

export const duplicateEl = (selector) => {
  const protoEl = findEl(selector);
  const duplicatedEl = protoEl.cloneNode(true);

  return duplicatedEl;
};
