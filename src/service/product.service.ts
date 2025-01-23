import { Product } from "~/types/product";
import apiClient from "./apiClient.service";

export const productService = {
  fetchProducts: async (): Promise<Product[]> => {
    try {
      const response = await apiClient.get<Product[]>("/products");
      return response;
    } catch (error) {
      console.error("Error fetching products:", error);
      throw error;
    }
  },

  fetchProductById: async (id: number): Promise<Product> => {
    try {
      const response = await apiClient.get<Product>(`/products/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching product with ID ${id}:`, error);
      throw error;
    }
  },

  createProduct: async (product: Omit<Product, "id">): Promise<Product> => {
    try {
      const response = await apiClient.post<Product>("/products", product);
      return response;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  updateProduct: async (
    id: number,
    product: Partial<Product>
  ): Promise<Product> => {
    try {
      const response = await apiClient.put<Product>(`/products/${id}`, product);
      return response;
    } catch (error) {
      console.error(`Error updating product with ID ${id}:`, error);
      throw error;
    }
  },

  deleteProduct: async (id: number): Promise<void> => {
    try {
      await apiClient.delete(`/products/${id}`);
    } catch (error) {
      console.error(`Error deleting product with ID ${id}:`, error);
      throw error;
    }
  },
};
