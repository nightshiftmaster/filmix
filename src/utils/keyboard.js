export const handleTabsKeyboardNavigation = (
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
