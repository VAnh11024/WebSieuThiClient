import api from "../axiosConfig";
import type { MenuCombo } from "@/types/menu.type";

/**
 * Combo Service - Xử lý các API liên quan đến combo món ăn
 */
class ComboService {
  private readonly basePath = "/combos";

  /**
   * Lấy danh sách tất cả combo
   * GET /combos
   */
  async getCombos(): Promise<MenuCombo[]> {
    const response = await api.get<MenuCombo[]>(this.basePath);
    return response.data;
  }

  /**
   * Lấy chi tiết combo theo ID
   * GET /combos/:id
   */
  async getComboById(id: string): Promise<MenuCombo> {
    const response = await api.get<MenuCombo>(`${this.basePath}/${id}`);
    return response.data;
  }

  /**
   * Tạo combo mới (Admin)
   * POST /combos
   */
  async createCombo(formData: FormData): Promise<MenuCombo> {
    const response = await api.post<MenuCombo>(this.basePath, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }

  /**
   * Cập nhật combo (Admin)
   * PUT /combos/:id
   */
  async updateCombo(id: string, formData: FormData): Promise<MenuCombo> {
    const response = await api.put<MenuCombo>(
      `${this.basePath}/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }

  /**
   * Xóa combo (Admin)
   * DELETE /combos/:id
   */
  async deleteCombo(id: string): Promise<{ message: string }> {
    const response = await api.delete<{ message: string }>(
      `${this.basePath}/${id}`
    );
    return response.data;
  }

  /**
   * Lấy danh sách combo cho admin (có phân trang)
   * GET /combos/combos-admin
   */
  async getCombosAdmin(
    page: number = 1,
    limit: number = 10,
    key?: string
  ): Promise<{
    total: number;
    page: number;
    limit: number;
    combos: MenuCombo[];
  }> {
    const response = await api.get<{
      total: number;
      page: number;
      limit: number;
      combos: MenuCombo[];
    }>(`${this.basePath}/combos-admin`, {
      params: { page, limit, key },
    });
    return response.data;
  }
}

export default new ComboService();
