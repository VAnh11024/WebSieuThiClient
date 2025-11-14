import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Loader2, PackageSearch, ChevronLeft } from "lucide-react";
import { productService } from "@/api";
import type { Product } from "@/types/product.type";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/cart/CartContext";
import { getProductId, getProductImage } from "@/lib/constants";
import { mapProductsFromApi } from "@/lib/utils/productMapper";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParam = (searchParams.get("q") || "").trim();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [skip, setSkip] = useState(0);
  const [lastBatchSize, setLastBatchSize] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const { addToCart } = useCart();

  const debouncedQuery = useMemo(() => queryParam, [queryParam]);

  useEffect(() => {
    setProducts([]);
    setSkip(0);
    setLastBatchSize(0);
    setHasMore(false);
    setError(null);
    setHasSearched(false);
  }, [queryParam]);

  useEffect(() => {
    if (!debouncedQuery) {
      setProducts([]);
      setLoading(false);
      return;
    }

    let isCancelled = false;
    setLoading(true);
    setError(null);

    productService
      .searchProducts(debouncedQuery, { skip })
      .then((response) => {
        if (isCancelled) return;

        const rawProducts = response?.products ?? [];
        const mappedProducts = mapProductsFromApi(rawProducts);

        setProducts((prev) => (skip === 0 ? mappedProducts : [...prev, ...mappedProducts]));
        setLastBatchSize(rawProducts.length);
        setHasMore(rawProducts.length > 0 && rawProducts.length === (response.actualLimit ?? rawProducts.length));
        setHasSearched(true);
      })
      .catch((err: unknown) => {
        if (isCancelled) return;

        let message = "Không thể tìm kiếm sản phẩm ngay lúc này. Vui lòng thử lại sau.";
        if (typeof err === "object" && err !== null && "response" in err) {
          const serverMessage =
            (err as { response?: { data?: { message?: string } } }).response?.data?.message;
          if (typeof serverMessage === "string" && serverMessage.trim().length > 0) {
            message = serverMessage;
          }
        } else if (err instanceof Error && err.message) {
          message = err.message;
        }

        setError(message);
        if (skip === 0) {
          setProducts([]);
        }
        setHasMore(false);
      })
      .finally(() => {
        if (!isCancelled) {
          setLoading(false);
        }
      });

    return () => {
      isCancelled = true;
    };
  }, [debouncedQuery, skip]);

  const handleLoadMore = () => {
    if (!hasMore || loading || lastBatchSize === 0) {
      return;
    }
    setSkip((prev) => prev + lastBatchSize);
  };

  const handleAddToCart = (product: Product & { selectedQuantity?: number }) => {
    const productId = getProductId(product);
    if (!productId) {
      return;
    }

    addToCart({
      id: productId,
      name: product.name,
      price: product.final_price || product.unit_price,
      image: getProductImage(product),
      unit: product.unit || "1 sản phẩm",
      quantity: product.selectedQuantity || 1,
    });
  };

  const isInitialLoading = loading && skip === 0;
  const isLoadingMore = loading && skip > 0;
  const shouldShowEmptyState = !queryParam && !loading;
  const shouldShowNoResults = hasSearched && products.length === 0 && !loading && !error;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-green-50 to-blue-50 w-full">
      <div className="bg-white border-b border-gray-200/60 shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto w-full px-3 sm:px-6 py-3 flex items-center">
          <Link to="/" className="mr-4 hover:bg-gray-100 p-2 rounded-full transition-colors" aria-label="Quay lại trang chủ">
            <ChevronLeft className="w-3 h-3 text-gray-700" />
          </Link>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Tìm Kiếm</h1>
        </div>
      </div>

      <div className="w-full px-0 py-4 lg:py-6">
        {error && (
          <div className="mx-3 sm:mx-6 mb-4 rounded-xl border border-red-200 bg-red-50/90 px-4 py-3 text-sm text-red-700 shadow-sm">
            {error}
          </div>
        )}

        {shouldShowEmptyState && (
          <div className="mx-3 sm:mx-6 rounded-2xl border border-dashed border-green-100 bg-green-50/60 px-6 py-10 text-center shadow-inner">
            <PackageSearch className="mx-auto h-12 w-12 text-green-500" />
            <h2 className="mt-4 text-lg font-semibold text-gray-800">
              Nhập từ khóa vào thanh tìm kiếm phía trên
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Ví dụ: “cá hộp”, “sữa tươi”, “nước mắm”, hoặc tên thương hiệu bạn yêu thích.
            </p>
          </div>
        )}

        {isInitialLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="flex items-center gap-3 text-green-600">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span>Đang tìm kiếm sản phẩm...</span>
            </div>
          </div>
        )}

        {shouldShowNoResults && (
          <div className="mx-3 sm:mx-6 rounded-2xl border border-gray-200 bg-gray-50 px-6 py-10 text-center shadow-inner">
            <PackageSearch className="mx-auto h-12 w-12 text-gray-400" />
            <h2 className="mt-4 text-lg font-semibold text-gray-800">
              Không tìm thấy sản phẩm phù hợp
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Thử nhập từ khóa khác hoặc xem các ngành hàng trong menu bên trái.
            </p>
            <Button
              variant="outline"
              className="mt-6 rounded-full border-green-500 text-green-600 hover:bg-green-50"
              onClick={() => setSearchParams({})}
            >
              Xóa từ khóa tìm kiếm
            </Button>
          </div>
        )}

        {!isInitialLoading && products.length > 0 && (
          <div className="mx-3 sm:mx-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="relative bg-gradient-to-r from-green-50 to-white py-4 sm:py-5 border-b-2 border-green-100">
                <div className="flex justify-center">
                  <div className="inline-flex items-center justify-center rounded-full bg-white border-2 border-green-600 px-6 sm:px-10 py-2.5 shadow-md max-w-full">
                    <h2 className="text-base sm:text-xl font-bold text-green-700 text-center uppercase tracking-wide max-w-full truncate px-2">
                      {queryParam || "Kết quả tìm kiếm"}
                    </h2>
                  </div>
                </div>
              </div>

              <div className="px-4 sm:px-6 py-4 sm:py-6 flex flex-col gap-4">
                <div className="text-sm text-gray-500">
                  {`Đang hiển thị ${products.length} sản phẩm${queryParam ? ` cho từ khóa "${queryParam}"` : ""}.`}
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
                  {products.map((product) => (
                    <ProductCard
                      key={product.id || product._id}
                      product={product}
                      onAddToCart={handleAddToCart}
                    />
                  ))}
                </div>

                {isLoadingMore && (
                  <div className="flex items-center justify-center py-4 text-green-600">
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    <span>Đang tải thêm sản phẩm...</span>
                  </div>
                )}

                {hasMore && !isLoadingMore && (
                  <div className="flex justify-center pt-2">
                    <Button
                      onClick={handleLoadMore}
                      className="rounded-full bg-green-600 hover:bg-green-700 text-white px-6 shadow-md"
                    >
                      Xem thêm sản phẩm
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

