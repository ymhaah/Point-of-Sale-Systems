"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"

export interface Product {
  id: number
  name: string
  description?: string
  category: string
  sku: string
  wholesalePrice: number
  sellingPrice: number
  stock: number
  minStock: number
  profit: number
  profitMargin: number
  unitsPerBox?: number
  supplier?: string
  image?: string
  status: "active" | "draft" | "discontinued"
  createdAt: string
  lastRestocked: string
  lastUpdated: string
  // Analytics fields
  totalSold: number
  totalRevenue: number
  totalProfit: number
  averageRating?: number
  viewCount: number
}

export interface InventoryItem {
  id: number
  name: string
  sku: string
  category: string
  currentStock: number
  minStock: number
  maxStock: number
  unitCost: number
  totalValue: number
  lastRestocked: string
  status: "good" | "low" | "critical"
  // Additional inventory metrics
  turnoverRate: number
  daysOfStock: number
  reorderPoint: number
}

export interface Sale {
  id: string
  date: string
  time: string
  items: Array<{
    productId: number
    name: string
    quantity: number
    price: number
    cost: number
  }>
  subtotal: number
  tax: number
  total: number
  profit: number
  paymentMethod: string
  status: string
  customerId?: string
}

export interface DashboardMetrics {
  totalRevenue: number
  totalProducts: number
  totalProfit: number
  lowStockItems: number
  todaySales: number
  inventoryValue: number
  profitMargin: number
  topSellingProducts: Array<{
    id: number
    name: string
    sold: number
    revenue: number
  }>
  categoryBreakdown: Array<{
    category: string
    count: number
    revenue: number
  }>
  recentActivity: Array<{
    type: "sale" | "restock" | "update"
    productId: number
    productName: string
    description: string
    timestamp: string
  }>
}

export interface AnalyticsData {
  salesTrends: Array<{
    date: string
    sales: number
    profit: number
    units: number
  }>
  productPerformance: Array<{
    productId: number
    name: string
    category: string
    totalSold: number
    revenue: number
    profit: number
    profitMargin: number
    turnoverRate: number
    trend: "up" | "down" | "stable"
  }>
  categoryAnalytics: Array<{
    category: string
    products: number
    totalRevenue: number
    totalProfit: number
    averageMargin: number
    topProduct: string
  }>
  lowPerformers: Array<{
    productId: number
    name: string
    reason: string
    suggestion: string
  }>
}

interface StoreState {
  products: Product[]
  inventory: InventoryItem[]
  sales: Sale[]
  dashboardMetrics: DashboardMetrics
  analyticsData: AnalyticsData

  // Product actions
  addProduct: (
    product: Omit<
      Product,
      "id" | "createdAt" | "lastRestocked" | "lastUpdated" | "totalSold" | "totalRevenue" | "totalProfit" | "viewCount"
    > & { status?: Product["status"] },
  ) => void
  updateProduct: (id: number, product: Partial<Product>) => void
  deleteProduct: (id: number) => void

  // Inventory actions
  updateStock: (id: number, newStock: number, reason?: string) => void

  // Sales actions
  addSale: (sale: Omit<Sale, "id">) => void

  // Analytics actions
  incrementProductView: (id: number) => void

  // Computed getters
  getProductById: (id: number) => Product | undefined
  getInventoryByProductId: (id: number) => InventoryItem | undefined
  getSalesByProductId: (id: number) => Sale[]

  // Real-time calculators
  recalculateMetrics: () => void
  recalculateAnalytics: () => void
  recalculateInventory: () => void
}

