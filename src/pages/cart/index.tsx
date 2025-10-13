"use client"

import { useState } from "react"
import EmptyCart from "@/components/cart/EmptyCart"
import CartWithItems from "@/components/cart/CartWithItems"


export interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
  unit: string
}

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  // Xử lý thêm sản phẩm mẫu
  const addSampleItem = () => {
    const sampleItem: CartItem = {
      id: "1",
      name: "MAMA HY Rong Biển Lá Kim đậu Ô Liu 3x4g",
      price: 29900,
      quantity: 1,
      image: "/products/mama-hy.jpg",
      unit: "Gói 3",
    }
    setCartItems((prev) => [...prev, sampleItem])
  }

  // Cập nhật số lượng sản phẩm
  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item))
    )
  }

  // Xóa một sản phẩm
  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  // Xóa toàn bộ giỏ hàng
  const clearCart = () => {
    setCartItems([])
  }

  // Render theo trạng thái giỏ hàng
  return (
    <div>
      
      {cartItems.length === 0 ? (
        <EmptyCart onContinueShopping={addSampleItem} />
      ) : (
        <CartWithItems
          items={cartItems}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeItem}
          onClearCart={clearCart}
        />
      )}
    </div>
  )
}
