export type Category =
    | "blanqueria"
    | "regionales"
    | "minimarket"
    | "regaleria"
    | "perfumeria";

export interface Product {
    id: string;
    name: string;
    category: Category;
    price: number;
    originalPrice?: number;
    stock: number;
    description: string;
    images: string[];
    colors?: string[];
    sizes?: string[];
    isNew?: boolean;
}

export interface CartItem extends Product {
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
}
