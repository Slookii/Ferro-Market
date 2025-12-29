import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";

interface WishlistContextType {
    wishlist: string[];
    addToWishlist: (id: string) => void;
    removeFromWishlist: (id: string) => void;
    isInWishlist: (id: string) => boolean;
    toggleWishlist: (id: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
    const [wishlist, setWishlist] = useState<string[]>(() => {
        const saved = localStorage.getItem("wishlist");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (id: string) => {
        setWishlist((prev) => {
            if (prev.includes(id)) return prev;
            toast.success("Agregado a tu lista de deseos ❤️");
            return [...prev, id];
        });
    };

    const removeFromWishlist = (id: string) => {
        setWishlist((prev) => {
            const filtered = prev.filter((itemId) => itemId !== id);
            if (filtered.length !== prev.length) {
                toast.info("Eliminado de tu lista de deseos 💔");
            }
            return filtered;
        });
    };

    const isInWishlist = (id: string) => {
        return wishlist.includes(id);
    };

    const toggleWishlist = (id: string) => {
        if (isInWishlist(id)) {
            removeFromWishlist(id);
        } else {
            addToWishlist(id);
        }
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
    return context;
};
