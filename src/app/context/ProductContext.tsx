/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { Product } from "../models/Product";
import {
  getProducts,
  addProduct as apiAddProduct,
} from "../services/productService";

interface ProductContextType {
  products: Product[];
  loading: boolean;
  filteredProducts: Product[];
  error: string | null;
  addProduct: (product: Omit<Product, "id">) => Promise<void>;
  filterProducts: (filters: {
    name?: string;
    minPrice?: number;
    maxPrice?: number;
  }) => void;
  sortProducts: (key: keyof Product, direction: "asc" | "desc") => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);
const LOCAL_STORAGE_KEY = "products";

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadLocalProducts = useCallback(() => {
    const localProducts = localStorage.getItem(LOCAL_STORAGE_KEY);
    return localProducts ? JSON.parse(localProducts) : null;
  }, []);

  const saveProductsToLocal = useCallback((prods: Product[]) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(prods));
  }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const localProducts = loadLocalProducts();

      if (localProducts && localProducts.length > 0) {
        setProducts(localProducts);
        setFilteredProducts(localProducts);
      } else {
        const data = await getProducts();
        setProducts(data);
        setFilteredProducts(data);

        saveProductsToLocal(data);
      }
    } catch (err) {
      setError("Failed to load products. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [loadLocalProducts, saveProductsToLocal]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddProduct = async (product: Omit<Product, "id">) => {
    try {
      setLoading(true);
      const newProduct = await apiAddProduct(product);

      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);

      saveProductsToLocal(updatedProducts);
    } catch (err) {
      setError("Failed to add product. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterProducts = useCallback(
    ({
      name,
      minPrice,
      maxPrice,
    }: {
      name?: string;
      minPrice?: number;
      maxPrice?: number;
    }) => {
      setFilteredProducts(() => {
        let filtered = [...products];

        if (name) {
          filtered = filtered.filter((p) =>
            p.name.toLowerCase().includes(name.toLowerCase())
          );
        }

        if (minPrice !== undefined) {
          filtered = filtered.filter((p) => p.price >= minPrice);
        }

        if (maxPrice !== undefined) {
          filtered = filtered.filter((p) => p.price <= maxPrice);
        }

        return filtered;
      });
    },
    [products]
  );

  const handleSortProducts = useCallback(
    (key: keyof Product, direction: "asc" | "desc") => {
      setFilteredProducts((prev) => {
        return [...prev].sort((a, b) => {
          if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
          if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
          return 0;
        });
      });
    },
    []
  );

  const contextValue = useMemo(
    () => ({
      products,
      loading,
      filteredProducts,
      error,
      addProduct: handleAddProduct,
      filterProducts: handleFilterProducts,
      sortProducts: handleSortProducts,
    }),
    [
      products,
      loading,
      filteredProducts,
      error,
      handleFilterProducts,
      handleSortProducts,
    ]
  );

  return (
    <ProductContext.Provider value={contextValue}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProductContext must be used within a ProductProvider");
  }
  return context;
};
