"use client";

import React, { useEffect, useState } from "react";
import { productService } from "~/service/product.service";
import { Product } from "~/types/product";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  useEffect(() => {
    productService.fetchProducts().then((data) => setProducts(data));
  }, []);

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (editingProduct) {
      try {
        const updatedProduct = await productService.updateProduct(
          editingProduct.id,
          editingProduct
        );

        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          )
        );

        setEditingProduct(null);
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log("value", value);
    console.log("name", name); // category
    if (editingProduct) {
      setEditingProduct({
        ...editingProduct,
        [name]: value, //name
      });
    }
  };

  console.log("editingProduct", editingProduct);

  return (
    <div>
      <h1 className="text-3xl font-bold">Products</h1>
      <ul className="flex justify-around flex-wrap">
        {products.map((product) => (
          <li key={product.id}>
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p>{product.category}</p>
            <p>{product.quantity}</p>
            <button
              onClick={() => handleEditProduct(product)}
              className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
      <br />
      {editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
            <form onSubmit={handleUpdateProduct}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={editingProduct.name}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <input
                  type="text"
                  name="category"
                  value={editingProduct.category}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={editingProduct.quantity}
                  onChange={handleFormChange}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingProduct(null)}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
