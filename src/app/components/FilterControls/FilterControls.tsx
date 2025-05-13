"use client";
import { useState, useEffect } from "react";

type SortableField = "name" | "price" | "category";

interface FilterControlsProps {
  onFilter: (filters: {
    name?: string;
    minPrice?: number;
    maxPrice?: number;
  }) => void;
  onSort: (key: SortableField, direction: "asc" | "desc") => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  onFilter,
  onSort,
}) => {
  const [name, setName] = useState("");
  const [minPrice, setMinPrice] = useState<number | undefined>();
  const [maxPrice, setMaxPrice] = useState<number | undefined>();
  const [sortKey, setSortKey] = useState<SortableField>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  useEffect(() => {
    const timer = setTimeout(() => {
      onFilter({ name, minPrice, maxPrice });
    }, 300);

    return () => clearTimeout(timer);
  }, [name, minPrice, maxPrice, onFilter]);

  useEffect(() => {
    onSort(sortKey, sortDirection);
  }, [sortKey, sortDirection, onSort]);

  const handleSortKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortKey(e.target.value as SortableField);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-1">Nome</label>
          <input
            type="text"
            placeholder="Produtos"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Valor</label>
          <input
            type="number"
            placeholder="Mínimo"
            value={minPrice || ""}
            onChange={(e) =>
              setMinPrice(
                e.target.value ? parseFloat(e.target.value) : undefined
              )
            }
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            min="0"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Valor</label>
          <input
            type="number"
            placeholder="Máximo"
            value={maxPrice || ""}
            onChange={(e) =>
              setMaxPrice(
                e.target.value ? parseFloat(e.target.value) : undefined
              )
            }
            className="w-full px-3 py-2 border rounded-lg focus:outline-none "
            min="0"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label className="text-gray-700">Busca</label>

        <select
          data-testid="sort-key"
          value={sortKey}
          onChange={handleSortKeyChange}
          className="px-3 py-2 border rounded-lg focus:outline-none"
        >
          <option value="name">Nome</option>
          <option value="price">Valor</option>
          <option value="category">Categoria</option>
        </select>

        <select
          data-testid="sort-direction"
          value={sortDirection}
          onChange={(e) => setSortDirection(e.target.value as "asc" | "desc")}
          className="px-3 py-2 border rounded-lg focus:outline-none "
        >
          <option value="asc">A-Z</option>
          <option value="desc">Z-A</option>
        </select>
      </div>
    </div>
  );
};

export default FilterControls;
