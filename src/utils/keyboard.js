export const handleKeyboardNavigation = (
  e,
  onTabChange,
  currentIndex,
  TABS,
) => {
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

export const handleGridKeyDown = (e) => {
  if (!ARROW_KEYS.includes(e.key)) return;

  const grid = e.currentTarget;
  const cards = [...grid.querySelectorAll("[data-movie-card]")];
  const focusedCard = e.target.closest("[data-movie-card]");
  const currentIndex = cards.indexOf(focusedCard);
  if (currentIndex === -1) return;

  const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
  const nextIndex = (currentIndex + step + cards.length) % cards.length;
  cards[nextIndex]?.focus();
};
