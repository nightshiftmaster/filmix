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

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, moviesList.length - 1));
      break;
    case "ArrowUp":
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
      break;
    case "Enter":
      if (activeIndex >= 0) {
        e.preventDefault();
        openActiveMovie();
      }
      break;
    case "Escape":
      e.preventDefault();
      closeDropdown();
      break;
  }
};

export const handleTabsKeyDown = (e, onTabChange, currentIndex, TABS) => {
  lastKeyboardAt = Date.now();
  switch (e.key) {
    case "ArrowLeft":
      e.preventDefault();
      if (currentIndex > 0) onTabChange(TABS[currentIndex - 1].id);
      break;
    case "ArrowRight":
      e.preventDefault();
      if (currentIndex < TABS.length - 1)
        onTabChange(TABS[currentIndex + 1].id);
      break;
  }
};

export const handleFilterTabsKeyDown = (
  e,
  { currentIndex, onTabChange, TABS, clear },
) => {
  switch (e.key) {
    case "ArrowUp":
      e.preventDefault();
      document.querySelector("[data-section='search']")?.focus();
      return;
    case "ArrowDown":
      e.preventDefault();
      document.querySelector("[data-movie-card]")?.focus();
      return;
    case "ArrowLeft":
    case "ArrowRight":
      clear();
      handleTabsKeyDown(e, onTabChange, currentIndex, TABS);
      break;
  }
};

export const handlePaginationKeyDown = (e) => {
  const nav = e.currentTarget;
  const buttons = [...nav.querySelectorAll("button")];
  const focused = e.target.closest?.("button") || document.activeElement;
  const currentIndex = buttons.indexOf(focused);

  switch (e.key) {
    case "ArrowUp":
      e.preventDefault();
      const cards = document.querySelectorAll("[data-movie-card]");
      cards[cards.length - 1]?.focus();
      break;
    case "ArrowLeft":
      if (currentIndex > 0) {
        e.preventDefault();
        buttons[currentIndex - 1].focus();
      }
      break;
    case "ArrowRight":
      if (currentIndex >= 0 && currentIndex < buttons.length - 1) {
        e.preventDefault();
        buttons[currentIndex + 1].focus();
      }
      break;
  }
};

const ARROW_KEYS = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
const GRID_COLUMNS = 4;
const GRID_STEP = {
  ArrowLeft: -1,
  ArrowRight: 1,
  ArrowUp: -4,
  ArrowDown: 4,
};
let lastKeyboardAt = 0;

export const isRecentKeyboardNavigation = () =>
  Date.now() - lastKeyboardAt < 500;

export const markKeyboardNavigation = () => {
  lastKeyboardAt = Date.now();
};

export const handleMoviesKeyDown = (e) => {
  lastKeyboardAt = Date.now();
  if (e.key === "Tab") {
    e.preventDefault();
    return;
  }
  if (!ARROW_KEYS.includes(e.key)) return;

  const grid = e.currentTarget;
  const cards = [...grid.querySelectorAll("[data-movie-card]")];
  const focusedCard = e.target.closest("[data-movie-card]");
  const currentIndex = cards.indexOf(focusedCard);
  if (currentIndex === -1) return;

  switch (e.key) {
    case "ArrowUp":
      if (currentIndex < GRID_COLUMNS) {
        e.preventDefault();
        document
          .querySelector("[data-section='filter-tabs']")
          ?.querySelector("button")
          ?.focus();
      } else {
        e.preventDefault();
        cards[currentIndex + GRID_STEP.ArrowUp]?.focus();
      }
      break;
    case "ArrowDown":
      if (currentIndex + GRID_COLUMNS >= cards.length) {
        e.preventDefault();
        const pagination = document.querySelector("[data-section='pagination']");
        const target =
          pagination?.querySelector("[aria-current='page']") ||
          pagination?.querySelector("button:not(:disabled)");
        target?.focus();
      } else {
        e.preventDefault();
        cards[currentIndex + GRID_STEP.ArrowDown]?.focus();
      }
      break;
    case "ArrowLeft":
    case "ArrowRight": {
      e.preventDefault();
      const step = GRID_STEP[e.key];
      const nextIndex = (currentIndex + step + cards.length) % cards.length;
      cards[nextIndex]?.focus();
      break;
    }
  }
};

export const handleGridKeyDown = handleMoviesKeyDown;
