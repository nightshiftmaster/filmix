import { useEffect } from "react";

const isInputFocused = () => {
  const tag = document.activeElement?.tagName;
  return tag === "INPUT" || tag === "TEXTAREA";
};

export function usePageKeyboard({ navigate, page = "home" } = {}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key.toLowerCase();
      const searchEl = document.querySelector("[data-section='search']");

      switch (e.key) {
        case "/":
          if (document.activeElement !== searchEl) {
            e.preventDefault();
            searchEl?.focus();
          }
          return;
        case "Escape":
          e.preventDefault();
          if (page === "movie" && navigate) navigate("/");
          return;
        default:
          break;
      }

      if (page === "movie") {
        const favoritesBtn = document.querySelector(
          "[data-section='add-favorites']",
        );
        const backHomeBtn = document.querySelector(
          "[data-section='back-home']",
        );
        const activeEl = document.activeElement;

        if (
          (key === "arrowdown" || key === "arrowup") &&
          activeEl === searchEl &&
          document.querySelector("[data-section='search-results']")
        ) {
          return;
        }

        if (key === "arrowdown" && activeEl === searchEl) {
          e.preventDefault();
          favoritesBtn?.focus();
          return;
        }
        if (key === "arrowdown" && activeEl === favoritesBtn) {
          e.preventDefault();
          backHomeBtn?.focus();
          return;
        }
        if (key === "arrowup" && activeEl === backHomeBtn) {
          e.preventDefault();
          favoritesBtn?.focus();
          return;
        }
        if (key === "arrowup" && activeEl === favoritesBtn) {
          e.preventDefault();
          searchEl?.focus();
          return;
        }

        if (isInputFocused()) return;
        if (key === "b") {
          e.preventDefault();
          backHomeBtn?.focus();
        } else if (key === "f") {
          e.preventDefault();
          favoritesBtn?.focus();
        }
        return;
      }

      if (isInputFocused()) return;

      const firstTab = document.querySelector(
        "[data-section='filter-tabs'] button",
      );
      if (key === "m") {
        e.preventDefault();
        firstTab?.focus();
      } else if (key === "f") {
        e.preventDefault();
        document.querySelector("[data-movie-card]")?.focus();
      } else if (key === "p") {
        const pagination = document.querySelector(
          "[data-section='pagination']",
        );
        const target =
          pagination?.querySelector("[aria-current='page']") ||
          pagination?.querySelector("button");
        if (target) {
          e.preventDefault();
          target.focus();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [navigate, page]);
}

export const useHomePageKeyboard = () => usePageKeyboard({ page: "home" });
export const useMoviePageKeyboard = (navigate) =>
  usePageKeyboard({ page: "movie", navigate });
