import React, { useState, useEffect } from 'react';

const slides = [
    {
        image: '/images/hero/welcome.png',
        title: 'Bienvenidos a Ferro-Market',
        subtitle: 'Encuentra todo lo que necesitas para tu hogar en un solo lugar.',
    },
    {
        image: '/images/hero/lifestyle.png',
        title: 'Calidad para tu Familia',
        subtitle: 'Productos seleccionados pensando en el bienestar de los tuyos.',
    },
    {
        image: '/images/hero/shopping.png',
        title: 'Compra Fácil y Rápido',
        subtitle: 'Haz tu pedido online y recíbelo cómodamente.',
    },
];

export const HeroCarousel: React.FC = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="relative h-[500px] w-full overflow-hidden rounded-3xl mx-auto max-w-7xl shadow-2xl">
            {/* Slides */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                >
                    {/* Image */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg transform transition-all duration-700 translate-y-0">
                            {slide.title}
                        </h1>
                        <p className="text-xl md:text-2xl max-w-2xl drop-shadow-md">
                            {slide.subtitle}
                        </p>
                    </div>
                </div>
            ))}

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};
