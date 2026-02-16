import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Search from "../components/Search";

const renderSearch = () =>
  render(
    <MemoryRouter>
      <Search />
    </MemoryRouter>,
  );

describe("Search debounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it("sends request only 500 ms after last input", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: [] }),
    });
    global.fetch = fetchMock;

    renderSearch();
    const input = screen.getByPlaceholderText("Search for a movie");

    await act(async () => {
      fireEvent.change(input, { target: { value: "ab" } });
    });
    expect(fetchMock).not.toHaveBeenCalled();

    await act(async () => {
      vi.advanceTimersByTime(500);
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toContain("query=ab");
  });

  it("sends one request with latest text when typing quickly", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ results: [] }),
    });
    global.fetch = fetchMock;

    renderSearch();
    const input = screen.getByPlaceholderText("Search for a movie");

    await act(async () => {
      fireEvent.change(input, { target: { value: "a" } });
    });
    await act(async () => {
      vi.advanceTimersByTime(200);
    });
    await act(async () => {
      fireEvent.change(input, { target: { value: "ab" } });
    });
    await act(async () => {
      vi.advanceTimersByTime(200);
    });
    await act(async () => {
      fireEvent.change(input, { target: { value: "abc" } });
    });
    expect(fetchMock).not.toHaveBeenCalled();

    await act(async () => {
      vi.advanceTimersByTime(500);
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toContain("query=abc");
  });
});
