import type { Product } from "@/types/product.type";

export const mapProductFromApi = (apiProduct: any): Product => {
  if (!apiProduct) {
    throw new Error("Invalid product data received from API");
  }

  const rawQuantity =
    typeof apiProduct.quantity === "number"
      ? apiProduct.quantity
      : typeof apiProduct.stock_quantity === "number"
        ? apiProduct.stock_quantity
        : undefined;

  const quantity =
    typeof rawQuantity === "number" && !Number.isNaN(rawQuantity)
      ? rawQuantity
      : undefined;

  const stockStatus =
    typeof apiProduct.stock_status === "string" && apiProduct.stock_status.trim() !== ""
      ? apiProduct.stock_status
      : typeof quantity === "number"
        ? quantity > 0
          ? "in_stock"
          : "out_of_stock"
        : "in_stock";

  return {
    _id: apiProduct._id || apiProduct.id,
    id: apiProduct.id || apiProduct._id,
    name: apiProduct.name || "Sản phẩm không tên",
    slug: apiProduct.slug || apiProduct.id || apiProduct._id || "",
    category_id: apiProduct.category_id,
    brand_id: apiProduct.brand_id,
    unit: apiProduct.unit,
    unit_price: Number(apiProduct.unit_price) || 0,
    price: Number(apiProduct.unit_price) || undefined,
    discount_percent: Number(apiProduct.discount_percent) || 0,
    final_price:
      typeof apiProduct.final_price === "number"
        ? apiProduct.final_price
        : Number(apiProduct.unit_price) || 0,
    image_primary: apiProduct.image_primary || apiProduct.image_url || "",
    image_url: apiProduct.image_primary || apiProduct.image_url || "",
    images: Array.isArray(apiProduct.images)
      ? apiProduct.images
      : apiProduct.image
        ? [apiProduct.image]
        : [],
    quantity,
    stock_quantity: quantity,
    stock_status: stockStatus,
    is_active: apiProduct.is_active ?? true,
    is_deleted: apiProduct.is_deleted ?? false,
    is_hot: apiProduct.is_hot ?? false,
    created_at: apiProduct.created_at,
    updated_at: apiProduct.updated_at,
    description: apiProduct.description,
  };
};

export const mapProductsFromApi = (products: any[] = []): Product[] => {
  return products.map(mapProductFromApi);
};

