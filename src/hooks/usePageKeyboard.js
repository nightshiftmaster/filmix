import { useEffect } from "react";

export function useHomePageKeyboard() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const searchEl = document.querySelector("[data-section='search']");
      const firstTab = document.querySelector(
        "[data-section='filter-tabs'] button",
      );
      const inInput =
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA";

      if (e.key === "/") {
        if (document.activeElement !== searchEl) {
          e.preventDefault();
          searchEl?.focus();
        }
        return;
      }
      if (e.key.toLowerCase() === "m" && !inInput) {
        e.preventDefault();
        firstTab?.focus();
      }
      if (e.key.toLowerCase() === "f" && !inInput) {
        e.preventDefault();
        document.querySelector("[data-movie-card]")?.focus();
      }
      if (e.key.toLowerCase() === "p" && !inInput) {
        const pagination = document.querySelector("[data-section='pagination']");
        const currentPageBtn = pagination?.querySelector("[aria-current='page']");
        const firstBtn = pagination?.querySelector("button");
        const target = currentPageBtn || firstBtn;
        if (target) {
          e.preventDefault();
          target.focus();
        }
      }
      if (e.key === "Escape") {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, []);
}

export function useMoviePageKeyboard(navigate) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        navigate("/");
        return;
      }
      const inInput =
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA";
      if (inInput) return;
      if (e.key.toLowerCase() === "b") {
        e.preventDefault();
        document.querySelector("[data-section='back-home']")?.focus();
      }
      if (e.key.toLowerCase() === "f") {
        e.preventDefault();
        document.querySelector("[data-section='add-favorites']")?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown, true);
    return () => window.removeEventListener("keydown", handleKeyDown, true);
  }, [navigate]);
}
