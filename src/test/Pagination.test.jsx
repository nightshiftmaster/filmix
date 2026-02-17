import { useState } from "react";
import { describe, expect, it } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Pagination from "../components/Pagination";

function PaginationHost({ initialPage = 1, pagesCount = 10 }) {
  const [page, setPage] = useState(initialPage);
  return (
    <Pagination currentPage={page} setCurrentPage={setPage} pagesCount={pagesCount} />
  );
}

describe("Pagination focus retention", () => {
  it("keeps focus inside pagination after Enter/click page change", async () => {
    render(<PaginationHost initialPage={1} pagesCount={10} />);

    const next = screen.getByRole("button", { name: "Next page" });
    next.focus();
    fireEvent.click(next);

    await waitFor(() => {
      const pagination = screen.getByRole("navigation", { name: "Pagination" });
      expect(pagination.contains(document.activeElement)).toBe(true);
    });
  });
});
