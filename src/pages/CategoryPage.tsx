import { useState, useMemo, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { useProducts } from "../context/ProductsContext";
import { SEO } from "../components/SEO";
import { Breadcrumbs } from "../components/Breadcrumbs";
import { ArrowLeft, Search, SlidersHorizontal, Loader2 } from "lucide-react";

export const CategoryPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [searchParams, setSearchParams] = useSearchParams();
    const { products, loading } = useProducts();
    const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
    const [onlyStock, setOnlyStock] = useState(false);
    const [sortBy, setSortBy] = useState<"price-asc" | "price-desc" | "name-asc" | "name-desc" | "default">("default");

    // Sync search term with URL
    useEffect(() => {
        const currentSearch = searchParams.get("search") || "";
        if (currentSearch !== searchTerm) {
            setSearchTerm(currentSearch);
        }
    }, [searchParams]);

    const filteredProducts = useMemo(() => {
        let result = products.filter((product) => {
            // "todos" slug means show all categories
            if (slug !== "todos" && product.category !== slug) return false;

            if (onlyStock && product.stock <= 0) return false;

            if (
                searchTerm &&
                !product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
                !product.description.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
                return false;
            }
            return true;
        });

        // Sorting Logic
        if (sortBy === "price-asc") {
            result.sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-desc") {
            result.sort((a, b) => b.price - a.price);
        } else if (sortBy === "name-asc") {
            result.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortBy === "name-desc") {
            result.sort((a, b) => b.name.localeCompare(a.name));
        }

        return result;

    }, [slug, searchTerm, onlyStock, sortBy, products]);

    // Update URL when user types
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        if (value) {
            setSearchParams({ search: value });
        } else {
            setSearchParams({});
        }
    };

    const getTitle = () => {
        if (!slug) return "Categoría";
        if (slug === "todos") return "Todos los Productos";
        if (slug === "blanqueria") return "Blanquería";
        if (slug === "regaleria") return "Regalería";
        if (slug === "perfumeria") return "Perfumería";
        return slug;
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Loader2 className="animate-spin text-emerald-600" size={48} />
            </div>
        );
    }

    return (
        <div className="animate-fade-in">
            <SEO title={getTitle()} />
            <div className="mb-4">
                <Breadcrumbs items={[{ label: getTitle() }]} />
            </div>

            <div className="mb-8 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <Link
                        to="/"
                        className="inline-flex items-center text-emerald-600 hover:text-emerald-700 transition-colors p-2 hover:bg-emerald-50 rounded-full"
                    >
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 capitalize tracking-tight">{getTitle()}</h1>
                    <span className="bg-gray-100 text-gray-500 text-sm px-3 py-1 rounded-full font-medium">
                        {filteredProducts.length} productos
                    </span>
                </div>

                {/* Filters & Control Bar */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">
                    {/* Search Input */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Buscar en esta categoría..."
                            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                            value={searchTerm}
                            onChange={handleSearchChange}
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
                        {/* Sort Dropdown */}
                        <div className="flex items-center gap-2">
                            <SlidersHorizontal size={18} className="text-gray-500" />
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="border-gray-200 border rounded-lg py-2 px-3 text-gray-700 text-sm focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer"
                            >
                                <option value="default">Relevancia</option>
                                <option value="price-asc">Menor Precio</option>
                                <option value="price-desc">Mayor Precio</option>
                                <option value="name-asc">Nombre (A-Z)</option>
                                <option value="name-desc">Nombre (Z-A)</option>
                            </select>
                        </div>

                        {/* Stock Filter */}
                        <label className="flex items-center gap-2 cursor-pointer select-none border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors">
                            <input
                                type="checkbox"
                                checked={onlyStock}
                                onChange={(e) => setOnlyStock(e.target.checked)}
                                className="w-4 h-4 text-emerald-600 rounded border-gray-300 focus:ring-emerald-500"
                            />
                            <span className="text-sm font-medium text-gray-700">Solo Stock</span>
                        </label>
                    </div>
                </div>
            </div>

            {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-white rounded-2xl border border-dashed border-gray-200 shadow-sm">
                    <Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-1">No encontramos resultados</h3>
                    <p className="text-gray-500 text-base mb-6 max-w-md mx-auto">INTENTA ajustar tu búsqueda o limpiar los filtros para ver más productos.</p>
                    <button
                        onClick={() => { setSearchTerm(""); setOnlyStock(false); setSearchParams({}) }}
                        className="inline-flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200 transition-colors"
                    >
                        Limpiar todos los filtros
                    </button>
                </div>
            )}
        </div>
    );
};
