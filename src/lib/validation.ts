export interface ValidationErrors {
  [key: string]: string
}

export interface ProductFormData {
  name: string
  description: string
  category: string
  sku: string
  wholesalePrice: string
  sellingPrice: string
  unitsPerBox: string
  minStock: string
  currentStock: string
  supplier: string
  status: "active" | "draft" | "discontinued"
}

export function validateProductForm(data: ProductFormData): ValidationErrors {
  const errors: ValidationErrors = {}

  // Name validation
  if (!data.name.trim()) {
    errors.name = "Product name is required"
  } else if (data.name.trim().length < 2) {
    errors.name = "Product name must be at least 2 characters"
  } else if (data.name.trim().length > 100) {
    errors.name = "Product name must be less than 100 characters"
  }

  // Category validation
  if (!data.category) {
    errors.category = "Category is required"
  }

  // SKU validation
  if (data.sku && data.sku.length > 50) {
    errors.sku = "SKU must be less than 50 characters"
  }

  // Wholesale price validation
  if (!data.wholesalePrice) {
    errors.wholesalePrice = "Wholesale price is required"
  } else {
    const wholesale = Number.parseFloat(data.wholesalePrice)
    if (isNaN(wholesale)) {
      errors.wholesalePrice = "Must be a valid number"
    } else if (wholesale < 0) {
      errors.wholesalePrice = "Price cannot be negative"
    } else if (wholesale > 999999) {
      errors.wholesalePrice = "Price is too high"
    }
  }

  // Selling price validation
  if (!data.sellingPrice) {
    errors.sellingPrice = "Selling price is required"
  } else {
    const selling = Number.parseFloat(data.sellingPrice)
    const wholesale = Number.parseFloat(data.wholesalePrice)
    if (isNaN(selling)) {
      errors.sellingPrice = "Must be a valid number"
    } else if (selling < 0) {
      errors.sellingPrice = "Price cannot be negative"
    } else if (selling > 999999) {
      errors.sellingPrice = "Price is too high"
    } else if (!isNaN(wholesale) && selling < wholesale) {
      errors.sellingPrice = "Selling price should be higher than wholesale price"
    }
  }

  // Stock validation
  if (data.currentStock) {
    const stock = Number.parseInt(data.currentStock)
    if (isNaN(stock)) {
      errors.currentStock = "Must be a valid number"
    } else if (stock < 0) {
      errors.currentStock = "Stock cannot be negative"
    } else if (stock > 999999) {
      errors.currentStock = "Stock quantity is too high"
    }
  }

  // Min stock validation
  if (data.minStock) {
    const minStock = Number.parseInt(data.minStock)
    if (isNaN(minStock)) {
      errors.minStock = "Must be a valid number"
    } else if (minStock < 0) {
      errors.minStock = "Minimum stock cannot be negative"
    } else if (minStock > 999999) {
      errors.minStock = "Minimum stock is too high"
    }
  }

  // Units per box validation
  if (data.unitsPerBox) {
    const units = Number.parseInt(data.unitsPerBox)
    if (isNaN(units)) {
      errors.unitsPerBox = "Must be a valid number"
    } else if (units < 1) {
      errors.unitsPerBox = "Must be at least 1"
    } else if (units > 999999) {
      errors.unitsPerBox = "Units per box is too high"
    }
  }

  // Description validation
  if (data.description && data.description.length > 500) {
    errors.description = "Description must be less than 500 characters"
  }

  // Supplier validation
  if (data.supplier && data.supplier.length > 100) {
    errors.supplier = "Supplier name must be less than 100 characters"
  }

  return errors
}

export function hasErrors(errors: ValidationErrors): boolean {
  return Object.keys(errors).length > 0
}

export function getFieldError(errors: ValidationErrors, field: string): string | undefined {
  return errors[field]
}

export function isFieldValid(errors: ValidationErrors, field: string, value: string): boolean {
  return !errors[field] && value.trim() !== ""
}
