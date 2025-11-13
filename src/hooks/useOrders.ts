"use client"

import { useState, useCallback, useEffect } from "react"
import type { Order } from "@/types/order"
import type { CartItem } from "@/types/cart.type"
import { orderService } from "@/api"
import { useAuthStore } from "@/stores/authStore"

export interface CreateOrderCustomerInfo {
  name: string
  phone: string
  address: string
  notes?: string
  requestInvoice?: boolean
  invoiceCompanyName?: string
  invoiceCompanyAddress?: string
  invoiceTaxCode?: string
  invoiceEmail?: string
}

export function useOrders() {
  const { user, isAuthenticated } = useAuthStore()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Lấy userId từ cả id và _id (tránh case backend trả về _id)
  const userId = (user as any)?.id || (user as any)?._id
  const role = (user as any)?.role?.toLowerCase?.()
  const isStaff = role === "staff" || role === "admin"

  const replaceOrderInState = useCallback((updatedOrder: Order) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => {
        const orderId = order.id || order._id
        const updatedId = updatedOrder.id || updatedOrder._id
        return orderId === updatedId ? updatedOrder : order
      })
    )
  }, [])

  // Fetch orders từ API khi user đăng nhập
  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated || (!userId && !isStaff)) {
        setLoading(false)
        setOrders([])
        return
      }

      try {
        setLoading(true)
        setError(null)
        if (isStaff) {
          const { orders: staffOrders } = await orderService.getStaffOrders()
          setOrders(staffOrders)
        } else {
          const fetchedOrders = await orderService.getMyOrders()
          setOrders(fetchedOrders)
        }
      } catch (err: any) {
        console.error("Error fetching orders:", err)
        setError(err?.response?.data?.message || "Không thể tải danh sách đơn hàng")
        setOrders([])
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [isAuthenticated, userId, isStaff])

  const confirmOrder = useCallback(async (orderId: string) => {
    if (isStaff) {
      const updatedOrder = await orderService.confirmOrderByStaff(orderId)
      replaceOrderInState(updatedOrder)
    } else {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "confirmed" } : order
        )
      )
    }
  }, [isStaff, replaceOrderInState])

  const rejectOrder = useCallback((orderId: string) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) => 
        order.id === orderId 
          ? { ...order, status: "rejected" as const } 
          : order
      )
    )
  }, [])

  const deliverOrder = useCallback(async (orderId: string) => {
    if (isStaff) {
      // Backend yêu cầu trạng thái shipped trước khi delivered
      const shippedOrder = await orderService.shipOrder(orderId)
      replaceOrderInState(shippedOrder)
      const deliveredOrder = await orderService.deliverOrderByStaff(orderId)
      replaceOrderInState(deliveredOrder)
    } else {
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: "delivered" } : order
        )
      )
    }
  }, [isStaff, replaceOrderInState])

  const cancelOrder = useCallback(async (orderId: string, reason?: string) => {
    try {
      const updatedOrder = isStaff
        ? await orderService.cancelOrderByStaff(orderId, reason)
        : await orderService.cancelOrder(orderId, reason)
      replaceOrderInState(updatedOrder)
    } catch (err: any) {
      console.error("Cancel order failed:", err)
      throw err
    }
  }, [isStaff, replaceOrderInState])

  // Tạo đơn hàng mới từ giỏ hàng
  const createOrder = useCallback((
    cartItems: CartItem[], 
    customerInfo: CreateOrderCustomerInfo
  ) => {
    const invoiceNotes = customerInfo.requestInvoice
      ? [
          `Xuất hóa đơn công ty`,
          customerInfo.invoiceCompanyName && `Tên công ty: ${customerInfo.invoiceCompanyName}`,
          customerInfo.invoiceCompanyAddress && `Địa chỉ: ${customerInfo.invoiceCompanyAddress}`,
          customerInfo.invoiceTaxCode && `Mã số thuế: ${customerInfo.invoiceTaxCode}`,
          customerInfo.invoiceEmail && `Email: ${customerInfo.invoiceEmail}`,
        ]
          .filter(Boolean)
          .join(" | ")
      : ""

    const combinedNotes = [customerInfo.notes, invoiceNotes].filter(Boolean).join(" | ")

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      customer_name: customerInfo.name,
      customer_phone: customerInfo.phone,
      customer_address: customerInfo.address,
      items: cartItems.map((item, index) => ({
        id: `item-${Date.now()}-${index}`,
        product_id: parseInt(item.id),
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
        unit: item.unit
      })),
      total_amount: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0),
      status: "pending",
      created_at: new Date().toISOString(),
      notes: combinedNotes || undefined,
      is_company_invoice: customerInfo.requestInvoice || false,
      invoice_info: customerInfo.requestInvoice
        ? {
            company_name: customerInfo.invoiceCompanyName || "",
            company_address: customerInfo.invoiceCompanyAddress || "",
            tax_code: customerInfo.invoiceTaxCode || "",
            email: customerInfo.invoiceEmail || "",
          }
        : null
    }

    setOrders((prevOrders) => [newOrder, ...prevOrders])
    return newOrder.id
  }, [])

  return { 
    orders, 
    loading,
    error,
    confirmOrder, 
    rejectOrder, 
    deliverOrder, 
    cancelOrder, 
    createOrder 
  }
}
