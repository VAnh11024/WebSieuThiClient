/**
 * Product type - Khớp với Backend Schema
 * Mapping từ MongoDB Product schema
 */
export interface Product {
  _id?: string; // MongoDB ObjectId (được convert sang string)
  id?: string; // Alias cho _id để tương thích
  category_id?: string;
  brand_id?: string;
  name: string;
  slug: string;
  unit?: string; // Đơn vị: "pack", "bottle", "kg", etc.
  unit_price: number;
  discount_percent: number;
  final_price?: number;
  image_primary?: string; // Ảnh chính (single string, not array)
  images?: string[]; // Mảng ảnh phụ
  quantity: number; // Số lượng trong kho (số)
  stock_status: 'in_stock' | 'out_of_stock' | 'preorder';
  is_active?: boolean;
  is_deleted?: boolean;
  created_at?: string;
  updated_at?: string;
  
  // Các field tùy chỉnh cho FE (backward compatibility)
  selectedQuantity?: number; // Số lượng được chọn khi thêm vào giỏ
  image_url?: string; // Alias cho image_primary
  stock_quantity?: number; // Alias cho quantity
  price?: number; // Alias cho unit_price
  is_hot?: boolean; // Custom FE field
  description?: string; // Custom FE field
}

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}
