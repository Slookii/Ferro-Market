import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/format";
import { Button } from "../components/Button";
import { SEO } from "../components/SEO";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { toast } from "sonner";
import { ArrowLeft, Minus, Plus, ShoppingCart, AlertCircle, MessageCircle, Share2, Loader2 } from "lucide-react";

export const ProductPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const { products, loading } = useProducts();
    const [quantity, setQuantity] = useState(1);

    const product = products.find((p) => p.id === id);

    const [selectedColor, setSelectedColor] = useState<string>("");
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [selectedImage, setSelectedImage] = useState<string>("");

    useEffect(() => {
        if (product) {
            if (product.colors && product.colors.length > 0) setSelectedColor(product.colors[0]);
            if (product.sizes && product.sizes.length > 0) setSelectedSize(product.sizes[0]);
            if (product.images && product.images.length > 0) setSelectedImage(product.images[0]);
        }
    }, [product]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Loader2 className="animate-spin text-emerald-600" size={48} />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="text-center py-20">
                <SEO title="Producto no encontrado" />
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Producto no encontrado</h2>
                <Link to="/" className="text-emerald-600 hover:underline">
                    Volver al inicio
                </Link>
            </div>
        );
    }

    const handleAddToCart = () => {
        addToCart(product, quantity, selectedColor || undefined, selectedSize || undefined);
    };

    const incrementDetails = () => setQuantity((prev) => Math.min(prev + 1, product.stock));
    const decrementDetails = () => setQuantity((prev) => Math.max(prev - 1, 1));

    return (
        <div className="max-w-4xl mx-auto">
            <SEO title={product.name} description={product.description} />
            <Breadcrumbs
                items={[
                    { label: product.category, url: `/categoria/${product.category}` },
                    { label: product.name }
                ]}
            />
            <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-emerald-700 mb-6 transition">
                <ArrowLeft size={20} className="mr-1" /> Volver
            </button>

            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden grid md:grid-cols-2 gap-8 p-6 md:p-8">
                <div className="flex flex-col gap-4">
                    <div className="bg-gray-50 rounded-xl flex items-center justify-center p-8 h-96">
                        <img
                            src={selectedImage || product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-contain mix-blend-multiply transition-opacity duration-300"
                        />
                    </div>
                    {product.images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-2">
                            {product.images.map((img, index) => (
                                <button
                                    key={index}
                                    onClick={() => setSelectedImage(img)}
                                    className={`relative w-20 h-20 flex-shrink-0 bg-gray-50 rounded-lg p-2 border-2 transition-all ${selectedImage === img
                                        ? "border-emerald-500 ring-2 ring-emerald-200 ring-offset-1"
                                        : "border-transparent hover:border-gray-300"
                                        }`}
                                >
                                    <img
                                        src={img}
                                        alt={`${product.name} ${index + 1}`}
                                        className="w-full h-full object-contain mix-blend-multiply"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="flex flex-col">
                    <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-emerald-100 text-emerald-800 text-sm font-semibold rounded-full uppercase tracking-wide">
                            {product.category}
                        </span>
                    </div>

                    <div className="flex justify-between items-start mb-2">
                        <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                        <button
                            onClick={() => {
                                if (navigator.share) {
                                    navigator.share({
                                        title: product.name,
                                        text: `Mira este producto en Ferro-Market: ${product.name}`,
                                        url: window.location.href,
                                    }).catch(console.error);
                                } else {
                                    navigator.clipboard.writeText(window.location.href);
                                    toast.success("Enlace copiado al portapapeles 📋");
                                }
                            }}
                            className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-full transition-colors"
                            title="Compartir producto"
                        >
                            <Share2 size={24} />
                        </button>
                    </div>

                    {/* Price & Discount Display */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="flex flex-col">
                            {product.originalPrice && product.originalPrice > product.price && (
                                <span className="text-gray-400 line-through text-lg font-medium decoration-red-400">
                                    {formatPrice(product.originalPrice)}
                                </span>
                            )}
                            <div className="flex items-center gap-3">
                                <p className={`text-4xl font-bold ${product.originalPrice ? 'text-red-600' : 'text-emerald-600'}`}>
                                    {formatPrice(product.price)}
                                </p>
                                {product.originalPrice && product.originalPrice > product.price && (
                                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold border border-red-200">
                                        -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="prose prose-sm text-gray-600 mb-8">
                        <p>{product.description}</p>
                    </div>

                    {/* Selectores de Variantes */}
                    <div className="space-y-6 mb-8">
                        {product.colors && product.colors.length > 0 && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-all ${selectedColor === color
                                                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                                : "border-gray-200 text-gray-600 hover:border-emerald-300 transform hover:-translate-y-0.5"
                                                }`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {product.sizes && product.sizes.length > 0 && (
                            <div>
                                <h3 className="text-sm font-medium text-gray-900 mb-3">Talla</h3>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`w-12 h-12 flex items-center justify-center rounded-lg border text-sm font-medium transition-all ${selectedSize === size
                                                ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                                                : "border-gray-200 text-gray-600 hover:border-emerald-300 transform hover:-translate-y-0.5"
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-auto space-y-6">
                        {product.stock > 0 ? (
                            <>
                                <div className="flex items-center gap-4">
                                    <span className="text-gray-700 font-medium">Cantidad:</span>
                                    <div className="flex items-center border border-gray-300 rounded-lg">
                                        <button
                                            onClick={decrementDetails}
                                            className="p-2 hover:bg-gray-100 text-gray-600 disabled:opacity-50"
                                            disabled={quantity <= 1}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span className="w-12 text-center font-semibold">{quantity}</span>
                                        <button
                                            onClick={incrementDetails}
                                            className="p-2 hover:bg-gray-100 text-gray-600 disabled:opacity-50"
                                            disabled={quantity >= product.stock}
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        ({product.stock} disponibles)
                                    </span>
                                </div>

                                <Button
                                    onClick={handleAddToCart}
                                    size="lg"
                                    className="w-full flex items-center justify-center gap-2 shadow-emerald-200 shadow-lg hover:shadow-xl transition-shadow"
                                >
                                    <ShoppingCart size={20} /> Agregar al carrito
                                </Button>

                                <Button
                                    onClick={() => {
                                        const message = `Hola, estoy viendo el producto *${product.name}* (ID: ${product.id}) y quisiera más información.`;
                                        const url = `https://wa.me/543804808109?text=${encodeURIComponent(message)}`;
                                        window.open(url, "_blank");
                                    }}
                                    variant="secondary"
                                    size="lg"
                                    className="w-full flex items-center justify-center gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 mt-3"
                                >
                                    <MessageCircle size={20} /> Consultar por WhatsApp
                                </Button>
                            </>
                        ) : (
                            <div className="bg-red-50 text-red-700 p-4 rounded-lg flex items-start gap-3 border border-red-100">
                                <AlertCircle className="shrink-0 mt-0.5" />
                                <div>
                                    <p className="font-bold">Producto sin stock</p>
                                    <p className="text-sm">Lo sentimos, este producto no está disponible por el momento.</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Related Products Section */}
            <div className="mt-16 mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2 border-gray-200">
                    Productos Relacionados
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products
                        .filter(p => p.category === product.category && p.id !== product.id)
                        .slice(0, 4)
                        .map(relatedProduct => (
                            <div key={relatedProduct.id} className="transform hover:-translate-y-1 transition-transform duration-300">
                                <Link to={`/producto/${relatedProduct.id}`} className="block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden group">
                                    <div className="relative h-48 p-4 bg-white">
                                        <img
                                            src={relatedProduct.images[0]}
                                            alt={relatedProduct.name}
                                            className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                                        />
                                    </div>
                                    <div className="p-4 border-t border-gray-100">
                                        <h3 className="font-semibold text-gray-800 line-clamp-2 h-10 mb-2 group-hover:text-emerald-600 transition-colors">
                                            {relatedProduct.name}
                                        </h3>
                                        <p className="font-bold text-emerald-600">{formatPrice(relatedProduct.price)}</p>
                                    </div>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};
