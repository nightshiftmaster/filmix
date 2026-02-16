import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  handleTabsKeyDown,
  handleMoviesKeyDown,
  handlePaginationKeyDown,
} from "../utils/keyboard";

const TABS = [
  { id: "popular", label: "Popular" },
  { id: "now_playing", label: "Airing Now" },
  { id: "favorites", label: "My Favorites" },
];

describe("handleTabsKeyDown", () => {
  it("calls onTabChange with previous tab on ArrowLeft", () => {
    const onTabChange = vi.fn();
    const e = { key: "ArrowLeft", preventDefault: vi.fn() };
    handleTabsKeyDown(e, onTabChange, 1, TABS);
    expect(e.preventDefault).toHaveBeenCalled();
    expect(onTabChange).toHaveBeenCalledWith("popular");
  });

  it("does nothing on ArrowLeft when currentIndex is 0", () => {
    const onTabChange = vi.fn();
    const e = { key: "ArrowLeft", preventDefault: vi.fn() };
    handleTabsKeyDown(e, onTabChange, 0, TABS);
    expect(e.preventDefault).toHaveBeenCalled();
    expect(onTabChange).not.toHaveBeenCalled();
  });

  it("calls onTabChange with next tab on ArrowRight", () => {
    const onTabChange = vi.fn();
    const e = { key: "ArrowRight", preventDefault: vi.fn() };
    handleTabsKeyDown(e, onTabChange, 0, TABS);
    expect(e.preventDefault).toHaveBeenCalled();
    expect(onTabChange).toHaveBeenCalledWith("now_playing");
  });

  it("does nothing on ArrowRight when on last tab", () => {
    const onTabChange = vi.fn();
    const e = { key: "ArrowRight", preventDefault: vi.fn() };
    handleTabsKeyDown(e, onTabChange, TABS.length - 1, TABS);
    expect(e.preventDefault).toHaveBeenCalled();
    expect(onTabChange).not.toHaveBeenCalled();
  });
});

