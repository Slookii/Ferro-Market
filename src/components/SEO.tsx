import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
};

interface SEOProps {
    title: string;
    description?: string;
}

export const SEO = ({ title, description = "Ferro-Market - Tu tienda de confianza en La Rioja" }: SEOProps) => {
    useEffect(() => {
        document.title = `${title} | Ferro-Market`;

        // Update meta description if needed
        const metaDescr = document.querySelector('meta[name="description"]');
        if (metaDescr) {
            metaDescr.setAttribute("content", description);
        }
    }, [title, description]);

    return null;
};
