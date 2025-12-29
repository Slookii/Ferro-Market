import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import { Home } from "../pages/Home";
import { CategoryPage } from "../pages/CategoryPage";
import { ProductPage } from "../pages/ProductPage";
import { CartPage } from "../pages/CartPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { ThankYouPage } from "../pages/ThankYouPage";
import { ContactPage } from "../pages/ContactPage";
import { AboutPage } from "../pages/AboutPage";
import { WishlistPage } from "../pages/WishlistPage";
import { NotFoundPage } from "../pages/NotFoundPage";

import { TermsPage } from "../pages/TermsPage";
import { PrivacyPage } from "../pages/PrivacyPage";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="w-full"
        >
            {children}
        </motion.div>
    );
};

export const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                <Route path="/categoria/:slug" element={<PageWrapper><CategoryPage /></PageWrapper>} />
                <Route path="/producto/:id" element={<PageWrapper><ProductPage /></PageWrapper>} />
                <Route path="/carrito" element={<PageWrapper><CartPage /></PageWrapper>} />
                <Route path="/checkout" element={<PageWrapper><CheckoutPage /></PageWrapper>} />
                <Route path="/gracias" element={<PageWrapper><ThankYouPage /></PageWrapper>} />
                <Route path="/contacto" element={<PageWrapper><ContactPage /></PageWrapper>} />
                <Route path="/nosotros" element={<PageWrapper><AboutPage /></PageWrapper>} />
                <Route path="/deseos" element={<PageWrapper><WishlistPage /></PageWrapper>} />
                <Route path="/terminos" element={<PageWrapper><TermsPage /></PageWrapper>} />
                <Route path="/privacidad" element={<PageWrapper><PrivacyPage /></PageWrapper>} />
                <Route path="*" element={<PageWrapper><NotFoundPage /></PageWrapper>} />
            </Routes>
        </AnimatePresence>
    );
};
