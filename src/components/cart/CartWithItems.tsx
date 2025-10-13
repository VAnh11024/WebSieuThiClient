"use client"

import { ChevronLeft, X, Minus, Plus, Ticket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"

interface CartWithItemsProps {
  items: CartItem[]
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
  onClearCart: () => void
}

export default function CartWithItems({ items, onUpdateQuantity, onRemoveItem, onClearCart }: CartWithItemsProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shippingFee = subtotal >= 300000 ? 0 : 15000
  const discount = 0
  const total = subtotal + shippingFee - discount

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN").format(price) + " ₫"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center">
          <Link to="/" className="mr-4 hover:bg-gray-100 p-2 rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-semibold text-gray-800">Quay Về Trang Chủ</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              {/* Cart Items List */}
              <div className="divide-y">
                {items.map((item) => (
                  <div key={item.id} className="p-4 flex gap-4">
                    {/* Product Image */}
                    <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">{item.name}</h3>
                      <p className="text-xs text-gray-500 mb-2">{item.unit}</p>
                      <p className="text-lg font-semibold text-red-600">{formatPrice(item.price)}</p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end gap-2">
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X className="w-5 h-5" />
                      </button>

                      <div className="flex items-center border border-red-500 rounded-full overflow-hidden">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-50 transition-colors"
                        >
                          <Minus className="w-4 h-4 text-red-500" />
                        </button>
                        <span className="px-4 py-1 text-sm font-medium min-w-[40px] text-center">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-50 transition-colors"
                        >
                          <Plus className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Clear Cart Button */}
              <div className="p-4 border-t">
                <button onClick={onClearCart} className="text-sm text-blue-600 hover:text-blue-700 underline">
                  Xóa giỏ hàng
                </button>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tạm tính giỏ hàng:</span>
                  <span className="font-medium">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tạm tính sản phẩm KM:</span>
                  <span className="font-medium">{formatPrice(0)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tiết kiệm được:</span>
                  <span className="font-medium">NaN ₫</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Phí vận chuyển <span className="text-xs text-gray-400">ⓘ</span>
                  </span>
                  <span className="font-medium">{formatPrice(shippingFee)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Khuyến mại</span>
                  <span className="font-medium">{formatPrice(discount)}</span>
                </div>
                <div className="flex justify-between text-base font-semibold pt-3 border-t">
                  <span>Thành tiền:</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 mb-4">(Giá đã bao gồm VAT)</p>

              <p className="text-sm mb-4">
                <span className="text-red-600 font-medium">Mua thêm</span>{" "}
                <span className="text-gray-700">
                  để miễn phí giao hàng tới <span className="font-semibold">300.000 ₫</span>
                </span>
              </p>

              {/* Discount Code Button */}
              <Button className="w-full bg-red-600 hover:bg-red-700 text-white mb-3 py-6">
                <Ticket className="w-5 h-5 mr-2" />
                Mã Giảm Giá
              </Button>

              {/* Checkout Button */}
              <Button className="w-full bg-gray-300 hover:bg-gray-400 text-gray-700 py-6">
                THANH TOÁN
                <br />
                <span className="text-sm">{formatPrice(total)}</span>
              </Button>

              {/* Special Offers */}
              <div className="mt-6 pt-6 border-t">
                <div className="flex items-center gap-2 text-red-600 font-medium">
                  <span className="text-xl">🎁</span>
                  <span>Ưu đãi đặc biệt cho bạn</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
