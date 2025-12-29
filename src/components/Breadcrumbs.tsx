import { Link } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    url?: string;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export const Breadcrumbs = ({ items }: BreadcrumbsProps) => {
    return (
        <nav className="flex items-center text-sm text-gray-500 mb-6 animate-fade-in" aria-label="Breadcrumb">
            <Link to="/" className="flex items-center hover:text-emerald-600 transition-colors dark:text-gray-400 dark:hover:text-emerald-400">
                <Home size={16} className="mr-1" />
                <span className="hidden sm:inline">Inicio</span>
            </Link>

            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                    <ChevronRight size={16} className="mx-2 text-gray-400 dark:text-gray-600" />
                    {item.url ? (
                        <Link to={item.url} className="hover:text-emerald-600 transition-colors capitalize dark:text-gray-400 dark:hover:text-emerald-400">
                            {item.label}
                        </Link>
                    ) : (
                        <span className="font-medium text-gray-900 capitalize dark:text-emerald-50" aria-current="page">
                            {item.label}
                        </span>
                    )}
                </div>
            ))}
        </nav>
    );
};
