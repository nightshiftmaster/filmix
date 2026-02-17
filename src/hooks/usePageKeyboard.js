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
      const firstTab = document.querySelector(
        "[data-section='filter-tabs'] button",
      );

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

      switch (page) {
        case "movie":
          {
            const favoritesBtn = document.querySelector(
              "[data-section='add-favorites']",
            );
            const backHomeBtn = document.querySelector(
              "[data-section='back-home']",
            );

            switch (key) {
              case "arrowdown":
                if (document.activeElement === searchEl) {
                  e.preventDefault();
                  favoritesBtn?.focus();
                  return;
                }
                if (document.activeElement === favoritesBtn) {
                  e.preventDefault();
                  backHomeBtn?.focus();
                  return;
                }
                break;
              case "arrowup":
                if (document.activeElement === backHomeBtn) {
                  e.preventDefault();
                  favoritesBtn?.focus();
                  return;
                }
                if (document.activeElement === favoritesBtn) {
                  e.preventDefault();
                  searchEl?.focus();
                  return;
                }
                break;
              default:
                break;
            }

            if (isInputFocused()) return;
          }
          switch (key) {
            case "b":
              e.preventDefault();
              document.querySelector("[data-section='back-home']")?.focus();
              break;
            case "f":
              e.preventDefault();
              document.querySelector("[data-section='add-favorites']")?.focus();
              break;
          }
          return;
        case "home":
        default:
          if (isInputFocused()) return;
          switch (key) {
            case "m":
              e.preventDefault();
              firstTab?.focus();
              break;
            case "f":
              e.preventDefault();
              document.querySelector("[data-movie-card]")?.focus();
              break;
            case "p": {
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
              break;
            }
          }
          return;
      }
    };
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [navigate, page]);
}

export const useHomePageKeyboard = () => usePageKeyboard({ page: "home" });
export const useMoviePageKeyboard = (navigate) =>
  usePageKeyboard({ page: "movie", navigate });
