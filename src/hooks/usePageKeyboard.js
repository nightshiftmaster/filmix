import { useEffect } from "react";

const isInputFocused = () => {
  const tag = document.activeElement?.tagName;
  return tag === "INPUT" || tag === "TEXTAREA";
};

export function useHomePageKeyboard() {
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
          return;
        default:
          break;
      }

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
    };
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, []);
}

export function useMoviePageKeyboard(navigate) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          navigate("/");
          return;
        default:
          break;
      }

      if (isInputFocused()) return;

      switch (e.key.toLowerCase()) {
        case "b":
          e.preventDefault();
          document.querySelector("[data-section='back-home']")?.focus();
          break;
        case "f":
          e.preventDefault();
          document.querySelector("[data-section='add-favorites']")?.focus();
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [navigate]);
}
