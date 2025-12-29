import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface PromoBannerProps {
    title: string;
    subtitle: string;
    description: string;
    image: string;
    link: string;
    colorClass?: string;
    reversed?: boolean;
}

export const PromoBanner = ({
    title,
    subtitle,
    description,
    image,
    link,
    colorClass = "bg-emerald-800",
    reversed = false
}: PromoBannerProps) => {
    return (
        <section className={`rounded-3xl overflow-hidden relative my-16 shadow-xl group ${colorClass}`}>
            <div className={`flex flex-col md:flex-row items-center ${reversed ? 'md:flex-row-reverse' : ''}`}>

                {/* Content */}
                <div className="flex-1 p-8 md:p-12 text-center md:text-left z-10">
                    <span className="inline-block py-1 px-3 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
                        {subtitle}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                        {title}
                    </h2>
                    <p className="text-white/80 text-lg mb-8 max-w-md mx-auto md:mx-0">
                        {description}
                    </p>
                    <Link to={link}>
                        <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all flex items-center gap-2 mx-auto md:mx-0 group-hover:gap-4">
                            Ver Ofertas <ArrowRight size={20} />
                        </button>
                    </Link>
                </div>

                {/* Image */}
                <div className="relative w-full md:w-1/2 h-64 md:h-96">
                    <div className={`absolute inset-0 bg-gradient-to-t md:${reversed ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-black/50 to-transparent z-10 transition-opacity group-hover:opacity-80`}></div>
                    <img
                        src={image}
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </div>
            </div>
        </section>
    );
};