// Enhanced initial data with more realistic metrics
const initialProducts: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    category: "Electronics",
    sku: "WBH-001",
    wholesalePrice: 45.0,
    sellingPrice: 89.99,
    stock: 25,
    minStock: 10,
    profit: 44.99,
    profitMargin: 50.0,
    unitsPerBox: 1,
    supplier: "TechCorp",
    image: "/placeholder.svg?height=40&width=40",
    status: "active",
    createdAt: "2024-01-01",
    lastRestocked: "2024-01-15",
    lastUpdated: "2024-01-20",
    totalSold: 145,
    totalRevenue: 13048.55,
    totalProfit: 6524.55,
    averageRating: 4.5,
    viewCount: 234,
  },
  {
    id: 2,
    name: "Premium Coffee Beans 1kg",
    description: "Organic premium coffee beans from Colombia",
    category: "Food & Beverage",
    sku: "PCB-1KG",
    wholesalePrice: 12.5,
    sellingPrice: 24.99,
    stock: 5,
    minStock: 15,
    profit: 12.49,
    profitMargin: 50.0,
    unitsPerBox: 12,
    supplier: "Coffee Co",
    image: "/placeholder.svg?height=40&width=40",
    status: "active",
    createdAt: "2024-01-01",
    lastRestocked: "2024-01-10",
    lastUpdated: "2024-01-18",
    totalSold: 89,
    totalRevenue: 2224.11,
    totalProfit: 1112.11,
    averageRating: 4.8,
    viewCount: 156,
  },
  {
    id: 3,
    name: "LED Desk Lamp",
    description: "Adjustable LED desk lamp with USB charging port",
    category: "Home & Office",
    sku: "LED-DL-01",
    wholesalePrice: 25.0,
    sellingPrice: 49.99,
    stock: 18,
    minStock: 8,
    profit: 24.99,
    profitMargin: 50.0,
    unitsPerBox: 1,
    supplier: "LightTech",
    image: "/placeholder.svg?height=40&width=40",
    status: "active",
    createdAt: "2024-01-01",
    lastRestocked: "2024-01-12",
    lastUpdated: "2024-01-19",
    totalSold: 67,
    totalRevenue: 3349.33,
    totalProfit: 1674.33,
    averageRating: 4.2,
    viewCount: 98,
  },
  {
    id: 4,
    name: "Organic Green Tea Box",
    description: "Premium organic green tea, 50 tea bags",
    category: "Food & Beverage",
    sku: "OGT-BOX",
    wholesalePrice: 8.0,
    sellingPrice: 15.99,
    stock: 32,
    minStock: 20,
    profit: 7.99,
    profitMargin: 50.0,
    unitsPerBox: 24,
    supplier: "Tea Masters",
    image: "/placeholder.svg?height=40&width=40",
    status: "active",
    createdAt: "2024-01-01",
    lastRestocked: "2024-01-14",
    lastUpdated: "2024-01-17",
    totalSold: 54,
    totalRevenue: 863.46,
    totalProfit: 431.46,
    averageRating: 4.6,
    viewCount: 87,
  },
  {
    id: 5,
    name: "Wireless Mouse",
    description: "Ergonomic wireless mouse with long battery life",
    category: "Electronics",
    sku: "WM-001",
    wholesalePrice: 15.0,
    sellingPrice: 29.99,
    stock: 3,
    minStock: 12,
    profit: 14.99,
    profitMargin: 50.0,
    unitsPerBox: 1,
    supplier: "TechCorp",
    image: "/placeholder.svg?height=40&width=40",
    status: "active",
    createdAt: "2024-01-01",
    lastRestocked: "2024-01-08",
    lastUpdated: "2024-01-16",
    totalSold: 43,
    totalRevenue: 1289.57,
    totalProfit: 644.57,
    averageRating: 4.1,
    viewCount: 76,
  },
]

const initialSales: Sale[] = [
  {
    id: "TXN-001",
    date: "2024-01-20",
    time: "14:30",
    items: [
      { productId: 1, name: "Wireless Headphones", quantity: 1, price: 89.99, cost: 45.0 },
      { productId: 2, name: "Coffee Beans", quantity: 2, price: 24.99, cost: 12.5 },
    ],
    subtotal: 139.97,
    tax: 11.2,
    total: 151.17,
    profit: 69.98,
    paymentMethod: "Card",
    status: "completed",
  },
  {
    id: "TXN-002",
    date: "2024-01-20",
    time: "13:15",
    items: [{ productId: 3, name: "LED Desk Lamp", quantity: 1, price: 49.99, cost: 25.0 }],
    subtotal: 49.99,
    tax: 4.0,
    total: 53.99,
    profit: 24.99,
    paymentMethod: "Cash",
    status: "completed",
  },
  {
    id: "TXN-003",
    date: "2024-01-20",
    time: "12:45",
    items: [
      { productId: 4, name: "Organic Tea", quantity: 3, price: 15.99, cost: 8.0 },
      { productId: 5, name: "Wireless Mouse", quantity: 1, price: 29.99, cost: 15.0 },
    ],
    subtotal: 77.96,
    tax: 6.24,
    total: 84.2,
    profit: 37.97,
    paymentMethod: "Card",
    status: "completed",
  },
]

