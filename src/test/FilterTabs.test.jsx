import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import FilterTabs from "../components/FilterTabs";

describe("FilterTabs", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("calls onTabChange immediately on click", () => {
    const onTabChange = vi.fn();
    render(<FilterTabs activeTab="popular" onTabChange={onTabChange} />);

    fireEvent.click(screen.getByRole("button", { name: "Airing Now" }));

    expect(onTabChange).toHaveBeenCalledTimes(1);
    expect(onTabChange).toHaveBeenCalledWith("now_playing");
  });

  it("calls onTabChange after 2 seconds on focus", async () => {
    const onTabChange = vi.fn();
    render(<FilterTabs activeTab="popular" onTabChange={onTabChange} />);

    const tab = screen.getByRole("button", { name: "Airing Now" });
    fireEvent.focus(tab);
    expect(onTabChange).not.toHaveBeenCalled();

    await act(async () => {
      vi.advanceTimersByTime(2000);
    });

    expect(onTabChange).toHaveBeenCalledTimes(1);
    expect(onTabChange).toHaveBeenCalledWith("now_playing");
  });

  it("does not call onTabChange if blur before 2 seconds", async () => {
    const onTabChange = vi.fn();
    render(<FilterTabs activeTab="popular" onTabChange={onTabChange} />);

    const tab = screen.getByRole("button", { name: "Airing Now" });
    fireEvent.focus(tab);
    fireEvent.blur(tab);

    await act(async () => {
      vi.advanceTimersByTime(2000);
    });

    expect(onTabChange).not.toHaveBeenCalled();
  });

  it("click cancels focus timer", async () => {
    const onTabChange = vi.fn();
    render(<FilterTabs activeTab="popular" onTabChange={onTabChange} />);

    const tab = screen.getByRole("button", { name: "Airing Now" });
    fireEvent.focus(tab);
    fireEvent.click(tab);

    expect(onTabChange).toHaveBeenCalledTimes(1);

    await act(async () => {
      vi.advanceTimersByTime(2000);
    });

    expect(onTabChange).toHaveBeenCalledTimes(1);
  });

  it("arrow key clears focus timer", async () => {
    const onTabChange = vi.fn();
    render(<FilterTabs activeTab="popular" onTabChange={onTabChange} />);

    const tab = screen.getByRole("button", { name: "Airing Now" });
    fireEvent.focus(tab);
    fireEvent.keyDown(tab, { key: "ArrowRight" });

    expect(onTabChange).toHaveBeenCalledWith("now_playing");

    await act(async () => {
      vi.advanceTimersByTime(2000);
    });

    expect(onTabChange).toHaveBeenCalledTimes(1);
  });
});
