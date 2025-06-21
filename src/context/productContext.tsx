// contexts/ProductContext.tsx
"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// Types for the product data
export interface Product {
    id: string;
    name: string;
    description: string;
    wholesalePrice: number;
    retailPrice: number;
    itemsPerUnit: number;
    stockQuantity: number;
    createdAt: Date;
}

export interface ProductFormData {
    name: string;
    description: string;
    wholesalePrice: number;
    retailPrice: number;
    itemsPerUnit: number;
    stockQuantity: number;
}

interface ProductContextType {
    products: Product[];
    addProduct: (productData: ProductFormData) => Product;
    totalProducts: number;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

// Generate unique ID
const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);

    const addProduct = (productData: ProductFormData): Product => {
        const newProduct: Product = {
            id: generateId(),
            ...productData,
            createdAt: new Date(),
        };

        setProducts((prev) => [...prev, newProduct]);
        return newProduct;
    };

    const totalProducts = products.length;

    const value: ProductContextType = {
        products,
        addProduct,
        totalProducts,
    };

    return (
        <ProductContext.Provider value={value}>
            {children}
        </ProductContext.Provider>
    );
}
