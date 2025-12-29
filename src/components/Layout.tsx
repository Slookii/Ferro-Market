import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CartDrawer } from "./CartDrawer";
import { WelcomePopup } from "./WelcomePopup";

export const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-gray-50 dark:bg-slate-950 dark:text-gray-100 transition-colors w-full overflow-x-hidden">
            <Toaster richColors position="top-center" />
            <Navbar />
            <CartDrawer />
            <WelcomePopup />
            <main className="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
            </main>
            <Footer />
        </div>
    );
};
