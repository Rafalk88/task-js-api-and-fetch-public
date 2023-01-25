export const findEl = (selector, options = {}) => {
  const {
    searchArea = document, // querySelector search area
    items = false, // querySelector or querySelectorAll
    kinship = {
      element: null, // 'parent' or 'children'
      nthEl: 1, // which n-th element want to find
    },
  } = options;

  let searchEl;

  if (!items) return (searchEl = searchArea.querySelector(selector));
  if (items) return (searchEl = searchArea.querySelectorAll(selector));
  if (!items && kinship) {
    for (let i = 0; i < kinship.nthEl; i++) {
      if (!searchEl) return null;
      if (kinship.element === "parent") searchEl = searchEl.parentElement;
      if (kinship.element === "children") searchEl = searchEl.firstElementChild;
    }
    return searchEl;
  }

  return searchEl;
};
