import { motion } from "framer-motion";
import { FADE_UP, STAGGER_CONTAINER } from "../utils/animations";
import content from "../data/content.json";

const { hero } = content;

export default function Hero() {
    return (
        <section className="relative w-full bg-primary py-12 md:py-20 lg:py-24 overflow-hidden">
            {/* Minimal Background Decor */}
            <div className="absolute top-0 left-0 h-full w-full opacity-10">
                <div className="absolute top-10 left-10 h-64 w-64 rounded-full border-4 border-white" />
                <div className="absolute bottom-10 right-10 h-96 w-96 rounded-full border-8 border-white" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6">
                <motion.div
                    variants={STAGGER_CONTAINER}
                    initial="hidden"
                    animate="show"
                    className="flex flex-col items-center justify-center text-center space-y-8"
                >
                    {/* Main Title */}
                    <motion.h1
                        variants={FADE_UP}
                        className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white"
                    >
                        {hero.title}
                    </motion.h1>

                    {/* Search Bar (Apollo Style) */}
                    <motion.div
                        variants={FADE_UP}
                        className="w-full max-w-3xl relative"
                    >
                        <div className="flex items-center bg-white rounded-xl p-1.5 shadow-2xl shadow-black/20">
                            <div className="flex items-center gap-3 px-4 flex-1">
                                <span className="text-2xl">🔍</span>
                                <input
                                    type="text"
                                    placeholder={hero.search_placeholder}
                                    className="w-full py-3 text-lg text-navy outline-none placeholder:text-navy/30 font-medium"
                                />
                            </div>
                            <button className="hidden sm:block bg-accent hover:bg-accent-dark px-8 py-3 rounded-lg text-sm font-bold text-white transition-colors">
                                Search
                            </button>
                        </div>
                    </motion.div>

                    {/* Tagline */}
                    <motion.p
                        variants={FADE_UP}
                        className="text-white/60 text-sm font-bold uppercase tracking-widest"
                    >
                        {hero.tagline}
                    </motion.p>
                </motion.div>
            </div>

            {/* Illustrations (Absolute positioned on sides) */}
            <div className="hidden xl:block absolute left-10 bottom-0 h-80 w-80 opacity-40">
                <svg viewBox="0 0 200 280" className="h-full w-full" fill="none">
                    <circle cx="100" cy="55" r="35" fill="#FDDCB5" />
                    <rect x="70" y="90" width="60" height="150" rx="15" fill="#ffffff" />
                    <rect x="90" y="110" width="20" height="40" rx="4" fill="#004d40" />
                </svg>
            </div>
            <div className="hidden xl:block absolute right-10 bottom-0 h-80 w-80 opacity-40">
                <svg viewBox="0 0 200 280" className="h-full w-full" fill="none">
                    <circle cx="100" cy="55" r="35" fill="#FDDCB5" />
                    <rect x="70" y="90" width="60" height="150" rx="15" fill="#ffffff" />
                    <rect x="80" y="110" width="40" height="20" rx="4" fill="#ffb74d" />
                </svg>
            </div>
        </section>
    );
}
