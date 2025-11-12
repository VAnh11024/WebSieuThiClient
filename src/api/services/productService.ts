import api from "../axiosConfig";
import type { Product } from "../../types";

/**
 * Product Service - Xử lý các API liên quan đến sản phẩm (khớp với NestJS backend)
 */
class ProductService {
  private readonly basePath = "/products";

  /**
   * Lấy danh sách sản phẩm (có thể filter theo category)
   * GET /products?category=slug&page=1&limit=10
   */
  async getProducts(
    categorySlug?: string,
    params?: { page?: number; limit?: number }
  ): Promise<Product[]> {
    const response = await api.get<Product[]>(this.basePath, {
      params: {
        ...(categorySlug && { category: categorySlug }),
        ...params,
      },
    });
    return response.data;
  }

  /**
   * Lấy sản phẩm khuyến mãi (có thể filter theo category)
   * GET /products/promotions?category=slug
   */
  async getProductPromotions(
    categorySlug?: string,
    params?: { page?: number; limit?: number }
  ): Promise<Product[]> {
    const response = await api.get<Product[]>(`${this.basePath}/promotions`, {
      params: {
        ...(categorySlug && { category: categorySlug }),
        ...params,
      },
    });
    return response.data;
  }

  /**
   * Lấy chi tiết sản phẩm theo ID
   * GET /products/:id
   */
  async getProductById(id: string): Promise<Product> {
    const response = await api.get<Product>(`${this.basePath}/${id}`);
    return response.data;
  }

  /**
   * Lấy sản phẩm liên quan (cùng category)
   * GET /products/:id/related?limit=5
   */
  async getRelatedProducts(id: string, limit: number = 5): Promise<Product[]> {
    const response = await api.get<Product[]>(
      `${this.basePath}/${id}/related`,
      {
        params: { limit },
      }
    );
    return response.data;
  }
}

export default new ProductService();