// Helper functions for calculations
const calculateInventoryItem = (product: Product): InventoryItem => {
  const status =
    product.stock <= product.minStock * 0.5 ? "critical" : product.stock <= product.minStock ? "low" : "good"

  const turnoverRate = product.totalSold > 0 ? (product.totalSold / Math.max(product.stock, 1)) * 30 : 0
  const daysOfStock = product.totalSold > 0 ? product.stock / (product.totalSold / 30) : 999

  return {
    id: product.id,
    name: product.name,
    sku: product.sku,
    category: product.category,
    currentStock: product.stock,
    minStock: product.minStock,
    maxStock: product.minStock * 5,
    unitCost: product.wholesalePrice,
    totalValue: product.stock * product.wholesalePrice,
    lastRestocked: product.lastRestocked,
    status,
    turnoverRate: Math.round(turnoverRate * 100) / 100,
    daysOfStock: Math.round(daysOfStock),
    reorderPoint: Math.round(product.minStock * 1.5),
  }
}

const calculateDashboardMetrics = (products: Product[], sales: Sale[]): DashboardMetrics => {
  const totalRevenue = products.reduce((sum, p) => sum + p.totalRevenue, 0)
  const totalProfit = products.reduce((sum, p) => sum + p.totalProfit, 0)
  const inventoryValue = products.reduce((sum, p) => sum + p.stock * p.wholesalePrice, 0)
  const lowStockItems = products.filter((p) => p.stock <= p.minStock && p.status === "active").length
  const todaySales = sales.filter((s) => s.date === new Date().toISOString().split("T")[0]).length

  const topSellingProducts = products
    .filter((p) => p.status === "active")
    .sort((a, b) => b.totalSold - a.totalSold)
    .slice(0, 5)
    .map((p) => ({
      id: p.id,
      name: p.name,
      sold: p.totalSold,
      revenue: p.totalRevenue,
    }))

  const categoryBreakdown = products.reduce(
    (acc, product) => {
      const existing = acc.find((c) => c.category === product.category)
      if (existing) {
        existing.count++
        existing.revenue += product.totalRevenue
      } else {
        acc.push({
          category: product.category,
          count: 1,
          revenue: product.totalRevenue,
        })
      }
      return acc
    },
    [] as Array<{ category: string; count: number; revenue: number }>,
  )

  const recentActivity = sales.slice(-10).map((sale) => ({
    type: "sale" as const,
    productId: sale.items[0]?.productId || 0,
    productName: sale.items[0]?.name || "Unknown",
    description: `Sale of ${sale.items.length} item(s) - $${sale.total.toFixed(2)}`,
    timestamp: `${sale.date} ${sale.time}`,
  }))

  return {
    totalRevenue,
    totalProducts: products.length,
    totalProfit,
    lowStockItems,
    todaySales,
    inventoryValue,
    profitMargin: totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0,
    topSellingProducts,
    categoryBreakdown,
    recentActivity,
  }
}

