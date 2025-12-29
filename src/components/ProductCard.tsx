
import { useNavigate } from "react-router-dom";
import { ShoppingCart, Eye, Heart } from "lucide-react";
import type { Product } from "../types";
import { formatPrice } from "../utils/format";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Button } from "./Button";

export const ProductCard = ({ product }: { product: Product }) => {
    const { addToCart, openCart } = useCart();
    const { isInWishlist, toggleWishlist } = useWishlist();
    const navigate = useNavigate();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product, 1);
        openCart();
    };

    const handleToggleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist(product.id);
    };

    const hasStock = product.stock > 0;
    const isDiscounted = product.originalPrice && product.originalPrice > product.price;
    const discountPercentage = isDiscounted
        ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
        : 0;

    const isInWishlistState = isInWishlist(product.id);

    return (
        <div
            onClick={() => navigate(`/producto/${product.id}`)}
            className="bg-white dark:bg-slate-900 rounded-xl shadow-sm hover:shadow-lg transition-all border border-gray-100 dark:border-slate-800 overflow-hidden flex flex-col relative group cursor-pointer"
        >
            <div className="relative h-56 bg-white dark:bg-slate-800 overflow-hidden">
                <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                />

                {/* Wishlist Button */}
                <button
                    onClick={handleToggleWishlist}
                    className="absolute top-2 right-2 p-2 rounded-full bg-white/80 dark:bg-slate-700/80 hover:bg-white dark:hover:bg-slate-600 shadow-sm z-20 transition-all hover:scale-110"
                    aria-label={isInWishlistState ? "Eliminar de lista de deseos" : "Agregar a lista de deseos"}
                >
                    <Heart
                        size={20}
                        className={`transition-colors ${isInWishlistState ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-400 dark:text-gray-300'}`}
                    />
                </button>

                {/* Badges Container */}
                <div className="absolute top-2 left-2 flex flex-col gap-1 z-10">
                    {!hasStock && (
                        <span className="bg-gray-800 text-white px-3 py-1 rounded-md text-xs font-bold shadow-sm">
                            SIN STOCK
                        </span>
                    )}
                    {product.isNew && hasStock && (
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-md text-xs font-bold shadow-sm">
                            NUEVO
                        </span>
                    )}
                    {isDiscounted && hasStock && (
                        <span className="bg-red-500 text-white px-3 py-1 rounded-md text-xs font-bold shadow-sm">
                            -{discountPercentage}%
                        </span>
                    )}
                </div>
            </div>

            <div className="p-4 flex flex-col flex-grow">
                <div className="mb-2">
                    <span className="text-xs uppercase tracking-wider text-emerald-600 font-semibold bg-emerald-50 dark:bg-emerald-900/30 px-2 py-0.5 rounded">
                        {product.category}
                    </span>
                </div>

                <h3 className="font-bold text-gray-800 dark:text-gray-100 text-lg mb-1 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 line-clamp-2 h-14 transition-colors">
                    {product.name}
                </h3>

                <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-gray-500 dark:text-gray-400 text-xs">Precio</span>
                        <div className="flex flex-col">
                            {isDiscounted && (
                                <span className="text-xs text-gray-400 line-through decoration-red-400">
                                    {formatPrice(product.originalPrice!)}
                                </span>
                            )}
                            <span className={`text-xl font-bold ${isDiscounted ? 'text-red-600 dark:text-red-400' : 'text-gray-900 dark:text-white'}`}>
                                {formatPrice(product.price)}
                            </span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant="secondary"
                            size="sm"
                            className="p-2"
                            title="Ver detalles"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/producto/${product.id}`);
                            }}
                        >
                            <Eye size={20} />
                        </Button>
                        <Button
                            size="sm"
                            className="p-2"
                            disabled={!hasStock}
                            onClick={handleAddToCart}
                            title={hasStock ? "Agregar al carrito" : "Sin stock"}
                        >
                            <ShoppingCart size={20} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
