export const findEl = (selector, options = {}) => {
  const {
    searchArea = document,
    kinship = {
      element: null,
      nthEl: 1,
    },
  } = options;

  let searchEl = searchArea.querySelector(selector);

  if (kinship) {
    for (let i = 0; i < kinship.nthEl; i++) {
      if (!searchEl) return null;
      if (kinship.element === "parent") searchEl = searchEl.parentElement;
      if (kinship.element === "children") searchEl = searchEl.firstElementChild;
    }
    return searchEl;
  }

  return searchEl;
};
