type productsT = {
    id: string;
    name: string;
    description?: string;
    wholesalePrice: number;
    retailPrice: number;
    itemsPerUnit: number;
    stockQuantity: number;
    unitWholesale: number;
    unitRetail: number;
    unitProfit: number;
    groupProfit: number;
    profitMargin: number;
    createdAt: Date;
    updatedAt: Date;
};

const products: productsT[] = [];
