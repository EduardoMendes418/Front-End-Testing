"use client";
import { useState } from "react";
import { Product } from "../../models/Product";
import toast, { Toaster } from "react-hot-toast";

interface ProductFormProps {
  onSubmit: (product: Omit<Product, "id">) => void;
  initialData?: Omit<Product, "id"> | null;
  isUpdating?: boolean;
}

const ProductForm: React.FC<ProductFormProps> = ({ 
  onSubmit, 
  initialData = null,
  isUpdating = false 
}) => {
  const [formData, setFormData] = useState<Omit<Product, "id">>(
    initialData || {
      name: "",
      category: "",
      price: 0,
      description: "",
      image: "",
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    toast.success(
      isUpdating 
        ? "Produto atualizado com sucesso!" 
        : "Produto adicionado com sucesso!"
    );
    
    if (!isUpdating) {
      setFormData({
        name: "",
        category: "",
        price: 0,
        description: "",
        image: "",
      });
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== "" &&
      formData.category.trim() !== "" &&
      formData.price > 0 &&
      formData.description.trim() !== "" &&
      formData.image.trim() !== ""
    );
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#4BB543",
            color: "#fff",
          },
        }}
      />

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-500">
          {isUpdating ? "Editar Produto" : "Novo Produto"}
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Nome
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none "
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="category">
            Categoria
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="price">
            Valor
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="image">
            Imagem com URL
          </label>
          <input
            type="url"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid()}
          className={`w-full py-2 px-4 rounded-lg transition-colors ${
            isFormValid()
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isUpdating ? "Atualizar" : "Adicionar"}
        </button>
      </form>
    </>
  );
};

export default ProductForm;