describe("handleMoviesKeyDown", () => {
  function Grid({ count = 8 }) {
    return (
      <div onKeyDown={handleMoviesKeyDown} tabIndex={-1} data-testid="grid">
        {Array.from({ length: count }, (_, i) => (
          <div key={i} data-movie-card tabIndex={0} data-testid={`card-${i}`}>
            Card {i}
          </div>
        ))}
      </div>
    );
  }

  it("moves focus right on ArrowRight", () => {
    render(<Grid count={8} />);
    const card0 = screen.getByTestId("card-0");
    const card1 = screen.getByTestId("card-1");
    card0.focus();
    fireEvent.keyDown(card0, { key: "ArrowRight" });
    expect(document.activeElement).toBe(card1);
  });

  it("moves focus left on ArrowLeft", () => {
    render(<Grid count={8} />);
    const card1 = screen.getByTestId("card-1");
    const card0 = screen.getByTestId("card-0");
    card1.focus();
    fireEvent.keyDown(card1, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(card0);
  });

  it("wraps from last to first on ArrowRight", () => {
    render(<Grid count={8} />);
    const card0 = screen.getByTestId("card-0");
    const card7 = screen.getByTestId("card-7");
    card7.focus();
    fireEvent.keyDown(card7, { key: "ArrowRight" });
    expect(document.activeElement).toBe(card0);
  });

  it("wraps from first to last on ArrowLeft", () => {
    render(<Grid count={8} />);
    const card0 = screen.getByTestId("card-0");
    const card7 = screen.getByTestId("card-7");
    card0.focus();
    fireEvent.keyDown(card0, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(card7);
  });

  it("moves focus down by 4 on ArrowDown", () => {
    render(<Grid count={8} />);
    const card0 = screen.getByTestId("card-0");
    const card4 = screen.getByTestId("card-4");
    card0.focus();
    fireEvent.keyDown(card0, { key: "ArrowDown" });
    expect(document.activeElement).toBe(card4);
  });

  it("moves focus up by 4 on ArrowUp", () => {
    render(<Grid count={8} />);
    const card4 = screen.getByTestId("card-4");
    const card0 = screen.getByTestId("card-0");
    card4.focus();
    fireEvent.keyDown(card4, { key: "ArrowUp" });
    expect(document.activeElement).toBe(card0);
  });

  it("ignores non-arrow keys", () => {
    render(<Grid count={8} />);
    const card0 = screen.getByTestId("card-0");
    card0.focus();
    fireEvent.keyDown(card0, { key: "Enter" });
    expect(document.activeElement).toBe(card0);
  });

  it("single card: arrow keys keep focus on same card", () => {
    render(<Grid count={1} />);
    const card0 = screen.getByTestId("card-0");
    card0.focus();
    fireEvent.keyDown(card0, { key: "ArrowRight" });
    expect(document.activeElement).toBe(card0);
    fireEvent.keyDown(card0, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(card0);
    fireEvent.keyDown(card0, { key: "ArrowDown" });
    expect(document.activeElement).toBe(card0);
    fireEvent.keyDown(card0, { key: "ArrowUp" });
    expect(document.activeElement).toBe(card0);
  });

  it("two cards: ArrowRight and ArrowLeft wrap", () => {
    render(<Grid count={2} />);
    const card0 = screen.getByTestId("card-0");
    const card1 = screen.getByTestId("card-1");
    card0.focus();
    fireEvent.keyDown(card0, { key: "ArrowRight" });
    expect(document.activeElement).toBe(card1);
    fireEvent.keyDown(card1, { key: "ArrowRight" });
    expect(document.activeElement).toBe(card0);
    fireEvent.keyDown(card0, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(card1);
  });

  it("ArrowDown from second row goes to third row", () => {
    render(<Grid count={12} />);
    const card4 = screen.getByTestId("card-4");
    const card8 = screen.getByTestId("card-8");
    card4.focus();
    fireEvent.keyDown(card4, { key: "ArrowDown" });
    expect(document.activeElement).toBe(card8);
  });

  it("ArrowDown from last row focuses pagination or keeps focus when no pagination", () => {
    render(<Grid count={10} />);
    const card8 = screen.getByTestId("card-8");
    card8.focus();
    fireEvent.keyDown(card8, { key: "ArrowDown" });
    expect(document.activeElement).toBe(card8);
  });

  it("ArrowDown from last row focuses pagination button when pagination exists", () => {
    render(
      <>
        <Grid count={10} />
        <nav data-section="pagination">
          <button type="button" data-testid="page-btn">
            1
          </button>
        </nav>
      </>,
    );
    const card8 = screen.getByTestId("card-8");
    const pageBtn = screen.getByTestId("page-btn");
    card8.focus();
    fireEvent.keyDown(card8, { key: "ArrowDown" });
    expect(document.activeElement).toBe(pageBtn);
  });

  it("ArrowUp from first row moves to tabs or keeps focus when no tabs", () => {
    render(<Grid count={10} />);
    const card2 = screen.getByTestId("card-2");
    card2.focus();
    fireEvent.keyDown(card2, { key: "ArrowUp" });
    expect(document.activeElement).toBe(card2);
  });

  it("ArrowUp from first row focuses first tab when tabs exist", () => {
    render(
      <>
        <div data-section="filter-tabs">
          <button type="button" data-testid="first-tab">
            Popular
          </button>
        </div>
        <Grid count={10} />
      </>,
    );
    const card2 = screen.getByTestId("card-2");
    const firstTab = screen.getByTestId("first-tab");
    card2.focus();
    fireEvent.keyDown(card2, { key: "ArrowUp" });
    expect(document.activeElement).toBe(firstTab);
  });

  it("does nothing when keydown target is not a card", () => {
    render(<Grid count={8} />);
    const grid = screen.getByTestId("grid");
    const card0 = screen.getByTestId("card-0");
    card0.focus();
    fireEvent.keyDown(grid, { key: "ArrowRight" });
    expect(document.activeElement).toBe(card0);
  });

  it("prevents default for Tab key", () => {
    render(<Grid count={8} />);
    const card0 = screen.getByTestId("card-0");
    const e = { key: "Tab", preventDefault: vi.fn() };
    const grid = card0.parentElement;
    Object.defineProperty(e, "currentTarget", { value: grid });
    Object.defineProperty(e, "target", { value: card0 });
    handleMoviesKeyDown(e);
    expect(e.preventDefault).toHaveBeenCalled();
  });

  it("sequence: right, right, down, down, left, up", () => {
    render(<Grid count={12} />);
    const card0 = screen.getByTestId("card-0");
    const card2 = screen.getByTestId("card-2");
    const card6 = screen.getByTestId("card-6");
    card0.focus();
    fireEvent.keyDown(card0, { key: "ArrowRight" });
    fireEvent.keyDown(screen.getByTestId("card-1"), { key: "ArrowRight" });
    expect(document.activeElement).toBe(card2);
    fireEvent.keyDown(card2, { key: "ArrowDown" });
    expect(document.activeElement).toBe(screen.getByTestId("card-6"));
    fireEvent.keyDown(screen.getByTestId("card-6"), { key: "ArrowDown" });
    expect(document.activeElement).toBe(screen.getByTestId("card-10"));
    fireEvent.keyDown(screen.getByTestId("card-10"), { key: "ArrowLeft" });
    expect(document.activeElement).toBe(screen.getByTestId("card-9"));
    fireEvent.keyDown(screen.getByTestId("card-9"), { key: "ArrowUp" });
    expect(document.activeElement).toBe(screen.getByTestId("card-5"));
  });

  it("ArrowUp from second row goes to first row", () => {
    render(<Grid count={12} />);
    const card5 = screen.getByTestId("card-5");
    const card1 = screen.getByTestId("card-1");
    card5.focus();
    fireEvent.keyDown(card5, { key: "ArrowUp" });
    expect(document.activeElement).toBe(card1);
  });
});

describe("handlePaginationKeyDown", () => {
  function PaginationWithCards() {
    return (
      <>
        <div data-movie-card tabIndex={0} data-testid="card-0">
          Card 0
        </div>
        <div data-movie-card tabIndex={0} data-testid="card-1">
          Card 1
        </div>
        <nav onKeyDown={handlePaginationKeyDown} data-testid="pagination">
          <button type="button" data-testid="prev">
            Prev
          </button>
          <button type="button" data-testid="page-2">
            2
          </button>
          <button type="button" data-testid="next">
            Next
          </button>
        </nav>
      </>
    );
  }

  it("moves focus left and right between pagination buttons", () => {
    render(<PaginationWithCards />);
    const prev = screen.getByTestId("prev");
    const page2 = screen.getByTestId("page-2");
    const next = screen.getByTestId("next");

    page2.focus();
    fireEvent.keyDown(page2, { key: "ArrowLeft" });
    expect(document.activeElement).toBe(prev);

    prev.focus();
    fireEvent.keyDown(prev, { key: "ArrowRight" });
    expect(document.activeElement).toBe(page2);

    page2.focus();
    fireEvent.keyDown(page2, { key: "ArrowRight" });
    expect(document.activeElement).toBe(next);
  });

  it("moves focus up from pagination to last movie card", () => {
    render(<PaginationWithCards />);
    const page2 = screen.getByTestId("page-2");
    const lastCard = screen.getByTestId("card-1");

    page2.focus();
    fireEvent.keyDown(page2, { key: "ArrowUp" });
    expect(document.activeElement).toBe(lastCard);
  });
});
