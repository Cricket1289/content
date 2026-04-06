import { motion } from "framer-motion";
import { FADE_UP, STAGGER_CONTAINER, VIEWPORT_ONCE } from "../utils/animations";
import content from "../data/content.json";

const { quick_actions } = content;

export default function ServiceGrid() {
    return (
        <section className="px-6 py-12 bg-white">
            <div className="mx-auto max-w-7xl">
                <motion.div
                    variants={STAGGER_CONTAINER}
                    initial="hidden"
                    whileInView="show"
                    viewport={VIEWPORT_ONCE}
                    className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {quick_actions.map((action) => (
                        <motion.div
                            key={action.title}
                            variants={FADE_UP}
                            whileHover={{ y: -4, transition: { duration: 0.2 } }}
                            className={`group relative flex items-center gap-5 overflow-hidden rounded-xl ${action.bg} p-6 cursor-pointer border border-lavender/50 transition-all hover:shadow-lg`}
                        >
                            {/* Icon */}
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-white/80 text-3xl shadow-sm">
                                {action.icon}
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                                <h3 className="text-sm font-extrabold text-navy leading-tight">
                                    {action.title}
                                </h3>
                                <div className={`mt-2 text-[10px] font-black uppercase tracking-widest ${action.accent} flex items-center gap-1`}>
                                    {action.subtitle}
                                    <span className="text-xs group-hover:translate-x-1 transition-transform">→</span>
                                </div>
                            </div>

                            {/* Decorative logic */}
                            <div className="absolute -right-4 -bottom-4 opacity-5 text-6xl rotate-12">
                                {action.icon}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
