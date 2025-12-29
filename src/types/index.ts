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

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';

export interface CustomerData {
    name: string;
    phone: string;
    zone: string;
    address: string;
    deliveryMethod: string;
    comments: string;
}

export interface Order {
    id?: string;
    customer: CustomerData;
    items: CartItem[];
    total: number;
    status: OrderStatus;
    createdAt: Date;
}
