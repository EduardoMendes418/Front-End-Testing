"use client";
import ProductList from "./components/ProductList/ProductList";
import ProductForm from "./components/ProductForm/ProductForm";
import FilterControls from "./components/FilterControls/FilterControls";
import Pagination from "./components/Pagination/Pagination";
import { useProductContext } from "./context/ProductContext";
import { useState } from "react";
import Image from "next/image";
import Magalu from "../../public/magalu.png";

export default function Home() {
  const {
    filteredProducts,
    loading,
    addProduct,
    filterProducts,
    sortProducts,
  } = useProductContext();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center">
          <Image
            src={Magalu}
            alt="Logo E-Commerce"
            className="mr-2 h-[4em] w-auto"
          />
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <FilterControls onFilter={filterProducts} onSort={sortProducts} />
              <ProductList products={currentProducts} loading={loading} />
              {filteredProducts.length > productsPerPage && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}
            </div>
            <div>
              <ProductForm onSubmit={addProduct} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
