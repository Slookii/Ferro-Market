import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { products } from "../data/products";
import { ProductCard } from "../components/ProductCard";
import { Button } from "../components/Button";
import { Heart } from "lucide-react";
import { SEO } from "../components/SEO";

export const WishlistPage = () => {
    const { wishlist } = useWishlist();

    const wishlistProducts = products.filter((p) => wishlist.includes(p.id));

    return (
        <div className="animate-fade-in">
            <SEO title="Lista de Deseos" />

            <div className="flex items-center gap-3 mb-8">
                <Heart className="text-red-500 fill-current" size={32} />
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Mi Lista de Deseos</h1>
            </div>

            {wishlist.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                    <Heart className="mx-auto text-gray-300 dark:text-gray-600 mb-4" size={64} />
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Tu lista está vacía</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">Parece que aún no has agregado productos favoritos.</p>
                    <Link to="/">
                        <Button>Explorar Productos</Button>
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {wishlistProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};
