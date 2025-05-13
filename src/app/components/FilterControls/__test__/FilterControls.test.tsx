import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterControls from "../FilterControls";

describe("FilterControls Component", () => {
  const mockFilter = vi.fn();
  const mockSort = vi.fn();

  beforeEach(() => {
    mockFilter.mockClear();
    mockSort.mockClear();
  });

  it("renders correctly", () => {
    render(<FilterControls onFilter={mockFilter} onSort={mockSort} />);
    expect(screen.getByPlaceholderText("Produtos")).toBeInTheDocument();
  });

  it("updates price filters", async () => {
    render(<FilterControls onFilter={mockFilter} onSort={mockSort} />);
    const minInput = screen.getByPlaceholderText("Mínimo");

    fireEvent.change(minInput, { target: { value: "10" } });
    await new Promise((resolve) => setTimeout(resolve, 350));

    expect(mockFilter).toHaveBeenCalledWith(
      expect.objectContaining({
        minPrice: 10,
      })
    );
  });

  it("updates sort key", () => {
    render(<FilterControls onFilter={mockFilter} onSort={mockSort} />);
    const select = screen.getByTestId("sort-key");
    fireEvent.change(select, { target: { value: "price" } });
    expect(mockSort).toHaveBeenCalledWith("price", "asc");
  });

  it("updates sort direction", () => {
    render(<FilterControls onFilter={mockFilter} onSort={mockSort} />);
    const select = screen.getByTestId("sort-direction");
    fireEvent.change(select, { target: { value: "desc" } });
    expect(mockSort).toHaveBeenCalledWith("name", "desc");
  });
});
