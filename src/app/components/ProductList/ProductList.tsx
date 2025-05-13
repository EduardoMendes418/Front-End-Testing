/* eslint-disable @next/next/no-img-element */
"use client";
import { Product } from "../../models/Product";

interface ProductListProps {
  products: Product[];
  loading: boolean;
}

const ProductList: React.FC<ProductListProps> = ({ products, loading }) => {
  if (loading) {
    return <div className="text-center py-8">Carregando...</div>;
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-8">Desculpe não temos nenhum produto.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"  data-testid="product-grid">
      {products.map((product, index) => (
        <div
          key={`${product.id}-${index}`}
          className="border-2 border-gray-100 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          data-testid={`product-card-${product.id}`}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-1">{product.category}</p>
            <p className="text-lg font-bold mb-2">
              ${product.price.toFixed(2)}
            </p>
            <p className="text-gray-700">{product.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
