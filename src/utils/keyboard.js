export const handleTabsKeyboardNavigation = (
  e,
  onTabChange,
  currentIndex,
  TABS,
) => {
  lastKeyboardAt = Date.now();
  console.log(e.key);
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
export const handlePaginationKeyDown = (
  e,
  currentPage,
  setCurrentPage,
  pagesCount,
) => {
  const goTo = (page) =>
    setCurrentPage(Math.max(1, Math.min(pagesCount, page)));

  if (e.key === "ArrowRight") {
    e.preventDefault();
    goTo(currentPage + 1);
  }

  if (e.key === "ArrowLeft") {
    e.preventDefault();
    goTo(currentPage - 1);
  }

  if (e.key === "Home") {
    e.preventDefault();
    goTo(1);
  }

  if (e.key === "End") {
    e.preventDefault();
    goTo(pagesCount);
  }
};

const ARROW_KEYS = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];
const KEYBOARD_GRACE_MS = 500;
let lastKeyboardAt = 0;

export const isRecentKeyboardNavigation = () =>
  Date.now() - lastKeyboardAt < KEYBOARD_GRACE_MS;

export const handleMoviesKeyboardNavigation = (e) => {
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

export const handleGridKeyDown = handleMoviesKeyboardNavigation;