const calculateAnalyticsData = (products: Product[], sales: Sale[]): AnalyticsData => {
  // Sales trends (last 30 days)
  const salesTrends = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - i)
    const dateStr = date.toISOString().split("T")[0]

    const daySales = sales.filter((s) => s.date === dateStr)
    const dayRevenue = daySales.reduce((sum, s) => sum + s.total, 0)
    const dayProfit = daySales.reduce((sum, s) => sum + s.profit, 0)
    const dayUnits = daySales.reduce((sum, s) => sum + s.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0)

    return {
      date: dateStr,
      sales: dayRevenue,
      profit: dayProfit,
      units: dayUnits,
    }
  }).reverse()

  // Product performance
  const productPerformance = products.map((product) => {
    const recentSales = sales.filter(
      (s) =>
        s.items.some((item) => item.productId === product.id) &&
        new Date(s.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    )

    const recentRevenue = recentSales.reduce(
      (sum, s) =>
        sum +
        s.items
          .filter((item) => item.productId === product.id)
          .reduce((itemSum, item) => itemSum + item.price * item.quantity, 0),
      0,
    )

    const previousRevenue = product.totalRevenue - recentRevenue
    const trend = recentRevenue > previousRevenue ? "up" : recentRevenue < previousRevenue ? "down" : "stable"

    return {
      productId: product.id,
      name: product.name,
      category: product.category,
      totalSold: product.totalSold,
      revenue: product.totalRevenue,
      profit: product.totalProfit,
      profitMargin: product.profitMargin,
      turnoverRate: product.totalSold > 0 ? product.totalSold / Math.max(product.stock, 1) : 0,
      trend: trend as "up" | "down" | "stable",
    }
  })

  // Category analytics
  const categoryAnalytics = products
    .reduce(
      (acc, product) => {
        const existing = acc.find((c) => c.category === product.category)
        if (existing) {
          existing.products++
          existing.totalRevenue += product.totalRevenue
          existing.totalProfit += product.totalProfit
          if (product.totalRevenue > (products.find((p) => p.name === existing.topProduct)?.totalRevenue || 0)) {
            existing.topProduct = product.name
          }
        } else {
          acc.push({
            category: product.category,
            products: 1,
            totalRevenue: product.totalRevenue,
            totalProfit: product.totalProfit,
            averageMargin: product.profitMargin,
            topProduct: product.name,
          })
        }
        return acc
      },
      [] as Array<{
        category: string
        products: number
        totalRevenue: number
        totalProfit: number
        averageMargin: number
        topProduct: string
      }>,
    )
    .map((cat) => ({
      ...cat,
      averageMargin: cat.totalRevenue > 0 ? (cat.totalProfit / cat.totalRevenue) * 100 : 0,
    }))

  // Low performers
  const lowPerformers = products
    .filter((p) => p.status === "active")
    .filter((p) => p.totalSold < 10 || p.stock > p.minStock * 3)
    .map((p) => ({
      productId: p.id,
      name: p.name,
      reason: p.totalSold < 10 ? "Low sales volume" : "Overstocked",
      suggestion: p.totalSold < 10 ? "Consider promotion or price adjustment" : "Reduce reorder quantity",
    }))

  return {
    salesTrends,
    productPerformance,
    categoryAnalytics,
    lowPerformers,
  }
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      products: initialProducts,
      inventory: initialProducts.map(calculateInventoryItem),
      sales: initialSales,
      dashboardMetrics: calculateDashboardMetrics(initialProducts, initialSales),
      analyticsData: calculateAnalyticsData(initialProducts, initialSales),

      // Product actions with cascading updates
      addProduct: (productData) => {
        const state = get()
        const newId = Math.max(...state.products.map((p) => p.id), 0) + 1
        const now = new Date().toISOString().split("T")[0]

        const newProduct: Product = {
          ...productData,
          id: newId,
          status: productData.status || "active",
          createdAt: now,
          lastRestocked: now,
          lastUpdated: now,
          profit: productData.sellingPrice - productData.wholesalePrice,
          profitMargin:
            productData.wholesalePrice > 0
              ? ((productData.sellingPrice - productData.wholesalePrice) / productData.wholesalePrice) * 100
              : 0,
          totalSold: 0,
          totalRevenue: 0,
          totalProfit: 0,
          viewCount: 0,
        }

        const updatedProducts = [...state.products, newProduct]

        set({
          products: updatedProducts,
          inventory: updatedProducts.map(calculateInventoryItem),
          dashboardMetrics: calculateDashboardMetrics(updatedProducts, state.sales),
          analyticsData: calculateAnalyticsData(updatedProducts, state.sales),
        })
      },

      updateProduct: (id, updates) => {
        const state = get()
        const now = new Date().toISOString().split("T")[0]

        const updatedProducts = state.products.map((product) => {
          if (product.id === id) {
            const updated = { ...product, ...updates, lastUpdated: now }

            // Recalculate profit if prices changed
            if (updates.wholesalePrice !== undefined || updates.sellingPrice !== undefined) {
              updated.profit = updated.sellingPrice - updated.wholesalePrice
              updated.profitMargin =
                updated.wholesalePrice > 0
                  ? ((updated.sellingPrice - updated.wholesalePrice) / updated.wholesalePrice) * 100
                  : 0
            }

            return updated
          }
          return product
        })

        set({
          products: updatedProducts,
          inventory: updatedProducts.map(calculateInventoryItem),
          dashboardMetrics: calculateDashboardMetrics(updatedProducts, state.sales),
          analyticsData: calculateAnalyticsData(updatedProducts, state.sales),
        })
      },

      deleteProduct: (id) => {
        const state = get()
        const updatedProducts = state.products.filter((product) => product.id !== id)
        const updatedSales = state.sales
          .map((sale) => ({
            ...sale,
            items: sale.items.filter((item) => item.productId !== id),
          }))
          .filter((sale) => sale.items.length > 0)

        set({
          products: updatedProducts,
          inventory: updatedProducts.map(calculateInventoryItem),
          sales: updatedSales,
          dashboardMetrics: calculateDashboardMetrics(updatedProducts, updatedSales),
          analyticsData: calculateAnalyticsData(updatedProducts, updatedSales),
        })
      },

      updateStock: (id, newStock, reason = "Manual adjustment") => {
        const state = get()
        const now = new Date().toISOString().split("T")[0]

        const updatedProducts = state.products.map((product) =>
          product.id === id ? { ...product, stock: newStock, lastRestocked: now, lastUpdated: now } : product,
        )

        set({
          products: updatedProducts,
          inventory: updatedProducts.map(calculateInventoryItem),
          dashboardMetrics: calculateDashboardMetrics(updatedProducts, state.sales),
          analyticsData: calculateAnalyticsData(updatedProducts, state.sales),
        })
      },

      addSale: (saleData) => {
        const state = get()
        const newId = `TXN-${String(state.sales.length + 1).padStart(3, "0")}`
        const newSale: Sale = { ...saleData, id: newId }

        // Update product metrics based on sale
        const updatedProducts = state.products.map((product) => {
          const saleItem = saleData.items.find((item) => item.productId === product.id)
          if (saleItem) {
            const itemRevenue = saleItem.price * saleItem.quantity
            const itemProfit = (saleItem.price - saleItem.cost) * saleItem.quantity

            return {
              ...product,
              stock: product.stock - saleItem.quantity,
              totalSold: product.totalSold + saleItem.quantity,
              totalRevenue: product.totalRevenue + itemRevenue,
              totalProfit: product.totalProfit + itemProfit,
              lastUpdated: new Date().toISOString().split("T")[0],
            }
          }
          return product
        })

        const updatedSales = [...state.sales, newSale]

        set({
          products: updatedProducts,
          sales: updatedSales,
          inventory: updatedProducts.map(calculateInventoryItem),
          dashboardMetrics: calculateDashboardMetrics(updatedProducts, updatedSales),
          analyticsData: calculateAnalyticsData(updatedProducts, updatedSales),
        })
      },

      incrementProductView: (id) => {
        const state = get()
        const updatedProducts = state.products.map((product) =>
          product.id === id ? { ...product, viewCount: product.viewCount + 1 } : product,
        )

        set({
          products: updatedProducts,
          analyticsData: calculateAnalyticsData(updatedProducts, state.sales),
        })
      },

      // Getters
      getProductById: (id) => get().products.find((p) => p.id === id),
      getInventoryByProductId: (id) => get().inventory.find((i) => i.id === id),
      getSalesByProductId: (id) => get().sales.filter((s) => s.items.some((item) => item.productId === id)),

      // Manual recalculation methods
      recalculateMetrics: () => {
        const state = get()
        set({
          dashboardMetrics: calculateDashboardMetrics(state.products, state.sales),
        })
      },

      recalculateAnalytics: () => {
        const state = get()
        set({
          analyticsData: calculateAnalyticsData(state.products, state.sales),
        })
      },

      recalculateInventory: () => {
        const state = get()
        set({
          inventory: state.products.map(calculateInventoryItem),
        })
      },
    }),
    {
      name: "pos-storage",
    },
  ),
)
