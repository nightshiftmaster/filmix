import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SCROLL_STEP = 120;

const isInputFocused = () => {
  const tag = document.activeElement?.tagName;
  return tag === "INPUT" || tag === "TEXTAREA";
};

export function useAppScrollControls(containerRef) {
  const { pathname } = useLocation();

  useEffect(() => {
    const onWheel = (e) => e.preventDefault();
    document.addEventListener("wheel", onWheel, { passive: false });
    return () => document.removeEventListener("wheel", onWheel);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (isInputFocused() || e.defaultPrevented) return;
      const container = containerRef.current;
      if (!container) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          container.scrollBy({ top: SCROLL_STEP, behavior: "smooth" });
          break;
        case "ArrowUp":
          e.preventDefault();
          container.scrollBy({ top: -SCROLL_STEP, behavior: "smooth" });
          break;
        case "PageDown":
        case " ":
          e.preventDefault();
          container.scrollBy({ top: container.clientHeight, behavior: "smooth" });
          break;
        case "PageUp":
          e.preventDefault();
          container.scrollBy({ top: -container.clientHeight, behavior: "smooth" });
          break;
        case "Home":
          e.preventDefault();
          container.scrollTo({ top: 0, behavior: "smooth" });
          break;
        case "End":
          e.preventDefault();
          container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [containerRef]);

  useEffect(() => {
    containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, containerRef]);
}
