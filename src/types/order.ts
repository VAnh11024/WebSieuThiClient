export interface OrderItem {
  id: string
  product_id: number
  name: string
  price: number
  quantity: number
  image: string
  unit: string
}

export interface OrderInvoiceInfo {
  company_name: string
  company_address: string
  tax_code: string
  email: string
}

export interface Order {
  id: string
  _id?: string // Backend field
  customer_name: string
  customer_phone: string
  customer_address: string
  items: OrderItem[]
  total_amount: number
  status: "pending" | "confirmed" | "rejected" | "cancelled" | "delivered"
  created_at: string
  notes?: string
  is_company_invoice?: boolean
  invoice_info?: OrderInvoiceInfo | null
}
