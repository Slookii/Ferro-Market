import React, { createContext, useContext, useState, useEffect } from 'react';
import Papa from 'papaparse';
import type { Product } from '../types';
import { products as localProducts } from '../data/products';

interface ProductsContextType {
    products: Product[];
    loading: boolean;
    error: string | null;
}

const ProductsContext = createContext<ProductsContextType>({
    products: [],
    loading: true,
    error: null,
});

const GOOGLE_SHEET_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQmmW0-KCdUcErxi67NH-f0voqayt4XPZMT6VgGZ1vLhmrKAx55WRHaKjWTFhOWLjkud9Mz24xWJIKG/pub?output=csv";

export const ProductsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = () => {
            Papa.parse(GOOGLE_SHEET_CSV_URL, {
                download: true,
                header: true,
                complete: (results) => {
                    try {
                        const parsedProducts: Product[] = results.data
                            .filter((row: any) => row.id && row.name) // Filter empty rows
                            .map((row: any) => ({
                                id: row.id,
                                name: row.name,
                                price: parseFloat(row.price) || 0,
                                originalPrice: row.originalPrice ? parseFloat(row.originalPrice) : undefined,
                                category: row.category,
                                description: row.description,
                                stock: parseInt(row.stock) || 0,
                                images: row.images ? row.images.split(',').map((url: string) => url.trim()) : [],
                                colors: row.colors ? row.colors.split(',').map((c: string) => c.trim()) : [],
                                sizes: row.sizes ? row.sizes.split(',').map((s: string) => s.trim()) : [],
                            }));

                        // If no products found in sheet (e.g. empty), use local products as fallback or just empty
                        if (parsedProducts.length === 0) {
                            console.warn("No products found in Sheet, using local fallback.");
                            setProducts(localProducts);
                        } else {
                            setProducts(parsedProducts);
                        }
                        setLoading(false);
                    } catch (err) {
                        console.error("Error parsing products:", err);
                        setError("Error al procesar los productos.");
                        setProducts(localProducts); // Fallback
                        setLoading(false);
                    }
                },
                error: (err) => {
                    console.error("Error fetching CSV:", err);
                    setError("Error al cargar los productos.");
                    setProducts(localProducts); // Fallback
                    setLoading(false);
                }
            });
        };

        fetchProducts();
    }, []);

    return (
        <ProductsContext.Provider value={{ products, loading, error }}>
            {children}
        </ProductsContext.Provider>
    );
};

export const useProducts = () => useContext(ProductsContext);
