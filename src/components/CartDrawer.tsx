import { X, Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const CartDrawer = () => {
    const { items, removeFromCart, updateQuantity, cartTotal, isCartOpen, closeCart } = useCart();
    const navigate = useNavigate();

    if (!isCartOpen) return null;

    const generateWhatsAppMessage = () => {
        let message = "Hola Ferro-Market! Quiero realizar el siguiente pedido:\n\n";
        items.forEach((item) => {
            message += `- *${item.quantity}x ${item.name}*`;
            if (item.selectedColor) message += ` (Color: ${item.selectedColor})`;
            if (item.selectedSize) message += ` (Talla: ${item.selectedSize})`;
            message += ` - ${formatPrice(item.price * item.quantity)}\n`;
        });
        message += `\n*Total: ${formatPrice(cartTotal)}*`;
        return encodeURIComponent(message);
    };

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Overlay */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={closeCart}
            />

            {/* Drawer */}
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col animate-slide-in-right transition-colors">
                <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between bg-emerald-700 text-white">
                    <h2 className="text-lg font-bold flex items-center gap-2">
                        <ShoppingBag size={20} />
                        Tu Carrito ({items.length})
                    </h2>
                    <button onClick={closeCart} className="p-1 hover:bg-emerald-600 rounded-full transition">
                        <X size={24} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {items.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center text-gray-500 dark:text-gray-400">
                            <ShoppingBag size={48} className="mb-4 text-emerald-100 dark:text-slate-800" />
                            <p className="text-lg font-medium">Tu carrito está vacío</p>
                            <Button onClick={closeCart} variant="secondary" className="mt-4">
                                Seguir comprando
                            </Button>
                        </div>
                    ) : (
                        items.map((item) => (
                            <div key={`${item.id}-${item.selectedColor}-${item.selectedSize}`} className="flex gap-4 p-3 border border-gray-100 dark:border-slate-800 rounded-lg bg-gray-50 dark:bg-slate-800">
                                <div className="w-20 h-20 bg-white dark:bg-slate-700 rounded-md overflow-hidden flex-shrink-0 border border-gray-200 dark:border-slate-700">
                                    <img
                                        src={item.images[0]}
                                        alt={item.name}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start gap-2">
                                            <h3 className="font-semibold text-gray-800 dark:text-white line-clamp-2">{item.name}</h3>
                                            <button
                                                onClick={() => removeFromCart(item.id, item.selectedColor || undefined, item.selectedSize || undefined)}
                                                className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                            {item.selectedColor && <span className="mr-2">Color: {item.selectedColor}</span>}
                                            {item.selectedSize && <span>Talla: {item.selectedSize}</span>}
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center gap-3 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-md px-2 py-1">
                                            <button
                                                onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.selectedColor || undefined, item.selectedSize || undefined)}
                                                className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="text-sm font-medium w-4 text-center dark:text-white">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, Math.min(item.stock, item.quantity + 1), item.selectedColor || undefined, item.selectedSize || undefined)}
                                                className="text-gray-500 hover:text-emerald-600 dark:text-gray-400 dark:hover:text-emerald-400"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                        <span className="font-bold text-gray-900 dark:text-white">{formatPrice(item.price * item.quantity)}</span>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {items.length > 0 && (
                    <div className="p-4 border-t border-gray-100 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                        <div className="flex justify-between items-center mb-4 text-lg font-bold text-gray-900 dark:text-white">
                            <span>Total</span>
                            <span>{formatPrice(cartTotal)}</span>
                        </div>
                        <div className="grid gap-3">
                            <Button
                                onClick={() => { closeCart(); navigate("/checkout"); }}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition shadow-md"
                            >
                                Finalizar Compra
                            </Button>
                            <a
                                href={`https://wa.me/543804808109?text=${generateWhatsAppMessage()}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-emerald-50 text-emerald-700 font-bold py-3 px-4 rounded-xl hover:bg-emerald-100 transition flex items-center justify-center gap-2"
                            >
                                <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" />
                                Pedir por WhatsApp
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
