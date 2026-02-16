export const handleSearchKeyDown = (
  e,
  moviesList,
  setActiveIndex,
  showDropdown,
  closeDropdown,
  openActiveMovie,
  activeIndex,
) => {
  if (!showDropdown) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    setActiveIndex((i) => Math.min(i + 1, moviesList.length - 1));
  }

  if (e.key === "ArrowUp") {
    e.preventDefault();
    setActiveIndex((i) => Math.max(i - 1, 0));
  }

  if (e.key === "Enter") {
    if (activeIndex >= 0) {
      e.preventDefault();
      openActiveMovie();
    }
  }

  if (e.key === "Escape") {
    e.preventDefault();
    closeDropdown();
  }
};

export const handleTabsKeyDown = (e, onTabChange, currentIndex, TABS) => {
  lastKeyboardAt = Date.now();
  switch (e.key) {
    case "ArrowLeft":
      e.preventDefault();
      if (currentIndex > 0) {
        onTabChange(TABS[currentIndex - 1].id);
      }
      break;
    case "ArrowRight":
      e.preventDefault();
      if (currentIndex < TABS.length - 1) {
        onTabChange(TABS[currentIndex + 1].id);
      }
  }
};

export const handleFilterTabsKeyDown = (
  e,
  { currentIndex, onTabChange, TABS, clear },
) => {
  if (e.key === "ArrowUp" && currentIndex === 0) {
    e.preventDefault();
    document.querySelector("[data-section='search']")?.focus();
    return;
  }
  if (e.key === "ArrowDown") {
    e.preventDefault();
    document.querySelector("[data-movie-card]")?.focus();
    return;
  }
  if (e.key === "ArrowLeft" || e.key === "ArrowRight") clear();
  handleTabsKeyDown(e, onTabChange, currentIndex, TABS);
};

export const handlePaginationKeyDown = (e) => {
  if (e.key !== "ArrowLeft" && e.key !== "ArrowRight" && e.key !== "ArrowUp")
    return;
  const nav = e.currentTarget;
  const buttons = [...nav.querySelectorAll("button")];
  const focused = e.target.closest?.("button") || document.activeElement;
  const currentIndex = buttons.indexOf(focused);

  if (e.key === "ArrowUp") {
    e.preventDefault();
    const cards = document.querySelectorAll("[data-movie-card]");
    cards[cards.length - 1]?.focus();
    return;
  }

  if (e.key === "ArrowLeft" && currentIndex > 0) {
    e.preventDefault();
    buttons[currentIndex - 1].focus();
  }
  if (
    e.key === "ArrowRight" &&
    currentIndex >= 0 &&
    currentIndex < buttons.length - 1
  ) {
    e.preventDefault();
    buttons[currentIndex + 1].focus();
  }
};

const ARROW_KEYS = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
const KEYBOARD_GRACE_MS = 500;
const GRID_COLUMNS = 4;
let lastKeyboardAt = 0;

export const isRecentKeyboardNavigation = () =>
  Date.now() - lastKeyboardAt < KEYBOARD_GRACE_MS;

export const handleMoviesKeyDown = (e) => {
  lastKeyboardAt = Date.now();
  if (e.key === "Tab") e.preventDefault();
  if (!ARROW_KEYS.includes(e.key)) return;
  const grid = e.currentTarget;
  const cards = [...grid.querySelectorAll("[data-movie-card]")];
  const focusedCard = e.target.closest("[data-movie-card]");
  const currentIndex = cards.indexOf(focusedCard);
  if (currentIndex === -1) return;

  if (e.key === "ArrowUp" && currentIndex < GRID_COLUMNS) {
    e.preventDefault();
    document
      .querySelector("[data-section='filter-tabs']")
      ?.querySelector("button")
      ?.focus();
    return;
  }

  const step =
    e.key === "ArrowRight"
      ? 1
      : e.key === "ArrowLeft"
        ? -1
        : e.key === "ArrowDown"
          ? 4
          : -4;
  const nextIndex = (currentIndex + step + cards.length) % cards.length;
  cards[nextIndex]?.focus();
};

export const handleGridKeyDown = handleMoviesKeyDown;
