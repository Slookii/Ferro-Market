import { CategoryCard } from "../components/CategoryCard";
import { ProductCard } from "../components/ProductCard";
import RevealOnView from "../components/RevealOnView";
import { HeroCarousel } from "../components/HeroCarousel";
import { Testimonials } from "../components/Testimonials";
import { PromoBanner } from "../components/PromoBanner";
import { categories } from "../data/categories";
import { SEO } from "../components/SEO";
import { useProducts } from "../context/ProductsContext";


export const Home = () => {
    const { products } = useProducts();

    return (
        <div className="space-y-12">
            <SEO title="Inicio" description="Bienvenido a Ferro-Market, tu tienda de confianza en La Rioja. Encuentra blanquería, perfumería y más." />
            {/* Hero Section */}
            <HeroCarousel />

            {/* Categories Grid */}
            <section>
                <h2 className="text-2xl font-bold text-gray-800 mb-8 border-b pb-2 border-gray-200">
                    Nuestras Categorías
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((cat) => (
                        <CategoryCard key={cat.id} {...cat} />
                    ))}
                </div>
            </section>

            {/* Testimonials */}
            <Testimonials />

            {/* Promo Banner */}
            <PromoBanner
                title="Renueva tu Hogar"
                subtitle="Oferta Especial"
                description="Descubre nuestra nueva colección de blanquería con diseños exclusivos y texturas premium."
                image="https://images.unsplash.com/photo-1522771753035-4850d357d635?auto=format&fit=crop&q=80&w=1000"
                link="/categoria/blanqueria"
                colorClass="bg-indigo-900 dark:bg-indigo-950"
            />

            {/* Products Section (reveal on scroll) */}
            <section>
                <RevealOnView>
                    <h2 className="text-2xl font-bold text-gray-800 my-8 border-b pb-2 border-gray-200">
                        Productos
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((p) => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </RevealOnView>
            </section>
        </div>
    );
};
