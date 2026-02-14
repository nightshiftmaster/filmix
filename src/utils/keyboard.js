export const handleSearchKeysNavigation = (
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

export const handleTabsKeysNavigation = (
  e,
  onTabChange,
  currentIndex,
  TABS,
) => {
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

const ARROW_KEYS = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
const KEYBOARD_GRACE_MS = 500;
let lastKeyboardAt = 0;

export const isRecentKeyboardNavigation = () =>
  Date.now() - lastKeyboardAt < KEYBOARD_GRACE_MS;

export const handleMoviesKeysNavigation = (e) => {
  lastKeyboardAt = Date.now();
  if (e.key === "Tab") e.preventDefault();
  if (!ARROW_KEYS.includes(e.key)) return;
  const grid = e.currentTarget;
  const cards = [...grid.querySelectorAll("[data-movie-card]")];
  const focusedCard = e.target.closest("[data-movie-card]");
  const currentIndex = cards.indexOf(focusedCard);
  if (currentIndex === -1) return;

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

export const handleGridKeysNavigation = handleMoviesKeysNavigation;
