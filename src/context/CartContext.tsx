import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { toast } from "sonner";
import type { CartItem, Product } from "../types";

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, quantity: number, selectedColor?: string, selectedSize?: string) => void;
    removeFromCart: (productId: string, selectedColor?: string, selectedSize?: string) => void;
    updateQuantity: (productId: string, quantity: number, selectedColor?: string, selectedSize?: string) => void;
    clearCart: () => void;
    cartTotal: number;
    cartCount: number;
    isCartOpen: boolean;
    openCart: () => void;
    closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [items, setItems] = useState<CartItem[]>(() => {
        try {
            const saved = localStorage.getItem("cart");
            if (!saved) return [];

            const parsed = JSON.parse(saved);
            // Migration: Ensure all items have images array
            return parsed.map((item: any) => ({
                ...item,
                images: item.images || (item.imageUrl ? [item.imageUrl] : [])
            }));
        } catch (error) {
            console.error("Error loading cart:", error);
            return [];
        }
    });

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    const openCart = () => setIsCartOpen(true);
    const closeCart = () => setIsCartOpen(false);

    const addToCart = (product: Product, quantity: number, selectedColor?: string, selectedSize?: string) => {
        setItems((prev) => {
            const existing = prev.find(
                (item) =>
                    item.id === product.id &&
                    item.selectedColor === selectedColor &&
                    item.selectedSize === selectedSize
            );
            if (existing) {
                toast.success(`Se actualizó la cantidad de ${product.name}`);
                return prev.map((item) =>
                    item.id === product.id &&
                        item.selectedColor === selectedColor &&
                        item.selectedSize === selectedSize
                        ? { ...item, quantity: Math.min(item.quantity + quantity, product.stock) }
                        : item
                );
            }
            toast.success(`${product.name} agregado al carrito`);
            return [...prev, { ...product, quantity, selectedColor, selectedSize }];
        });
        openCart(); // Auto open cart on add
    };

    const removeFromCart = (productId: string, selectedColor?: string, selectedSize?: string) => {
        setItems((prev) =>
            prev.filter(
                (item) =>
                    !(
                        item.id === productId &&
                        item.selectedColor === selectedColor &&
                        item.selectedSize === selectedSize
                    )
            )
        );
    };

    const updateQuantity = (productId: string, quantity: number, selectedColor?: string, selectedSize?: string) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === productId &&
                    item.selectedColor === selectedColor &&
                    item.selectedSize === selectedSize
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const clearCart = () => setItems([]);

    const cartTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                items,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                cartTotal,
                cartCount,
                isCartOpen,
                openCart,
                closeCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};
