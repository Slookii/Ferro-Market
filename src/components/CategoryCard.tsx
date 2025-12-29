import React from 'react';
import { Link } from 'react-router-dom';

interface CategoryCardProps {
    id: string;
    name: string;
    image: string;
    description?: string;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ id, name, image, description }) => {
    return (
        <Link
            to={`/categoria/${id}`}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 aspect-[4/3] flex items-end"
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{ backgroundImage: `url(${image})` }}
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300" />

            {/* Content */}
            <div className="relative z-10 p-6 w-full text-left">
                <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-0 transition-transform duration-300">
                    {name}
                </h3>
                {description && (
                    <p className="text-gray-200 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
                        {description}
                    </p>
                )}
            </div>
        </Link>
    );
};
