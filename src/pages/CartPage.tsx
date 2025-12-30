
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import { Button } from "../components/Button";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";

export const CartPage = () => {
    const { items, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();

    if (items.length === 0) {
        return (
            <div className="text-center py-24 bg-white rounded-2xl shadow-sm border border-gray-100">
                <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                    <ShoppingBag size={40} />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">Su carrito está vacío</h2>
                <p className="text-gray-500 mb-8 max-w-sm mx-auto">Parece que aún no ha agregado productos. Explore nuestras categorías para encontrar lo que busca.</p>
                <Link to="/">
                    <Button>Ir a comprar</Button>
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Mi Carrito</h1>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-4">
                    {items.map((item) => (
                        <div key={item.id} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-4 items-center">
                            <img
                                src={item.images[0]}
                                alt={item.name}
                                className="w-20 h-20 object-contain bg-gray-50 rounded-lg"
                            />
                            <div className="flex-grow">
                                <Link to={`/producto/${item.id}`} className="font-bold text-gray-800 hover:text-emerald-600 transition block mb-1">
                                    {item.name}
                                </Link>
                                <div className="flex items-center gap-2 text-sm text-gray-500 mb-1">
                                    {item.selectedColor && (
                                        <span className="text-gray-500 bg-gray-100 px-2 py-0.5 rounded text-xs">Color: {item.selectedColor}</span>
                                    )}
                                    {item.selectedSize && (
                                        <span className="text-gray-500 bg-gray-100 px-2 py-0.5 rounded text-xs">Talla: {item.selectedSize}</span>
                                    )}
                                    <span>{formatPrice(item.price)} x unidad</span>
                                </div>
                                <div className="flex items-center gap-3 mt-2">
                                    <div className="flex items-center border border-gray-200 rounded-md bg-gray-50">
                                        <button
                                            className="p-1 hover:bg-gray-200 disabled:opacity-50"
                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1), item.selectedColor || undefined, item.selectedSize || undefined)}
                                            disabled={item.quantity <= 1}
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="w-8 text-center text-sm font-medium">{item.quantity}</span>
                                        <button
                                            className="p-1 hover:bg-gray-200 disabled:opacity-50"
                                            onClick={() => updateQuantity(item.id, Math.min(item.stock, item.quantity + 1), item.selectedColor || undefined, item.selectedSize || undefined)}
                                            disabled={item.quantity >= item.stock}
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right flex flex-col items-end gap-2">
                                <span className="font-bold text-lg text-emerald-700">
                                    {formatPrice(item.price * item.quantity)}
                                </span>
                                <button
                                    onClick={() => removeFromCart(item.id, item.selectedColor || undefined, item.selectedSize || undefined)}
                                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition"
                                    title="Eliminar producto"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-between items-center mt-4">
                        <button
                            onClick={clearCart}
                            className="text-red-600 text-sm hover:underline font-medium"
                        >
                            Vaciar carrito
                        </button>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-24">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Resumen del Pedido</h3>

                        <div className="space-y-2 mb-6 text-sm text-gray-600">
                            <div className="flex justify-between">
                                <span>Subtotal ({items.reduce((acc, i) => acc + i.quantity, 0)} productos)</span>
                                <span>{formatPrice(cartTotal)}</span>
                            </div>
                            <div className="border-t border-gray-100 my-2"></div>
                            <div className="flex justify-between text-base font-bold text-gray-900">
                                <span>Total</span>
                                <span className="text-emerald-700 text-xl">{formatPrice(cartTotal)}</span>
                            </div>
                            <p className="text-xs text-gray-400 mt-2">* El pago se coordina por WhatsApp.</p>
                        </div>

                        <Link to="/checkout" className="block">
                            <Button size="lg" className="w-full flex justify-between items-center">
                                Confirmar Pedido <ArrowRight size={20} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
