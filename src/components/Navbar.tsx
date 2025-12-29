import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, Search, X, Moon, Sun, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useTheme } from "../context/ThemeContext";
import { useWishlist } from "../context/WishlistContext";
import { useProducts } from "../context/ProductsContext";
import { formatPrice } from "../utils/format";
import type { Product } from "../types";

export const Navbar = () => {
    const { cartCount, openCart } = useCart();
    const { theme, toggleTheme } = useTheme();
    const { wishlist } = useWishlist();
    const { products } = useProducts();
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState<Product[]>([]);
    const [showResults, setShowResults] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (searchQuery.trim().length > 1) {
            const results = products.filter(p =>
                p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.category.toLowerCase().includes(searchQuery.toLowerCase())
            ).slice(0, 5);
            setSearchResults(results);
            setShowResults(true);
        } else {
            setSearchResults([]);
            setShowResults(false);
        }
    }, [searchQuery, products]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/categoria/todos?search=${encodeURIComponent(searchQuery)}`);
            setIsMenuOpen(false);
        }
    };

    return (
        <>
            {/* Announcement Bar */}
            <div className="bg-emerald-900 dark:bg-emerald-950 text-emerald-50 text-xs py-2 text-center px-4 transition-colors">
                <p>🚀 ¡Envío gratis en compras superiores a $50.000! 📦</p>
            </div>

            <nav className="bg-emerald-700 dark:bg-slate-900 text-white shadow-md sticky top-0 z-50 transition-colors">
                <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap justify-between items-center gap-4">
                    <Link to="/" className="text-xl font-bold tracking-tight flex items-center gap-2 shrink-0 group perspective-1000">
                        <img src="/cactus.svg" alt="Ferro-Market Logo" className="w-10 h-10 drop-shadow-md" />
                        <motion.div
                            initial={{ rotateY: 0 }}
                            animate={{ rotateY: 360 }}
                            transition={{
                                duration: 12,
                                repeat: Infinity,
                                ease: "linear",
                            }}
                            className="relative"
                            style={{ transformStyle: "preserve-3d" }}
                        >
                            {/* Front Face */}
                            <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-r from-emerald-100 to-white drop-shadow-sm select-none" style={{ transform: "translateZ(2px)" }}>
                                Ferro-Market
                            </span>

                            {/* 3D Volume Layers (Sides) */}
                            {[1, 2, 3, 4].map((i) => (
                                <span
                                    key={i}
                                    className="absolute inset-0 text-white select-none"
                                    style={{
                                        transform: `translateZ(-${i}px)`,
                                        zIndex: -1,
                                    }}
                                    aria-hidden="true"
                                >
                                    Ferro-Market
                                </span>
                            ))}
                        </motion.div>
                    </Link>

                    {/* Desktop Search Bar */}
                    <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-lg mx-4 relative">
                        <input
                            type="text"
                            placeholder="Buscar productos..."
                            className="w-full pl-4 pr-10 py-2 rounded-full border-none focus:ring-2 focus:ring-emerald-300 text-gray-800 bg-emerald-50 outline-none transition-all placeholder-gray-400/80 dark:bg-slate-800 dark:text-gray-100 dark:placeholder-gray-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-emerald-600 p-1 dark:text-gray-400 dark:hover:text-emerald-400">
                            <Search size={20} />
                        </button>

                        {/* Smart Search Dropdown */}
                        {showResults && searchResults.length > 0 && (
                            <div className="absolute top-full left-0 right-0 bg-white dark:bg-slate-800 shadow-xl rounded-xl mt-2 overflow-hidden border border-gray-100 dark:border-slate-700 z-50">
                                {searchResults.map(product => (
                                    <Link
                                        key={product.id}
                                        to={`/producto/${product.id}`}
                                        className="flex items-center gap-4 p-3 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors border-b border-gray-50 last:border-0 dark:border-slate-700"
                                        onClick={() => {
                                            setShowResults(false);
                                            setSearchQuery("");
                                        }}
                                    >
                                        <img src={product.images[0]} alt={product.name} className="w-10 h-10 object-contain bg-gray-50 rounded" />
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200 truncate">{product.name}</h4>
                                            <span className="text-xs text-emerald-600 font-bold">{formatPrice(product.price)}</span>
                                        </div>
                                    </Link>
                                ))}
                                <button
                                    type="button" // Important so it doesn't submit form
                                    onClick={handleSearch}
                                    className="w-full p-2 text-xs text-center text-gray-500 hover:bg-gray-50 dark:text-gray-400 dark:hover:bg-slate-700 transition-colors font-medium uppercase tracking-wide"
                                >
                                    Ver todos los resultados
                                </button>
                            </div>
                        )}
                    </form>

                    <div className="flex items-center gap-4">
                        {/* Desktop Nav Links */}
                        <div className="hidden lg:flex items-center gap-6 mr-2">
                            <Link to="/" className="hover:text-emerald-200 transition">Inicio</Link>
                            <div className="relative group">
                                <span className="cursor-pointer hover:text-emerald-200 transition py-2">Categorías</span>
                                <div className="absolute left-0 top-full pt-2 w-48 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-50">
                                    <div className="bg-white dark:bg-slate-800 text-gray-800 dark:text-gray-200 rounded-lg shadow-xl border border-gray-100 dark:border-slate-700 overflow-hidden">
                                        <Link to="/categoria/blanqueria" className="block px-4 py-3 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors">Blanquería</Link>
                                        <Link to="/categoria/regionales" className="block px-4 py-3 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors">Regionales</Link>
                                        <Link to="/categoria/minimarket" className="block px-4 py-3 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors">Minimarket</Link>
                                        <Link to="/categoria/regaleria" className="block px-4 py-3 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors">Regalería</Link>
                                        <Link to="/categoria/perfumeria" className="block px-4 py-3 hover:bg-emerald-50 dark:hover:bg-slate-700 transition-colors">Perfumería</Link>
                                    </div>
                                </div>
                            </div>
                            <Link to="/contacto" className="hover:text-emerald-200 transition">Contacto</Link>
                        </div>

                        {/* Mobile Menu Button & Cart */}
                        <div className="flex items-center gap-2 md:gap-3 shrink-0">
                            <Link to="/deseos" className="p-2 hover:bg-emerald-600 rounded-full transition dark:hover:bg-slate-800 relative hidden sm:block">
                                <Heart size={20} />
                                {wishlist.length > 0 && (
                                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                                )}
                            </Link>

                            <button onClick={toggleTheme} className="p-2 hover:bg-emerald-600 rounded-full transition dark:hover:bg-slate-800">
                                {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </button>

                            <button onClick={openCart} className="relative p-2 hover:bg-emerald-600 rounded-full transition cursor-pointer dark:hover:bg-slate-800">
                                <ShoppingCart size={24} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            <button
                                className="md:hidden p-2 rounded hover:bg-emerald-600 dark:hover:bg-slate-800"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Search & Nav */}
                {isMenuOpen && (
                    <div className="md:hidden bg-emerald-800 dark:bg-slate-900 pb-4 px-4 border-t border-emerald-600 dark:border-slate-800 animate-fade-in">
                        <form onSubmit={handleSearch} className="mt-4 mb-4 relative">
                            <input
                                type="text"
                                placeholder="Buscar..."
                                className="w-full pl-4 pr-10 py-2 rounded-lg text-gray-800 outline-none dark:bg-slate-800 dark:text-gray-100"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                                <Search size={20} />
                            </button>
                        </form>

                        <Link to="/" className="block py-2 border-b border-emerald-700 dark:border-slate-800" onClick={() => setIsMenuOpen(false)}>Inicio</Link>
                        <Link to="/categoria/blanqueria" className="block py-2 ml-4 text-sm hover:text-emerald-200" onClick={() => setIsMenuOpen(false)}>Blanquería</Link>
                        <Link to="/categoria/regionales" className="block py-2 ml-4 text-sm hover:text-emerald-200" onClick={() => setIsMenuOpen(false)}>Regionales</Link>
                        <Link to="/categoria/minimarket" className="block py-2 ml-4 text-sm hover:text-emerald-200" onClick={() => setIsMenuOpen(false)}>Minimarket</Link>
                        <Link to="/categoria/regaleria" className="block py-2 ml-4 text-sm hover:text-emerald-200" onClick={() => setIsMenuOpen(false)}>Regalería</Link>
                        <Link to="/categoria/perfumeria" className="block py-2 ml-4 text-sm hover:text-emerald-200" onClick={() => setIsMenuOpen(false)}>Perfumería</Link>
                        <Link to="/producto/todos" className="block py-2 ml-4 text-sm hover:text-emerald-200" onClick={() => setIsMenuOpen(false)}>Todos los productos</Link>
                        <Link to="/deseos" className="block py-2 border-t border-emerald-700 dark:border-slate-800 mt-2 font-medium" onClick={() => setIsMenuOpen(false)}>Mi Lista de Deseos ❤️</Link>
                        <Link to="/contacto" className="block py-2 border-t border-emerald-700 dark:border-slate-800 font-medium" onClick={() => setIsMenuOpen(false)}>Contacto</Link>
                        <button className="block w-full text-left py-2 mt-2 font-bold flex items-center gap-2 hover:bg-emerald-900/50 rounded px-2 -ml-2 text-white" onClick={() => { setIsMenuOpen(false); openCart(); }}>
                            <ShoppingCart size={20} /> Ver Carrito ({cartCount})
                        </button>
                    </div>
                )}
            </nav>
        </>
    );
};
